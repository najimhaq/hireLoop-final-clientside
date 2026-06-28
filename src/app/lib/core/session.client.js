// src/app/lib/core/session.client.js  ← Client only
import { authClient } from '../auth-client';

export const getClientSession = () => {
  return authClient.useSession();
};
