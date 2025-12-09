import { useState } from "react";
import styled from "@emotion/styled";

import ConfirmModal from "../../../../shared/ui/Modal/ConfirmModal";
import ProfileImage from "../../../../shared/ui/ProfileImage";
import Button from "../../../../shared/ui/Button";
import CommentForm from "./CommentForm";

export default function CommentItem({ comment, onDelete, onEdit, isAuthor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleSave = () => {
    const trimmed = editedContent.trim();
    if (!trimmed) return;

    onEdit?.(comment.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  return (
    <Item>
      <Left>
        <AuthorInfo>
          <ProfileImage imageUrl={comment.authorProfileImage} size={32} />
          <AuthorMeta>
            <Author>{comment.authorNickname}</Author>
            <Date>{comment.createdAt}</Date>
          </AuthorMeta>
        </AuthorInfo>

        {isEditing ? (
          <EditWrapper>
            <CommentForm
              value={editedContent}
              onChange={setEditedContent}
              onSubmit={handleSave}
              onCancel={handleCancel}
            />
          </EditWrapper>
        ) : (
          <Content>{comment.content}</Content>
        )}
      </Left>

      <Right>
        {!isEditing && isAuthor && (
          <BtnContainer>
            <Button
              size="mini"
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
            <Button size="mini" variant="black" onClick={() => setOpen(true)}>
              삭제
            </Button>
          </BtnContainer>
        )}
      </Right>

      <ConfirmModal
        open={open}
        title="댓글 삭제"
        message="삭제한 댓글은 복구할 수 없습니다."
        onConfirm={() => {
          onDelete?.(comment.id);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--gray-200);
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const Author = styled.span`
  font-size: 13px;
  font-weight: 700;
`;

const Date = styled.span`
  font-size: 12px;
  color: var(--gray-300);
`;

const Content = styled.p`
  font-size: 14px;
  line-height: 1.4;
`;

const EditWrapper = styled.div`
  margin-top: 6px;
`;

const Right = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 6px;
`;
