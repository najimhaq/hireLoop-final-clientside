import React from 'react';
import CompanyProfile from './CompanyProfile';

import { getUserSession } from '@/app/lib/core/session';
import { getCompanyByRecruiterId } from '@/app/lib/api/companies';


const CompanyPage = async () => {
  let user = null;
  let company = null;

  try {
    user = await getUserSession();

    if (user?.id) {
      const result = await getCompanyByRecruiterId(user.id);
      company = result?.data || null;
    }
  } catch (error) {
    console.error('Failed to load company:', error.message);
  }

  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;
