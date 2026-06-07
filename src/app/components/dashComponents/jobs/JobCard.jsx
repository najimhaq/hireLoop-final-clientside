import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Briefcase, CircleDollar, ArrowRight } from '@gravity-ui/icons';

const safeText = (value, fallback = '') => {
  if (typeof value !== 'string') return fallback;
  return value.replace(/\s+/g, ' ').trim();
};

const safeId = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.$oid) return String(value.$oid);
  return String(value);
};

const formatSalary = (amount) => {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) return null;
  if (numericAmount >= 1000) {
    const formatted = (numericAmount / 1000).toFixed(
      numericAmount % 1000 === 0 ? 0 : 1
    );
    return `${formatted}k`;
  }
  return String(numericAmount);
};

export default function JobCard({ job }) {
  console.log('Jobcard page:', job)
  if (!job || typeof job !== 'object') return null;

  const companyName = safeText(job.companyName, 'Confidential');
  const jobTitle = safeText(job.jobTitle, 'Untitled role');
  const location = safeText(job.location);
  const jobType = safeText(job.jobType);
  const requirements = safeText(job.requirements);
  const benefits = safeText(job.benefits);
  const responsibilities = safeText(job.responsibilities);
  const logo = safeText(job.companyLogo);
  const jobId = safeId(job._id);

  const minSalary = formatSalary(job.minSalary);
  const maxSalary = formatSalary(job.maxSalary);

  const salaryRange =
    minSalary && maxSalary
      ? `$${minSalary}–$${maxSalary} / year`
      : 'Salary negotiable';

  return (
    <article className='group flex h-full w-full max-w-105 flex-col rounded-[28px] border border-white/10 bg-zinc-950/90 p-6 text-zinc-100 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_24px_70px_rgba(88,28,135,0.18)]'>
      <div className='mb-5 flex items-center gap-3'>
        <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900'>
          {logo ? (
            <Image
              src={logo}
              alt={`${companyName} logo`}
              width={48}
              height={48}
              unoptimized
              className='h-10 w-10 rounded-xl object-contain'
            />
          ) : (
            <span className='text-sm font-semibold text-zinc-300'>
              {companyName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className='min-w-0'>
          <p className='truncate text-sm font-medium text-zinc-400'>
            {companyName}
          </p>
          {location && (
            <p className='truncate text-xs text-zinc-500'>
              {location} {job.isRemote ? '• Remote' : ''}
            </p>
          )}
        </div>
      </div>

      <div className='mb-4'>
        <h3 className='line-clamp-2 text-2xl font-semibold leading-tight text-white'>
          {jobTitle}
        </h3>
      </div>

      {responsibilities && (
        <p className='mb-5 line-clamp-3 text-sm leading-6 text-zinc-400'>
          {responsibilities}
        </p>
      )}

      <div className='mb-5 flex flex-wrap gap-2'>
        {location && (
          <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200'>
            <MapPin className='h-4 w-4 text-purple-400' />
            {location}
          </span>
        )}

        {jobType && (
          <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium capitalize text-zinc-200'>
            <Briefcase className='h-4 w-4 text-purple-400' />
            {jobType}
          </span>
        )}

        <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200'>
          <CircleDollar className='h-4 w-4 text-purple-400' />
          {salaryRange}
        </span>
      </div>

      {(requirements || benefits) && (
        <div className='mb-6 space-y-2 border-t border-white/10 pt-4 text-sm text-zinc-400'>
          {requirements && (
            <p className='line-clamp-2'>
              <span className='font-medium text-zinc-300'>Requirements:</span>{' '}
              {requirements}
            </p>
          )}
          {benefits && (
            <p className='line-clamp-2'>
              <span className='font-medium text-zinc-300'>Benefits:</span>{' '}
              {benefits}
            </p>
          )}
        </div>
      )}

      <div className='mt-auto pt-2'>
        <Link
          href={jobId ? `/jobs/${jobId}` : '/jobs'}
          className='inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-purple-300'
          aria-label={`Apply now for ${jobTitle} at ${companyName}`}
        >
          Apply Now
          <ArrowRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
        </Link>
      </div>
    </article>
  );
}
