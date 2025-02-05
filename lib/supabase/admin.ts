import { createClient } from '@supabase/supabase-js'
import type { TablesInsert } from '@/types_db'

// Supabase Admin Client initialization
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function upsertPlan(plan: TablesInsert<'plans'>) {
  const { error } = await supabaseAdmin
    .from('plans')
    .upsert([plan], { onConflict: 'variant_id' })

  if (error) {
    console.error('Error upserting plan:', error)
    return error
  }

  return null
}

export async function upsertSubscription(
  subscription: TablesInsert<'subscriptions'>
) {
  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert([subscription], { onConflict: 'lemon_squeezy_id' })

  if (error) {
    console.error('Error upserting plan:', error)
    return error
  }

  return null
}

export async function getPlanId(variantId: string) {
  const { data, error } = await supabaseAdmin
    .from('plans')
    .select('id')
    .eq('variant_id', variantId)
    .single()

  if (error) {
    console.error('Error getting plan:', error)
    return error
  }

  return data?.id
}

export async function getPlanData(variantId: string) {
  const { data, error } = await supabaseAdmin
    .from('plans')
    .select('id, name')
    .eq('variant_id', variantId)
    .single()

  if (error) {
    console.error('Error getting plan:', error)
    return error
  }

  return { planId: data?.id, planName: data?.name }
}
