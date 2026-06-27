// src/app/jobs/[id]/edit/page.jsx


import { redirect } from 'next/navigation';
import EditJobForm from './editJobForm';
import { getCompanyJobById } from '@/app/lib/api/getCompanyJobs';


export const dynamic = 'force-dynamic';

const EditJobPage = async ({ params }) => {
  const { id } = await params;
  const result = await getCompanyJobById(id);
  const job = result?.data ?? null;

  if (!job) redirect('/dashboard/recruiter/jobs');

  return (
    <section className='min-h-screen bg-black px-4 pb-16 pt-8 text-white md:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8'>
          <p className='text-xs font-semibold uppercase tracking-widest text-zinc-500'>
            Editing Job
          </p>
          <h1 className='mt-1 text-2xl font-semibold tracking-tight text-white'>
            {job.jobTitle}
          </h1>
        </div>
        <EditJobForm job={job} />
      </div>
    </section>
  );
};

export default EditJobPage;
