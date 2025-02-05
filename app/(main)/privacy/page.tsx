import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

function PrivacyPage() {
  return (
    <div className='px-4 py-12'>
      <div className='mx-auto w-full max-w-2xl'>
        <Card className='py-6 text-foreground'>
          <CardHeader>
            <CardTitle className='text-center text-4xl font-extrabold tracking-tight lg:text-6xl'>
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mt-2 space-y-6 leading-8 md:text-lg'>
              <p>
                This Privacy Policy describes how your personal information is
                collected, used, and shared when you visit or make a purchase
                from this site.
              </p>
              <p>
                <strong>Your Data</strong>
                <br />
                We process your data on cloud services like Google Cloud and
                OpenAI. When you register, we collect your email address and
                password. If you make a payment, we receive transaction details
                from our payment processors.
              </p>
              <p>
                <strong>Other Data We Collect</strong>
                <br />
                We automatically collect certain device information when you
                visit our site, including details about your browser, IP
                address, and the cookies installed on your device. We also
                gather information about the pages you view, the websites that
                referred you, and how you interact with the site.
              </p>
              <p>
                <strong>Service Providers</strong>
                <br />
                We employ third-party companies to facilitate our service, to
                provide the service on our behalf, and to assist us in analyzing
                how our service is used. These third parties have access to your
                Personal Information only to perform these tasks on our behalf
                and are obligated not to disclose or use it for any other
                purpose.
              </p>
              <p>
                <strong>Security</strong>
                <br />
                We strive to use commercially acceptable means to protect your
                Personal Information, but remember that no method of
                transmission over the internet, or method of electronic storage
                is 100% secure.
              </p>
              <p>
                <strong>Links to Other Sites</strong>
                <br />
                Our site may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by us. We strongly advise
                you to review the Privacy Policy of these websites.
              </p>
              <p>
                <strong>Changes to This Privacy Policy</strong>
                <br />
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. These changes are effective immediately after they
                are posted on this page.
              </p>
              <p>
                <strong>Contact Us</strong>
                <br />
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to{' '}
                <a className='text-foreground underline' href='/contact'>
                  contact us
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PrivacyPage
