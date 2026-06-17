// app/pricing/page.jsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import FAQSection from './components/FAQSection';

function useCheckout() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const handleCheckout = async (planId) => {
    if (!planId) return;
    setLoadingPlan(planId);
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Stripe error:', data.error);
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setLoadingPlan(null);
    }
  };
  return { handleCheckout, loadingPlan };
}

const seekerPlans = [
  {
    id: 'free',
    planId: null,
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
    planId: 'seeker-pro',
    name: 'Pro',
    price: 29,
    period: 'mo',
    description: 'Apply faster, track smarter, land sooner.',
    badge: 'Most Popular',
    cta: 'Upgrade to Pro',
    ctaHref: null,
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
    planId: 'seeker-enterprise',
    name: 'Enterprise',
    price: 79,
    period: 'mo',
    description: 'Career coaching, headhunting & white-glove support.',
    badge: null,
    cta: 'Upgrade to Enterprise',
    ctaHref: null,
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
    id: 'starter',
    planId: null,
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
    planId: 'recruiter-pro',
    name: 'Pro',
    price: 49,
    period: 'mo',
    description: 'Streamline hiring for growing teams.',
    badge: 'Most Popular',
    cta: 'Start Hiring',
    ctaHref: null,
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
    planId: 'recruiter-enterprise',
    name: 'Enterprise',
    price: 99,
    period: 'mo',
    description: 'Full-scale hiring infrastructure for large teams.',
    badge: null,
    cta: 'Upgrade to Enterprise',
    ctaHref: null,
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
  ['Applicants/post', '20', 'Unlimited', 'Unlimited'],
  ['Team seats', '1', '3', 'Unlimited'],
  ['ATS pipeline', '—', 'Basic', 'Full'],
  ['Analytics', '—', 'Overview', 'Advanced'],
  ['Custom branding', '—', '—', '✓'],
  ['Dedicated support', '—', '—', '✓'],
];



function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, inView];
}

function Spinner() {
  return (
    <svg className='h-4 w-4 animate-spin' fill='none' viewBox='0 0 24 24'>
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v8z'
      />
    </svg>
  );
}

function PlanCard(props) {
  var plan = props.plan;
  var index = props.index;
  var accent = props.accent;
  var onCheckout = props.onCheckout;
  var isLoading = props.isLoading;

  var inViewResult = useInView();
  var ref = inViewResult[0];
  var inView = inViewResult[1];

  var highlighted = Boolean(plan.badge);
  var accentCheck =
    accent === 'emerald' ? 'text-emerald-400' : 'text-violet-400';
  var accentBadge =
    accent === 'emerald'
      ? 'bg-emerald-400 text-emerald-950'
      : 'bg-violet-400 text-violet-950';
  var accentCta =
    accent === 'emerald'
      ? 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300'
      : 'bg-violet-400 text-violet-950 hover:bg-violet-300';
  var ghostCta = 'border border-white/10 text-white hover:bg-white/5';

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition:
          'opacity 0.5s ease ' +
          index * 0.1 +
          's, transform 0.5s ease ' +
          index * 0.1 +
          's',
      }}
      className={
        'relative flex flex-col rounded-[28px] border p-6 md:p-7 ' +
        (highlighted
          ? 'border-white/20 bg-zinc-900 shadow-[0_0_60px_rgba(255,255,255,0.03)]'
          : 'border-white/10 bg-zinc-950')
      }
    >
      {plan.badge && (
        <div className='absolute -top-3.5 left-6'>
          <span
            className={
              'rounded-full px-3 py-0.5 text-xs font-semibold ' + accentBadge
            }
          >
            {plan.badge}
          </span>
        </div>
      )}

      <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500'>
        {plan.name}
      </p>

      <div className='flex items-end gap-1.5 mb-2'>
        <span className='text-4xl font-bold tracking-tight text-white'>
          {plan.price === 0 ? 'Free' : '$' + plan.price}
        </span>
        {plan.price > 0 && (
          <span className='mb-1 text-sm text-zinc-500'>/ {plan.period}</span>
        )}
      </div>

      <p className='mb-6 text-sm leading-relaxed text-zinc-400'>
        {plan.description}
      </p>

      <ul className='mb-8 flex-1 space-y-3'>
        {plan.features.map(function (f) {
          return (
            <li
              key={f}
              className='flex items-start gap-2.5 text-sm text-zinc-300'
            >
              <svg
                className={'mt-0.5 h-4 w-4 shrink-0 ' + accentCheck}
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
          );
        })}
      </ul>

      {plan.planId ? (
        <button
          onClick={function () {
            onCheckout(plan.planId);
          }}
          disabled={isLoading}
          className={
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ' +
            (highlighted ? accentCta : ghostCta)
          }
        >
          {isLoading ? (
            <>
              <Spinner /> Redirecting...
            </>
          ) : (
            plan.cta
          )}
        </button>
      ) : (
        <Link
          href={plan.ctaHref || '/signup'}
          className={
            'block w-full rounded-2xl py-3 text-center text-sm font-semibold transition-all duration-200 ' +
            (highlighted ? accentCta : ghostCta)
          }
        >
          {plan.cta}
        </Link>
      )}
    </div>
  );
}

