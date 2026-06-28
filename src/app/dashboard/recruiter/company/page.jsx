import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUser} from '@/app/lib/core/session';
import { getCompanyByRecruiterId } from '@/app/lib/api/companies';

const CompanyPage = async () => {
  let recruiterId = null;
  let company = null;

  try {
    const user = await getUser();
    // console.log('recruiterId:', user?.id); // ← confirm করো

    recruiterId = user?.id || null;

    if (recruiterId) {
      const result = await getCompanyByRecruiterId(recruiterId);
      company = result?.data || null;
    }
  } catch (error) {
    console.error('Failed to load company:', error.message);
  }

  return (
    <div>
      <CompanyProfile recruiterId={recruiterId} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;
