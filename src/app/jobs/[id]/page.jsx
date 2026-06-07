import { getCompanyJobById } from '@/app/lib/api/getCompanyJobs';
import {
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiBookmark,
  FiArrowUpRight,
  FiCheckCircle,
  FiGlobe,
  FiLayers,
} from 'react-icons/fi';

const splitTextToList = (value) => {
  if (!value || typeof value !== 'string') return [];
  return value
    .split(/[\n•]+|(?<=\.)\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const formatSalary = (minSalary, maxSalary, currency = 'USD') => {
  if (!minSalary && !maxSalary) return 'Salary not specified';

  const format = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);

  if (minSalary && maxSalary)
    return `${format(minSalary)} - ${format(maxSalary)}`;
  if (minSalary) return `From ${format(minSalary)}`;
  return `Up to ${format(maxSalary)}`;
};

const formatDate = (value) => {
  if (!value) return 'Not available';
  const raw = value?.$date || value;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return 'Not available';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const result = await getCompanyJobById(id);
  const job = result?.data ?? null;

  if (!job) {
    return (
      <section className='min-h-screen bg-black px-4 pb-8 pt-3 text-white md:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl rounded-[32px] border border-dashed border-white/10 bg-zinc-950/80 p-10 text-center'>
          <h1 className='text-2xl font-semibold text-white'>Job not found</h1>
          <p className='mt-3 text-zinc-400'>
            The job you are looking for does not exist or is no longer
            available.
          </p>
        </div>
      </section>
    );
  }

  const responsibilities = splitTextToList(job?.responsibilities);
  const requirements = splitTextToList(job?.requirements);
  const benefits = splitTextToList(job?.benefits);

  const salary = formatSalary(job?.minSalary, job?.maxSalary, job?.currency);
  const postedAt = formatDate(job?.createdAt);
  const deadline = formatDate(job?.deadline);

  return (
    <section className='min-h-screen bg-black px-4 pb-8 pt-3 text-white md:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-8 lg:grid-cols-[1.7fr_0.9fr]'>
          <div className='space-y-6'>
            <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8'>
              <div className='mb-6'>
                <div>
                  <p className='mb-2 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500'>
                    Job opening
                  </p>
                  <h1 className='text-3xl font-semibold tracking-tight bg-linear-to-r from-violet-400 via-pink-400 to-fuchsia-600 bg-clip-text text-transparent md:text-4xl'>
                    {job?.jobTitle || 'Untitled role'}
                  </h1>
                  <p className='mt-3 text-base text-zinc-400'>
                    {job?.companyName || 'Company not specified'}
                  </p>
                </div>

                <div className='mt-5 flex flex-wrap items-center gap-3'>
                  <button className='inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white'>
                    <FiBookmark className='h-4 w-4' />
                    Save
                  </button>
                  <button className='inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-zinc-200'>
                    Apply now
                    <FiArrowUpRight className='h-4 w-4' />
                  </button>
                </div>
              </div>

              <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                <div className='rounded-2xl border border-white/8 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2 text-zinc-500'>
                    <FiMapPin className='h-4 w-4' />
                    <span className='text-xs uppercase tracking-[0.14em]'>
                      Location
                    </span>
                  </div>
                  <p className='text-sm font-medium text-zinc-200'>
                    {job?.location || 'Not specified'}
                  </p>
                </div>

                <div className='rounded-2xl border border-white/8 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2 text-zinc-500'>
                    <FiBriefcase className='h-4 w-4' />
                    <span className='text-xs uppercase tracking-[0.14em]'>
                      Type
                    </span>
                  </div>
                  <p className='text-sm font-medium capitalize text-zinc-200'>
                    {job?.jobType || 'Not specified'}
                  </p>
                </div>

                <div className='rounded-2xl border border-white/8 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2 text-zinc-500'>
                    <FiDollarSign className='h-4 w-4' />
                    <span className='text-xs uppercase tracking-[0.14em]'>
                      Salary
                    </span>
                  </div>
                  <p className='text-sm font-medium text-zinc-200'>{salary}</p>
                </div>

                <div className='rounded-2xl border border-white/8 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2 text-zinc-500'>
                    <FiClock className='h-4 w-4' />
                    <span className='text-xs uppercase tracking-[0.14em]'>
                      Posted
                    </span>
                  </div>
                  <p className='text-sm font-medium text-zinc-200'>
                    {postedAt}
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6 md:p-8'>
              <h2 className='text-2xl font-semibold tracking-tight text-white'>
                About this role
              </h2>
              <p className='mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400 md:text-base'>
                {job?.responsibilities || 'No role summary available.'}
              </p>
            </div>

            <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6 md:p-8'>
              <h2 className='text-2xl font-semibold tracking-tight text-white'>
                Responsibilities
              </h2>
              <ul className='mt-5 space-y-4'>
                {responsibilities.length > 0 ? (
                  responsibilities.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className='flex gap-3 text-sm leading-7 text-zinc-400 md:text-base'
                    >
                      <FiCheckCircle className='mt-1 h-5 w-5 shrink-0 text-emerald-400' />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className='text-sm text-zinc-500'>
                    No responsibilities listed.
                  </li>
                )}
              </ul>
            </div>

            <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6 md:p-8'>
              <h2 className='text-2xl font-semibold tracking-tight text-white'>
                Requirements
              </h2>
              <ul className='mt-5 space-y-4'>
                {requirements.length > 0 ? (
                  requirements.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className='flex gap-3 text-sm leading-7 text-zinc-400 md:text-base'
                    >
                      <FiCheckCircle className='mt-1 h-5 w-5 shrink-0 text-cyan-400' />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className='text-sm text-zinc-500'>
                    No requirements listed.
                  </li>
                )}
              </ul>
            </div>
          </div>

          <aside className='space-y-6'>
            <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6'>
              <h3 className='text-lg font-semibold text-white'>
                Quick overview
              </h3>
              <div className='mt-5 space-y-4'>
                <div className='flex items-center justify-between border-b border-white/8 pb-3'>
                  <span className='text-sm text-zinc-500'>Experience</span>
                  <span className='text-sm font-medium capitalize text-zinc-200'>
                    {job?.experienceLevel || 'Not specified'}
                  </span>
                </div>
                <div className='flex items-center justify-between border-b border-white/8 pb-3'>
                  <span className='text-sm text-zinc-500'>Work model</span>
                  <span className='text-sm font-medium text-zinc-200'>
                    {job?.isRemote ? 'Remote' : 'On-site'}
                  </span>
                </div>
                <div className='flex items-center justify-between border-b border-white/8 pb-3'>
                  <span className='text-sm text-zinc-500'>Department</span>
                  <span className='text-sm font-medium capitalize text-zinc-200'>
                    {job?.jobCategory || 'Not specified'}
                  </span>
                </div>
                <div className='flex items-center justify-between border-b border-white/8 pb-3'>
                  <span className='text-sm text-zinc-500'>Vacancies</span>
                  <span className='text-sm font-medium text-zinc-200'>
                    {job?.vacancies ?? 'Not specified'}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-zinc-500'>Deadline</span>
                  <span className='text-sm font-medium text-zinc-200'>
                    {deadline}
                  </span>
                </div>
              </div>
            </div>

            <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6'>
              <h3 className='text-lg font-semibold text-white'>
                Benefits & perks
              </h3>
              <ul className='mt-5 space-y-3'>
                {benefits.length > 0 ? (
                  benefits.map((perk, index) => (
                    <li
                      key={`${perk}-${index}`}
                      className='rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-zinc-300'
                    >
                      {perk}
                    </li>
                  ))
                ) : (
                  <li className='rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-zinc-500'>
                    No benefits listed.
                  </li>
                )}
              </ul>
            </div>

            <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-6'>
              <h3 className='text-lg font-semibold text-white'>
                Role snapshot
              </h3>
              <div className='mt-5 space-y-3'>
                <div className='flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-zinc-300'>
                  <FiLayers className='h-4 w-4 text-zinc-500' />
                  Status:{' '}
                  <span className='capitalize text-white'>
                    {job?.status || 'unknown'}
                  </span>
                </div>
                <div className='flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-zinc-300'>
                  <FiGlobe className='h-4 w-4 text-zinc-500' />
                  Visibility:{' '}
                  <span className='text-white'>
                    {job?.isPubliclyVisible ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsPage;
