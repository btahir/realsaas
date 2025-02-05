'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

function PricingSection({ plans, user, subscriptionId }: any) {
  const [buttonLoadingId, setButtonLoadingId] = useState('')
  const router = useRouter()

  async function handleClick(variantId: string) {
    setButtonLoadingId(variantId)
    // Redirect to login if user is not logged in
    if (!user) {
      router.push('/login')
      return
    }

    if (subscriptionId) {
      const response = await fetch('/api/get-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      })

      const data = await response.json()
      router.push(data.url)
    } else {
      // go to customer portal if logged in
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
          variantId: variantId,
        }),
      })

      const data = await response.json()
      const url = data.checkout.data.data.attributes.url
      router.push(url)
    }
  }

  return (
    <div className='mx-auto mt-16 grid max-w-6xl grid-cols-1 justify-items-center gap-12 px-2 sm:mt-24 sm:px-12 md:grid-cols-3 md:gap-8'>
      {plans.map((plan: any, index: any) => (
        <Card
          key={index}
          className={`relative flex w-full max-w-xs flex-col justify-between py-6 ${plan.isPopular ? 'border-blue-500' : ''}`}
        >
          {plan.isPopular && (
            <div className='absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white'>
              Most Popular
            </div>
          )}
          <div>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription className='pt-2'>
                <span className='text-4xl font-bold text-foreground'>
                  ${plan.price}
                </span>
                / month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: plan.description }} />
              <Button
                onClick={() => handleClick(plan.variantId)}
                disabled={buttonLoadingId === plan.variantId}
                className={cn(
                  plan.isPopular
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-foreground',
                  'mt-4 w-full'
                )}
              >
                {user
                  ? subscriptionId
                    ? 'Manage'
                    : 'Subscribe'
                  : 'Get Started'}
              </Button>
            </CardContent>
          </div>
          <CardFooter>
            <ul
              role='list'
              className='mt-2 space-y-3 text-sm leading-6 text-gray-600 xl:mt-4'
            >
              {plan.features.map((feature: any) => (
                <li key={feature} className='flex gap-x-3'>
                  <Check
                    className='h-6 w-5 flex-none text-blue-600'
                    aria-hidden='true'
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default PricingSection
