// src/app/dashboard/recruiter/jobs/page.jsx
import React from 'react';
import {
  FiEye,
  FiEdit2,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiTrendingUp,
  FiPlus,
  FiClock,
} from 'react-icons/fi';
import { getLoggedInRecruiterCompany } from '@/app/lib/api/companies';
import Link from 'next/link';
import { getCompanyJobs } from '@/app/lib/api/getCompanyJobs';
import DeleteJobButton from '@/app/jobs/[id]/delete/DeleteJobButton';

export const dynamic = 'force-dynamic';

const STATUS_MAP = {
  active: {
    dot: 'bg-emerald-500',
    badge: 'text-emerald-700 bg-emerald-50 ring-emerald-200',
  },
  pending: {
    dot: 'bg-amber-500',
    badge: 'text-amber-700 bg-amber-50 ring-amber-200',
  },
  closed: {
    dot: 'bg-rose-500',
    badge: 'text-rose-700 bg-rose-50 ring-rose-200',
  },
  draft: {
    dot: 'bg-slate-400',
    badge: 'text-slate-600 bg-slate-100 ring-slate-200',
  },
};

const TYPE_MAP = {
  'full-time': 'text-blue-700 bg-blue-50',
  'part-time': 'text-violet-700 bg-violet-50',
  contract: 'text-orange-700 bg-orange-50',
  internship: 'text-teal-700 bg-teal-50',
  freelance: 'text-pink-700 bg-pink-50',
};

const formatSalary = (min, max, currency = 'USD') => {
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
  if (min && max) return `${currency} ${fmt(min)} – ${fmt(max)}`;
  if (min) return `${currency} ${fmt(min)}+`;
  if (max) return `Up to ${currency} ${fmt(max)}`;
  return '—';
};

