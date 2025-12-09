import api from "../../../shared/api/axiosInstance";

export default async function toggleLike(postId) {
  const res = await api.push(`/posts/${postId}/like`);
  return res.data;
}
