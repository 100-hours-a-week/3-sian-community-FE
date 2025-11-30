function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export async function apiFetch(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const method = (options.method || "GET").toUpperCase();

  const isFormData = options.body instanceof FormData;
  if (!isFormData && method !== "GET") {
    headers["Content-Type"] = "application/json";
  }

  // === CSRF token 자동 포함 ===
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrfToken = getCookie("XSRF-TOKEN");
    if (csrfToken) {
      headers["X-XSRF-TOKEN"] = csrfToken;
    }
  }

  const fetchOptions = {
    ...options,
    headers,
    credentials: "include",
  };

  let response = await fetch("http://localhost:8080" + url, fetchOptions);

  if (response.status === 401 && url !== "/auth/refresh") {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      fetchOptions.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;

      const csrfToken = getCookie("XSRF-TOKEN");
      if (csrfToken) {
        fetchOptions.headers["X-XSRF-TOKEN"] = csrfToken;
      }

      response = await fetch("http://localhost:8080" + url, fetchOptions);
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw error;
  }

  return response.status === 204 ? null : await response.json();
}
