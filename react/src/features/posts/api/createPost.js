import api from "../../../shared/api/axiosInstance";

export default async function createPost(formData) {
  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.content;
}
