import { getUserToken } from "../../core/session";


export const getAuthHeaders = async (withBody = false) => {
  const token = await getUserToken();

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(withBody ? { 'Content-Type': 'application/json' } : {}),
  };
};
