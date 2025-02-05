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

import { updatePassword } from '@/lib/auth-helpers/server'
import { handleRequest } from '@/lib/auth-helpers/client'
import { cn } from '@/lib/utils'

const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' })

const FormSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'], // This specifies where the error should be attached in the event of a mismatch
  })

export default function UpdatePassword() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: any) {
    if (data.newPassword !== data.confirmNewPassword) {
      console.error('Passwords do not match')
      return
    }
    console.log('data', data)
    await handleRequest(data, updatePassword, router)
  }

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Update Password</CardTitle>
        <CardDescription>
          Update your password by filling out the fields below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='newPassword'>New Password</Label>
            <Input
              id='newPassword'
              type='password'
              {...register('newPassword')}
              required
            />
            {errors.newPassword && (
              <p className='text-red-500'>
                {errors.newPassword.message as string}
              </p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='confirmNewPassword'>Confirm New Password</Label>
            <Input
              id='confirmNewPassword'
              type='password'
              {...register('confirmNewPassword')}
              required
            />
            {errors.confirmNewPassword && (
              <p className='text-red-500'>
                {errors.confirmNewPassword.message as string}
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
            {isSubmitting ? 'Updating...' : 'Update Password'}
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
