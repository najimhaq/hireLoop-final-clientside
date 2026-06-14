import AccessDenied from '@/app/components/dashComponents/AccessDenied';
import JobNotFound from '@/app/components/reusable/JobNotFound';
import { getCompanyJobById } from '@/app/lib/api/getCompanyJobs';
import { getUserSession } from '@/app/lib/core/session';
import { redirect } from 'next/navigation';
import JobApply from './JobApply';

const ApplyJob = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  //   console.log('ApplyJob Inside', user);

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }
  if (user && user.role !== 'seeker') {
    return (
      <>
        <section className='min-h-screen bg-black px-4 pb-8 pt-3 text-white md:px-6 lg:px-8'>
          <AccessDenied role={user.role} />
        </section>
      </>
    );
  }

  const result = await getCompanyJobById(id);
  const job = result?.data ?? null;

    console.log('Inside apply', job);
  if (!job) {
    return <JobNotFound />;
  }
  return (
    <>
      <section className='min-h-screen bg-black px-4 pb-8 pt-3 text-white md:px-6 lg:px-8'>
        <JobApply job={job} />

      </section>
    </>
  );
};

export default ApplyJob;
