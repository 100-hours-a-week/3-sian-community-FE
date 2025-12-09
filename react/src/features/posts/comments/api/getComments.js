import api from "../../../../shared/api/axiosInstance";

export default async function getComments(postId) {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data.data.content;
}
