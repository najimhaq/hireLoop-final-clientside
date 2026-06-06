import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";



export const getCompanyByRecruiterId = async (recruiterId) => {
  return await serverFetch(`/api/companies/recruiter/${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async (id) => {
  const user = await getUserSession();
  return await getCompanyByRecruiterId(user?.id);
};
