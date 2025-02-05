'use client'

import { createClient } from '@/lib/supabase/client'
import { type Provider } from '@supabase/supabase-js'
import { getURL } from '@/lib/utils'
import { redirectToPath } from './server'

export async function handleRequest(
  data: any,
  requestFunc: (d: any) => Promise<string>,
  router: any = null
): Promise<boolean | void> {
  const redirectUrl: string = await requestFunc(data)

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl)
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl)
  }
}

export async function signInWithOAuth(provider: Provider) {
  // Create client-side supabase client and call signInWithOAuth
  const supabase = createClient()
  const redirectURL = getURL('/auth/callback')
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL,
    },
  })
}
