import api from "../../../shared/api/axiosInstance";

export default async function updateProfile(formData) {
  const res = await api.patch("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
