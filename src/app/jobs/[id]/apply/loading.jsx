// src/app/jobs/[id]/apply/loading.jsx
export default function Loading() {
  return (
    <section className='min-h-screen bg-black px-4 pb-8 pt-3 text-white md:px-6 lg:px-8'>
      <div className='animate-pulse space-y-6 pt-6'>
        {/* Header skeleton */}
        <div className='h-4 w-32 rounded-full bg-zinc-800' />
        <div className='h-7 w-64 rounded-lg bg-zinc-800' />
        <div className='h-4 w-80 rounded bg-zinc-800' />

        {/* Form skeleton */}
        <div className='rounded-[32px] border border-white/10 bg-zinc-950/80 p-8 space-y-5'>
          <div className='grid gap-5 md:grid-cols-2'>
            <div className='h-12 rounded-2xl bg-zinc-800' />
            <div className='h-12 rounded-2xl bg-zinc-800' />
          </div>
          <div className='grid gap-5 md:grid-cols-2'>
            <div className='h-12 rounded-2xl bg-zinc-800' />
            <div className='h-12 rounded-2xl bg-zinc-800' />
          </div>
          <div className='h-12 rounded-2xl bg-zinc-800' />
          <div className='h-36 rounded-2xl bg-zinc-800' />
          <div className='h-12 rounded-2xl bg-zinc-800' />
        </div>
      </div>
    </section>
  );
}
