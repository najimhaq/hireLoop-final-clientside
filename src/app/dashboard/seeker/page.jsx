// app/dashboard/seeker/page.jsx — Server Component
import { getUserSession } from '@/app/lib/core/session';
import { getApplicationsByApplicant } from '@/app/lib/actions/applications';
import { redirect } from 'next/navigation';
import SeekerDashboard from './SeekerDashboard';

export default async function SeekerDashboardPage() {
  const user = await getUserSession();

  if (!user) redirect('/signin');
  if (user.role !== 'seeker') redirect('/unauthorized');

  const applications = await getApplicationsByApplicant(user.id);

  return <SeekerDashboard user={user} applications={applications ?? []} />;
}
