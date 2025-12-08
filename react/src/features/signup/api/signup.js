import api from "../../../shared/api/axiosInstance";

export async function signup(formData) {
  const res = await api.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
