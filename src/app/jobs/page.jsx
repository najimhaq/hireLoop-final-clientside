import JobListingContainer from '../components/dashComponents/jobs/JobListingContainer';
import { getBrowseCompanyJobs } from '../lib/api/getCompanyJobs';

export default async function BrowseJobs() {
  // Fetched server-side on the initial request
  const jobs = await getBrowseCompanyJobs();

  return (
    <div className='w-full min-h-screen bg-zinc-950 p-6 lg:mt-16 md:p-12 text-white'>
      <div className='max-w-7xl mx-auto mb-10'>
        <h1 className='bg-linear-to-r from-violet-400 via-pink-400 to-fuchsia-600 bg-clip-text text-transparent text-4xl font-bold tracking-tight'>
          Open Positions
        </h1>
        <p className='text-zinc-400 mt-2'>
          Discover your next engineering challenge.
        </p>
      </div>

      <JobListingContainer initialJobs={jobs || []} />
    </div>
  );
}
