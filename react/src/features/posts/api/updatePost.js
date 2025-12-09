import api from "../../../shared/api/axiosInstance";

export default async function updatePost(postId, formData) {
  const res = await api.patch(`/posts/${postId}`, formData);
  return res.data;
}
