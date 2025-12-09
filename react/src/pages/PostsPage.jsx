import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import getPosts from "../features/posts/api/getPosts";

import PostList from "../features/posts/ui/PostList/PostList";
import Button from "../shared/ui/Button";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getPosts({ page: 0, size: 10 });
        setPosts(data);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Page>
      <IntroSection>
        <p>음악은 혼자보다, 함께일 때 더 즐겁다</p>
        <p>
          밴드 모집 커뮤니티, <strong>브레멘</strong>
        </p>
      </IntroSection>

      <ButtonRow>
        <Button
          variant="primary"
          size="short"
          onClick={() => {
            navigate("/posts/new");
          }}
        >
          모집글 작성
        </Button>
      </ButtonRow>

      {/* 로딩 / 에러 / 리스트 */}
      {loading && <LoadingText>로딩중...</LoadingText>}
      {error && <ErrorText>게시글을 불러오지 못했습니다.</ErrorText>}
      {!loading && !error && <PostList posts={posts} />}
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroSection = styled.section`
  text-align: center;
  font-size: 24px;
  color: #333;
  line-height: 1.4;
  font-family: "Galmuri11";
  margin: 50px 0;

  strong {
    font-weight: 700;
  }
`;

const ButtonRow = styled.div`
  width: 100%;
  max-width: 592px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

const LoadingText = styled.p`
  margin-top: 40px;
  font-size: 14px;
  color: #777;
`;

const ErrorText = styled.p`
  margin-top: 40px;
  font-size: 14px;
  color: red;
`;
