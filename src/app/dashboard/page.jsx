'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../lib/auth-client';
import { RiseLoader } from 'react-spinners';

export default function DashboardRedirect() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    const role = session?.user?.role;
    if (role === 'seeker') router.replace('/dashboard/seeker');
    else if (role === 'recruiter') router.replace('/dashboard/recruiter');
    else if (role === 'admin') router.replace('/dashboard/admin');
    else router.replace('/signin');
  }, [session, isPending, router]);

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <RiseLoader color='#ef5ff9' />
    </div>
  );
}
