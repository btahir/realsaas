'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function SubscriptionButton({ text, subscriptionId }: any) {
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setIsButtonLoading(true)
    // get subscription portal link
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
  }

  return (
    <Button
      variant='default'
      size='sm'
      className='w-full'
      onClick={handleClick}
      disabled={isButtonLoading}
    >
      {text}
    </Button>
  )
}

export default SubscriptionButton
