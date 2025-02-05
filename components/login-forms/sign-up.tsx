'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

import { signInWithOAuth, handleRequest } from '@/lib/auth-helpers/client'
import { signup } from '@/lib/auth-helpers/server'

const SignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export default function SignUp() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  })

  async function onSubmit(data: any) {
    console.log(data) // Or handle this data with your backend

    // await new Promise(resolve => setTimeout(resolve, 1000))
    await handleRequest(data, signup, router)
  }

  async function handleGoogleLogin(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    await signInWithOAuth('google')
  }

  return (
    <Card className='mx-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
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
            <Label htmlFor='password'>Password</Label>
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
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create an account'}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant='outline'
            className='w-full'
          >
            Sign up with Google
          </Button>
        </form>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/login/password_signin' className='underline'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
