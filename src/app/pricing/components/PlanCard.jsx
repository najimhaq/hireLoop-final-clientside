'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Spinner from './spnner';

export default function PlanCard(props) {
  var plan = props.plan;
  var index = props.index;
  var accent = props.accent;
  var onCheckout = props.onCheckout;
  var isLoading = props.isLoading;

  var [visible, setVisible] = useState(false);

  useEffect(
    function () {
      var delay = 80 + index * 100;
      var timer = setTimeout(function () {
        setVisible(true);
      }, delay);
      return function () {
        clearTimeout(timer);
      };
    },
    [index]
  );

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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
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
