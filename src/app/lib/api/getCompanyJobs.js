import next from 'next';
import { serverFetch } from '../core/server';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const getCompanyJobs = async (companyId, status = null) => {
  try {
    const url = status
      ? `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`
      : `${baseUrl}/api/jobs?companyId=${companyId}`; // status filter ছাড়া

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) throw new Error('Failed to fetch company jobs');

    const result = await response.json();
    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching individual company jobs:', error);
    return [];
  }
};

//get single job
export const getCompanyJobById = async (jobId) => {
  return serverFetch(`/api/jobs/${jobId}`,{
    next: { revalidate: 60 },
  });
}
export const getBrowseCompanyJobs = async (companyId) => {
  return serverFetch(`/api/jobs`);
};

//return serverFetch(`/api/jobs?companyId=${companyId}&status=active`);
