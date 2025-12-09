import api from "../../../../shared/api/axiosInstance";

export default async function createComment(postId, content) {
  const res = await api.post(`/posts/${postId}/comments`, { content });
  return res.data.data.content;
}
