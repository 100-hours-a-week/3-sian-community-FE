import styled from "@emotion/styled";
import CommentItem from "./CommentItem";

export default function CommentList({ comments, onEdit, onDelete }) {
  if (!comments || comments.length === 0) {
    return <EmptyText>아직 작성된 댓글이 없습니다.</EmptyText>;
  }

  return (
    <List>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAuthor={comment.isAuthor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyText = styled.p`
  font-size: 13px;
  color: #aaa;
  text-align: center;
  margin-top: 20px;
`;
