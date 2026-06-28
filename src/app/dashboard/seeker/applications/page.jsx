// app/dashboard/seeker/applications/page.jsx — Server Component
import { getApplicationsByApplicant } from '@/app/lib/api/getApplicationsByApplicant';

import { redirect } from 'next/navigation';
import ApplicationsTable from './ApplicationsTable';
import { getUser } from '@/app/lib/core/session';

const SeekerApplications = async () => {
  const user = await getUser();
  if (!user) redirect('/signin');

  const seekerApplications = await getApplicationsByApplicant(user.id);

  return (
    <ApplicationsTable applications={seekerApplications ?? []} user={user} />
  );
};

export default SeekerApplications;
