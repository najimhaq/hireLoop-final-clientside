'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { apiPatch } from '@/app/lib/core/apiUtils';


export default function CompanyStatusActions({ companyId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  const handleAction = async (newStatus) => {
    setLoading(newStatus);
    const { data, error } = await apiPatch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/${companyId}/status`,
      { status: newStatus }
    );
    if (error) {
      toast.error(error);
    } else {
      setStatus(newStatus);
      toast.success(
        newStatus === 'approved' ? 'Company approved ✓' : 'Company rejected'
      );
      router.refresh();
    }
    setLoading(null);
  };

  return (
    <div className='flex items-center gap-2 shrink-0'>
      {/* Approved হলে — Reject button দেখাবে */}
      {status === 'approved' && (
        <>
          <span className='text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
            ✓ Approved
          </span>
          <button
            onClick={() => handleAction('rejected')}
            disabled={!!loading}
            className='h-8 px-3 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold hover:bg-rose-500/20 transition disabled:opacity-50'
          >
            {loading === 'rejected' ? '...' : 'Reject'}
          </button>
        </>
      )}

      {/* Rejected হলে — Approve button দেখাবে */}
      {status === 'rejected' && (
        <>
          <span className='text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20'>
            ✕ Rejected
          </span>
          <button
            onClick={() => handleAction('approved')}
            disabled={!!loading}
            className='h-8 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition disabled:opacity-50'
          >
            {loading === 'approved' ? '...' : 'Approve'}
          </button>
        </>
      )}

      {/* Pending হলে — দুটো button */}
      {status === 'pending' && (
        <>
          <button
            onClick={() => handleAction('approved')}
            disabled={!!loading}
            className='h-8 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition disabled:opacity-50'
          >
            {loading === 'approved' ? 'Approving...' : 'Approve'}
          </button>
          <button
            onClick={() => handleAction('rejected')}
            disabled={!!loading}
            className='h-8 px-3 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold hover:bg-rose-500/20 transition disabled:opacity-50'
          >
            {loading === 'rejected' ? 'Rejecting...' : 'Reject'}
          </button>
        </>
      )}
    </div>
  );
}
