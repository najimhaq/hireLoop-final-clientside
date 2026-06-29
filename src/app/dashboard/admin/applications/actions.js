// app/dashboard/admin/applications/actions.js
'use server';

import { serverFetch } from "@/app/lib/core/server";



export const updateApplicationStatus = async (applicationId, status) => {
  return serverFetch(`/api/applications/${applicationId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};
