'use client';
import { useSession } from '../../lib/auth-client';
import { RiseLoader } from 'react-spinners';
import Link from 'next/link';

const statCards = (user) => [
  { label: 'Applications Sent', value: 0, sub: 'Total applied jobs' },
  { label: 'Saved Jobs', value: 0, sub: 'Bookmarked listings' },
  { label: 'Profile Views', value: 0, sub: 'Recruiters viewed you' },
  { label: 'Interviews', value: 0, sub: 'Scheduled this month' },
];

export default function SeekerDashboard() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <RiseLoader color='#ef5ff9' />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className='flex flex-col gap-8'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-slate-500'>Job Seeker Dashboard</p>
          <h1 className='text-2xl font-bold text-white'>
            Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
        </div>
        <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-400'>
          {user?.plan || 'free'} plan
        </span>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {statCards(user).map((card) => (
          <div
            key={card.label}
            className='rounded-2xl border border-white/10 bg-white/[0.03] p-5'
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
            href='/jobs'
            className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]'
          >
            <span className='text-xl'>🔍</span>
            <div>
              <p className='text-sm font-medium text-white'>Browse Jobs</p>
              <p className='text-xs text-slate-500'>
                Find your next opportunity
              </p>
            </div>
          </Link>
          <Link
            href='/dashboard/seeker/applications'
            className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]'
          >
            <span className='text-xl'>📋</span>
            <div>
              <p className='text-sm font-medium text-white'>My Applications</p>
              <p className='text-xs text-slate-500'>Track your applications</p>
            </div>
          </Link>
          <Link
            href='/dashboard/seeker/saved'
            className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]'
          >
            <span className='text-xl'>🔖</span>
            <div>
              <p className='text-sm font-medium text-white'>Saved Jobs</p>
              <p className='text-xs text-slate-500'>Jobs you bookmarked</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Plan Upgrade Banner (free plan only) */}
      {user?.plan === 'free' && (
        <div className='rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-sm font-semibold text-emerald-400'>
                Upgrade to Pro
              </p>
              <p className='text-xs text-slate-400'>
                Unlock unlimited applications, priority badge & salary insights
              </p>
            </div>
            <Link
              href='/pricing'
              className='shrink-0 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 transition hover:bg-emerald-300'
            >
              Upgrade →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
