import api from "../../../shared/api/axiosInstance";

export default async function getPostDetail(postId) {
  const res = await api.get(`/posts/${postId}`);
  return res.data.data;
}
