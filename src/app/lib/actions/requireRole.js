import { redirect } from 'next/navigation';
import { getUserSession } from '../core/session';

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) throw new Error('Unauthorized');
  if (user?.role !== role) {
    redirect('/unauthorized');
  }
};
