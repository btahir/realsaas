import { getUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getViewTypes, getDefaultSignInView } from '@/lib/auth-helpers/settings'
import { cookies } from 'next/headers'

import Login from '@/components/login-forms/sign-in'
import SignUp from '@/components/login-forms/sign-up'
import ForgotPassword from '@/components/login-forms/forgot-password'
import UpdatePassword from '@/components/login-forms/update-password'
import { Metadata, ResolvingMetadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const viewProp = params.id
  const finalTitle =
    viewProp === 'password_signin'
      ? 'Login'
      : viewProp === 'forgot_password'
      ? 'Forgot Password'
      : viewProp === 'signup'
      ? 'Sign Up'
      : 'Update Password'

  return {
    title: finalTitle,
  }
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { disable_button: boolean }
}) {
  const viewTypes = getViewTypes()
  const supabase = await createClient()

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredSignInView =
      (await cookies()).get('preferredSignInView')?.value || null
    viewProp = getDefaultSignInView(preferredSignInView)
    return redirect(`/login/${viewProp}`)
  }

  const user = await getUser(supabase)
  // we redirect to account page if user is already logged in
  // exception is when user is updating password.
  // This flow only happens when they come from a Reset Password link via email
  if (user && viewProp !== 'update_password') {
    redirect('/account')
  } else if (!user && viewProp === 'update_password') {
    return redirect('/login')
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4'>
      {viewProp === 'password_signin' && <Login />}
      {viewProp === 'forgot_password' && (
        <ForgotPassword disable_button={searchParams.disable_button} />
      )}
      {viewProp === 'signup' && <SignUp />}
      {viewProp === 'update_password' && <UpdatePassword />}
    </div>
  )
}
