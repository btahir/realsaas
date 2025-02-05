'use client'

import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  Home,
  CircleDollarSign,
  CircleHelp,
  CircleUser,
  Menu,
  BookOpen,
  HelpCircle,
} from 'lucide-react'

const navLinks = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Pricing',
    href: '/pricing',
    icon: CircleDollarSign,
  },
  {
    title: 'About',
    href: '/about',
    icon: BookOpen,
  },
  {
    title: 'FAQs',
    href: '/faqs',
    icon: HelpCircle,
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: CircleHelp,
  },
  {
    title: 'Account',
    href: '/account',
    icon: CircleUser,
  },
]

export function MobileNav({ userId, serverActions }: any) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className='flex w-full items-center justify-between px-2 md:hidden'>
          <MobileLink
            href='/'
            className='flex items-center'
            onOpenChange={setOpen}
          >
            <img
              src='/logo.svg'
              className='mr-1 h-6 w-auto'
              alt='snoop hawk logo'
            />
            <span className='font-bold'>
              Real<span className='text-blue-500'>SaaS</span>
            </span>
          </MobileLink>
          <Button
            size='icon'
            variant='ghost'
            className='[&_svg]:!h-6 [&_svg]:!w-6 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
          >
            <Menu className='text-muted-foreground' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <SheetHeader>
          <SheetTitle className='flex items-center'>
            <MobileLink
              href='/'
              className='flex items-center'
              onOpenChange={setOpen}
            >
              <img
                src='/logo.svg'
                className='mr-1 h-6 w-auto'
                alt='snoop hawk logo'
              />
              <span className='font-bold'>
                Real<span className='text-blue-500'>SaaS</span>
              </span>
            </MobileLink>
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10'>
          <nav className='grid gap-2 text-lg font-medium'>
            {navLinks.map((item) => {
              if (
                !userId &&
                ['Contact', 'Account'].includes(item.title)
              )
                return null

              return (
                item.href && (
                  <MobileLink
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    <item.icon className='h-5 w-5' />
                    {item.title}
                  </MobileLink>
                )
              )
            })}
          </nav>
          <div className='mt-6 flex w-full flex-col space-y-4 pr-12'>
            {userId ? (
              <MobileLink href='/account' onOpenChange={setOpen}>
                <Button
                  onClick={() => serverActions('Logout')}
                  className='h-12 w-full'
                >
                  Logout
                </Button>
              </MobileLink>
            ) : (
              <>
                <MobileLink
                  href='/login/password_signin'
                  onOpenChange={setOpen}
                >
                  <Button variant='outline' className='h-12 w-full'>
                    Login
                  </Button>
                </MobileLink>
                <MobileLink href='/login/signup' onOpenChange={setOpen}>
                  <Button className='h-12 w-full'>Sign up</Button>
                </MobileLink>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
