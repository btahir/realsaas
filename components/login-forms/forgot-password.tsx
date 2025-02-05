'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { requestPasswordUpdate } from '@/lib/auth-helpers/server'
import { handleRequest } from '@/lib/auth-helpers/client'

import { cn } from '@/lib/utils'

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function ForgotPassword({
  disable_button,
}: {
  disable_button: boolean
}) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: any) {
    await handleRequest(data.email, requestPasswordUpdate, router)
  }

  return (
    <Card className='mx-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to get a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              {...register('email')}
              required
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message as string}</p>
            )}
          </div>

          <Button
            type='submit'
            className={cn('w-full', {
              'cursor-not-allowed opacity-50': isSubmitting,
            })}
            disabled={isSubmitting || !!disable_button}
          >
            {isSubmitting ? 'Sending...' : 'Reset Password'}
          </Button>
        </form>
        <div className='mt-4 text-center text-sm'>
          <Link href='/login/password_signin' className='underline'>
            Sign in
          </Link>{' '}
          to your account
        </div>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/login/signup' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
