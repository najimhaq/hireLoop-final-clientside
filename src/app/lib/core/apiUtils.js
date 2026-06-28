// src/app/lib/api/services/apiUtils.js
// ⚠️ কোনো server-only import নেই — Client/Server দুটোতেই কাজ করবে

import { authClient } from "../auth-client";

const jsonFetch = async (method, url, body = null) => {
  // Token automatically নিন
  const session = await authClient.getSession();
  console.log('jsonFetch session', session);
  const token = session?.data?.session?.token;
  console.log('Token:', token); 

  try {
    const res = await fetch(url, {
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return { data: null, error: `Non-JSON response. Status: ${res.status}` };
    }

    const data = await res.json();
    if (!res.ok) return { data: null, error: data.message || 'Request failed' };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Network error' };
  }
};

export const apiGet = (url) => jsonFetch('GET', url);
export const apiPost = (url, body) => jsonFetch('POST', url, body);
export const apiPut = (url, body) => jsonFetch('PUT', url, body);
export const apiPatch = (url, body) => jsonFetch('PATCH', url, body);
export const apiDelete = (url) => jsonFetch('DELETE', url);

/* export const apiPatchForApproval = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const contentType = res.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return { data: null, error: `Non-JSON response. Status: ${res.status}` };
    }
    const data = await res.json();
    if (!res.ok) return { data: null, error: data.message || 'Request failed' };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || 'Network error' };
  }
}; */
