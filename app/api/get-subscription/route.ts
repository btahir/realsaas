import { getSubscription } from '@lemonsqueezy/lemonsqueezy.js'
import { configureLemonSqueezy } from '@/lib/lemon-squeezy/config'

export async function POST(req: Request) {
  const subscriptionId = await req.json()
  configureLemonSqueezy()

  const response: any = await getSubscription(subscriptionId)

  return Response.json({
    url: response['data']['data']['attributes']['urls']['customer_portal'],
  })
}
