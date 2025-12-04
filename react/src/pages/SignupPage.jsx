import styled from "@emotion/styled";
import SignupForm from "../features/signup/ui/SignupForm";

export default function SignupPage() {
  return (
    <PageWrapper>
      <Title>회원가입</Title>
      <SignupForm />
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
