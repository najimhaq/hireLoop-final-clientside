import { serverFetch, serverMutation } from '../core/server';

export const submitApplication = async (applicationData) => {
  return await serverMutation({
    path: '/api/applications',
    method: 'POST',
    payload: applicationData,
  });
};

export const getAllJobApplications = async ({ page = 1, limit = 50 } = {}) => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));

  return await serverFetch(`/api/applications?${params.toString()}`);
};
export const getApplicationByApplicationId = async (applicationId) => {
  return await serverFetch(`/api/applications/${applicationId}`);
};

export const getApplicationsByApplicant = async (userId) => {
  if (!userId || userId === 'undefined') {
    console.warn('Invalid applicantId:', userId);
    return [];
  }

  const result = await serverFetch(`/api/applications/applicant/${userId}`);
  return result?.data ?? [];
};
