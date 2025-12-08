import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function PostCard({
  id,
  title,
  likes,
  comments,
  views,
  date,
  author,
}) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/post/${id}`)}>
      <TopSection>
        <Title>{title}</Title>
      </TopSection>

      <Divider />

      <InfoSection>
        <LeftInfo>
          <span>좋아요 {likes}</span>
          <span>댓글 {comments}</span>
          <span>조회 {views}</span>
        </LeftInfo>

        <RightInfo>
          <DateText>{date}</DateText>
          <AuthorName>{author}</AuthorName>
        </RightInfo>
      </InfoSection>
    </Card>
  );
}

const Card = styled.article`
  width: 592px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  transition:
    transform 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h3`
  font-family: "Galmuri11";
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftInfo = styled.div`
  display: flex;
  gap: 7px;
  font-size: 13px;
  color: #4f4f4f;
`;

const RightInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  color: #000;
`;

const DateText = styled.span`
  color: #4f4f4f;
`;

const AuthorName = styled.span`
  font-weight: 700;
  color: #4f4f4f;
`;
