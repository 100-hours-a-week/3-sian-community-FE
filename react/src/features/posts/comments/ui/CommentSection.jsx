import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import CommentForm from "../ui/CommentForm";
import CommentList from "../ui/CommentList";

import getComments from "../api/getComments";
import createComment from "../api/createComment";
import updateComment from "../api/updateComment";
import deleteComment from "../api/deleteComment";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(postId);
      setComments(data);
    } catch (e) {
      console.error("댓글 불러오기 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!postId) return;
    loadComments();
  }, [postId]);

  const handleCreateComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    try {
      await createComment(postId, trimmed);
      setNewComment("");
      loadComments();
    } catch (e) {
      console.error("댓글 작성 실패:", e);
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      await updateComment(postId, commentId, content);
      loadComments();
    } catch (e) {
      console.error("댓글 수정 실패:", e);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId)); // Optimistic UI

    try {
      await deleteComment(postId, commentId);
      loadComments();
    } catch (e) {
      console.error("댓글 삭제 실패:", e);
    }
  };

  return (
    <Section>
      <Header>댓글 {comments.length}</Header>

      <CommentForm
        value={newComment}
        onChange={setNewComment}
        onSubmit={handleCreateComment}
      />

      {loading ? (
        <LoadingText>댓글 불러오는 중...</LoadingText>
      ) : (
        <CommentList
          comments={comments}
          onEdit={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      )}
    </Section>
  );
}

const Section = styled.section`
  width: 600px;
  display: flex;
  margin: 40px auto;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;

const LoadingText = styled.p`
  font-size: 13px;
  color: var(--gray-300);
`;
