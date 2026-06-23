// app/dashboard/seeker/applications/page.jsx — Server Component
import { getApplicationsByApplicant } from '@/app/lib/api/getApplicationsByApplicant';
import { getUserSession } from '@/app/lib/core/session';
import { redirect } from 'next/navigation';
import ApplicationsTable from './ApplicationsTable';

const SeekerApplications = async () => {
  const user = await getUserSession();
  if (!user) redirect('/signin');

  const seekerApplications = await getApplicationsByApplicant(user.id);

  return (
    <ApplicationsTable applications={seekerApplications ?? []} user={user} />
  );
};

export default SeekerApplications;
