// src/app/lib/api/updateJobById.js
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export const updateJobById = async (id, payload) => {
  try {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating job:', error);
    return null;
  }
};
