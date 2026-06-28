import { serverFetch, serverMutation } from '../core/server';

export const submitApplication = async (applicationData) => {
  return await serverMutation({
    path: '/api/applications',
    method: 'POST',
    payload: applicationData,
  });
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
