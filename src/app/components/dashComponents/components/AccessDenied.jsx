'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';

export default function AccessDenied({ role }) {
  return (
    <section className='flex min-h-screen items-center justify-center bg-black px-4 py-20'>
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/10 blur-[120px]' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className='relative z-10 w-full max-w-md'
      >
        <div className='rounded-[32px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl'>
          <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10'>
            <FiLock className='h-7 w-7 text-amber-400' />
          </div>

          <h1 className='text-2xl font-semibold tracking-tight text-white'>
            Access Restricted
          </h1>

          <p className='mt-3 text-sm leading-6 text-zinc-400'>
            This page is only available to{' '}
            <span className='font-medium text-white'>Job Seekers</span>. Your
            current account is registered as{' '}
            <span className='font-medium capitalize text-amber-400'>
              {role || 'another role'}
            </span>
            .
          </p>

          <div className='my-7 h-px w-full bg-white/8' />

          <div className='mb-7 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left'>
            <FiUser className='h-4 w-4 shrink-0 text-zinc-500' />
            <p className='text-sm text-zinc-400'>
              To apply for jobs, sign in with a Seeker account or{' '}
              <Link
                href='/signup'
                className='font-medium text-amber-400 underline-offset-2 transition hover:text-amber-300 hover:underline'
              >
                create one here
              </Link>
              .
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <Link
              href='/jobs'
              className='flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white'
            >
              <FiArrowLeft className='h-4 w-4' />
              Back to Jobs
            </Link>
            <Link
              href='/signin'
              className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 active:bg-amber-600'
            >
              Switch Account
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
