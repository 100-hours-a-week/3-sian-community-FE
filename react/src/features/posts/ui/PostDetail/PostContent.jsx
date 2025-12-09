import styled from "@emotion/styled";
import Button from "../../../../shared/ui/Button";
import colors from "../../../../shared/styles/colors";

export default function PostContent({ post, onLikeToggle }) {
  const handleLike = async () => {
    await onLikeToggle(post.id, post.liked);
  };

  return (
    <ContentWrapper>
      {post.postImageUrl && (
        <ImageWrapper>
          <PostImage src={post.postImageUrl} alt="게시글 이미지" />
        </ImageWrapper>
      )}

      <PostText>{post.content}</PostText>
      <StatsRow>
        <StatButton onClick={handleLike} isLiked={post.liked}>
          <Stat>
            ❤️<strong>{post.likeCount}</strong>
          </Stat>
        </StatButton>

        <Stat>
          조회 <strong>{post.viewCount}</strong>
        </Stat>
        <Stat>
          댓글 <strong>{post.commentCount}</strong>
        </Stat>
      </StatsRow>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ImageWrapper = styled.div`
  width: 600px;
  height: 306px;
  background-color: var(--gray-200);
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostText = styled.p`
  width: 600px;
  min-height: 200px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--gray-700);
  white-space: pre-wrap;
  margin: 30px auto;
  padding-bottom: 30px;
  border-bottom: solid 1px var(--gray-200);
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Stat = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Galmuri11";
  font-size: 13px;
  font-weight: 600;
  border-right: solid 1px var(--gray-500);
  gap: 4px;

  span {
    color: var(--gray-500);
  }

  strong {
    font-size: 12px;
    font-weight: 700;
  }
`;

const StatButton = styled.button`
  width: 100px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Galmuri11";
  font-size: 13px;
  font-weight: 600;
  border-right: solid 1px var(--gray-500);
  gap: 4px;
  cursor: pointer;

  color: ${({ isLiked }) => (isLiked ? colors.primary : colors.gray700)};
  background: transparent;
  border: none;

  strong {
    font-size: 12px;
    font-weight: 700;
  }

  transition: 0.2s;
`;
