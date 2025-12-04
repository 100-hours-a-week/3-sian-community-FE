import LoginForm from "../features/auth/ui/LoginForm";
import styled from "@emotion/styled";

export default function LoginPage() {
  return (
    <PageWrapper>
      <Title>로그인</Title>
      <LoginForm />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 32px;
  max-width: 360px;
  margin: 70px auto;
`;

const Title = styled.h1`
  font-family: "Galmuri11";
  margin-bottom: 32px;
  font-size: 27px;
  font-weight: 700;
`;
