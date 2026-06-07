import { serverFetch } from '../core/server';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const getCompanyJobs = async (companyId, status = 'active') => {
  try {
    const response = await fetch(
      `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch company jobs');
    }

    const result = await response.json();
    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching individual company jobs:', error);
    return [];
  }
};

//get single job
export const getCompanyJobById = async (jobId) => {
  return serverFetch(`/api/jobs/${jobId}`);
}
export const getBrowseCompanyJobs = async (companyId) => {
  return serverFetch(`/api/jobs`);
};

//return serverFetch(`/api/jobs?companyId=${companyId}&status=active`);
