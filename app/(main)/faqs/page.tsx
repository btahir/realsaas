import { PageHeader } from '@/components/page-header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Metadata } from 'next'

const accordionData = [
  {
    value: 'item-1',
    trigger: 'What is RealSaaS?',
    content:
      '<div>RealSaaS is a starter template for building SaaS products, based on the Next.js Subscription Payments starter. It features improved UX, refined authentication flow, and Lemon Squeezy integration for payments.</div>',
  },
  {
    value: 'item-2',
    trigger: 'Why use RealSaaS?',
    content:
      '<div>RealSaaS offers several benefits for developers:<br /><br />- Built on a proven Next.js subscription template<br />- Enhanced user experience and authentication flow<br />- Lemon Squeezy integration as an alternative to Stripe<br />- Beautiful shadcn components for rapid development<br />- Clean, well-structured codebase to learn from<br /><br />While it\'s based on an older repository and won\'t be actively maintained, it serves as an excellent learning resource for developers interested in SaaS architecture.</div>',
  },
  {
    value: 'item-3',
    trigger: 'Where can I find the latest official Next.js SaaS template?',
    content:
      '<div>If you\'re starting a new project and want to use the most up-to-date template, you can find the official Next.js SaaS starter at <a href="https://github.com/nextjs/saas-starter" class="text-blue-500 hover:text-blue-600">github.com/nextjs/saas-starter</a>. This is the actively maintained version recommended for new projects.</div>',
  }
]

export const metadata: Metadata = {
  title: 'FAQs',
}

export default async function FAQsPage() {
  return (
    <div className='relative min-h-screen overflow-hidden px-4 py-12'>
      <div className='relative'>
        <PageHeader>
          <h2 className='font-display text-3xl font-bold tracking-tight sm:text-5xl'>
            Frequently Asked Questions
          </h2>
        </PageHeader>

        <div className='mx-auto mt-12 w-full max-w-lg'>
          <Accordion type='single' collapsible className='w-full'>
            {accordionData.map(({ value, trigger, content }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger className='text-left text-sm sm:text-base'>
                  {trigger}
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className=''
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
