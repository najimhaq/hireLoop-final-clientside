// app/jobs/[id]/apply/page.jsx
import AccessDenied from '@/app/components/dashComponents/AccessDenied';
import JobNotFound from '@/app/components/reusable/JobNotFound';
import { getCompanyJobById } from '@/app/lib/api/getCompanyJobs';
import { getUserSession } from '@/app/lib/core/session';
import { redirect } from 'next/navigation';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/app/lib/actions/applications';
import Link from 'next/link';
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiLock,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';

const ApplyJob = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user && user.role !== 'seeker') {
    return (
      <section className='min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 px-4 py-12 md:px-6 lg:px-8'>
        <AccessDenied role={user.role} />
      </section>
    );
  }

  const [userApplications, result] = await Promise.all([
    getApplicationsByApplicant(user.id),
    getCompanyJobById(id),
  ]);

  const isUserApplied = userApplications.some(
    (application) => application.jobId === id || application.job_id === id
  );

  if (isUserApplied) {
    return <AlreadyAppliedPage />;
  }

  const job = result?.data ?? null;

  // This should come from your database/user subscription
  const plan = {
    name: 'Free',
    maxApplications: 3,
    currentApplications: userApplications.length,
  };

  if (!job) return <JobNotFound />;

  const hasReachedLimit = userApplications.length >= plan.maxApplications;

  return (
    <section className='min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950'>
      <div className='container mx-auto px-4 py-12 md:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            href={`/jobs/${id}`}
            className='inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4'
          >
            ← Back to Job
          </Link>
          <h1 className='text-3xl md:text-4xl font-bold text-white'>
            Apply for Position
          </h1>
          <p className='text-gray-400 mt-2'>
            {job.title} at {job.companyName}
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Application Form */}
          <div className='lg:col-span-2'>
            {hasReachedLimit ? (
              <UpgradeRequiredPlan
                plan={plan}
                currentApplications={userApplications.length}
                maxApplications={plan.maxApplications}
              />
            ) : (
              <JobApply job={job} user={user} />
            )}
          </div>

          {/* Sidebar - Application Limit Info */}
          <div className='lg:col-span-1'>
            <ApplicationStatusCard
              plan={plan}
              currentApplications={userApplications.length}
              hasReachedLimit={hasReachedLimit}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Already Applied Component
const AlreadyAppliedPage = () => (
  <div className='min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center px-4'>
    <div className='max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center'>
      <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center'>
        <FiAlertCircle className='w-8 h-8 text-amber-400' />
      </div>
      <h2 className='text-2xl font-bold text-white mb-2'>Already Applied</h2>
      <p className='text-gray-400 mb-6'>
        You have already submitted an application for this position. We&apos;ll
        notify you once there is an update.
      </p>
      <Link
        href='/dashboard/applications'
        className='inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all'
      >
        View My Applications
        <FiArrowRight />
      </Link>
    </div>
  </div>
);

// Upgrade Required Component
const UpgradeRequiredPlan = ({
  plan,
  currentApplications,
  maxApplications,
}) => (
  <div className='bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8'>
    <div className='text-center mb-6'>
      <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center'>
        <FiLock className='w-10 h-10 text-white' />
      </div>
      <h2 className='text-2xl font-bold text-white'>
        Application Limit Reached
      </h2>
      <p className='text-gray-400 mt-2'>
        You have used {currentApplications} out of {maxApplications} free
        applications
      </p>
    </div>

    <div className='bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6'>
      <div className='flex items-start gap-3'>
        <FiAlertCircle className='w-5 h-5 text-amber-400 mt-0.5' />
        <div>
          <p className='text-amber-400 font-medium'>Free Plan Limit Reached</p>
          <p className='text-sm text-gray-400 mt-1'>
            Upgrade to Pro or Enterprise to continue applying for more jobs
          </p>
        </div>
      </div>
    </div>

    <Link
      href='/pricing'
      className='w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all'
    >
      Upgrade Plan
      <FiTrendingUp />
    </Link>
  </div>
);

// Application Status Card
const ApplicationStatusCard = ({
  plan,
  currentApplications,
  hasReachedLimit,
}) => {
  const percentage = (currentApplications / plan.maxApplications) * 100;

  return (
    <div className='bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-24'>
      <h3 className='text-lg font-semibold text-white mb-4'>
        Your Application Status
      </h3>

      {/* Plan Info */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-gray-400'>Current Plan</span>
          <span className='text-white font-semibold'>{plan.name}</span>
        </div>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-gray-400'>Applications Used</span>
          <span
            className={`font-semibold ${hasReachedLimit ? 'text-amber-400' : 'text-emerald-400'}`}
          >
            {currentApplications} / {plan.maxApplications}
          </span>
        </div>

        {/* Progress Bar */}
        <div className='mt-2 h-2 bg-white/10 rounded-full overflow-hidden'>
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              hasReachedLimit
                ? 'bg-amber-500'
                : 'bg-linear-to-r from-violet-500 to-fuchsia-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Features */}
      <div className='border-t border-white/10 pt-4'>
        <p className='text-sm text-gray-400 mb-3'>Free Plan Features:</p>
        <ul className='space-y-2'>
          <li className='flex items-center gap-2 text-sm'>
            <FiCheckCircle className='w-4 h-4 text-emerald-400' />
            <span className='text-gray-300'>Browse jobs</span>
          </li>
          <li className='flex items-center gap-2 text-sm'>
            <FiCheckCircle className='w-4 h-4 text-emerald-400' />
            <span className='text-gray-300'>Save up to 10 jobs</span>
          </li>
          <li className='flex items-center gap-2 text-sm'>
            <FiCheckCircle className='w-4 h-4 text-emerald-400' />
            <span className='text-gray-300'>Basic profile</span>
          </li>
        </ul>
      </div>

      {!hasReachedLimit && (
        <div className='mt-6 p-3 bg-violet-500/10 rounded-xl border border-violet-500/20'>
          <div className='flex items-start gap-2'>
            <FiStar className='w-4 h-4 text-violet-400 mt-0.5' />
            <p className='text-xs text-gray-300'>
              You have {plan.maxApplications - currentApplications} application
              {plan.maxApplications - currentApplications !== 1 ? 's' : ''}{' '}
              remaining
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
