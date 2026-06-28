import { headers } from 'next/headers';
import { auth } from '../auth';
import { authClient } from '../auth-client';

export const authHeader = async () => {
  const token = await getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log('InsideSession', session?.session);
  return session?.user || null;
};

/* export const getUserToken = async () => {
  const session = await getUserSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
}; */



export const getUserToken = async () => {
  const session = await authClient.getSession();
  return session?.data?.session?.token ?? null;
};
