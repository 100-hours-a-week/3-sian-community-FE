import api from "../../../shared/api/axiosInstance";

export default async function toggleLike(postId, isLiked) {
  if (!postId) throw new Error("postId가 없습니다.");

  if (!isLiked) {
    const res = await api.post(`/posts/${postId}/likes`);
    return res.data;
  } else {
    const res = await api.delete(`/posts/${postId}/likes`);
    return res.data;
  }
}
