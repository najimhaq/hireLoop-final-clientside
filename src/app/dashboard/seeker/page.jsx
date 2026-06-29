// app/dashboard/seeker/page.jsx — Server Component

import { getApplicationsByApplicant } from '@/app/lib/actions/applications';
import { redirect } from 'next/navigation';
import SeekerDashboard from './SeekerDashboard';
import { getUser } from '@/app/lib/core/session';

export default async function SeekerDashboardPage() {
  const user = await getUser();
  // console.log('in Seeker Main Page', user)

  if (!user) redirect('/signin');
  if (user.role !== 'seeker') redirect('/unauthorized');

  const applications = await getApplicationsByApplicant(user.id);

  return <SeekerDashboard user={user} applications={applications ?? []} />;
}
