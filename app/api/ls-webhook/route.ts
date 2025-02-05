import crypto from 'node:crypto'
import { configureLemonSqueezy } from '@/lib/lemon-squeezy/config'

import { getPrice } from '@lemonsqueezy/lemonsqueezy.js'

import {
  getPlanData,
  upsertSubscription,
  upsertCustomerToSupabase,
} from '@/lib/supabase/admin'

import type { TablesInsert } from '@/types_db'

export async function POST(req: Request) {
  const rawBody = await req.text()
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ''

  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
  const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8')

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.')
  }

  // Configure Lemon Squeezy
  configureLemonSqueezy()

  // if signature checks out, we can parse the body
  let bodyJson
  try {
    bodyJson = JSON.parse(rawBody)
  } catch (e) {
    return new Response('Data invalid', {
      status: 400,
    })
  }

  const { data, meta } = bodyJson // Use parsed JSON data here.
  const userId = meta.custom_data.user_id
  console.log('Received data:', data)
  console.log('Received meta:', meta)

  const priceId = data.attributes.first_subscription_item.price_id
  // Get the price data from Lemon Squeezy.
  const priceData = await getPrice(priceId)
  const isUsageBased = data.attributes.first_subscription_item.is_usage_based
  const price = isUsageBased
    ? priceData.data?.data.attributes.unit_price_decimal
    : priceData.data?.data.attributes.unit_price

  const variantId = data.attributes.variant_id as string
  const { planId, planName }: any = await getPlanData(variantId)

  let subscriptionData: TablesInsert<'subscriptions'> = {
    lemon_squeezy_id: data.id,
    order_id: data.attributes.order_id,
    name: data.attributes.user_name,
    email: data.attributes.user_email,
    status: data.attributes.status,
    status_formatted: data.attributes.status_formatted,
    renews_at: data.attributes.renews_at,
    ends_at: data.attributes.ends_at,
    trial_ends_at: data.attributes.trial_ends_at,
    price: price?.toString() || '',
    is_usage_based: data.attributes.first_subscription_item.is_usage_based,
    is_paused: data.attributes.pause !== null,
    user_id: userId,
    plan_id: planId,
  }

  // Update customer data in supabase
  await upsertCustomerToSupabase(userId, data.id)

  // upsert the subscription data
  await upsertSubscription(subscriptionData)

  return new Response('Subscription updated', {
    status: 200,
  })
}
