import {
  getUser,
  getSubscription,
  getPlans,
  createClient,
} from '@/lib/supabase/server'
import Link from 'next/link'

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import SubscriptionButton from '@/components/subscription-button'
import { formatLemonDate } from '@/lib/utils'
import { Metadata } from 'next'

import { PLAN_DETAILS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Account',
}

export default async function AccountPage() {
  const supabase = await createClient()
  const [user, subscription, plans] = await Promise.all([
    getUser(supabase),
    getSubscription(supabase),
    getPlans(supabase),
  ])

  const userEmail = user?.email || null
  const subscriptionId = subscription?.lemon_squeezy_id || null

  if (!subscription) {
    return (
      <div className='min-h-screen bg-muted/40 px-4 py-12'>
        <PageHeading />
        <div className='mx-auto mt-24 w-full max-w-sm'>
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                No active subscription for {userEmail}.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button>
                <Link href='/pricing'>Purchase plan</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  const matchingPlan = plans
    ? plans.find((plan: any) => plan.id === subscription.plan_id)
    : null

  if (!matchingPlan) {
    return (
      <div className='min-h-screen bg-muted/40 px-4 py-12'>
        <PageHeading />
        <div className='mx-auto mt-24 w-full max-w-sm'>
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>You have no matching plan.</CardDescription>
            </CardContent>
            <CardFooter>
              <div className='flex items-center space-x-4'>
                <Button>
                  <Link href='/pricing'>Purchase plan</Link>
                </Button>
                <Button variant='outline'>
                  <Link href='/jobs'>Go to Dashboard</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen px-2 sm:px-4 py-12'>
      <PageHeading />
      <div className='mx-auto w-full max-w-lg'>
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Current plan for {userEmail}.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
              <div>
                <dt className='text-sm text-muted-foreground'>Plan</dt>
                <dd className='mt-1 text-lg font-medium'>
                  {matchingPlan.name}
                </dd>
              </div>
              <div>
                <dt className='text-sm text-muted-foreground'>Next Payment</dt>
                <dd className='mt-1 text-lg font-medium'>
                  {formatLemonDate(subscription.renews_at)}
                </dd>
              </div>
              <div>
                <dt className='text-sm text-muted-foreground'>Amount</dt>
                <dd className='mt-1 text-lg font-medium'>
                  ${matchingPlan.price / 100}
                </dd>
              </div>
            </dl>
          </CardContent>
          <CardFooter>
            <div className='w-full'>
              <SubscriptionButton
                text='Manage Subscription'
                subscriptionId={subscriptionId}
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function PageHeading() {
  return (
    <PageHeader className='pb-12 pt-0 md:pb-16 md:pt-8 lg:pb-24 lg:pt-12'>
      <PageHeaderHeading className='text-4xl sm:text-5xl'>
        Account Settings
      </PageHeaderHeading>
      <PageHeaderDescription>
        Manage your account and subscription.
      </PageHeaderDescription>
    </PageHeader>
  )
}
