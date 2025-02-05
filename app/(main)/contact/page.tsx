import ContactForm from '@/components/contact/contact-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
}

function ContactPage() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <ContactForm />
    </div>
  )
}

export default ContactPage
