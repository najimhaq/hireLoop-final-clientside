import Link from 'next/link';
import { FiBriefcase, FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function JobNotFound() {
  return (
    <section className='flex min-h-screen items-center justify-center bg-black px-4 py-20'>
      <div className='w-full max-w-lg text-center'>
        {/* Icon */}
        <div className='mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-zinc-950/80'>
          <FiBriefcase className='h-9 w-9 text-zinc-600' />
        </div>

        {/* Text */}
        <h1 className='text-2xl font-semibold tracking-tight text-white'>
          Job not found
        </h1>
        <p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500'>
          This listing may have been removed, filled, or never existed. Check
          the URL or browse other open positions.
        </p>

        {/* Divider */}
        <div className='mx-auto my-8 h-px w-16 bg-white/8' />

        {/* Actions */}
        <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Link
            href='/jobs'
            className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white'
          >
            <FiArrowLeft className='h-4 w-4' />
            Back to Jobs
          </Link>
          <Link
            href='/jobs'
            className='inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200'
          >
            <FiSearch className='h-4 w-4' />
            Browse Openings
          </Link>
        </div>
      </div>
    </section>
  );
}
