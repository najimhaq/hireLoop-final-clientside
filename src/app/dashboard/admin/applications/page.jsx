// app/dashboard/admin/applications/page.jsx

import { getAllJobApplications } from '@/app/lib/actions/applications';
import ApplicationsManager from './ApplicationsManager';

export const dynamic = 'force-dynamic';

export default async function AdminApplicationsPage() {
  const result = await getAllJobApplications();
  const applications = result?.data ?? [];
  const total = result?.total ?? 0;

  return (
    <div className='min-h-screen bg-zinc-950 p-6 md:p-10 text-white'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-white'>Manage Applications</h1>
          <p className='text-sm text-zinc-500 mt-1'>
            Review and manage all job applications across the platform.
          </p>
        </div>

        <ApplicationsManager applications={applications} total={total} />
      </div>
    </div>
  );
}
