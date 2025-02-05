import Link from 'next/link'
import { Mail } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Login', href: '/login/password_signin' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className='border-t bg-card'>
      <div className='container mx-auto px-4 py-16'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <div>
              <Link href='/' className='flex items-center space-x-2'>
                <img src='/logo.svg' className='h-6 w-6' />
                <span className='font-bold sm:inline-block'>
                  Real<span className='text-blue-500'>SaaS</span>
                </span>
              </Link>
              <p className='text-muted-foreground mb-6 mt-4 max-w-md'>
                Build a Real SaaS product from 0 to 1.
              </p>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={category}>
              <h3 className='font-semibold text-foreground capitalize mb-4'>
                {category}
              </h3>
              <ul className='space-y-3'>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-muted-foreground hover:text-primary transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='pt-8 border-t'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-muted-foreground text-sm'>
              &copy; {new Date().getFullYear()} Real SaaS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
