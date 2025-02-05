import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
}

function AboutPage() {
  return (
    <div className='px-4 py-12'>
      <div className='mx-auto w-full max-w-2xl'>
        <Card className='py-6 text-foreground'>
          <CardHeader>
            <CardTitle className='text-center text-4xl font-extrabold tracking-tight lg:text-6xl'>
              About Me
            </CardTitle>
            <div className="flex justify-center pt-6">
              <div className="relative w-44 h-44">
                <Image
                  src="/me.png"
                  alt="Profile picture"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='mt-2 space-y-6 leading-8 md:text-lg'>
              <p>
                Hi, I&apos;m Bilal! I&apos;m passionate about building products that solve real problems. 
                You can check out my other experiments and projects on my{' '}
                <Link
                  href='https://www.hackyexperiments.com'
                  className='text-blue-500 hover:text-blue-600'
                >
                  portfolio
                </Link>
                . I&apos;ve greatly benefited from open-source starter code throughout my journey, 
                which has enabled me to build SaaS products quickly and efficiently.
              </p>

              <p>
                RealSaaS is a starter template for building SaaS products. It
                was built upon the{' '}
                <Link
                  href='https://github.com/vercel/nextjs-subscription-payments'
                  className='text-blue-500 hover:text-blue-600'
                >
                  Next.js Subscription Payments
                </Link>{' '}
                starter template.
              </p>

              <p>
                I successfully used this template to build my own SaaS product,{' '}
                <Link
                  href='http://snoophawk.com/'
                  className='text-blue-500 hover:text-blue-600'
                >
                  SnoopHawk
                </Link>
                , and thoroughly enjoyed the development process. During this
                journey, I made several changes such as using Shadcn (for a much
                cleaner UX) and integrating Lemon Squeezy as an alternative to
                Stripe for payment processing.
              </p>

              <p>
                While the original starter template has since been replaced with
                a{' '}
                <Link
                  href='https://github.com/nextjs/saas-starter'
                  className='text-blue-500 hover:text-blue-600'
                >
                  newer version
                </Link>
                , I wanted to share my enhanced version with the community
                rather than let it fade into obscurity. However, please note
                that since this code is based on an older repository, you should
                carefully evaluate whether it suits your needs, as newer
                alternatives are now available. Additionally, I will not be
                actively maintaining this project.
              </p>

              <p>
                My primary goal in open-sourcing this code is to provide
                developers with a playground to explore and learn from. If
                you&apos;re familiar with the original starter template, you might
                appreciate the refined user experience this version offers!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AboutPage
