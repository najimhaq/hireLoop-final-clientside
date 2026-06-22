// app/jobs/[id]/apply/page.jsx
import AccessDenied from '@/app/components/dashComponents/AccessDenied';
import JobNotFound from '@/app/components/reusable/JobNotFound';
import { getCompanyJobById } from '@/app/lib/api/getCompanyJobs';
import { getUserSession } from '@/app/lib/core/session';
import { redirect } from 'next/navigation';
import JobApply from './JobApply';
import { getApplicationsByApplicant } from '@/app/lib/actions/applications';
import Link from 'next/link';
import { ApplicationStatusCard } from '@/app/components/dashComponents/ApplicationStatusCard';
import { AlreadyAppliedPage } from '@/app/components/dashComponents/AlreadyAppliedPage';
import { UpgradeRequiredPlan } from '@/app/components/dashComponents/UpgradeRequiredPlan';

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
  const PLAN_CONFIG = {
    free: { name: 'Free', maxApplications: 3 },
    pro: { name: 'Pro', maxApplications: 50 },
    enterprise: { name: 'Enterprise', maxApplications: Infinity },
  };

  const plan = PLAN_CONFIG[user?.plan || 'free'];

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

export default ApplyJob;
