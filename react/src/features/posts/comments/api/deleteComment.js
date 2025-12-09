import api from "../../../../shared/api/axiosInstance";

export default async function deleteComment(postId, commentId) {
  const res = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data.data.content;
}
