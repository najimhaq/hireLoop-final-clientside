// app/dashboard/seeker/applications/ApplicationsTable.jsx — Client Component
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

const STATUS_STYLES = {
  pending: 'border-green-500   text-gray-400',
  reviewed: 'border-amber-500  text-amber-400',
  shortlisted: 'border-emerald-500 text-emerald-400',
  rejected: 'border-red-500    text-red-400',
  hired: 'border-violet-500 text-violet-400',
};

const STATUS_LABEL = {
  pending: 'Pending',
  reviewed: 'Review',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  hired: 'Offered',
};

// Simple job type icon (initials fallback)
function JobIcon({ title = '' }) {
  const initial = title.charAt(0).toUpperCase();
  return (
    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-slate-300'>
      {initial}
    </div>
  );
}

const PAGE_SIZE = 5;

export default function ApplicationsTable({ applications }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(applications.length / PAGE_SIZE);
  const paginated = applications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className='flex flex-col gap-4'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-white'>My Applications</h1>
        <p className='text-sm text-slate-500 mt-1'>
          Track all your job applications in one place
        </p>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-2xl border border-white/10 bg-white/3'>
        {/* Table Header */}
        <div className='grid grid-cols-[2fr_1.2fr_1fr_1fr_0.6fr] gap-4 border-b border-white/10 px-6 py-4'>
          {['Job Title', 'Company', 'Applied', 'Status', 'Action'].map((h) => (
            <span
              key={h}
              className='text-xs font-semibold uppercase tracking-widest text-slate-500'
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div className='px-6 py-16 text-center text-slate-500'>
            <p className='text-lg font-medium text-slate-400'>
              No applications yet
            </p>
            <p className='text-sm mt-1'>
              Start applying to jobs to see them here
            </p>
            <Link
              href='/jobs'
              className='mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-500/20 px-4 py-2 text-sm text-violet-400 hover:bg-violet-500/30 transition'
            >
              Browse Jobs →
            </Link>
          </div>
        ) : (
          paginated.map((app, idx) => {
            const jobTitle = app.job?.jobTitle ?? 'Job Position';
            const company = app.job?.companyId?.companyName ?? '—';
            const logo = app.job?.companyId?.logo ?? null;
            const jobType = app.job?.jobType ?? '';
            const workMode = app.job?.workMode ?? app.job?.location ?? '';
            const status = app.status ?? 'pending';
            const appliedAt = app.createdAt
              ? formatDistanceToNow(new Date(app.createdAt), {
                  addSuffix: true,
                })
              : '—';

            return (
              <div
                key={app._id}
                className={`grid grid-cols-[2fr_1.2fr_1fr_1fr_0.6fr] gap-4 items-center px-6 py-4 transition hover:bg-white/5 ${
                  idx !== paginated.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                {/* Job Title */}
                <div className='flex items-center gap-3 min-w-0'>
                  <JobIcon title={jobTitle} />
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold text-white'>
                      {jobTitle}
                    </p>
                    <p className='text-xs text-slate-500 capitalize'>
                      {[jobType, workMode].filter(Boolean).join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Company */}
                {/* <p className='text-sm text-slate-300 truncate'>{company}</p> */}
                {/* Company Logo */}
                <Image
                  src={logo}
                  alt={company}
                  width={62}
                  height={62}
                  className='h-8 w-8 shrink-0 rounded-full object-cover'
                />


                {/* Applied */}
                <p className='text-sm text-slate-400'>{appliedAt}</p>

                {/* Status Badge */}
                <div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? STATUS_STYLES.pending}`}
                  >
                    {STATUS_LABEL[status] ?? status}
                  </span>
                </div>

                {/* Action */}
                <Link
                  href={`/jobs/${app.job?._id ?? ''}`}
                  className='flex items-center gap-1 text-sm text-slate-400 hover:text-white transition'
                >
                  Details
                  <FiExternalLink size={13} />
                </Link>
              </div>
            );
          })
        )}

        {/* Footer — Pagination */}
        {applications.length > 0 && (
          <div className='flex items-center justify-between border-t border-white/10 px-6 py-4'>
            <p className='text-xs text-slate-500'>
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, applications.length)} of{' '}
              {applications.length} applications
            </p>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed'
              >
                <FiChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition ${
                    p === page
                      ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed'
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
