'use client';
import { useSession } from '../../lib/auth-client';
import { RiseLoader } from 'react-spinners';
import Link from 'next/link';
import { FiLock } from 'react-icons/fi';

export default function RecruiterDashboard() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <RiseLoader color='#ef5ff9' />
      </div>
    );
  }

  const user = session?.user;
  const isEnterprise = user?.plan === 'enterprise';

  if (session?.user?.role !== 'recruiter') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-black via-gray-950 to-black px-6'>
        <div className='w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl'>
          <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20'>
            <FiLock className='h-6 w-6 text-violet-400' />
          </div>
          <h1 className='text-2xl font-bold text-white'>Access Restricted</h1>
          <p className='mt-3 text-gray-400'>
            You need to sign in as a recruiter to view the recruiter dashboard.
          </p>
          <Link
            href='/signin'
            className='mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500'
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-slate-500'>Recruiter Dashboard</p>
          <h1 className='text-2xl font-bold text-white'>
            Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
        </div>
        <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-400'>
          {user?.plan || 'starter'} plan
        </span>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {[
          { label: 'Active Job Posts', value: 0, sub: 'Currently live' },
          { label: 'Total Applicants', value: 0, sub: 'Across all posts' },
          { label: 'Shortlisted', value: 0, sub: 'Ready for interview' },
          { label: 'Hired', value: 0, sub: 'This month' },
        ].map((card) => (
          <div
            key={card.label}
            className='rounded-2xl border border-white/10 bg-white/3 p-5'
          >
            <p className='text-3xl font-bold text-white'>{card.value}</p>
            <p className='mt-1 text-sm font-medium text-slate-300'>
              {card.label}
            </p>
            <p className='text-xs text-slate-600'>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className='mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500'>
          Quick Actions
        </h2>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          <Link
            href='/dashboard/recruiter/post-job'
            className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 transition hover:bg-white/6'
          >
            <span className='text-xl'>📝</span>
            <div>
              <p className='text-sm font-medium text-white'>Post a Job</p>
              <p className='text-xs text-slate-500'>
                {isEnterprise ? 'Unlimited posts' : '1 free post available'}
              </p>
            </div>
          </Link>
          <Link
            href='/dashboard/recruiter/applicants'
            className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 transition hover:bg-white/6'
          >
            <span className='text-xl'>👥</span>
            <div>
              <p className='text-sm font-medium text-white'>View Applicants</p>
              <p className='text-xs text-slate-500'>Review all candidates</p>
            </div>
          </Link>
          <Link
            href='/dashboard/recruiter/jobs'
            className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 transition hover:bg-white/6'
          >
            <span className='text-xl'>💼</span>
            <div>
              <p className='text-sm font-medium text-white'>Manage Jobs</p>
              <p className='text-xs text-slate-500'>Edit or close listings</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Enterprise Upgrade Banner */}
      {!isEnterprise && (
        <div className='rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-sm font-semibold text-violet-400'>
                Upgrade to Enterprise
              </p>
              <p className='text-xs text-slate-400'>
                Unlimited posts, ATS, team collaboration & analytics
              </p>
            </div>
            <Link
              href='/pricing'
              className='shrink-0 rounded-xl bg-violet-400 px-4 py-2 text-xs font-semibold text-violet-950 transition hover:bg-violet-300'
            >
              Upgrade →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
