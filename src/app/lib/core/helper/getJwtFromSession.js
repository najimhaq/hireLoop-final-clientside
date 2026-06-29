import { headers } from 'next/headers';
import { auth } from '../../auth';

export const getJwtFromSession = async () => {
  const res = await auth.api.getSession({
    headers: await headers(),
    asResponse: true,
  });
  const jwt = res.headers.get('set-auth-jwt') || null;
  return jwt;
};
