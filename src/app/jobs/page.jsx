import JobListingContainer from '../components/dashComponents/jobs/JobListingContainer';
import { getBrowseCompanyJobs } from '../lib/api/getCompanyJobs';

export default async function BrowseJobs({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const filters = resolvedSearchParams || {};

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });

  const queryString = params.toString();
  const jobs = await getBrowseCompanyJobs(queryString);


  return (
    <div className='w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white'>
      <div className='mx-auto mb-10 max-w-7xl'>
        <h1 className='bg-linear-to-r from-violet-400 via-pink-400 to-fuchsia-600 bg-clip-text text-transparent text-4xl font-bold tracking-tight'>
          Open Positions
        </h1>
        <p className='mt-2 text-zinc-400'>
          Discover your next engineering challenge.
        </p>
      </div>

      <JobListingContainer jobs={jobs} filters={filters} />
    </div>
  );
}
