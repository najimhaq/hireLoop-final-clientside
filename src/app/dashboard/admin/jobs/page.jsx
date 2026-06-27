// src/app/dashboard/admin/jobs/page.jsx
import { FiPlus, FiBriefcase, FiTrendingUp, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import JobStatusActions from '../_components/JobStatusActions';
import { getAllJobs } from './getAllJobs';

export const dynamic = 'force-dynamic';

// ── Helpers ──────────────────────────────────────────────────────────────────

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

const STATUS_STYLE = {
  active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  closed: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
  draft: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20',
};



const AdminJobsPage = async ({ searchParams }) => {
  const sp = await searchParams;
  const status = sp?.status || '';
  const category = sp?.category || '';
  const page = Number(sp?.page) || 1;

  const {
    jobs,
    total,
    activeCount,
    closedCount,
    pendingCount,
    currentPage,
    totalPages,
  } = await getAllJobs({ status, category, page });

  // ── Dynamic calculations ──
const engagementRate =
    total > 0 ? ((activeCount / total) * 100).toFixed(1) : '0.0';

  const avgDaysToFill =
    jobs.length > 0
      ? Math.round(
          jobs.reduce((acc, job) => {
            const created = new Date(job.createdAt);
            const deadline = new Date(job.deadline);
            const diff = (deadline - created) / (1000 * 60 * 60 * 24);
            return acc + (isNaN(diff) ? 30 : diff);
          }, 0) / jobs.length
        )
      : 0;

  const totalVacancies = jobs.reduce((acc, j) => acc + (j.vacancies || 0), 0);

  const categories = [
    ...new Set(jobs.map((j) => j.jobCategory).filter(Boolean)),
  ];

  const buildUrl = (overrides = {}) => {
    const p = new URLSearchParams();
    const merged = { status, category, page, ...overrides };
    if (merged.status) p.set('status', merged.status);
    if (merged.category) p.set('category', merged.category);
    if (merged.page > 1) p.set('page', String(merged.page));
    const q = p.toString();
    return `/dashboard/admin/jobs${q ? `?${q}` : ''}`;
  };

  return (
    <section className='min-h-screen bg-[#0f0f0e] px-6 py-8 text-white md:px-8 lg:px-10'>
      <div className='mx-auto max-w-7xl space-y-8'>
        {/* ── Header ── */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold tracking-tight text-white'>
              Manage Jobs
            </h1>
            <p className='mt-1 text-sm text-zinc-500'>
              Oversee all active listings and historical job posts across the
              platform.
            </p>
          </div>
          <Link
            href='/dashboard/admin/jobs/new'
            className='inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-zinc-200'
          >
            <FiPlus className='h-4 w-4' />
            Create Job
          </Link>
        </div>

        {/* ── Filters + Toggle ── */}
        <div className='flex flex-wrap items-center gap-3'>
          <form
            method='GET'
            action='/dashboard/admin/jobs'
            className='flex gap-3'
          >
            <select
              name='status'
              defaultValue={status}
              className='h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white/20'
            >
              <option value=''>All Statuses</option>
              <option value='active'>Active</option>
              <option value='pending'>Pending</option>
              <option value='closed'>Closed</option>
              <option value='draft'>Draft</option>
            </select>

            <select
              name='category'
              defaultValue={category}
              className='h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white/20'
            >
              <option value=''>All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c} className='capitalize'>
                  {c}
                </option>
              ))}
            </select>

            <button
              type='submit'
              className='h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-zinc-300 transition hover:bg-white/10'
            >
              Filter
            </button>
          </form>

          {/* Quick toggle */}
          <div className='ml-auto flex items-center gap-2'>
            <Link
              href={buildUrl({ status: 'active', page: 1 })}
              className={`inline-flex h-9 items-center rounded-xl px-4 text-sm font-medium transition ${
                status === 'active'
                  ? 'bg-white/15 text-white'
                  : 'text-zinc-400 hover:bg-white/8 hover:text-white'
              }`}
            >
              Active ({activeCount})
            </Link>
            <Link
              href={buildUrl({ status: 'closed', page: 1 })}
              className={`inline-flex h-9 items-center rounded-xl px-4 text-sm font-medium transition ${
                status === 'closed'
                  ? 'bg-white/15 text-white'
                  : 'text-zinc-400 hover:bg-white/8 hover:text-white'
              }`}
            >
              Closed ({closedCount})
            </Link>
          </div>
        </div>

        {/* ── Table ── */}
        <div className='overflow-hidden rounded-2xl border border-white/8 bg-[#161614]'>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='border-b border-white/8'>
                  {[
                    'Title',
                    'Company',
                    'Category',
                    'Type',
                    'Date Posted',
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
                {jobs.length > 0 ? (
                  jobs.map((job) => {
                    const statusKey = job.status?.toLowerCase() || 'pending';
                    const sCls =
                      STATUS_STYLE[statusKey] || STATUS_STYLE.pending;
                    const company = job.companyId;

                    return (
                      <tr
                        key={job._id}
                        className='group transition hover:bg-white/3'
                      >
                        {/* Title */}
                        <td className='px-6 py-4'>
                          <p className='font-semibold text-white'>
                            {job.jobTitle}
                          </p>
                          <p className='mt-0.5 text-xs text-zinc-600'>
                            Ref: HL-{job._id?.slice(-5).toUpperCase()}
                          </p>
                        </td>

                        {/* Company */}
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2.5'>
                            {company?.logo ? (
                              <Image
                                src={company.logo}
                                alt={company.companyName || 'Company'}
                                width={28}
                                height={28}
                                className='h-7 w-7 rounded-lg border border-white/10 bg-white/5 object-contain p-0.5'
                              />
                            ) : (
                              <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-zinc-300'>
                                {(company?.companyName || 'C')
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}
                            <span className='text-sm text-zinc-300'>
                              {company?.companyName || '—'}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className='px-6 py-4'>
                          <span className='rounded-md border border-white/8 bg-white/5 px-2.5 py-1 text-xs font-medium capitalize text-zinc-400'>
                            {job.jobCategory || '—'}
                          </span>
                        </td>

                        {/* Type */}
                        <td className='px-6 py-4'>
                          <span className='text-sm capitalize text-zinc-400'>
                            {job.jobType || '—'}
                          </span>
                        </td>

                        {/* Date */}
                        <td className='px-6 py-4'>
                          <span className='text-sm text-zinc-500'>
                            {formatDate(job.createdAt)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className='px-6 py-4'>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${sCls}`}
                          >
                            <span className='h-1.5 w-1.5 rounded-full bg-current' />
                            {job.status || 'pending'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className='px-6 py-4'>
                          <JobStatusActions job={job} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className='px-6 py-20 text-center'>
                      <div className='mx-auto flex w-fit flex-col items-center gap-3'>
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5'>
                          <FiBriefcase className='h-6 w-6 text-zinc-600' />
                        </div>
                        <p className='text-sm text-zinc-600'>
                          No jobs found matching your filters.
                        </p>
                        <Link
                          href='/dashboard/admin/jobs'
                          className='text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-300'
                        >
                          Clear filters
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className='flex items-center justify-between border-t border-white/8 px-6 py-4'>
              <p className='text-xs text-zinc-600'>
                Showing{' '}
                <span className='font-semibold text-zinc-400'>
                  {(currentPage - 1) * 10 + 1}–
                  {Math.min(currentPage * 10, total)}
                </span>{' '}
                of <span className='font-semibold text-zinc-400'>{total}</span>{' '}
                results
              </p>

              <div className='flex items-center gap-1'>
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

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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

                {totalPages > 5 && (
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
            </div>
          )}
        </div>

        {/* ── Bottom Stats — Dynamic ── */}
        <div className='grid gap-4 sm:grid-cols-3'>
          {/* Engagement Rate */}
          <div className='rounded-2xl border border-white/8 bg-[#161614] p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-sm text-zinc-500'>
                <FiTrendingUp className='h-4 w-4' />
                Engagement Rate
              </div>
              <span
                className={`text-xs font-semibold ${
                  parseFloat(engagementRate) >= 50
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {parseFloat(engagementRate) >= 50 ? '↑' : '↓'} {engagementRate}%
              </span>
            </div>
            <p className='mt-3 text-3xl font-bold tracking-tight text-white'>
              {engagementRate}%
            </p>
            <div className='mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/8'>
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  parseFloat(engagementRate) >= 50
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                }`}
                style={{
                  width: `${Math.min(parseFloat(engagementRate), 100)}%`,
                }}
              />
            </div>
            <p className='mt-2 text-xs text-zinc-600'>
              {activeCount} active · {closedCount} closed · {pendingCount}{' '}
              pending
            </p>
          </div>

          {/* Avg Days to Fill */}
          <div className='rounded-2xl border border-white/8 bg-[#161614] p-6'>
            <div className='flex items-center gap-2 text-sm text-zinc-500'>
              <FiClock className='h-4 w-4' />
              Avg. Days to Fill
            </div>
            <p className='mt-3 text-3xl font-bold tracking-tight text-white'>
              {avgDaysToFill}
              <span className='ml-1 text-lg font-normal text-zinc-600'>
                days
              </span>
            </p>
            <div className='mt-3 flex items-center gap-1.5'>
              <span
                className={`inline-flex h-5 items-center rounded-full px-2 text-xs font-semibold ${
                  avgDaysToFill <= 30
                    ? 'bg-emerald-400/10 text-emerald-400'
                    : 'bg-amber-400/10 text-amber-400'
                }`}
              >
                {avgDaysToFill <= 30 ? '✓ On target' : '⚠ Above avg'}
              </span>
            </div>
            <p className='mt-1 text-xs text-zinc-600'>
              Based on {jobs.length} posting{jobs.length !== 1 ? 's' : ''} this
              page
            </p>
          </div>

          {/* Open Vacancies */}
          <div className='rounded-2xl border border-white/8 bg-[#161614] p-6'>
            <div className='flex items-center gap-2 text-sm text-zinc-500'>
              <FiBriefcase className='h-4 w-4' />
              Open Vacancies
            </div>
            <p className='mt-3 text-3xl font-bold tracking-tight text-white'>
              {totalVacancies.toLocaleString()}
            </p>
            <div className='mt-3 grid grid-cols-3 gap-2'>
              <div className='rounded-lg bg-white/4 px-2 py-1.5 text-center'>
                <p className='text-sm font-bold text-emerald-400'>
                  {activeCount}
                </p>
                <p className='text-xs text-zinc-600'>Active</p>
              </div>
              <div className='rounded-lg bg-white/4 px-2 py-1.5 text-center'>
                <p className='text-sm font-bold text-amber-400'>
                  {pendingCount}
                </p>
                <p className='text-xs text-zinc-600'>Pending</p>
              </div>
              <div className='rounded-lg bg-white/4 px-2 py-1.5 text-center'>
                <p className='text-sm font-bold text-zinc-400'>{closedCount}</p>
                <p className='text-xs text-zinc-600'>Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminJobsPage;
