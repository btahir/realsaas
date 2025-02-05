'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function MainNav({
  user,
  subscriptionId,
}: {
  user: any
  subscriptionId: string | null
}) {
  const pathname = usePathname()

  // Define the navigation links
  const navLinks = [
    { href: '/', label: 'Home', startsWith: '/' },
    { href: '/pricing', label: 'Pricing', startsWith: '/pricing' },
    { href: '/about', label: 'About', startsWith: '/about' },
    { href: '/faqs', label: 'FAQs', startsWith: '/faqs' },
    { href: '/contact', label: 'Contact', startsWith: '/contact' },
  ]

  return (
    <div className='mr-4 hidden md:flex'>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        <img src='/logo.svg' className='h-6 w-6' />
        <span className='hidden font-bold sm:inline-block'>
          Real<span className='text-blue-500'>SaaS</span>
        </span>
      </Link>
      <nav className='flex items-center gap-4 text-sm lg:gap-6'>
        {navLinks.map((link) => {
          if (!user && link.label === 'Contact') return null
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname.startsWith(link.startsWith)
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
