'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className='py-20'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center'>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='lg:w-1/2 lg:pr-10 mb-10 lg:mb-0'
          >
            <h1 className='text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-normal lg:leading-tight'>
              Build Your Personal Site in{' '}
              <span className='bg-sky-400 inline-block leading-none px-0'>
                Minutes
              </span>
            </h1>
            <p className='text-xl text-muted-foreground mb-8'>
              Upload your resume, showcase your personality, and let Real SaaS
              craft a site that's uniquely you.
            </p>
            <div className='flex gap-4'>
              <Button
                size='lg'
                className='text-lg font-semibold shadow-lg hover:shadow-2xl rounded-full'
              >
                Get Started
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg font-semibold shadow-lg hover:shadow-2xl rounded-full border-primary text-primary hover:text-primary/80'
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='lg:w-1/2'
          >
            <Image
              src='/hero.svg'
              alt='Real SaaS Builder Preview'
              width={600}
              height={400}
              className=''
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
