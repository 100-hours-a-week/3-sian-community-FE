import styled from "@emotion/styled";
import PostCard from "./PostCard";

export default function PostList({ posts }) {
  return (
    <ListWrapper>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          likes={post.likeCount}
          comments={post.commentCount}
          views={post.viewCount}
          date={post.createdAt}
          author={post.authorNickname}
        />
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-top: 24px;
  margin-bottom: 40px;
  width: 100%;
`;