function ComparisonTable(props) {
  var rows = props.rows;
  var planNames = props.planNames;
  var accent = props.accent;

  var inViewResult = useInView();
  var ref = inViewResult[0];
  var inView = inViewResult[1];

  var accentMark =
    accent === 'emerald' ? 'text-emerald-400' : 'text-violet-400';

  const renderCell = (val, colIdx) => {
    if (val === '✓')
      return (
        <span className={colIdx === 0 ? 'text-emerald-400' : accentMark}>
          ✓
        </span>
      );
    if (val === '—') return <span className='text-zinc-700'>—</span>;
    return <span className='text-zinc-300'>{val}</span>;
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      className='overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950'
    >
      <div className='grid grid-cols-4 border-b border-white/10 px-6 py-3.5'>
        <span className='text-xs font-semibold uppercase tracking-widest text-zinc-600'>
          Feature
        </span>
        {planNames.map((n) => (
          <span
            key={n}
            className='text-center text-xs font-semibold uppercase tracking-widest text-zinc-500'
          >
            {n}
          </span>
        ))}
      </div>
      {rows.map(([feature, ...vals], i) => (
        <div
          key={feature}
          className={`grid grid-cols-4 px-6 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white/[0.015]' : ''}`}
        >
          <span className='text-zinc-400'>{feature}</span>
          {vals.map((v, ci) => (
            <span key={ci} className='text-center'>
              {renderCell(v, ci)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ✅ এখানে Main Pricing Page Component যোগ করুন
export default function PricingPage() {
  const { handleCheckout, loadingPlan } = useCheckout();
  const [activeTab, setActiveTab] = useState('seeker');

  return (
    <div className='min-h-screen bg-zinc-950 text-white'>
      {/* Hero Section */}
      <div className='relative overflow-hidden pt-16 pb-12 border-b border-white/5'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl' />
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl' />
        </div>

        <div className='container mx-auto px-4 text-center relative z-10'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
            Simple, Transparent
            <span className='block md:inline bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent'>
              {' '}
              Pricing
            </span>
          </h1>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
            Choose the plan that fits your needs. Upgrade anytime to unlock more
            opportunities.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12'>
        {/* Tabs */}
        <div className='flex justify-center gap-4 mb-12'>
          <button
            onClick={() => setActiveTab('seeker')}
            className={`px-6 py-2.5 rounded-full transition-all text-sm font-medium ${
              activeTab === 'seeker'
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            🎯 For Job Seekers
          </button>
          <button
            onClick={() => setActiveTab('recruiter')}
            className={`px-6 py-2.5 rounded-full transition-all text-sm font-medium ${
              activeTab === 'recruiter'
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            🏢 For Recruiters
          </button>
        </div>

        {/* Plan Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {(activeTab === 'seeker' ? seekerPlans : recruiterPlans).map(
            (plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={index}
                accent={
                  plan.id === 'pro' || plan.id === 'pro' ? 'violet' : 'emerald'
                }
                onCheckout={handleCheckout}
                isLoading={loadingPlan === plan.planId}
              />
            )
          )}
        </div>

        {/* Comparison Table */}
        <div className='mt-20 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-center text-white mb-8'>
            📊 Compare Plans
          </h2>
          <ComparisonTable
            rows={
              activeTab === 'seeker' ? seekerComparison : recruiterComparison
            }
            planNames={
              activeTab === 'seeker'
                ? ['Free', 'Pro', 'Enterprise']
                : ['Starter', 'Pro', 'Enterprise']
            }
            accent='violet'
          />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
}
