export async function apiFetch(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  // 헤더에 들어갈 데이터
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  // 요청 데이터 병합
  const fetchOptions = {
    ...options,
    headers,
  };

  // 요청 및 응답 로직
  try {
    const response = await fetch("http://localhost:8080" + url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        ...errorData,
      };
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
}
