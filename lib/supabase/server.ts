import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export const getSupabaseClient = cache(async (supabaseClient: any = null) => {
  return supabaseClient || (await createClient())
})

export const getUser = cache(async (supabase: SupabaseClient) => {
  const supabaseClient = await getSupabaseClient(supabase)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()
  return user
})

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const supabaseClient = await getSupabaseClient(supabase)
  const { data: subscription } = await supabaseClient
    .from('subscriptions')
    .select('*')
    .in('status', ['active', 'on_trial'])
    .single()

  return subscription
})

export const getPlans = cache(async (supabase: SupabaseClient) => {
  const supabaseClient = await getSupabaseClient(supabase)
  const productId = process.env.LEMONSQUEEZY_PRODUCT_ID
  let { data: plans } = await supabaseClient
    .from('plans')
    .select('*')
    .eq('product_id', productId)
  return plans
})
