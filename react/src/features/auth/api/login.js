import api from "../../../shared/api/axiosInstance";

export async function loginRequest({ email, password }) {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
}
