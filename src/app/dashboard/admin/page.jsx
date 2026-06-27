// src/app/dashboard/admin/page.jsx (বা AdminDashboard.jsx)
'use client';

import { useSession } from '../../lib/auth-client';
import { RiseLoader } from 'react-spinners';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
} from 'react-icons/fi';
import UnauthorizedPage from '@/app/unauthorized/page';

// ── Stat Card ─────────────────────────────────────────────────
const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  trendValue,
  loading,
}) => (
  <div className='rounded-2xl border border-white/8 bg-[#161614] p-5 transition hover:bg-[#1c1b19]'>
    <div className='flex items-start justify-between'>
      <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-white/5'>
        <Icon className='h-4 w-4 text-zinc-400' />
      </div>
      {trendValue && (
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {trend === 'up' ? (
            <FiTrendingUp className='h-3 w-3' />
          ) : (
            <FiTrendingDown className='h-3 w-3' />
          )}
          {trendValue}
        </span>
      )}
    </div>

    {loading ? (
      <div className='mt-3 space-y-2'>
        <div className='skeleton h-8 w-24 rounded-lg' />
        <div className='skeleton h-3 w-32 rounded' />
      </div>
    ) : (
      <>
        <p className='mt-3 text-3xl font-bold tracking-tight text-white'>
          {value}
        </p>
        <p className='mt-1 text-xs font-medium text-zinc-600'>{label}</p>
        <p className='mt-0.5 text-xs text-zinc-700'>{sub}</p>
      </>
    )}
  </div>
);

