import { Button } from '@/components/ui/button'
import {
  Star,
  Zap,
  Shield,
  Code,
  DollarSign,
  LineChart,
  Lightbulb,
  Brain,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden'>
      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='relative min-h-screen flex flex-col justify-center overflow-visible'>
          {/* Dotted Background */}
          <div
            className='absolute inset-0 pointer-events-none z-0'
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }}
          ></div>

          {/* Floating Icons */}
          <div className='absolute inset-0 pointer-events-none z-1 overflow-hidden'>
            <div className='absolute top-[20%] left-[10%] animate-float-slow rotate-6'>
              <DollarSign className='w-8 h-8 text-primary/70' />
            </div>
            <div className='absolute top-[40%] right-[15%] animate-float-slower -rotate-12'>
              <LineChart className='w-12 h-12 text-primary/70' />
            </div>
            <div className='absolute bottom-[35%] left-[20%] animate-float rotate-3'>
              <Lightbulb className='w-10 h-10 text-primary/70' />
            </div>
            <div className='absolute top-[30%] right-[25%] animate-float-slow -rotate-6'>
              <Brain className='w-10 h-10 text-primary/70' />
            </div>
            <div className='absolute bottom-[25%] right-[12%] animate-float rotate-12'>
              <Star className='w-6 h-6 text-primary/70' />
            </div>
            <div className='absolute top-[15%] left-[30%] animate-float-slower -rotate-3'>
              <Zap className='w-8 h-8 text-primary/70' />
            </div>
          </div>

          {/* Decorative Blue Shapes */}
          <div className='absolute inset-0 pointer-events-none z-5'>
            {/* Top Left Bubble */}
            <div className='absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-70 animate-pulse'></div>
            {/* Bottom Right Bubble */}
            <div className='absolute -right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply opacity-70 animate-pulse bottom-[-50px] md:bottom-[-100px]'></div>
          </div>

          {/* Hero Content */}
          <div className='container mx-auto px-4 text-center relative z-10 flex flex-col items-center'>
            <h1 className='leading-tight text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 drop-shadow'>
              From 0 to 1, <br />
              Real SaaS
            </h1>
            <p className='text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-lg sm:max-w-2xl text-muted-foreground'>
              Quickly build your dream SaaS with Next.js 15, Supabase, and Lemon
              Squeezy.
            </p>
            <div className='flex justify-center items-center gap-4 mb-8'>
              <Button
                size='lg'
                className='rounded-full transition-colors duration-300'
              >
                Get Started
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='rounded-full transition-colors duration-300'
                asChild
              >
                <a
                  href='https://github.com/btahir/realsaas'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Get the Code
                </a>
              </Button>
            </div>

            {/* Sponsor Section */}
            <div className='mt-8 flex flex-col items-center'>
              <p className='text-sm text-muted-foreground mb-2'>Sponsored by</p>
              <a
                href='https://www.snoophawk.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-4 py-2 bg-blue-500/25 rounded-full hover:bg-blue-500/40 transition-colors'
              >
                <span className='font-semibold text-primary'>SnoopHawk</span>
                <span className='text-sm text-muted-foreground'>
                  - Your Reddit Marketing on Autopilot
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Disclaimers Section */}
        <section className='py-20 bg-foreground text-background'>
          <div className='container mx-auto px-4'>
            <h2 className='text-5xl font-bold text-center mb-12'>
              Disclaimers
            </h2>
            <p className='text-muted text-lg sm:text-xl px-2 sm:px-6'>
              This repo is based on the archived{' '}
              <a
                href='https://github.com/vercel/nextjs-subscription-payments'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-primary'
              >
                Next.js-Supabase-Stripe starter
              </a>
              . I've open-sourced my own version because I particularly liked
              the UX, especially the auth flow, and had invested significant
              time making it all look nice and integrating Lemon Squeezy. I
              didn't want this effort to go to waste. However, please exercise
              caution when using this code in production - it's intended as a
              starting point rather than a production-ready SaaS solution.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-20 bg-muted'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Everything You Need to Kickstart Your SaaS
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {[
                {
                  title: 'Next 15',
                  description:
                    'Harness the latest Next.js App Router for a cutting-edge, dynamic application experience.',
                  icon: <Code className='text-primary h-8 w-8' />,
                },
                {
                  title: 'shadcn & Tailwind',
                  description:
                    'Build beautiful, responsive interfaces quickly with pre-built components and utility-first styling.',
                  icon: <Star className='text-primary h-8 w-8' />,
                },
                {
                  title: 'Supabase Auth',
                  description:
                    'Integrate secure, production-ready authentication without the overhead of custom setups.',
                  icon: <Shield className='text-primary h-8 w-8' />,
                },
                {
                  title: 'Lemon Squeezy',
                  description:
                    'Seamlessly integrate payment processing to monetize your SaaS with ease.',
                  icon: <Zap className='text-primary h-8 w-8' />,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className='flex items-start p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'
                >
                  <div className='mr-4 mt-1'>{feature.icon}</div>
                  <div>
                    <h3 className='text-xl font-semibold mb-2'>
                      {feature.title}
                    </h3>
                    <p className='text-muted-foreground'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className='py-20 bg-muted/50'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Start Building Today
            </h2>
            <p className='text-xl mb-8 text-muted-foreground'>
              Join developers who are launching their SaaS faster with our
              starter template.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                size='lg'
                variant='default'
                className='rounded-full transition-colors duration-300'
                asChild
              >
                <a
                  href='https://github.com/btahir/realsaas'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Get the Code
                </a>
              </Button>
              <a
                href='https://www.snoophawk.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                Check out our sponsor →
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
