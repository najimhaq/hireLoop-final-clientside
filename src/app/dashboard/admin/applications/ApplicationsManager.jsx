// app/dashboard/admin/applications/ApplicationsManager.jsx
'use client';

import { useState, useMemo, useTransition } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { updateApplicationStatus } from './actions';

const STATUS_STYLES = {
  pending: 'border-zinc-600   text-zinc-400   bg-zinc-800/50',
  reviewed: 'border-amber-500  text-amber-400  bg-amber-500/10',
  shortlisted: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
  rejected: 'border-red-500    text-red-400    bg-red-500/10',
  hired: 'border-violet-500 text-violet-400 bg-violet-500/10',
};

const STATUS_LABEL = {
  pending: 'Pending',
  reviewed: 'Reviewed',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  hired: 'Hired',
};

const PAGE_SIZE = 8;

export default function ApplicationsManager({ applications, total }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState(null);
  const [localApps, setLocalApps] = useState(applications);
  const [isPending, startTransition] = useTransition();

  // Filter
  const filtered = useMemo(() => {
    return localApps.filter((app) => {
      const title = app.job?.jobTitle?.toLowerCase() ?? '';
      const name = app.applicant?.name?.toLowerCase() ?? '';
      const email = app.applicant?.email?.toLowerCase() ?? '';
      const q = search.toLowerCase();

      const matchSearch =
        !q || title.includes(q) || name.includes(q) || email.includes(q);
      const matchStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [localApps, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Status counts
  const counts = useMemo(
    () => ({
      all: localApps.length,
      pending: localApps.filter((a) => a.status === 'pending').length,
      reviewed: localApps.filter((a) => a.status === 'reviewed').length,
      shortlisted: localApps.filter((a) => a.status === 'shortlisted').length,
      rejected: localApps.filter((a) => a.status === 'rejected').length,
      hired: localApps.filter((a) => a.status === 'hired').length,
    }),
    [localApps]
  );

  const handleStatusChange = async (appId, newStatus) => {
    setUpdating(appId);
    try {
      await updateApplicationStatus(appId, newStatus);
      // Optimistic update
      setLocalApps((prev) =>
        prev.map((a) => (a._id === appId ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className='space-y-5'>
      {/* Stats Pills */}
      <div className='flex flex-wrap gap-2'>
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => {
              setStatusFilter(key);
              setPage(1);
            }}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize transition ${
              statusFilter === key
                ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-white'
            }`}
          >
            {key === 'all' ? 'All' : STATUS_LABEL[key]} ({count})
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type='text'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder='Search by job title, applicant name or email…'
        className='w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500 transition'
      />

      {/* Table */}
      <div className='overflow-hidden rounded-2xl border border-white/10 bg-white/3'>
        {/* Table Header */}
        <div className='grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1.2fr_1fr] gap-4 border-b border-white/10 px-6 py-4'>
          {[
            'Job Title',
            'Applicant',
            'Email',
            'Applied',
            'Status',
            'Actions',
          ].map((h) => (
            <span
              key={h}
              className='text-xs font-semibold uppercase tracking-widest text-zinc-500'
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div className='px-6 py-20 text-center'>
            <p className='text-lg font-medium text-zinc-400'>
              No applications found
            </p>
            <p className='text-sm text-zinc-600 mt-1'>
              Try adjusting your filters
            </p>
          </div>
        ) : (
          paginated.map((app, idx) => {
            const jobTitle = app.job?.jobTitle ?? '—';
            const company = app.job?.companyId?.companyName ?? '';
            const applicantName = app.applicant?.name ?? '—';
            const email = app.applicant?.email ?? '—';
            const status = app.status ?? 'pending';
            const appliedAt = app.createdAt
              ? formatDistanceToNow(new Date(app.createdAt), {
                  addSuffix: true,
                })
              : '—';
            const isUpdating = updating === app._id;

            return (
              <div
                key={app._id}
                className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1.2fr_1fr] gap-4 items-center px-6 py-4 transition hover:bg-white/5 ${
                  idx !== paginated.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                {/* Job Title */}
                <div className='min-w-0'>
                  <p className='truncate text-sm font-semibold text-white'>
                    {jobTitle}
                  </p>
                  {company && (
                    <p className='text-xs text-zinc-500 truncate'>{company}</p>
                  )}
                </div>

                {/* Applicant */}
                <div className='flex items-center gap-2 min-w-0'>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-400'>
                    {applicantName.charAt(0).toUpperCase()}
                  </div>
                  <p className='truncate text-sm text-zinc-300'>
                    {applicantName}
                  </p>
                </div>

                {/* Email */}
                <p className='truncate text-xs text-zinc-500'>{email}</p>

                {/* Applied */}
                <p className='text-xs text-zinc-500'>{appliedAt}</p>

                {/* Status Dropdown */}
                <div>
                  <select
                    value={status}
                    disabled={isUpdating}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none cursor-pointer transition disabled:opacity-50 ${
                      STATUS_STYLES[status] ?? STATUS_STYLES.pending
                    }`}
                  >
                    {Object.entries(STATUS_LABEL).map(([val, label]) => (
                      <option
                        key={val}
                        value={val}
                        className='bg-zinc-900 text-white'
                      >
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-2'>
                  <Link
                    href={`/jobs/${app.job?._id ?? ''}`}
                    className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white'
                  >
                    <FiEye size={14} />
                  </Link>
                </div>
              </div>
            );
          })
        )}

        {/* Footer Pagination */}
        {filtered.length > 0 && (
          <div className='flex items-center justify-between border-t border-white/10 px-6 py-4'>
            <p className='text-xs text-zinc-500'>
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{' '}
              results
            </p>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed'
              >
                <FiChevronLeft size={14} />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition ${
                      p === page
                        ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                        : 'border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              {totalPages > 5 && (
                <span className='text-zinc-600 text-sm'>... {totalPages}</span>
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed'
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
