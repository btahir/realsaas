'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getURL, getErrorRedirect, getStatusRedirect } from '@/lib/utils'

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

export async function redirectToPath(path: string) {
  return redirect(path)
}

export async function signup(formData: any) {
  const supabase = await createClient()
  const { email, password } = formData
  const callbackURL = getURL('/auth/callback')
  let redirectPath: string

  // check if email is valid
  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/login/signup',
      'Invalid email address.',
      'Please try again.'
    )
  }

  const credendtialsData = {
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  }

  const { data, error } = await supabase.auth.signUp(credendtialsData)
  console.log('error', error)

  if (error) {
    redirectPath = getErrorRedirect(
      '/login/password_signin',
      'Sign up failed.',
      error.message
    )
  } else if (data.session) {
    redirectPath = getStatusRedirect(
      '/account',
      'Success!',
      'You are now signed in.'
    )
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      '/login/signup',
      'Sign up failed.',
      'There is already an account associated with this email address. Try resetting your password.'
    )
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/account',
      'Success!',
      'Please check your email for a confirmation link. You may now close this tab.'
    )
  } else {
    redirectPath = getErrorRedirect(
      '/login/signup',
      'Hmm... Something went wrong.',
      'You could not be signed up.'
    )
  }

  return redirectPath
}

export async function login(formData: any) {
  const { email, password } = formData
  const supabase = await createClient()
  const cookieStore = await cookies()
  let redirectPath: string

  // check if email is valid
  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Invalid email address.',
      'Please try again.'
    )
  }

  const credentialsData = {
    email,
    password,
  }

  const { data, error } = await supabase.auth.signInWithPassword(
    credentialsData
  )
  // console.log('error', error)

  if (error) {
    redirectPath = getErrorRedirect(
      '/login/password_signin',
      'Sign in failed.',
      error.message
    )
  } else if (data.user) {
    cookieStore.set('preferredSignInView', 'password_signin', { path: '/' })
    redirectPath = getStatusRedirect(
      '/account',
      'Success!',
      'You are now signed in.'
    )
  } else {
    redirectPath = getErrorRedirect(
      '/login/password_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    )
  }

  console.log('redirectPath', redirectPath)
  return redirectPath
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return getErrorRedirect(
      '/',
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    )
  }

  return '/login'
}

export async function requestPasswordUpdate(email: string) {
  const callbackURL = getURL('/auth/reset_password')
  let redirectPath: string

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/login/forgot_password',
      'Invalid email address.',
      'Please try again.'
    )
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL,
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/login/forgot_password',
      error.message,
      'Please try again.'
    )
  } else if (data) {
    redirectPath = getStatusRedirect(
      '/login/forgot_password',
      'Success!',
      'Please check your email for a password reset link. You may now close this tab.',
      true
    )
  } else {
    redirectPath = getErrorRedirect(
      '/login/forgot_password',
      'Hmm... Something went wrong.',
      'Password reset email could not be sent.'
    )
  }

  return redirectPath
}

export async function sendContactMessage(contactData: any) {
  let redirectPath: string

  if (!isValidEmail(contactData.email)) {
    redirectPath = getErrorRedirect(
      '/login/forgot_password',
      'Invalid email address.',
      'Please try again.'
    )
  }

  const callbackURL = getURL('/api/contact')
  const { data, error, status } = await fetch(callbackURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  }).then((res) => res.json())

  if (status !== 200) {
    redirectPath = getErrorRedirect(
      '/contact',
      error.message,
      'Please try again.'
    )
  } else if (data) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Your message has been sent. We will get back to you as soon as possible.',
      true
    )
  } else {
    redirectPath = getErrorRedirect(
      '/',
      'Hmm... Something went wrong.',
      'Your message could not be sent. Please try again.'
    )
  }

  return redirectPath
}

export async function updatePassword(formData: any) {
  const supabase = await createClient()
  const { newPassword, confirmNewPassword } = formData
  console.log('formData', formData)
  let redirectPath: string

  // Check that the password and confirmation match
  if (newPassword !== confirmNewPassword) {
    redirectPath = getErrorRedirect(
      '/login/update_password',
      'Your password could not be updated.',
      'Passwords do not match.'
    )
    return redirectPath
  }

  // Attempt to update the user's password
  const { error, data } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/login/update_password',
      'Your password could not be updated.',
      error.message
    )
    return redirectPath
  }

  if (data.user) {
    redirectPath = getStatusRedirect(
      '/account',
      'Success!',
      'Your password has been updated.'
    )
  } else {
    redirectPath = getErrorRedirect(
      '/login/update_password',
      'Hmm... Something went wrong.',
      'Your password could not be updated.'
    )
  }

  return redirectPath
}
