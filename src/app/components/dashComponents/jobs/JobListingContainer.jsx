'use client';

import { useMemo, useState } from 'react';
import JobFilters from './JobFilters';
import JobCard from './JobCard';

const normalize = (value) => {
  if (typeof value !== 'string') return '';
  return value.toLowerCase().trim().replace(/\s+/g, '-');
};

const normalizeSearch = (value) => {
  if (typeof value !== 'string') return '';
  return value.toLowerCase().trim();
};

export default function JobListingContainer({ initialJobs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    const jobs = Array.isArray(initialJobs?.data)
      ? initialJobs.data
      : Array.isArray(initialJobs)
        ? initialJobs
        : [];

    const query = normalizeSearch(searchQuery);

    return jobs.filter((job) => {
      const title = normalizeSearch(job?.jobTitle);
      const company = normalizeSearch(job?.companyName);
      const requirements = normalizeSearch(job?.requirements);
      const benefits = normalizeSearch(job?.benefits);

      const type = normalize(job?.jobType);
      const category = normalize(job?.jobCategory);

      const matchesSearch =
        !query ||
        title.includes(query) ||
        company.includes(query) ||
        requirements.includes(query) ||
        benefits.includes(query);

      const matchesType = selectedType === 'all' || type === selectedType;

      const matchesCategory =
        selectedCategory === 'all' || category === selectedCategory;

      const matchesRemote = !isRemoteOnly || job?.isRemote === true;

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [initialJobs, searchQuery, selectedType, selectedCategory, isRemoteOnly]);

  const hasActiveFilters =
    searchQuery ||
    selectedType !== 'all' ||
    selectedCategory !== 'all' ||
    isRemoteOnly;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setIsRemoteOnly(false);
  };

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      <div className='mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4'>
        <p className='text-sm text-zinc-500'>
          Showing {filteredJobs.length} position
          {filteredJobs.length !== 1 ? 's' : ''}
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

      {filteredJobs.length > 0 ? (
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredJobs.map((jobItem, index) => (
            <JobCard
              key={jobItem?._id || `${jobItem?.jobTitle || 'job'}-${index}`}
              job={jobItem}
            />
          ))}
        </div>
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
