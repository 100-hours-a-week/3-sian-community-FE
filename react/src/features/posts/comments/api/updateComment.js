import api from "../../../../shared/api/axiosInstance";

export default async function updatePost(postId, commentId, content) {
  const res = await api.put(`/posts/${postId}/comments/${commentId}`, {
    content,
  });
  return res.data.data.content;
}
