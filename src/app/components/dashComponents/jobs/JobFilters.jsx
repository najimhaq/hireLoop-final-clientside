import { Magnifier, ChevronDown } from '@gravity-ui/icons';

export default function JobFilters({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  isRemoteOnly,
  setIsRemoteOnly,
}) {
  return (
    <section className='mx-auto mb-10 max-w-7xl rounded-[28px] border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-sm md:p-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
        <div className='md:col-span-5'>
          <label
            htmlFor='job-search'
            className='mb-2 block text-sm font-medium text-zinc-400'
          >
            Search Jobs
          </label>
          <div className='flex h-14 items-center rounded-2xl border border-zinc-800 bg-zinc-900/80 transition focus-within:border-purple-500'>
            <span className='pl-4 text-zinc-500' aria-hidden='true'>
              <Magnifier className='h-5 w-5' />
            </span>
            <input
              id='job-search'
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Title, company, or keywords...'
              className='w-full bg-transparent px-3 pr-4 text-base text-white outline-none placeholder:text-zinc-500'
            />
          </div>
        </div>

        <div className='md:col-span-3'>
          <label
            htmlFor='job-type'
            className='mb-2 block text-sm font-medium text-zinc-400'
          >
            Job Type
          </label>
          <div className='relative'>
            <select
              id='job-type'
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='h-14 w-full appearance-none rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 pr-11 text-base text-white outline-none transition focus:border-purple-500'
            >
              <option value='all'>All Types</option>
              <option value='full-time'>Full-time</option>
              <option value='part-time'>Part-time</option>
              <option value='contract'>Contract</option>
              <option value='internship'>Internship</option>
              <option value='freelance'>Freelance</option>
            </select>
            <ChevronDown
              className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400'
              aria-hidden='true'
            />
          </div>
        </div>

        <div className='md:col-span-2'>
          <label
            htmlFor='job-category'
            className='mb-2 block text-sm font-medium text-zinc-400'
          >
            Category
          </label>
          <div className='relative'>
            <select
              id='job-category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='h-14 w-full appearance-none rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 pr-11 text-base text-white outline-none transition focus:border-purple-500'
            >
              <option value='all'>All Categories</option>
              <option value='technology'>Technology</option>
              <option value='design'>Design</option>
              <option value='marketing'>Marketing</option>
              <option value='sales'>Sales</option>
              <option value='finance'>Finance</option>
              <option value='hr'>HR</option>
            </select>
            <ChevronDown
              className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400'
              aria-hidden='true'
            />
          </div>
        </div>

        <div className='md:col-span-2'>
          <label className='mb-2 block text-sm font-medium text-zinc-400'>
            Work Style
          </label>
          <label
            htmlFor='remote-only'
            className='flex h-14 w-full cursor-pointer select-none items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 text-base font-medium text-zinc-200 transition hover:border-zinc-700'
          >
            <input
              id='remote-only'
              type='checkbox'
              checked={isRemoteOnly}
              onChange={(e) => setIsRemoteOnly(e.target.checked)}
              className='h-4 w-4 accent-purple-500'
            />
            <span>Remote only</span>
          </label>
        </div>
      </div>
    </section>
  );
}
