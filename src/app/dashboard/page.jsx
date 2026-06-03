'use client';
import { RiseLoader } from 'react-spinners';
import { useSession } from '../lib/auth-client';

const MainDashboard = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <RiseLoader color='#ef5ff9' />
      </div>
    );
  }
  const user = session?.user;
  return (
    <div>
      <h1 className='min-h-screen text-3xl font-bold text-gray-100 flex justify-center items-center'>
        Welcome to {user?.name || 'User'} Dashboard
      </h1>
    </div>
  );
};

export default MainDashboard;
