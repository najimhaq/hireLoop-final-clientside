// src/app/dashboard/layout.jsx
'use client';

import { Toaster } from 'react-hot-toast';
import { DashboardSidebar } from '../components/dashComponents/DashboardSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className='flex h-screen overflow-hidden bg-black'>
      <DashboardSidebar />
      <main className='flex-1 overflow-y-auto bg-linear-to-br from-gray-950 to-black'>
        <div className='p-6 lg:p-8'>{children}</div>
      </main>
      <Toaster position='top-right' />
    </div>
  );
}
