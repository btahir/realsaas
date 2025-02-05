import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import UserDropdown from './user-dropdown'

import {
  createClient,
  getUser,
  getSubscription as getSupabaseSubscription,
} from '@/lib/supabase/server'
import { logout } from '@/lib/auth-helpers/server'

import { getSubscription as getLemonSubscription } from '@lemonsqueezy/lemonsqueezy.js'
import { configureLemonSqueezy } from '@/lib/lemon-squeezy/config'

export default async function Navbar() {
  const supabase = await createClient()
  const user = await getUser(supabase)
  const subscription = await getSupabaseSubscription(supabase)
  const subscriptionId = subscription?.lemon_squeezy_id || null

  async function serverActions(dropdownValue: string) {
    'use server'

    if (dropdownValue === 'Account') {
      redirect('/account')
    } else if (dropdownValue === 'Logout') {
      await logout()
    } else if (dropdownValue === 'Manage Subscription') {
      configureLemonSqueezy()
      const response: any = await getLemonSubscription(subscriptionId)
      const url =
        response['data']['data']['attributes']['urls']['customer_portal']
      redirect(url)
    }
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 font-display backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-xl items-center justify-between mx-auto'>
        <MainNav user={user} subscriptionId={subscriptionId} />
        <MobileNav userId={user} serverActions={serverActions} />
        <div className='hidden items-center justify-between space-x-2 md:flex md:justify-end'>
          {user ? (
            <UserDropdown
              serverActions={serverActions}
              subscriptionId={subscriptionId}
            />
          ) : (
            <>
              <Button variant='outline' size='sm' className='h-8'>
                <Link
                  href='/login/password_signin'
                  className='flex h-full w-full items-center gap-1'
                >
                  Login
                </Link>
              </Button>
              <Button size='sm' className='h-8'>
                <Link
                  href='/login/signup'
                  className='flex h-full w-full items-center gap-1'
                >
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
