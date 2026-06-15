'use client';
import Link from 'next/link';
import { useState } from 'react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Get started and explore opportunities.',
    badge: null,
    cta: 'Get Started',
    ctaHref: '/signup',
    features: [
      'Browse all job listings',
      'Save up to 10 jobs',
      'Up to 3 applications',
      'Basic profile',
      'Email notifications',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: 'month',
    description: 'For serious job seekers ready to move fast.',
    badge: 'Most Popular',
    cta: 'Upgrade to Pro',
    ctaHref: '/checkout?plan=pro',
    features: [
      'Everything in Free',
      'Unlimited applications',
      'Unlimited saved jobs',
      'Priority application badge',
      'Application tracking',
      'Salary insights',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    period: 'month',
    description: 'For companies hiring at scale.',
    badge: null,
    cta: 'Contact Sales',
    ctaHref: '/contact',
    features: [
      'Everything in Pro',
      'Unlimited job postings',
      'Applicant Tracking System',
      'Team collaboration',
      'Analytics dashboard',
      'Dedicated support',
      'Custom branding',
    ],
  },
];

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from account settings anytime. Your plan stays active until billing period ends.',
  },
  {
    q: 'Are refunds available?',
    a: 'We offer a 7-day money-back guarantee on all paid plans. Contact support within 7 days of purchase.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'All major cards (Visa, Mastercard, Amex) via Stripe. More options coming soon.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. Upgrades take effect immediately. Downgrades apply at next billing cycle.',
  },
  {
    q: 'What happens to my data if I downgrade?',
    a: "All your existing applications and data stay safe. You just won't be able to submit new ones beyond the Free limit.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className='min-h-screen bg-black text-white'>
      {/* Hero */}
      <section className='px-4 pb-4 pt-20 text-center'>
        <div className='mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-zinc-400'>
          Pricing
        </div>
        <h1 className='mx-auto mb-4 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl'>
          Simple, transparent pricing
        </h1>
        <p className='mx-auto max-w-lg text-base text-zinc-400'>
          Start free. Upgrade when you&apos;re ready. No hidden fees.
        </p>
      </section>

      {/* Plan Cards */}
      <section className='mx-auto max-w-5xl px-4 py-16'>
        <div className='grid gap-5 md:grid-cols-3'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-[28px] border p-6 ${
                plan.badge
                  ? 'border-white/20 bg-zinc-900'
                  : 'border-white/10 bg-zinc-950'
              }`}
            >
              {plan.badge && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                  <span className='rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-black'>
                    {plan.badge}
                  </span>
                </div>
              )}
              <p className='mb-1 text-sm font-medium text-zinc-400'>
                {plan.name}
              </p>
              <div className='flex items-end gap-1 mb-1'>
                <span className='text-4xl font-bold'>
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className='mb-1 text-sm text-zinc-500'>
                    / {plan.period}
                  </span>
                )}
              </div>
              <p className='mb-5 text-sm text-zinc-400'>{plan.description}</p>
              <ul className='mb-8 flex-1 space-y-3'>
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className='flex items-start gap-2.5 text-sm text-zinc-300'
                  >
                    <svg
                      className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaHref}
                className={`block w-full rounded-2xl py-3 text-center text-sm font-semibold transition ${
                  plan.badge
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'border border-white/10 text-white hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className='mx-auto max-w-2xl px-4 pb-24'>
        <h2 className='mb-8 text-center text-2xl font-semibold'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-3'>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className='overflow-hidden rounded-2xl border border-white/10 bg-zinc-950'
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className='flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium'
              >
                {faq.q}
                <svg
                  className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
              {openFaq === i && (
                <div className='border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-zinc-400'>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
