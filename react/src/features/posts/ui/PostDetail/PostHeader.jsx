import styled from "@emotion/styled";
import ProfileImage from "../../../../shared/ui/ProfileImage";
import Button from "../../../../shared/ui/Button";

export default function PostHeader({ post, onEdit, onDelete }) {
  return (
    <HeaderWrapper>
      <Title>{post.title}</Title>
      <MetaRow>
        <AuthorInfo>
          <ProfileImage imageUrl={post.authorProfileImage} />
          <AuthorName>{post.authorNickname}</AuthorName>
          <PostDate>{post.createdAt}</PostDate>
        </AuthorInfo>

        {post.isAuthor && (
          <Actions>
            <Button size="mini" variant="secondary" onClick={onEdit}>
              수정
            </Button>
            <Button size="mini" variant="secondary" onClick={onDelete}>
              삭제
            </Button>
          </Actions>
        )}
      </MetaRow>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  width: 600px;
  margin: 0 auto;
  margin-top: 50px;
  padding-bottom: 20px;
  border-bottom: solid 1px var(--gray-200);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorName = styled.span`
  font-weight: 700;
  color: #000;
  font-size: 15px;
`;

const PostDate = styled.span`
  font-size: 14px;
  color: #777;
  margin-left: 4px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;