const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany();
  const jobs = (await getCompanyJobs(company?.data?._id)) || [];

  const activeCount = jobs.filter(
    (j) => j.status?.toLowerCase() === 'active'
  ).length;
  const pendingCount = jobs.filter(
    (j) => j.status?.toLowerCase() === 'pending'
  ).length;
  const totalVacancies = jobs.reduce((acc, j) => acc + (j.vacancies || 0), 0);
  const avgSalary = jobs.length
    ? Math.round(
        jobs.reduce((a, j) => a + ((j.minSalary + j.maxSalary) / 2 || 0), 0) /
          jobs.length
      )
    : 0;

  return (
    <section className='min-h-screen bg-[#f7f8fc] p-5 md:p-8 lg:p-10'>
      <div className='mx-auto max-w-7xl space-y-8'>
        {/* ── Page Header ── */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-widest text-indigo-500'>
              Recruiter Dashboard
            </p>
            <h1 className='mt-0.5 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl'>
              Job Postings
            </h1>
            <p className='mt-1 text-sm text-slate-500'>
              {jobs.length} posting{jobs.length !== 1 ? 's' : ''} for{' '}
              <span className='font-medium text-slate-700'>
                {company?.data?.companyName || 'your company'}
              </span>
            </p>
          </div>
          <Link
            href='/dashboard/recruiter/jobs/new'
            className='inline-flex h-10 items-center gap-2 self-start rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:self-auto'
          >
            <FiPlus className='h-4 w-4' />
            Post New Job
          </Link>
        </div>

        {/* ── Stats Cards ── */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              label: 'Total Postings',
              value: jobs.length,
              icon: FiBriefcase,
              iconBg: 'bg-indigo-100',
              iconColor: 'text-indigo-600',
            },
            {
              label: 'Active Jobs',
              value: activeCount,
              icon: FiTrendingUp,
              iconBg: 'bg-emerald-100',
              iconColor: 'text-emerald-600',
            },
            {
              label: 'Pending Review',
              value: pendingCount,
              icon: FiClock,
              iconBg: 'bg-amber-100',
              iconColor: 'text-amber-600',
            },
            {
              label: 'Open Vacancies',
              value: totalVacancies,
              icon: FiMapPin,
              iconBg: 'bg-violet-100',
              iconColor: 'text-violet-600',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className='flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60'
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className='text-xs font-medium text-slate-500'>
                  {stat.label}
                </p>
                <p className='text-2xl font-bold text-slate-900'>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Jobs Table ── */}
        <div className='rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60'>
          {/* Table Header */}
          <div className='border-b border-slate-100 px-6 py-4'>
            <h2 className='text-sm font-semibold text-slate-800'>
              All Postings
            </h2>
          </div>

          {jobs.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead>
                  <tr className='border-b border-slate-100'>
                    {[
                      'Role',
                      'Location',
                      'Salary',
                      'Vacancies',
                      'Status',
                      '',
                    ].map((h) => (
                      <th
                        key={h}
                        className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 last:text-right'
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-50'>
                  {jobs.map((job) => {
                    const status = job.status?.toLowerCase() || 'pending';
                    const s = STATUS_MAP[status] || STATUS_MAP.pending;
                    const typeClass =
                      TYPE_MAP[job.jobType?.toLowerCase()] ||
                      'text-slate-600 bg-slate-100';

                    return (
                      <tr
                        key={job._id}
                        className='group transition hover:bg-slate-50/70'
                      >
                        {/* Role */}
                        <td className='px-6 py-4'>
                          <p className='font-semibold text-slate-800 group-hover:text-indigo-600 transition'>
                            {job.jobTitle}
                          </p>
                          <div className='mt-1 flex flex-wrap gap-1.5'>
                            <span
                              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${typeClass}`}
                            >
                              {job.jobType}
                            </span>
                            <span className='inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-500'>
                              {job.experienceLevel}
                            </span>
                            <span className='inline-flex rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium capitalize text-indigo-600'>
                              {job.jobCategory}
                            </span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-1.5 text-sm text-slate-600'>
                            <FiMapPin className='h-3.5 w-3.5 shrink-0 text-slate-400' />
                            <span>
                              {job.isRemote ? 'Remote' : job.location || '—'}
                            </span>
                          </div>
                        </td>

                        {/* Salary */}
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-1.5 text-sm font-medium text-slate-700'>
                            <FiDollarSign className='h-3.5 w-3.5 shrink-0 text-slate-400' />
                            {formatSalary(
                              job.minSalary,
                              job.maxSalary,
                              job.currency
                            )}
                          </div>
                        </td>

                        {/* Vacancies */}
                        <td className='px-6 py-4'>
                          <span className='text-sm font-semibold text-slate-700'>
                            {job.vacancies ?? '—'}
                          </span>
                          <span className='ml-1 text-xs text-slate-400'>
                            open
                          </span>
                        </td>

                        {/* Status */}
                        <td className='px-6 py-4'>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${s.badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${s.dot}`}
                            />
                            {job.status || 'pending'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className='px-6 py-4'>
                          <div className='flex items-center justify-end gap-1'>
                            <Link
                              href={`/jobs/${job._id}`}
                              aria-label='View job'
                              className='inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600'
                            >
                              <FiEye className='h-4 w-4' />
                            </Link>
                            <Link
                              href={`/jobs/${job._id}/edit`}
                              aria-label='Edit job'
                              className='inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-amber-50 hover:text-amber-600'
                            >
                              <FiEdit2 className='h-4 w-4' />
                            </Link>
                            <DeleteJobButton
                              jobId={job._id}
                              jobTitle={job.jobTitle}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* ── Empty State ── */
            <div className='flex flex-col items-center px-6 py-24 text-center'>
              <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100'>
                <FiBriefcase className='h-7 w-7 text-slate-400' />
              </div>
              <h3 className='mt-5 text-base font-semibold text-slate-800'>
                No job postings yet
              </h3>
              <p className='mt-1.5 max-w-xs text-sm text-slate-500'>
                Create your first job posting to start receiving applications.
              </p>
              <Link
                href='/dashboard/recruiter/jobs/new'
                className='mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700'
              >
                <FiPlus className='h-4 w-4' />
                Post a Job
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecruiterJobs;
