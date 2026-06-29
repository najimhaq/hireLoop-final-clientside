import { headers } from "next/headers";
import { auth } from "../auth";

// src/app/lib/core/server.js
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
// console.log('Fetching URL:', baseUrl);

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

//for getting data - GET

const getJwt = async () => {
  const res = await auth.api.getSession({
    headers: await headers(),
    asResponse: true,
  });
  return res.headers.get('set-auth-jwt') || null;
};

export const serverFetch = async (path, options = {}) => {
  if (!path || path.includes('/undefined')) {
    throw new Error(`Invalid request path: ${path}`);
  }

  const token = await getJwt();

  let res;

  try {
    res = await fetch(`${baseUrl}${path}`, {
      ...options,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch (err) {
    console.error('Fetch error:', err.cause || err.message);
    throw new Error(`Failed to connect to API: ${baseUrl}${path}`);
  }

  let result = null;
  try {
    result = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(
      result?.message || `Request failed with status ${res.status}`
    );
  }

  return result;
};

//for sending data - POST
export const serverMutation = async ({ path, method = 'POST', payload }) => {
  let res;

  try {
    res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Network error. Failed to connect to server');
  }

  let result = null;
  try {
    result = await res.json();
    // console.log('📦 result:', result);
    // console.log('📊 res.status:', res.status);
  } catch {}

  if (!res.ok) {
    switch (res.status) {
      case 401:
        throw new Error(result?.message || 'Unauthorized');
      case 403:
        throw new Error(result?.message || 'Forbidden');
      case 404:
        throw new Error(result?.message || 'Not found');
      case 409:
        throw new Error(result?.message || 'Conflict');
      default:
        throw new Error(
          result?.message || `Request failed with status ${res.status}`
        );
    }
  }

  return result;
};
