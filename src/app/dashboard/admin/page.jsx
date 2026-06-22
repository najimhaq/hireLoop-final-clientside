'use client';
import { useSession } from '../../lib/auth-client';
import { RiseLoader } from 'react-spinners';
import Link from 'next/link';
import { FiLock } from 'react-icons/fi';
import UnauthorizedPage from '@/app/unauthorized/page';

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <RiseLoader color='#ef5ff9' />
      </div>
    );
  }

  const user = session?.user;
  // console.log('admin inner', user)

  if (session?.user?.role !== 'admin') {
      return (
       <UnauthorizedPage />
      );
    }

  return (
    <div className='flex flex-col gap-8'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-slate-500'>Admin Panel</p>
          <h1 className='text-2xl font-bold text-white'>
            Hello, {user?.name?.split(' ')[0] || 'Admin'} ⚙️
          </h1>
        </div>
        <span className='rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-red-400'>
          Admin
        </span>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {[
          { label: 'Total Users', value: 0, sub: 'Seekers + Recruiters' },
          { label: 'Active Jobs', value: 0, sub: 'Live listings' },
          { label: 'Applications', value: 0, sub: 'Platform-wide' },
          { label: 'Revenue', value: '$0', sub: 'This month' },
        ].map((card) => (
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

      {/* Admin Actions */}
      <div>
        <h2 className='mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500'>
          Admin Controls
        </h2>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              href: '/dashboard/admin/users',
              icon: '👤',
              title: 'Manage Users',
              sub: 'View, edit, ban users',
            },
            {
              href: '/dashboard/admin/jobs',
              icon: '💼',
              title: 'Manage Jobs',
              sub: 'Approve or remove listings',
            },
            {
              href: '/dashboard/admin/applications',
              icon: '📋',
              title: 'Applications',
              sub: 'Platform-wide overview',
            },
            {
              href: '/dashboard/admin/settings',
              icon: '⚙️',
              title: 'Settings',
              sub: 'Site configuration',
            },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]'
            >
              <span className='text-xl'>{action.icon}</span>
              <div>
                <p className='text-sm font-medium text-white'>{action.title}</p>
                <p className='text-xs text-slate-500'>{action.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
