import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

import { Suspense } from 'react'
import { Toaster } from '@/components/param-toaster'

const primarySans = Geist({
  variable: '--font-primary-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'RealSaaS | From 0 to 1, Real SaaS',
    template: '%s | From 0 to 1, Real SaaS'
  },
  description:
    'Build a Real SaaS product from 0 to 1.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${primarySans.variable} antialiased font-sans`}>
        <main>{children}</main>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
