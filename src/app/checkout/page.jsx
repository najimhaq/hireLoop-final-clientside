'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    features: [
      'Unlimited applications',
      'Priority badge',
      'Application tracking',
      'Salary insights',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    features: [
      'Everything in Pro',
      'Unlimited job posts',
      'ATS system',
      'Team tools',
      'Dedicated support',
    ],
  },
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(searchParams.get('plan') || 'pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedPlan = plans.find((p) => p.id === selected);

  const handleCheckout = async () => {
    setIsProcessing(true);

    setTimeout(() => setIsProcessing(false), 1500);
  };

  return (
    <main className='min-h-screen bg-black px-4 py-16 text-white md:px-6'>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-10 text-center'>
          <Link
            href='/pricing'
            className='mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition'
          >
            <svg
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to Pricing
          </Link>
          <h1 className='text-3xl font-bold'>Choose your plan</h1>
          <p className='mt-2 text-sm text-zinc-400'>
            Upgrade anytime. Cancel anytime.
          </p>
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          {/* Plan picker */}
          <div className='space-y-4'>
            <p className='text-xs font-medium uppercase tracking-widest text-zinc-500'>
              Select Plan
            </p>
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`w-full rounded-[20px] border p-5 text-left transition ${
                  selected === plan.id
                    ? 'border-white/30 bg-zinc-900'
                    : 'border-white/10 bg-zinc-950 hover:border-white/20'
                }`}
              >
                <div className='mb-1 flex items-center justify-between'>
                  <span className='font-semibold'>{plan.name}</span>
                  <div
                    className={`h-4 w-4 rounded-full border-2 transition ${selected === plan.id ? 'border-white bg-white' : 'border-zinc-600'}`}
                  />
                </div>
                <span className='text-2xl font-bold'>${plan.price}</span>
                <span className='text-sm text-zinc-400'> / mo</span>
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className='rounded-[24px] border border-white/10 bg-zinc-950 p-6'>
            <p className='mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500'>
              Order Summary
            </p>
            <div className='mb-5 space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-zinc-400'>Plan</span>
                <span className='font-medium'>{selectedPlan?.name}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-zinc-400'>Billing</span>
                <span>Monthly</span>
              </div>
              <div className='my-3 border-t border-white/10' />
              <div className='flex justify-between'>
                <span className='font-semibold'>Total</span>
                <span className='text-lg font-bold'>
                  ${selectedPlan?.price}/mo
                </span>
              </div>
            </div>
            <ul className='mb-6 space-y-2'>
              {selectedPlan?.features.map((f) => (
                <li
                  key={f}
                  className='flex items-center gap-2 text-sm text-zinc-400'
                >
                  <svg
                    className='h-4 w-4 shrink-0 text-emerald-400'
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
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className='w-full rounded-2xl bg-white py-3 text-sm font-semibold text-black hover:bg-zinc-200 disabled:opacity-60 transition'
            >
              {isProcessing ? 'Redirecting...' : 'Continue to Payment →'}
            </button>
            <p className='mt-3 text-center text-xs text-zinc-600'>
              Secured by Stripe · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
