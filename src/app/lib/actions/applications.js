import { serverFetch, serverMutation } from "../core/server";

export const submitApplication = async (applicationData) => {
  return await serverMutation({
    path: '/api/applications',
    method: 'POST',
    payload: applicationData,
  });
};


const getApplicationByApplicationId = async (applicationId) => {
    return await serverFetch(`/api/applications/${applicationId}`);
};
