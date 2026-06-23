import Image from 'next/image';
import Link from 'next/link';
import { getCompanyById } from '../../lib/api/companies';
import { MdLocationOn, MdPeople, MdWork } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';

const CompanyDetailsPage = async ({ params }) => {
  const { id } = await params;
  const result = await getCompanyById(id);
  const company = result?.data;

  if (!company) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-zinc-400'>Company not found.</p>
      </div>
    );
  }

  return (
    <section className='mx-auto min-h-screen max-w-4xl px-4 py-10 md:px-6 lg:px-8'>
      {/* Back Button */}
      <Link
        href='/companies'
        className='mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white'
      >
        ← Back to Companies
      </Link>

      {/* Header Card */}
      <div className='mb-6 rounded-3xl border border-white/10 bg-zinc-900 p-8'>
        <div className='flex flex-col items-start gap-6 sm:flex-row sm:items-center'>
          {/* Logo */}
          <div className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-800'>
            {company.logo ? (
              <Image
                src={company.logo}
                alt={`${company.companyName} logo`}
                width={80}
                height={80}
                unoptimized
                className='h-16 w-16 object-contain'
              />
            ) : (
              <span className='text-2xl font-bold text-zinc-300'>
                {company.companyName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Name & Industry */}
          <div className='flex-1'>
            <h1 className='text-3xl font-semibold text-white'>
              {company.companyName}
            </h1>
            <p className='mt-1 text-sm font-medium text-purple-400'>
              {company.industry}
            </p>

            {/* Tags */}
            <div className='mt-4 flex flex-wrap gap-2'>
              {company.location && (
                <span className='inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300'>
                  <MdLocationOn className='h-3.5 w-3.5 text-purple-400' />
                  {company.location}
                </span>
              )}
              {company.employeeCount && (
                <span className='inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300'>
                  <MdPeople className='h-3.5 w-3.5 text-purple-400' />
                  {company.employeeCount}
                </span>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-purple-500/40 hover:text-white'
                >
                  <TbWorld className='h-3.5 w-3.5 text-purple-400' />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      {company.description && (
        <div className='mb-6 rounded-3xl border border-white/10 bg-zinc-900 p-8'>
          <h2 className='mb-3 flex items-center gap-2 text-lg font-semibold text-white'>
            <MdWork className='h-5 w-5 text-purple-400' />
            About
          </h2>
          <p className='leading-7 text-zinc-400'>{company.description}</p>
        </div>
      )}
    </section>
  );
};

export default CompanyDetailsPage;
