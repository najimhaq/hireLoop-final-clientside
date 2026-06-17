'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import PlanCard from './PlanCard';
import useInView from '../hooks/useInView';
import FaqItem from './FaqItem';
import ComparisonTable from './ComparisonTable';

// ─── Data ───────────────────────────────────────────────────────────────────
const seekerPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Explore opportunities at your own pace.',
    badge: null,
    cta: 'Get Started',
    ctaHref: '/signup',
    features: [
      'Browse all job listings',
      'Save up to 10 jobs',
      'Up to 3 job applications',
      'Basic profile page',
      'Email notifications',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: 'mo',
    description: 'Apply faster, track smarter, land sooner.',
    badge: 'Most Popular',
    cta: 'Upgrade to Pro',
    ctaHref: '/checkout?plan=seeker-pro',
    features: [
      'Everything in Free',
      'Unlimited job applications',
      'Unlimited saved jobs',
      'Priority application badge',
      'Application tracking dashboard',
      'Salary insights & analytics',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 79,
    period: 'mo',
    description: 'Career coaching, headhunting & white-glove support.',
    badge: null,
    cta: 'Contact Us',
    ctaHref: '/contact?plan=seeker-enterprise',
    features: [
      'Everything in Pro',
      'Dedicated career coach',
      'Resume & profile review',
      'Direct recruiter introductions',
      'Interview preparation sessions',
      'Priority customer support',
    ],
  },
];

const recruiterPlans = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Post your first role and find great candidates.',
    badge: null,
    cta: 'Post a Job Free',
    ctaHref: '/signup?role=recruiter',
    features: [
      '1 active job post',
      'Up to 20 applicants per post',
      'Basic applicant view',
      'Email alerts on new applications',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    period: 'mo',
    description: 'Streamline hiring for growing teams.',
    badge: 'Most Popular',
    cta: 'Start Hiring',
    ctaHref: '/checkout?plan=recruiter-pro',
    features: [
      'Everything in Starter',
      'Up to 10 active job posts',
      'Unlimited applicants',
      'Basic ATS & pipeline view',
      'Team access (up to 3 seats)',
      'Analytics overview',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    period: 'mo',
    description: 'Full-scale hiring infrastructure for large teams.',
    badge: null,
    cta: 'Contact Sales',
    ctaHref: '/contact?plan=recruiter-enterprise',
    features: [
      'Everything in Pro',
      'Unlimited job postings',
      'Full Applicant Tracking System',
      'Unlimited team seats',
      'Advanced analytics dashboard',
      'Custom branding on listings',
      'Dedicated account manager',
    ],
  },
];

const seekerComparison = [
  ['Browse jobs', '✓', '✓', '✓'],
  ['Save jobs', '10 max', 'Unlimited', 'Unlimited'],
  ['Job applications', '3 total', 'Unlimited', 'Unlimited'],
  ['Application tracking', '—', '✓', '✓'],
  ['Priority badge', '—', '✓', '✓'],
  ['Salary insights', '—', '✓', '✓'],
  ['Career coaching', '—', '—', '✓'],
  ['Resume review', '—', '—', '✓'],
  ['Recruiter introductions', '—', '—', '✓'],
];

const recruiterComparison = [
  ['Active job posts', '1', '10', 'Unlimited'],
  ['Applicants per post', '20', 'Unlimited', 'Unlimited'],
  ['Team seats', '1', '3', 'Unlimited'],
  ['ATS pipeline', '—', 'Basic', 'Full'],
  ['Analytics', '—', 'Overview', 'Advanced'],
  ['Custom branding', '—', '—', '✓'],
  ['Dedicated support', '—', '—', '✓'],
];

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from account settings anytime. Your plan stays active until the end of the billing period — no charges after that.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'We offer a 7-day money-back guarantee on all paid plans. Contact support within 7 days of your first payment.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'All major credit/debit cards (Visa, Mastercard, Amex) via Stripe. Bank transfers available for Enterprise plans on request.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. Upgrades take effect immediately. Downgrades apply at the start of your next billing cycle.',
  },
  {
    q: 'What happens to my data if I downgrade?',
    a: 'All your data stays safe. You simply lose access to premium features — no applications or posts are deleted.',
  },
  {
    q: 'Do Job Seeker and Recruiter plans overlap?',
    a: 'No. They are separate tracks for separate account types. Recruiter accounts post jobs; seeker accounts apply to them.',
  },
];

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PricingDetailsPage() {
  const [activeTab, setActiveTab] = useState('seeker');
  const [openFaq, setOpenFaq] = useState(null);
  const [heroRef, heroInView] = useInView(0.1);

  const isSeeker = activeTab === 'seeker';
  const plans = isSeeker ? seekerPlans : recruiterPlans;
  const comparison = isSeeker ? seekerComparison : recruiterComparison;
  const planNames = isSeeker
    ? ['Free', 'Pro', 'Enterprise']
    : ['Starter', 'Pro', 'Enterprise'];
  const accent = isSeeker ? 'emerald' : 'violet';

  return (
    <>
      {/* Hero */}
      <section className='px-4 pb-8 pt-24 text-center md:px-6'>
        <div
          ref={heroRef}
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-zinc-400'>
            Pricing
          </div>
          <h1 className='mx-auto mb-4 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl'>
            Plans for every stage
            <br className='hidden sm:block' /> of your journey
          </h1>
          <p className='mx-auto max-w-md text-base text-zinc-400'>
            Start free. Upgrade when you are ready. No hidden fees, no
            surprises.
          </p>
        </div>
      </section>

      {/* Tab Toggle */}
      <section className='px-4 pb-12 pt-2 text-center'>
        <div className='inline-flex rounded-2xl border border-white/10 bg-zinc-950 p-1'>
          {[
            { id: 'seeker', label: 'Job Seekers' },
            { id: 'recruiter', label: 'Recruiters' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p
          key={activeTab}
          style={{ animation: 'fadeIn 0.3s ease' }}
          className='mt-3 text-xs text-zinc-600'
        >
          {isSeeker
            ? 'Apply to jobs · track progress · land faster'
            : 'Post roles · review applicants · hire at scale'}
        </p>
      </section>

      {/* Plan Cards */}
      <section className='mx-auto max-w-5xl px-4 pb-16 md:px-6'>
        <div
          key={activeTab}
          style={{ animation: 'fadeIn 0.35s ease' }}
          className='grid gap-5 sm:grid-cols-3'
        >
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} accent={accent} />
          ))}
        </div>
        <p className='mt-8 text-center text-xs text-zinc-600'>
          Need a custom plan?{' '}
          <Link
            href='/contact'
            className='text-zinc-400 underline underline-offset-4 hover:text-white transition'
          >
            Talk to us →
          </Link>
        </p>
      </section>

      {/* Comparison Table */}
      <section className='mx-auto max-w-4xl px-4 pb-20 md:px-6'>
        <h2 className='mb-6 text-center text-lg font-semibold text-zinc-300'>
          Full comparison
        </h2>
        <div key={activeTab} style={{ animation: 'fadeIn 0.35s ease' }}>
          <ComparisonTable
            rows={comparison}
            planNames={planNames}
            accent={accent}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className='mx-auto max-w-2xl px-4 pb-28 md:px-6'>
        <h2 className='mb-8 text-center text-xl font-semibold'>
          Common questions
        </h2>
        <div className='space-y-2.5'>
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
