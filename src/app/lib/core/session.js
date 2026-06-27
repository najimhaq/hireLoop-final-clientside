import { headers } from 'next/headers';
import { auth } from '../auth';

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log('InsideSession', session?.session);
  return session?.user || null;
};

export const getUserToken = async () => {
  const session = await getUserSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};
