//Fetch all jobs (admin)
export async function getAllJobs({ status = '', category = '', page = 1 } = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (category) params.set('category', category);
  params.set('page', String(page));
  params.set('limit', '10');

  try {
    const res = await fetch(`${base}/api/jobs?${params.toString()}`, {
      cache: 'no-store',
      credentials: 'include',
    });
    if (!res.ok) return { jobs: [], total: 0, activeCount: 0, closedCount: 0 };
    const data = await res.json();
    return {
      jobs: Array.isArray(data?.data) ? data.data : [],
      total: data?.total ?? 0,
      activeCount: data?.activeCount ?? 0,
      closedCount: data?.closedCount ?? 0,
      currentPage: data?.currentPage ?? 1,
      totalPages: data?.totalPages ?? 1,
    };
  } catch {
    return {
      jobs: [],
      total: 0,
      activeCount: 0,
      closedCount: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }
}
