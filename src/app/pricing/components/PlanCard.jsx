'use client';
import Link from 'next/link';
import useInView from '../hooks/useInView';

export default function PlanCard({ plan, index, accent }) {
  const [ref, inView] = useInView();
  const isHighlighted = !!plan.badge;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
      className={`relative flex flex-col rounded-[28px] border p-6 md:p-7 ${
        isHighlighted
          ? 'border-white/20 bg-zinc-900 shadow-[0_0_48px_rgba(255,255,255,0.03)]'
          : 'border-white/10 bg-zinc-950'
      }`}
    >
      {plan.badge && (
        <div className='absolute -top-3.5 left-6'>
          <span
            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
              accent === 'emerald'
                ? 'bg-emerald-400 text-emerald-950'
                : 'bg-violet-400 text-violet-950'
            }`}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div className='mb-5'>
        <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500'>
          {plan.name}
        </p>
        <div className='flex items-end gap-1.5'>
          <span className='text-4xl font-bold tracking-tight text-white'>
            {plan.price === 0 ? 'Free' : `$${plan.price}`}
          </span>
          {plan.price > 0 && (
            <span className='mb-1 text-sm text-zinc-500'>/ {plan.period}</span>
          )}
        </div>
        <p className='mt-2 text-sm text-zinc-400'>{plan.description}</p>
      </div>

      <ul className='mb-8 flex-1 space-y-3'>
        {plan.features.map((f) => (
          <li
            key={f}
            className='flex items-start gap-2.5 text-sm text-zinc-300'
          >
            <svg
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                accent === 'emerald' ? 'text-emerald-400' : 'text-violet-400'
              }`}
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
      <form action='/api/checkout_sessions' method='POST'>
        <section>
          <button
            type='submit'
            role='link'
            className={`block w-full rounded-2xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
              isHighlighted
                ? accent === 'emerald'
                  ? 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300'
                  : 'bg-violet-400 text-violet-950 hover:bg-violet-300'
                : 'border border-white/10 text-white hover:bg-white/5'
            }`}
          >
            Checkout
          </button>
        </section>
      </form>

      {/* <Link
        href={plan.ctaHref}
        className={`block w-full rounded-2xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
          isHighlighted
            ? accent === 'emerald'
              ? 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300'
              : 'bg-violet-400 text-violet-950 hover:bg-violet-300'
            : 'border border-white/10 text-white hover:bg-white/5'
        }`}
      >
        {plan.cta}
      </Link> */}
    </div>
  );
}
