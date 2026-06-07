'use client';

import { FiSearch, FiMapPin, FiBriefcase, FiRefreshCw } from 'react-icons/fi';

export default function CompanyFilters({
  searchQuery,
  setSearchQuery,
  selectedIndustry,
  setSelectedIndustry,
  selectedLocation,
  setSelectedLocation,
  totalCount,
  filteredCount,
  industries = [],
  locations = [],
  onClear,
}) {
  const hasActiveFilters =
    searchQuery || selectedIndustry !== 'all' || selectedLocation !== 'all';

  return (
    <section className='mb-8 rounded-[28px] border border-white/10 bg-zinc-950/70 p-4 backdrop-blur-xl md:p-5'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
        <div className='lg:col-span-6'>
          <label
            htmlFor='company-search'
            className='mb-2 block text-sm font-medium text-zinc-400'
          >
            Search companies
          </label>
          <div className='flex h-14 items-center rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-white/20'>
            <FiSearch className='mr-3 h-5 w-5 text-zinc-500' />
            <input
              id='company-search'
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by company name, industry, or description...'
              className='w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500'
            />
          </div>
        </div>

        <div className='lg:col-span-3'>
          <label
            htmlFor='industry-filter'
            className='mb-2 block text-sm font-medium text-zinc-400'
          >
            Industry
          </label>
          <div className='relative'>
            <FiBriefcase className='pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-zinc-500' />
            <select
              id='industry-filter'
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className='h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/20'
            >
              <option value='all'>All industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='lg:col-span-3'>
          <label
            htmlFor='location-filter'
            className='mb-2 block text-sm font-medium text-zinc-400'
          >
            Location
          </label>
          <div className='relative'>
            <FiMapPin className='pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-zinc-500' />
            <select
              id='location-filter'
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className='h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/20'
            >
              <option value='all'>All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='mt-4 flex flex-col gap-3 border-t border-white/8 pt-4 md:flex-row md:items-center md:justify-between'>
        <p className='text-sm text-zinc-400'>
          Showing{' '}
          <span className='font-semibold text-white'>{filteredCount}</span> of{' '}
          <span className='font-semibold text-white'>{totalCount}</span>{' '}
          companies
        </p>

        {hasActiveFilters && (
          <button
            type='button'
            onClick={onClear}
            className='inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/8 hover:text-white'
          >
            <FiRefreshCw className='h-4 w-4' />
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
