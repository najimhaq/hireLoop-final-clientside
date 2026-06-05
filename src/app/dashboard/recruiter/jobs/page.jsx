import React from 'react';
import getCompanyJobs from '@/app/lib/api/getCompanyJobs';
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiGrid,
  FiList,
} from 'react-icons/fi';

export const dynamic = 'force-dynamic';

const RecruiterJobs = async () => {
  const companyId = 'company_123';
  const jobs = await getCompanyJobs(companyId);

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-linear-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-emerald-200';
      case 'inactive':
      case 'closed':
        return 'bg-linear-to-r from-rose-50 to-rose-100/50 text-rose-700 border-rose-200';
      default:
        return 'bg-linear-to-r from-amber-50 to-amber-100/50 text-amber-700 border-amber-200';
    }
  };

  const getJobTypeColor = (type) => {
    const types = {
      'full-time': 'bg-blue-50 text-blue-700',
      'part-time': 'bg-purple-50 text-purple-700',
      contract: 'bg-orange-50 text-orange-700',
      internship: 'bg-teal-50 text-teal-700',
      remote: 'bg-indigo-50 text-indigo-700',
    };
    return types[type?.toLowerCase()] || 'bg-gray-50 text-gray-700';
  };

  return (
    <section className='min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-8 lg:px-10 lg:py-16'>
      <div className='mx-auto max-w-7xl'>
        {/* Header Section */}
        <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <div className='mb-2 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm'>
              <span className='h-1.5 w-1.5 rounded-full bg-white/80'></span>
              RECRUITER DASHBOARD
            </div>
            <h1 className='bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl'>
              Job Postings
            </h1>
            <p className='mt-2 text-sm text-slate-500'>
              Manage and monitor all your job opportunities in one place
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <div className='group relative'>
              <div className='absolute -inset-0.5 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 opacity-30 blur transition group-hover:opacity-50'></div>
              <div className='relative flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-slate-200'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-purple-600 to-indigo-600 shadow-md'>
                  <FiBriefcase className='h-5 w-5 text-white' />
                </div>
                <div>
                  <p className='text-xs font-medium uppercase tracking-wider text-slate-400'>
                    Total Jobs
                  </p>
                  <p className='text-2xl font-bold text-slate-800'>
                    {jobs.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              label: 'Active Jobs',
              count: jobs.filter((j) => j.status?.toLowerCase() === 'active')
                .length,
              color: 'from-emerald-500 to-teal-500',
              icon: FiEye,
            },
            {
              label: 'Total Applications',
              count: jobs.reduce(
                (acc, job) => acc + (job.applicationsCount || 0),
                0
              ),
              color: 'from-blue-500 to-cyan-500',
              icon: FiGrid,
            },
            {
              label: 'Open Positions',
              count: jobs.filter((j) => j.isRemote).length,
              color: 'from-purple-500 to-indigo-500',
              icon: FiMapPin,
            },
            {
              label: 'Avg. Salary',
              count: `$${Math.floor(jobs.reduce((acc, job) => acc + (job.maxSalary || 0), 0) / (jobs.length || 1) / 1000)}k`,
              color: 'from-amber-500 to-orange-500',
              icon: FiDollarSign,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className='group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md'
            >
              <div
                className='absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-linear-to-br opacity-10 blur-2xl transition group-hover:opacity-20'
                style={{
                  backgroundImage: `linear-linear(to bottom right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`,
                }}
              ></div>
              <div className='relative flex items-center justify-between'>
                <div>
                  <p className='text-xs font-medium uppercase tracking-wider text-slate-400'>
                    {stat.label}
                  </p>

                  <p className='mt-1 text-2xl font-bold text-slate-800'>
                    {stat.count}
                  </p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${stat.color} shadow-md`}
                >
                  <stat.icon className='h-5 w-5 text-white' />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Jobs Table */}
        <div className='overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-slate-100'>
              <thead>
                <tr className='bg-linear-to-r from-slate-50 to-indigo-50/50'>
                  <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                    Job Details
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                    Category
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                    Location
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                    Compensation
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500'>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-slate-50'>
                {jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <tr
                      key={job._id}
                      className='group transition-all duration-200 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-transparent'
                    >
                      <td className='px-6 py-5'>
                        <div className='flex items-start gap-3'>
                          <div className='relative'>
                            <div className='absolute -inset-0.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 blur transition group-hover:opacity-30'></div>
                            <div className='relative flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-slate-100 to-slate-200 shadow-sm'>
                              <FiBriefcase className='h-5 w-5 text-slate-600' />
                            </div>
                          </div>
                          <div>
                            <h2 className='font-semibold text-slate-800 transition group-hover:text-purple-600'>
                              {job.jobTitle}
                            </h2>
                            <div className='mt-1 flex flex-wrap gap-1.5'>
                              <span
                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getJobTypeColor(job.jobType)}`}
                              >
                                {job.jobType}
                              </span>
                              <span className='inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600'>
                                {job.experienceLevel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className='px-6 py-5'>
                        <span className='inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700 shadow-sm'>
                          {job.jobCategory}
                        </span>
                      </td>

                      <td className='px-6 py-5'>
                        <div className='flex items-center gap-2 text-sm text-slate-600'>
                          <FiMapPin className='h-4 w-4 text-slate-400' />
                          <span className='font-medium'>
                            {job.isRemote ? '🌍 Remote' : job.location}
                          </span>
                        </div>
                      </td>

                      <td className='px-6 py-5'>
                        <div className='flex items-baseline gap-1'>
                          <span className='text-sm font-semibold text-slate-800'>
                            {job.currency} {job.minSalary.toLocaleString()}
                          </span>
                          <span className='text-sm text-slate-400'>—</span>
                          <span className='text-sm font-semibold text-slate-800'>
                            {job.maxSalary.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      <td className='px-6 py-5'>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize backdrop-blur-sm ${getStatusClasses(
                            job.status
                          )}`}
                        >
                          <span className='mr-1.5 h-1.5 w-1.5 rounded-full bg-current'></span>
                          {job.status || 'unknown'}
                        </span>
                      </td>

                      <td className='px-6 py-5'>
                        <div className='flex items-center justify-end gap-1.5'>
                          <button
                            type='button'
                            aria-label='View job details'
                            className='inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-indigo-50 hover:text-indigo-600'
                          >
                            <FiEye className='h-4.5 w-4.5' />
                          </button>

                          <button
                            type='button'
                            aria-label='Edit job'
                            className='inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-amber-50 hover:text-amber-600'
                          >
                            <FiEdit2 className='h-4.5 w-4.5' />
                          </button>

                          <button
                            type='button'
                            aria-label='Delete job'
                            className='inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-600'
                          >
                            <FiTrash2 className='h-4.5 w-4.5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='px-6 py-20 text-center'>
                      <div className='mx-auto max-w-sm'>
                        <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 shadow-inner'>
                          <FiBriefcase className='h-8 w-8 text-slate-400' />
                        </div>
                        <h3 className='mt-6 text-lg font-semibold text-slate-800'>
                          No jobs found
                        </h3>
                        <p className='mt-2 text-sm text-slate-500'>
                          Get started by creating your first job posting
                        </p>
                        <button className='mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition-all hover:shadow-xl'>
                          Create Job Posting
                          <FiBriefcase className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterJobs;
