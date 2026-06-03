'use client';
import { useSession } from '@/app/lib/auth-client';
import { RiseLoader } from 'react-spinners';

import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
} from 'react-icons/fi';
import { StatsGrid } from '@/app/components/dashComponents/StatsGrid';

const RecruiterDashboardpage = () => {
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
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <RiseLoader color='#ef5ff9' />
      </div>
    );
  }
  const userRole = session?.user;

  return (
    <div className='min-h-screen bg-linear-to-br from-black via-gray-950 to-black px-8 pt-16'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white'>Recruiter Dashboard</h1>

          {userRole && (
            <p className='text-2xl text-muted'>Welcome, {session.user.name}!</p>
          )}
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={statsData} columns={4} />
      </div>
    </div>
  );
};

export default RecruiterDashboardpage;
