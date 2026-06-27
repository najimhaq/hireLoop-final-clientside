// src/app/dashboard/admin/companies/page.jsx
import Image from 'next/image';
import { getBrowseCompanies } from '@/app/lib/api/companies';
import CompanyStatusActions from './CompanyStatusActions';
import { Building2, Clock, CheckCircle, XCircle } from 'lucide-react';

const CompaniesPageInAdmin = async () => {
  const result = await getBrowseCompanies();
  const companies = result?.data || [];

  // Stats
  const total = companies.length;
  const pending = companies.filter((c) => c.status === 'pending').length;
  const approved = companies.filter((c) => c.status === 'approved').length;
  const rejected = companies.filter((c) => c.status === 'rejected').length;

  const stats = [
    {
      label: 'Total',
      value: total,
      icon: Building2,
      color: 'text-zinc-400',
      bg: 'bg-zinc-800/50 border-zinc-700/50',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Approved',
      value: approved,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Rejected',
      value: rejected,
      icon: XCircle,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <div className='min-h-screen bg-zinc-950 px-4 py-8 md:px-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Page Header */}
        <div>
          <h1 className='text-2xl font-bold text-white'>Company Management</h1>
          <p className='text-sm text-zinc-500 mt-1'>
            Review and manage company registration requests.
          </p>
        </div>

        {/* Stats Row */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className={`rounded-xl border p-4 flex items-center gap-3 ${bg}`}
            >
              <Icon size={20} className={color} />
              <div>
                <p className='text-xs text-zinc-500 font-medium'>{label}</p>
                <p className={`text-xl font-bold ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Companies List */}
        {companies.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center space-y-3'>
            <Building2 size={40} className='text-zinc-700' />
            <p className='text-zinc-400 font-medium'>
              No companies registered yet
            </p>
            <p className='text-zinc-600 text-sm'>
              Registered companies will appear here for review.
            </p>
          </div>
        ) : (
          <div className='space-y-3'>
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Company Card (Server Component)
function CompanyCard({ company }) {
  const statusStyles = {
    approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  const style = statusStyles[company.status] || statusStyles.pending;

  return (
    <div className='bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-zinc-700 transition'>
      {/* Logo + Info */}
      <div className='flex items-center gap-4 flex-1 min-w-0'>
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.companyName}
            width={48}
            height={48}
            className='w-12 h-12 rounded-xl object-contain bg-zinc-800 p-1.5 border border-zinc-700 shrink-0'
          />
        ) : (
          <div className='w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0'>
            <Building2 size={20} className='text-zinc-600' />
          </div>
        )}

        <div className='min-w-0'>
          <div className='flex flex-wrap items-center gap-2'>
            <h3 className='text-white font-semibold text-sm truncate'>
              {company.companyName}
            </h3>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize shrink-0 ${style}`}
            >
              {company.status}
            </span>
          </div>
          <div className='flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-zinc-500'>
            <span>{company.industry}</span>
            <span>•</span>
            <span>{company.location}</span>
            <span>•</span>
            <span>{company.employeeCount}</span>
          </div>
          <a
            href={company.website}
            target='_blank'
            rel='noreferrer'
            className='text-xs text-zinc-500 hover:text-zinc-300 transition truncate block mt-0.5 max-w-xs'
          >
            {company.website}
          </a>
        </div>
      </div>

      {/* Description */}
      {/* <p className='text-xs text-zinc-500 leading-relaxed max-w-xs hidden lg:block line-clamp-2'>
        {company.description}
      </p> */}
      {/* Company Job Count */}
      <p className='text-xs text-zinc-600 shrink-0 hidden md:block'>
        Total Jobs - {company.jobCount}
      </p>

      {/* Date */}
      <p className='text-xs text-zinc-600 shrink-0 hidden md:block'>
        {new Date(company.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>

      {/* Actions — Client Component */}
      <CompanyStatusActions
        companyId={company._id}
        currentStatus={company.status}
      />
    </div>
  );
}

export default CompaniesPageInAdmin;
