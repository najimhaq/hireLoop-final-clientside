'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/app/lib/auth-client';
import { RiseLoader } from 'react-spinners';
import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiLock,
} from 'react-icons/fi';
import { StatsGrid } from '@/app/components/dashComponents/StatsGrid';

const RecruiterDashboardpage = () => {
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const statsData = [
    {
      title: 'Total Job Posts',
      value: '48',
      icon: FiBriefcase,
      trend: 'up',
      trendValue: '12',
    },
    {
      title: 'Total Applicants',
      value: '1,284',
      icon: FiUsers,
      trend: 'up',
      trendValue: '23',
    },
    {
      title: 'Active Jobs',
      value: '18',
      icon: FiTrendingUp,
      trend: 'down',
      trendValue: '5',
    },
    {
      title: 'Jobs Closed',
      value: '32',
      icon: FiCheckCircle,
      trend: 'up',
      trendValue: '8',
    },
  ];

  if (!mounted || isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <RiseLoader color='#ef5ff9' />
      </div>
    );
  }

  if (session?.user?.role !== 'recruiter') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-black via-gray-950 to-black px-6'>
        <div className='w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl'>
          <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20'>
            <FiLock className='h-6 w-6 text-violet-400' />
          </div>
          <h1 className='text-2xl font-bold text-white'>Access Restricted</h1>
          <p className='mt-3 text-gray-400'>
            You need to sign in as a recruiter to view the recruiter dashboard.
          </p>
          <Link
            href='/signin'
            className='mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500'
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-black via-gray-950 to-black px-8 pt-16'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white'>Recruiter Dashboard</h1>
          <p className='text-2xl text-muted'>Welcome, {session.user.name}!</p>
        </div>

        <StatsGrid stats={statsData} columns={4} />
      </div>
    </div>
  );
};

export default RecruiterDashboardpage;
