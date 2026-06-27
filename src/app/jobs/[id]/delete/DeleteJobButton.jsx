// src/app/dashboard/recruiter/jobs/DeleteJobButton.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { deleteJobById } from '@/app/lib/api/deleteJobById';

export default function DeleteJobButton({ jobId, jobTitle }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteJobById(jobId);
      if (res?.success) {
        toast.success(`"${jobTitle}" deleted`);
        router.refresh();
      } else {
        toast.error(res?.message || 'Delete failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  if (confirm) {
    return (
      <div className='flex items-center gap-1.5'>
        <button
          onClick={handleDelete}
          disabled={loading}
          className='inline-flex h-7 items-center rounded-lg bg-rose-500/15 px-2.5 text-xs font-semibold text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 transition disabled:opacity-50'
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className='inline-flex h-7 items-center rounded-lg bg-slate-100 px-2.5 text-xs font-medium text-slate-500 hover:bg-slate-200 transition'
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      aria-label='Delete job'
      className='inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-600'
    >
      <FiTrash2 className='h-4 w-4' />
    </button>
  );
}
