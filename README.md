# RealSaaS - A Next.js + Supabase + Lemon Squeezy SaaS Starter Template

![Demo](https://github.com/btahir/realsaas/blob/main/app/opengraph-image.png)

RealSaaS is a starter template for building SaaS products, based on the [Next.js Subscription Payments](https://github.com/vercel/nextjs-subscription-payments) starter. This template features improved UX, refined authentication flow, and Lemon Squeezy integration for payments.

⚠️ Warning: This repository is provided for learning purposes only and will not be actively maintained. While it represents a working implementation with improved UX and Lemon Squeezy integration, it's based on an older Next.js template. For production projects, please consider using the [latest official Next.js SaaS starter](https://github.com/nextjs/saas-starter) instead. Feel free to explore this codebase to learn from its implementation, but be aware that dependencies may become outdated and security updates will not be provided.

## Features

- Built on a proven Next.js subscription template
- Enhanced user experience and authentication flow
- Lemon Squeezy integration as an alternative to Stripe
- Clean, well-structured codebase
- Shadcn components
- TypeScript support
- Modern UI components

## Success Story

This template was successfully used to build [SnoopHawk](http://snoophawk.com/), demonstrating its capability in real-world applications. During the development of SnoopHawk, several improvements were made to the original template, including UX enhancements and the integration of Lemon Squeezy as a payment processor.

## Sob Story

It wasn't all smooth sailing. I did run into performance issues, such as slow navigation. I suspect this is because of the repeated middleware requests and lack of caching. I tried caching db auth requests but to limited success. Maybe someone smarter than me can optimize Supabase Auth to be faster.

## Getting Started

### Prerequisites

This code is using the setup I had for [SnoopHawk](http://snoophawk.com/) under the hood meaning the products you see as well as Auth all are configured for SnoopHawk.

You can follow the more detailed guide from the original repository [here](https://github.com/vercel/nextjs-subscription-payments). Supabase can be daunting but the schema.sql commands create all the necessary tables. I personally like to run the commands directly in Supabase to create the tables once I am good with the schema.

You will also need to setup Lemon Squeezy and SendGrid (optionally if you want to receive emails via the contact form).

For auth, you have to setup wildcard redirect urls in Supabase to be configured for the domains you want to use.

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Lemon Squeezy
LEMONSQUEEZY_API_KEY=your-lemonsqueezy-api-key
LEMONSQUEEZY_STORE_ID=your-store-id
LEMONSQUEEZY_PRODUCT_ID=your-product-id
LEMONSQUEEZY_WEBHOOK_SECRET=your-webhook-secret

# Email Configuration
SENDGRID_API_KEY=your-sendgrid-api-key
CONTACT_EMAIL=your-contact-email
```

You'll need to:

1. Create a Supabase project and get your credentials from the project settings
2. Set up a Lemon Squeezy account and get your API credentials
3. Create a SendGrid account for email functionality

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Purpose

The primary goal of open-sourcing this code is to provide developers with:

- A playground to explore and learn from
- Real-world example of a SaaS implementation
- Reference for integrating Lemon Squeezy with Next.js
- Insights into refined authentication flows

## Important Notes

While this template offers valuable learning opportunities, please note:

- It's based on an older repository
- It won't be actively maintained
- Newer alternatives are available (see the [official Next.js SaaS starter](https://github.com/nextjs/saas-starter))
- Evaluate carefully whether it suits your needs before using in production

## Contributing

While this project isn't actively maintained, you're welcome to fork it and adapt it for your own needs. If you've built something interesting with this template, feel free to share it with the community!
