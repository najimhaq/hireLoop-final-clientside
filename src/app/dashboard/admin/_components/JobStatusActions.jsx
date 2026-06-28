// src/app/dashboard/admin/jobs/_components/JobStatusActions.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

import DeleteJobButton from '@/app/jobs/[id]/delete/DeleteJobButton';
import { apiPatch } from '@/app/lib/core/apiUtils';

export default function JobStatusActions({ job }) {
  const router = useRouter();
  const [status, setStatus] = useState(job.status?.toLowerCase() || 'pending');
  const [loading, setLoading] = useState(null); // 'active' | 'closed' | null

  const handleStatusChange = async (newStatus) => {
    setLoading(newStatus);

    const { data, error } = await apiPatch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${job._id}/status`,
      { status: newStatus }
    );

    if (error) {
      toast.error(error);
    } else {
      setStatus(newStatus);
      toast.success(
        newStatus === 'active'
          ? 'Job approved ✓'
          : newStatus === 'closed'
            ? 'Job closed'
            : `Status → ${newStatus}`
      );
      router.refresh();
    }

    setLoading(null);
  };

  return (
    <div className='flex items-center justify-end gap-1'>
      {/* Approve — শুধু pending/closed এ দেখাবে */}
      {status !== 'active' && (
        <button
          onClick={() => handleStatusChange('active')}
          disabled={loading !== null}
          aria-label='Approve job'
          className='inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 text-xs font-semibold text-emerald-400 border border-emerald-500/20 transition hover:bg-emerald-500/20 disabled:opacity-40'
        >
          {loading === 'active' ? (
            <span className='h-3 w-3 animate-spin rounded-full border border-emerald-400 border-t-transparent' />
          ) : (
            <FiCheck className='h-3.5 w-3.5' />
          )}
          Approve
        </button>
      )}

      {/* Reject/Close — শুধু active/pending এ দেখাবে */}
      {status !== 'closed' && (
        <button
          onClick={() => handleStatusChange('closed')}
          disabled={loading !== null}
          aria-label='Close job'
          className='inline-flex h-8 items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 text-xs font-semibold text-rose-400 border border-rose-500/20 transition hover:bg-rose-500/20 disabled:opacity-40'
        >
          {loading === 'closed' ? (
            <span className='h-3 w-3 animate-spin rounded-full border border-rose-400 border-t-transparent' />
          ) : (
            <FiX className='h-3.5 w-3.5' />
          )}
          Reject
        </button>
      )}

      {/* View */}
      <Link
        href={`/jobs/${job._id}`}
        aria-label='View job'
        className='inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-white/8 hover:text-zinc-300'
      >
        <FiEye className='h-4 w-4' />
      </Link>

      {/* Delete */}
      <DeleteJobButton jobId={job._id} jobTitle={job.jobTitle} />
    </div>
  );
}
