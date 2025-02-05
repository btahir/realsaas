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

import { login } from '@/lib/auth-helpers/server'
import { signInWithOAuth, handleRequest } from '@/lib/auth-helpers/client'

import { cn } from '@/lib/utils'

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export default function SignIn() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: any) {
    await handleRequest(data, login, router)
  }

  async function handleGoogleLogin(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    await signInWithOAuth('google')
  }

  return (
    <Card className='mx-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <Link
                href='/login/forgot_password'
                className='ml-auto inline-block text-sm underline'
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              {...register('password')}
              required
            />
            {errors.password && (
              <p className='text-red-500'>
                {errors.password.message as string}
              </p>
            )}
          </div>
          <Button
            type='submit'
            className={cn('w-full', {
              'cursor-not-allowed opacity-50': isSubmitting,
            })}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant='outline'
            className='w-full'
          >
            Login with Google
          </Button>
        </form>
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
