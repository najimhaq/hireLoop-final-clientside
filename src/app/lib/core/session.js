// src/app/lib/core/session.js
import { headers } from 'next/headers';
import { auth } from '../auth';

// Session object (user + session info)
export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log('InsideSession', session?.session);
  return session || null;
};

// শুধু user object
export const getUser = async () => {
  const session = await getUserSession();
  // console.log('getUser',session)
  return session?.user || null;
};
