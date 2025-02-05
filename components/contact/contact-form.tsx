'use client'

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
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { sendContactMessage } from '@/lib/auth-helpers/server'
import { handleRequest } from '@/lib/auth-helpers/client'

import { cn } from '@/lib/utils'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long.' }),
})

export default function ContactForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: any) {
    console.log('Submitting contact form:', data)
    await handleRequest(data, sendContactMessage, router)
  }

  return (
    <Card className='mx-auto max-w-lg m-4'>
      <CardHeader>
        <CardTitle className='text-2xl'>Contact us</CardTitle>
        <CardDescription>
          Send us a message and we&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='text'
              placeholder='John Doe'
              {...register('name')}
              required
            />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message as string}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='yourname@example.com'
              {...register('email')}
              required
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message as string}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='message'>Message</Label>
            <Textarea
              id='message'
              placeholder='Your message here'
              {...register('message')}
              required
              className='resize-none'
            />
            {errors.message && (
              <p className='text-red-500'>{errors.message.message as string}</p>
            )}
          </div>
          <Button
            type='submit'
            className={cn('w-full', {
              'cursor-not-allowed opacity-50': isSubmitting,
            })}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
