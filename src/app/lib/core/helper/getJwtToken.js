import { headers } from 'next/headers';

export const getJwtToken = async () => {
  const h = await headers();
  const cookie = h.get('cookie') || '';

  const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, {
    method: 'GET',
    headers: {
      cookie,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.token || null;
};
