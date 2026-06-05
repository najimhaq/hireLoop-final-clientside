// lib/actions/createJobs.js
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export async function createJob(payload) {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to create job');
  }

  return data;
}
