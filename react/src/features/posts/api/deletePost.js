import api from "../../../shared/api/axiosInstance";

export default async function deletePost(postId) {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
}
