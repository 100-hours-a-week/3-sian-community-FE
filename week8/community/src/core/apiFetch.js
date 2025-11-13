export async function apiFetch(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const isFormData = options.body instanceof FormData;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    const response = await fetch("http://localhost:8080" + url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { status: response.status, ...errorData };
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
