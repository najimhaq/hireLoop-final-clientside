// src/app/dashboard/admin/companies/CompanyStatusActions.jsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CompanyStatusActions({ companyId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(null); // 'approved' | 'rejected' | null
  const router = useRouter();

  const handleAction = async (newStatus) => {
    setLoading(newStatus);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/${companyId}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: newStatus }),
        }
      );

      // ✅ JSON parse করার আগে content-type চেক করুন
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(
          `Server returned HTML instead of JSON. Status: ${res.status}`
        );
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');

      setStatus(newStatus);
      toast.success(
        newStatus === 'approved' ? 'Company approved ✓' : 'Company rejected'
      );
      router.refresh();
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  if (status === 'approved') {
    return (
      <span className='text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0'>
        ✓ Approved
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span className='text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0'>
        ✕ Rejected
      </span>
    );
  }

  // pending → show both buttons
  return (
    <div className='flex items-center gap-2 shrink-0'>
      <button
        onClick={() => handleAction('approved')}
        disabled={!!loading}
        className='h-9 px-4 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading === 'approved' ? 'Approving...' : 'Approve'}
      </button>
      <button
        onClick={() => handleAction('rejected')}
        disabled={!!loading}
        className='h-9 px-4 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold hover:bg-rose-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading === 'rejected' ? 'Rejecting...' : 'Reject'}
      </button>
    </div>
  );
}
