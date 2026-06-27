// src/app/dashboard/admin/users/_components/RoleFilter.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function RoleFilter({ currentRole }) {
  const router = useRouter();

  const handleChange = (e) => {
    const role = e.target.value;
    const params = new URLSearchParams();
    if (role) params.set('role', role);
    router.push(
      `/dashboard/admin/users${params.toString() ? `?${params.toString()}` : ''}`
    );
  };

  return (
    <select
      defaultValue={currentRole}
      onChange={handleChange}
      className='h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white/20'
    >
      <option value=''>All Roles</option>
      <option value='seeker'>Seeker</option>
      <option value='recruiter'>Recruiter</option>
      <option value='admin'>Admin</option>
    </select>
  );
}
