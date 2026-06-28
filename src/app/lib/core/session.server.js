// src/app/lib/core/session.server.js  ← Server only

import { headers } from "next/headers";
import { auth } from "../auth";

export const getSession = async () => {
  return await auth.api.getSession({ headers: await headers() });
};
