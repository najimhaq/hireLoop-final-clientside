// src/app/dashboard/admin/users/_components/UserActions.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { apiDelete, apiPatchForApproval } from '@/app/lib/api/apiUtils';


// ✅ Component এর বাইরে define করুন
const ActionBtn = ({ onClick, disabled, color, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex h-7 items-center rounded-lg px-2.5 text-xs font-semibold transition disabled:opacity-40 ${color}`}
  >
    {children}
  </button>
);

export default function UserActions({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(null);

  const status = user.status?.toLowerCase();
  const role = user.role?.toLowerCase();
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleStatusChange = async (newStatus) => {
    setLoading(newStatus);
    const { error } = await apiPatchForApproval(`${base}/api/users/${user._id}/status`, {
      status: newStatus,
    });
    if (error) toast.error(error);
    else {
      toast.success(
        newStatus === 'active' ? 'User activated ✓' : 'User suspended'
      );
      router.refresh();
    }
    setLoading(null);
  };

  const handleRoleChange = async (newRole) => {
    setLoading(newRole);
    const { error } = await apiPatch(`${base}/api/users/${user._id}/role`, {
      role: newRole,
    });
    if (error) toast.error(error);
    else {
      toast.success(`Role changed to ${newRole} ✓`);
      router.refresh();
    }
    setLoading(null);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${user.name}"? This cannot be undone.`)) return;
    setLoading('delete');
    const { error } = await apiDelete(`${base}/api/users/${user._id}`);
    if (error) toast.error(error);
    else {
      toast.success('User deleted');
      router.refresh();
    }
    setLoading(null);
  };

  return (
    <div className='flex items-center justify-end gap-1.5'>


      {/* Status toggle */}
      {status === 'suspended' ? (
        <ActionBtn
          onClick={() => handleStatusChange('active')}
          disabled={loading !== null}
          color='text-emerald-400 hover:bg-emerald-400/10'
        >
          {loading === 'active' ? '...' : 'Activate'}
        </ActionBtn>
      ) : (
        <ActionBtn
          onClick={() => handleStatusChange('suspended')}
          disabled={loading !== null}
          color='text-rose-400 hover:bg-rose-400/10'
        >
          {loading === 'suspended' ? '...' : 'Suspend'}
        </ActionBtn>
      )}

      {/* Delete */}
      {status === 'suspended' && (
        <ActionBtn
          onClick={handleDelete}
          disabled={loading !== null}
          color='text-rose-500 hover:bg-rose-500/10'
        >
          {loading === 'delete' ? '...' : 'Delete'}
        </ActionBtn>
      )}
    </div>
  );
}
