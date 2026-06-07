'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiGlobe, FiMapPin, FiUsers, FiArrowUpRight } from 'react-icons/fi';

const formatEmployees = (count) => {
  if (!count && count !== 0) return 'Not specified';
  return typeof count === 'number' ? count.toLocaleString() : count;
};

const getInitials = (name = '') => {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('') || 'CO'
  );
};

export default function CompanyCard({ company }) {
  const {
    _id,
    companyName,
    description,
    industry,
    location,
    website,
    employeeCount,
    logo,
  } = company || {};

  const companyHref = `/companies/${_id?.$oid || _id}`;
  const cleanWebsite = website?.startsWith('http')
    ? website
    : `https://${website || ''}`;

  return (
    <article className='group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-zinc-950 md:p-6'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_32%)] opacity-0 transition duration-300 group-hover:opacity-100' />

      <div className='relative flex h-full flex-col'>
        <div className='mb-5 flex items-start justify-between gap-4'>
          <div className='flex min-w-0 items-center gap-4'>
            <div className='flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900'>
              {logo ? (
                <Image
                  src={logo}
                  alt={companyName || 'Company logo'}
                  width={64}
                  height={64}
                  className='h-full w-full object-cover'
                  unoptimized
                />
              ) : (
                <span className='text-base font-semibold tracking-wide text-white'>
                  {getInitials(companyName)}
                </span>
              )}
            </div>

            <div className='min-w-0'>
              <h3 className='truncate text-xl font-semibold tracking-tight text-white'>
                {companyName || 'Unnamed Company'}
              </h3>
              <p className='mt-1 text-sm text-zinc-400'>
                {industry || 'Industry not specified'}
              </p>
            </div>
          </div>

          <span className='rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300'>
            Verified
          </span>
        </div>

        <p className='mb-6 line-clamp-3 text-sm leading-6 text-zinc-400'>
          {description || 'No company description available yet.'}
        </p>

        <div className='grid gap-3 sm:grid-cols-2'>
          <div className='flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3'>
            <FiMapPin className='h-4 w-4 text-zinc-500' />
            <div>
              <p className='text-[11px] uppercase tracking-[0.14em] text-zinc-500'>
                Location
              </p>
              <p className='text-sm font-medium text-zinc-200'>
                {location || 'Not specified'}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3'>
            <FiUsers className='h-4 w-4 text-zinc-500' />
            <div>
              <p className='text-[11px] uppercase tracking-[0.14em] text-zinc-500'>
                Team Size
              </p>
              <p className='text-sm font-medium text-zinc-200'>
                {formatEmployees(employeeCount)}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-5 flex items-center justify-between gap-3 border-t border-white/8 pt-5'>
          <a
            href={cleanWebsite}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-w-0 items-center gap-2 text-sm text-zinc-400 transition hover:text-white'
          >
            <FiGlobe className='h-4 w-4 shrink-0' />
            <span className='truncate'>{website || 'Website unavailable'}</span>
          </a>

          <Link
            href={companyHref}
            className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200'
          >
            View Profile
            <FiArrowUpRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </article>
  );
}
