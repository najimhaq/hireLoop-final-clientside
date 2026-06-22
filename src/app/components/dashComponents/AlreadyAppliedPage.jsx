// src/app/components/dashComponents/AlreadyAppliedPage.jsx
// app/jobs/[id]/apply/page.jsx - main page
import Link from "next/link";
import { FiAlertCircle, FiArrowRight } from "react-icons/fi";

export const AlreadyAppliedPage = () => (
  <div className='min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center px-4'>
    <div className='max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center'>
      <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center'>
        <FiAlertCircle className='w-8 h-8 text-amber-400' />
      </div>
      <h2 className='text-2xl font-bold text-white mb-2'>Already Applied</h2>
      <p className='text-gray-400 mb-6'>
        You have already submitted an application for this position. We&apos;ll
        notify you once there is an update.
      </p>
      <Link
        href='/dashboard/applications'
        className='inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all'
      >
        View My Applications
        <FiArrowRight />
      </Link>
    </div>
  </div>
);