// ── Action Card ───────────────────────────────────────────────
const ActionCard = ({ href, icon: Icon, title, sub, badge, badgeColor }) => (
  <Link
    href={href}
    className='group flex items-center gap-3 rounded-2xl border border-white/8 bg-[#161614] p-4 transition hover:border-white/16 hover:bg-[#1c1b19]'
  >
    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-white/8'>
      <Icon className='h-4 w-4 text-zinc-400 transition group-hover:text-white' />
    </div>
    <div className='min-w-0 flex-1'>
      <div className='flex items-center gap-2'>
        <p className='text-sm font-medium text-zinc-200 transition group-hover:text-white'>
          {title}
        </p>
        {badge && (
          <span
            className={`inline-flex h-5 items-center rounded-full px-1.5 text-xs font-bold ${badgeColor}`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className='mt-0.5 truncate text-xs text-zinc-600'>{sub}</p>
    </div>
    <svg
      className='h-4 w-4 shrink-0 text-zinc-700 transition group-hover:translate-x-0.5 group-hover:text-zinc-400'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
    </svg>
  </Link>
);

// ── Main ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const base = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!session?.user) return;

    const fetchStats = async () => {
      try {
        const [usersRes, jobsRes] = await Promise.all([
          fetch(`${base}/api/users?limit=1`, { credentials: 'include' }),
          fetch(`${base}/api/jobs?limit=1`, { credentials: 'include' }),
        ]);

        const [usersData, jobsData] = await Promise.all([
          usersRes.ok ? usersRes.json() : null,
          jobsRes.ok ? jobsRes.json() : null,
        ]);

        setStats({
          totalUsers: usersData?.total ?? 0,
          activeJobs: jobsData?.activeCount ?? 0,
          pendingJobs: jobsData?.pendingCount ?? 0,
          totalJobs: jobsData?.total ?? 0,
          closedJobs: jobsData?.closedCount ?? 0,
        });
      } catch {
        setStats({
          totalUsers: 0,
          activeJobs: 0,
          pendingJobs: 0,
          totalJobs: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session]);

  // ── Loading ──
  if (isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <RiseLoader color='#ef5ff9' />
      </div>
    );
  }

  // ── Unauthorized ──
  if (session?.user?.role !== 'admin') {
    return <UnauthorizedPage />;
  }

  const user = session?.user;
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className='min-h-screen bg-[#0f0f0e] px-6 py-8 text-white md:px-8 lg:px-10'>
      <div className='mx-auto max-w-7xl space-y-8'>
        {/* ── Header ── */}
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-sm text-zinc-500'>{greeting} 👋</p>
            <h1 className='text-2xl font-semibold tracking-tight text-white'>
              {user?.name?.split(' ')[0] || 'Admin'} Dashboard
            </h1>
            <p className='mt-1 text-sm text-zinc-600'>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <span className='inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-rose-400'>
            <span className='h-1.5 w-1.5 rounded-full bg-rose-400' />
            Admin
          </span>
        </div>

        {/* ── Stat Cards ── */}
        <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
          <StatCard
            icon={FiUsers}
            label='Total Users'
            value={loading ? '—' : (stats?.totalUsers?.toLocaleString() ?? '0')}
            sub='Seekers + Recruiters'
            trend='up'
            trendValue='+12%'
            loading={loading}
          />
          <StatCard
            icon={FiBriefcase}
            label='Active Jobs'
            value={loading ? '—' : (stats?.activeJobs?.toLocaleString() ?? '0')}
            sub={`${stats?.totalJobs ?? 0} total listings`}
            trend='up'
            trendValue='+5%'
            loading={loading}
          />
          <StatCard
            icon={FiClock}
            label='Pending Review'
            value={
              loading ? '—' : (stats?.pendingJobs?.toLocaleString() ?? '0')
            }
            sub='Awaiting approval'
            trend={stats?.pendingJobs > 10 ? 'down' : 'up'}
            trendValue={stats?.pendingJobs > 10 ? 'Needs action' : 'On track'}
            loading={loading}
          />
          <StatCard
            icon={FiDollarSign}
            label='Revenue'
            value='$0'
            sub='This month'
            loading={false}
          />
        </div>

        {/* ── Quick Status Bar ── */}
        {!loading && stats && (
          <div className='flex flex-wrap items-center gap-3 rounded-2xl border border-white/8 bg-[#161614] px-5 py-4'>
            <p className='text-xs font-semibold uppercase tracking-wider text-zinc-600'>
              Platform Status
            </p>
            <div className='mx-2 h-4 w-px bg-white/8' />
            {[
              {
                label: 'Active Jobs',
                value: stats.activeJobs,
                color: 'text-emerald-400',
                dot: 'bg-emerald-400',
              },
              {
                label: 'Pending',
                value: stats.pendingJobs,
                color: 'text-amber-400',
                dot: 'bg-amber-400',
              },
              {
                label: 'Closed',
                value: stats.closedJobs,
                color: 'text-zinc-400',
                dot: 'bg-zinc-600',
              },
              {
                label: 'Total Users',
                value: stats.totalUsers,
                color: 'text-blue-400',
                dot: 'bg-blue-400',
              },
            ].map((s) => (
              <div key={s.label} className='flex items-center gap-1.5'>
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                <span className='text-xs text-zinc-600'>{s.label}:</span>
                <span className={`text-xs font-semibold ${s.color}`}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── Admin Controls ── */}
        <div>
          <h2 className='mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600'>
            Admin Controls
          </h2>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            <ActionCard
              href='/dashboard/admin/users'
              icon={FiUsers}
              title='Manage Users'
              sub='View, suspend, change roles'
              badge={stats?.totalUsers > 0 ? stats.totalUsers : null}
              badgeColor='bg-blue-400/10 text-blue-400'
            />
            <ActionCard
              href='/dashboard/admin/jobs'
              icon={FiBriefcase}
              title='Manage Jobs'
              sub='Approve or reject listings'
              badge={stats?.pendingJobs > 0 ? stats.pendingJobs : null}
              badgeColor='bg-amber-400/10 text-amber-400'
            />
            <ActionCard
              href='/dashboard/admin/companies'
              icon={FiCheckCircle}
              title='Companies'
              sub='Review registrations'
            />
            <ActionCard
              href='/dashboard/admin/settings'
              icon={FiSettings}
              title='Settings'
              sub='Site configuration'
            />
          </div>
        </div>
      </div>

      {/* Skeleton style */}
      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            #1c1b19 25%,
            #222120 50%,
            #1c1b19 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
