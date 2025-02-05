import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { configureLemonSqueezy } from '@/lib/lemon-squeezy/config'

export async function POST(req: Request): Promise<Response> {
  let { userId, userEmail, variantId } = await req.json()
  configureLemonSqueezy()

  try {
    const checkout = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID!,
      variantId,
      {
        // checkoutOptions: {
        //   embed,
        //   media: false,
        //   logo: !embed,
        // },
        checkoutData: {
          email: userEmail ?? undefined,
          custom: {
            user_id: userId,
          },
        },
        productOptions: {
          enabledVariants: [variantId],
          redirectUrl: 'https://www.realsaas.vercel.app/account',
          receiptButtonText: 'Go to Account',
          receiptThankYouNote: 'Thank you for signing up to RealSaaS!',
        },
      }
    )
    console.log('checkout', checkout)

    return new Response(JSON.stringify({ checkout }))
  } catch (error) {
    console.error('error', error)
    return new Response(JSON.stringify({ error }))
  }
}
