const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const getCompanyJobs = async (companyId, status = 'active') => {
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

export default getCompanyJobs;
