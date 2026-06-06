//lib/actions/createCompanies.js
import { serverFetch, serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return await serverMutation({
    path: '/api/companies',
    method: 'POST',
    payload: newCompanyData
  });
};

export const getCompanyByRecruiterId = async (recruiterId) => {
  return await serverFetch(`/api/companies/recruiter/${recruiterId}`);
};
