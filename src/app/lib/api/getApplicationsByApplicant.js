import { serverFetch } from '../core/server';

export const getApplicationsByApplicant = async (applicantId) => {
  const result = await serverFetch(
    `/api/applications/applicant/${applicantId}`
  );
  return result?.data ?? [];
};
