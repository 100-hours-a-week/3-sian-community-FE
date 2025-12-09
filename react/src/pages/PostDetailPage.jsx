import PostHeader from "../features/posts/ui/PostDetail/PostHeader";
import PostContent from "../features/posts/ui/PostDetail/PostContent";
// import CommentSection from "../features/posts/comments/ui/CommentSection";
import ConfirmModal from "../shared/ui/Modal/ConfirmModal";
import Toast from "../shared/ui/Toast";

import getPostDetail from "../features/posts/api/getPostDetail";
import deletePost from "../features/posts/api/deletePost";
import toggleLike from "../features/posts/api/toggleLike";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [toast, setToast] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getPostDetail(id).then(setPost);
  }, [id]);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 1000);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id);
      showToast("게시글이 삭제되었습니다!", "success");
      navigate("/posts");
    } catch (e) {
      showToast("삭제 실패! 다시 시도해주세요.", "error");
      console.log(e.response?.data?.message || "삭제 실패");
    }
  };

  const handleEditPost = () => {
    navigate(`/posts/${post.id}/edit`);
  };

  const handleToggleLike = async () => {
    // ✅ 1. UI 먼저 즉시 반영 (Optimistic Update)
    setPost((prev) => ({
      ...prev,
      liked: !prev.liked,
      likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));

    try {
      // ✅ 2. 서버에는 조용히 요청만 보냄
      await toggleLike(post.id, post.liked);
    } catch (e) {
      console.error("좋아요 토글 실패:", e);

      // ❗ 3. 실패하면 UI 되돌리기 (Rollback)
      setPost((prev) => ({
        ...prev,
        liked: !prev.liked,
        likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    }
  };

  if (!post) return null;
  console.log("post: ", post);

  return (
    <>
      <PostHeader
        post={post}
        onEdit={handleEditPost}
        onDelete={() => setOpen(true)}
      />

      <PostContent post={post} onLikeToggle={handleToggleLike} />

      {/* <CommentSection postId={postId} /> */}

      <ConfirmModal
        open={open}
        title="게시글 삭제"
        message="삭제한 게시글은 복구되지 않아요!"
        onConfirm={handleDeletePost}
        onCancel={() => setOpen(false)}
      />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
