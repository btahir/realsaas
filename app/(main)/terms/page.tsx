import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

function TermsPage() {
  return (
    <div className='px-4 py-12'>
      <div className='mx-auto w-full max-w-2xl'>
        <Card className='py-6 text-foreground'>
          <CardHeader>
            <CardTitle className='text-center text-4xl font-extrabold tracking-tight lg:text-6xl'>
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent className=''>
            <div className='mt-2 space-y-6 leading-8 md:text-lg'>
              <p>
                Welcome to Real SaaS. By accessing our site, you&apos;re
                agreeing to our Terms of Service outlined below. These terms
                apply to all visitors, users, and others who access or use the
                Service.
              </p>
              <p>
                <strong>SECTION 1 - ONLINE TERMS</strong>
                <br />
                By using our site, you confirm you&apos;re of legal age in your
                region or have guardian consent to agree to these Terms.
              </p>
              <p>
                <strong>SECTION 2 - GENERAL CONDITIONS</strong>
                <br />
                We reserve the right to refuse service to anyone at any time.
                Your data (excluding credit card info) may be transferred
                unencrypted and may be modified to meet technical requirements.
              </p>
              <p>
                <strong>SECTION 3 - ACCURACY OF INFORMATION</strong>
                <br />
                We aim for accuracy but cannot guarantee that all information
                offered is exact, complete, or current.
              </p>
              <p>
                <strong>
                  SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
                </strong>
                <br />
                Prices for our products are subject to change without notice.
              </p>
              <p>
                <strong>SECTION 5 - PRODUCTS OR SERVICES</strong>
                <br />
                Certain products or services may be available exclusively
                online. These products or services may have limited quantities.
              </p>
              <p>
                <strong>SECTION 6 - BILLING AND ACCOUNT INFORMATION</strong>
                <br />
                We reserve the right to refuse any order you place with us. You
                agree to provide current, complete, and accurate purchase
                information.
              </p>
              <p>
                <strong>SECTION 7 - OPTIONAL TOOLS</strong>
                <br />
                We may provide you with access to third-party tools which we
                neither monitor nor have control over.
              </p>
              <p>
                <strong>SECTION 8 - THIRD-PARTY LINKS</strong>
                <br />
                Certain content, products, and services available via our
                Service may include materials from third-parties.
              </p>
              <p>
                <strong>SECTION 9 - PERSONAL INFORMATION</strong>
                <br />
                Your submission of personal information through the store is
                governed by our Privacy Policy.
              </p>
              <p>
                <strong>SECTION 10 - ERRORS, INACCURACIES AND OMISSIONS</strong>
                <br />
                Occasionally there may be information on our site that contains
                typographical errors, inaccuracies, or omissions.
              </p>
              <p>
                <strong>SECTION 11 - PROHIBITED USES</strong>
                <br />
                You are prohibited from using the site or its content for any
                unlawful purpose, to solicit others to perform or participate in
                any unlawful acts, etc.
              </p>
              <p>
                <strong>
                  SECTION 12 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
                </strong>
                <br />
                We do not guarantee that your use of our service will be
                uninterrupted, timely, secure, or error-free.
              </p>
              <p>
                <strong>SECTION 13 - INDEMNIFICATION</strong>
                <br />
                You agree to indemnify, defend and hold harmless Real SaaS and
                our partners from any claim or demand.
              </p>
              <p>
                <strong>SECTION 14 - SEVERABILITY</strong>
                <br />
                In the event that any provision of these Terms is determined to
                be unlawful or unenforceable, such provision shall nonetheless
                be enforceable to the fullest extent permitted by applicable
                law.
              </p>
              <p>
                <strong>SECTION 15 - TERMINATION</strong>
                <br />
                The obligations and liabilities of the parties incurred prior to
                the termination date shall survive the termination.
              </p>
              <p>
                <strong>SECTION 16 - ENTIRE AGREEMENT</strong>
                <br />
                These Terms constitute the entire agreement between you and us
                and govern your use of the Service.
              </p>
              <p>
                <strong>SECTION 17 - CHANGES TO TERMS OF SERVICE</strong>
                <br />
                We reserve the right to update, change or replace any part of
                these Terms of Service by posting updates and changes to our
                website.
              </p>
              <p>
                <strong>SECTION 18 - CONTACT INFORMATION</strong>
                <br />
                Questions about the Terms of Service should be sent to us at{' '}
                <a className='text-foreground underline' href='/contact'>
                  Contact Us
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

export default TermsPage
