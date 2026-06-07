
import BrowseCompaniesClient from '../components/dashComponents/companies/BrowseCompaniesClient';
import { getBrowseCompanies } from '../lib/api/companies';

const BrowseCompanies = async () => {
  const result = await getBrowseCompanies();
  const companies = result?.data || [];

  return (
    <section className='mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-6 lg:px-8'>
      <div className='mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='mb-2 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500'>
            Directory
          </p>
          <h1 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>
            Browse Companies
          </h1>
          <p className='mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base'>
            Explore verified companies, search by keyword, and narrow results by
            industry or location.
          </p>
        </div>
      </div>

      <BrowseCompaniesClient companies={companies} />
    </section>
  );
};

export default BrowseCompanies;
