// src/app/dashboard/admin/users/page.jsx
import { getAllUsers } from '@/app/lib/api/getAllUsers';
import Link from 'next/link';
import {
  FiDownload,
  FiUsers,
  FiTrendingUp,
  FiAlertCircle,
  FiUserPlus,
} from 'react-icons/fi';

import Image from 'next/image';
import UserActions from '../_components/UserActions';
import RoleFilter from '../_components/RoleFilter';

export const dynamic = 'force-dynamic';

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const AVATAR_COLORS = [
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-cyan-500',
];

const avatarColor = (name = '') => {
  const i = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[i];
};

const AdminUnderUserPage = async ({ searchParams }) => {
  const sp = await searchParams;
  const role = sp?.role || '';
  const page = Number(sp?.page) || 1;

  const result = await getAllUsers({ role, page });
  const users = result?.data || [];
  const total = result?.total || users.length;
  const totalPages = result?.totalPages || 1;
  const currentPage = result?.currentPage || 1;

  // ── Stats ──
  const activeCount = users.filter(
    (u) => u.status?.toLowerCase() === 'active'
  ).length;
  const suspendedCount = users.filter(
    (u) => u.status?.toLowerCase() === 'suspended'
  ).length;
  const recruiterCount = users.filter(
    (u) => u.role?.toLowerCase() === 'recruiter'
  ).length;
  const seekerCount = users.filter(
    (u) => u.role?.toLowerCase() === 'seeker'
  ).length;

  const buildUrl = (overrides = {}) => {
    const p = new URLSearchParams();
    const merged = { role, page, ...overrides };
    if (merged.role) p.set('role', merged.role);
    if (merged.page > 1) p.set('page', String(merged.page));
    const q = p.toString();
    return `/dashboard/admin/users${q ? `?${q}` : ''}`;
  };

  return (
    <section className='min-h-screen bg-[#0f0f0e] px-6 py-8 text-white md:px-8 lg:px-10'>
      <div className='mx-auto max-w-7xl space-y-8'>
        {/* ── Header ── */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold tracking-tight text-white'>
              User Management
            </h1>
            <p className='mt-1 text-sm text-zinc-500'>
              Review, filter, and manage platform access for all users.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            {/* Role filter dropdown */}
            <RoleFilter currentRole={role} />
            <button className='inline-flex h-10 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-zinc-200'>
              <FiDownload className='h-4 w-4' />
              Export List
            </button>
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              icon: FiUsers,
              label: 'Total Active Users',
              value: total.toLocaleString(),
              sub: '+12% vs last month',
              subColor: 'text-emerald-500',
            },
            {
              icon: FiTrendingUp,
              label: 'Recruiter Growth',
              value: recruiterCount.toLocaleString(),
              sub: 'High demand',
              subColor: 'text-emerald-500',
            },
            {
              icon: FiAlertCircle,
              label: 'Suspended Accounts',
              value: suspendedCount.toLocaleString(),
              sub: `${total > 0 ? ((suspendedCount / total) * 100).toFixed(1) : '0'}% of total`,
              subColor: 'text-zinc-500',
            },
            {
              icon: FiUserPlus,
              label: 'New Signups (24h)',
              value: seekerCount.toLocaleString(),
              sub: 'Steady activity',
              subColor: 'text-amber-400',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className='rounded-2xl border border-white/8 bg-[#161614] p-5'
            >
              <p className='text-xs font-medium text-zinc-500'>{stat.label}</p>
              <p className='mt-2 text-3xl font-bold tracking-tight text-white'>
                {stat.value}
              </p>
              <p className={`mt-1 text-xs font-medium ${stat.subColor}`}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className='overflow-hidden rounded-2xl border border-white/8 bg-[#161614]'>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='border-b border-white/8'>
                  {[
                    'User Name',
                    'Email Address',
                    'Role',
                    'Join Date',
                    'Status',
                    'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 last:text-right'
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-white/5'>
                {users.length > 0 ? (
                  users.map((user) => {
                    const status = user.status?.toLowerCase() || 'active';
                    const userRole = user.role?.toLowerCase() || 'seeker';
                    const name = user.name || user.fullName || 'Unknown';

                    return (
                      <tr
                        key={user._id}
                        className='group transition hover:bg-white/3'
                      >
                        {/* User Name */}
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-3'>
                            {user.avatar ? (
                              <Image
                                src={user.avatar}
                                alt={name}
                                width={36}
                                height={36}
                                className='h-9 w-9 rounded-full object-cover'
                              />
                            ) : (
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor(name)}`}
                              >
                                {getInitials(name)}
                              </div>
                            )}
                            <span className='text-sm font-medium text-zinc-200'>
                              {name}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className='px-6 py-4'>
                          <span className='text-sm text-zinc-400'>
                            {user.email || '—'}
                          </span>
                        </td>

                        {/* Role */}
                        <td className='px-6 py-4'>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                              userRole === 'recruiter'
                                ? 'border-violet-400/20 bg-violet-400/10 text-violet-400'
                                : userRole === 'admin'
                                  ? 'border-amber-400/20 bg-amber-400/10 text-amber-400'
                                  : 'border-zinc-400/20 bg-zinc-400/10 text-zinc-400'
                            }`}
                          >
                            {userRole === 'recruiter' ? '🏢' : '👤'} {userRole}
                          </span>
                        </td>

                        {/* Join Date */}
                        <td className='px-6 py-4'>
                          <span className='text-sm text-zinc-500'>
                            {formatDate(user.createdAt)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className='px-6 py-4'>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                              status === 'active'
                                ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-400'
                                : status === 'suspended'
                                  ? 'border-rose-400/20 bg-rose-400/10 text-rose-400'
                                  : 'border-zinc-400/20 bg-zinc-400/10 text-zinc-400'
                            }`}
                          >
                            <span className='h-1.5 w-1.5 rounded-full bg-current' />
                            {user.status || 'Active'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className='px-6 py-4'>
                          <UserActions user={user} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className='px-6 py-20 text-center text-sm text-zinc-600'
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className='flex items-center justify-between border-t border-white/8 px-6 py-4'>
            <p className='text-xs text-zinc-600'>
              Showing{' '}
              <span className='font-semibold text-zinc-400'>
                {Math.min((currentPage - 1) * 10 + 1, total)}–
                {Math.min(currentPage * 10, total)}
              </span>{' '}
              of{' '}
              <span className='font-semibold text-zinc-400'>
                {total.toLocaleString()}
              </span>{' '}
              users
            </p>

            {totalPages > 1 && (
              <div className='flex items-center gap-1'>
                {/* Prev */}
                {currentPage > 1 ? (
                  <Link
                    href={buildUrl({ page: currentPage - 1 })}
                    className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-zinc-500 transition hover:border-white/20 hover:text-white'
                  >
                    ‹
                  </Link>
                ) : (
                  <span className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 text-zinc-700'>
                    ‹
                  </span>
                )}

                {/* Page numbers */}
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <Link
                      key={p}
                      href={buildUrl({ page: p })}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
                        p === currentPage
                          ? 'bg-white font-semibold text-black'
                          : 'border border-white/8 text-zinc-500 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}

                {totalPages > 3 && (
                  <>
                    <span className='px-1 text-zinc-700'>...</span>
                    <Link
                      href={buildUrl({ page: totalPages })}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-sm text-zinc-500 transition hover:border-white/20 hover:text-white'
                    >
                      {totalPages}
                    </Link>
                  </>
                )}

                {/* Next */}
                {currentPage < totalPages ? (
                  <Link
                    href={buildUrl({ page: currentPage + 1 })}
                    className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-zinc-500 transition hover:border-white/20 hover:text-white'
                  >
                    ›
                  </Link>
                ) : (
                  <span className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 text-zinc-700'>
                    ›
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUnderUserPage;
