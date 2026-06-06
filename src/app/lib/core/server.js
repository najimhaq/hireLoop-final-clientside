const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

//for getting data - GET
export const serverFetch = async (path, options = {}) => {
  let res;

  try {
    res = await fetch(`${baseUrl}${path}`, {
      ...options,
      cache: 'no-store',
    });
  } catch {
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
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Network error. Failed to connect to server');
  }

  let result = null;
  try {
    result = await res.json();
  } catch {}

  if (!res.ok) {
    switch (res.status) {
      case 401:
        throw new Error(result?.message || 'Unauthorized');
      case 403:
        throw new Error(result?.message || 'Forbidden');
      case 404:
        throw new Error(result?.message || 'Not found');
      default:
        throw new Error(
          result?.message || `Request failed with status ${res.status}`
        );
    }
  }

  return result;
};
