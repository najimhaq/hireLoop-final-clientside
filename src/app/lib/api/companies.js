import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


//sob company dekhar jonno
export const getBrowseCompanies = async () => {
  const res = await serverFetch(`/api/companies`);
  return res;
}

//get single company
export const getCompanyById = async (id) => {
  const res = await serverFetch(`/api/companies/${id}`);
  return res;
};


export const getCompanyByRecruiterId = async (recruiterId) => {
  return await serverFetch(`/api/companies/recruiter/${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async (id) => {
  const user = await getUserSession();
  return await getCompanyByRecruiterId(user?.id);
};
