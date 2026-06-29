import { getJwtFromSession } from "../core/helper/getJwtFromSession";



// src/app/lib/api/getAllUsers.js
export const getAllUsers = async ({
  role = '',
  status = '',
  page = 1,
} = {}) => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const params = new URLSearchParams();
  if (role) params.set('role', role);
  if (status) params.set('status', status);
  params.set('page', String(page));
  params.set('limit', '10');

  try {
    const token = await getJwtFromSession();
    // console.log('inGetAllUsers ', token);

    const res = await fetch(`${base}/api/users?${params.toString()}`, {
      cache: 'no-store',
      headers:{
        contentType: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    if (!res.ok) return { data: [], total: 0, totalPages: 1, currentPage: 1 };
    return await res.json();
  } catch {
    return { data: [], total: 0, totalPages: 1, currentPage: 1 };
  }
};
