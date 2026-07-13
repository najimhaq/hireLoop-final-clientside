'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import JobFilters from './JobFilters';
import JobCard from './JobCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function JobListingContainer({ jobs, filters }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = filters?.search || '';
  const selectedType = filters?.jobType || 'all';
  const selectedCategory = filters?.jobCategory || 'all';
  const isRemoteOnly =
    filters?.isRemote === 'true' || filters?.isRemoteOnly || false;
  const page = Number(filters?.page) || 1;

  const jobsData = Array.isArray(jobs?.data)
    ? jobs.data
    : Array.isArray(jobs)
      ? jobs
      : [];

  const totalPages = jobs?.totalPages || 1;
  const hasActiveFilters =
    searchQuery ||
    selectedType !== 'all' ||
    selectedCategory !== 'all' ||
    isRemoteOnly;

  const updateQuery = (nextFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(nextFilters).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === 'all' ||
        value === false
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push('/');
  };

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={(value) => updateQuery({ search: value, page: 1 })}
        selectedType={selectedType}
        setSelectedType={(value) => updateQuery({ jobType: value, page: 1 })}
        selectedCategory={selectedCategory}
        setSelectedCategory={(value) =>
          updateQuery({ jobCategory: value, page: 1 })
        }
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={(value) => updateQuery({ isRemote: value, page: 1 })}
      />

      <div className='mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4'>
        <p className='text-sm text-zinc-500'>
          Showing {jobsData.length} position{jobsData.length !== 1 ? 's' : ''}
        </p>

        {hasActiveFilters && (
          <button
            type='button'
            onClick={handleClearFilters}
            className='rounded-full border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white'
          >
            Clear filters
          </button>
        )}
      </div>

      {jobsData.length > 0 ? (
        <>
          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {jobsData.map((jobItem, index) => (
              <JobCard
                key={jobItem?._id || `${jobItem?.jobTitle || 'job'}-${index}`}
                job={jobItem}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className='mx-auto mt-8 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-4 py-3'>
              <p className='text-xs text-zinc-500'>
                Page {page} of {totalPages}
              </p>

              <div className='flex items-center gap-2'>
                <button
                  onClick={() => updateQuery({ page: Math.max(1, page - 1) })}
                  disabled={page === 1}
                  className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30'
                >
                  <FiChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => updateQuery({ page: p })}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition ${
                        p === page
                          ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                          : 'border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    updateQuery({ page: Math.min(totalPages, page + 1) })
                  }
                  disabled={page === totalPages}
                  className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30'
                >
                  <FiChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className='mx-auto max-w-7xl rounded-[28px] border border-dashed border-zinc-800 bg-zinc-950/50 py-20 text-center'>
          <p className='text-lg text-zinc-400'>
            No positions match your search criteria.
          </p>
          <p className='mt-2 text-sm text-zinc-500'>
            Try adjusting the job type, category, search term, or remote filter.
          </p>
        </div>
      )}
    </>
  );
}
