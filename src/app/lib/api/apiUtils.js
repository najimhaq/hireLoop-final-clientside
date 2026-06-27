// src/app/lib/api/apiUtils.js

/**
 * Generic PATCH request with JSON validation
 * @param {string} url - Full API endpoint
 * @param {object} body - Request payload
 * @returns {Promise<{ data: any, error: string | null }>}
 */
export const apiPatchForApproval = async (url, body) => {
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
};
