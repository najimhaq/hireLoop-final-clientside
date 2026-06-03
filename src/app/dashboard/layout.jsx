import React from 'react';
import { DashboardSidebar } from '../components/dashComponents/DashboardSidebar';

const Dashboardlayout = ({ children }) => {
  return (
    <div className='flex h-screen w-full overflow-hidden mt-25'>
      <DashboardSidebar />
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Dashboardlayout;
