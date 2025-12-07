import styled from "@emotion/styled";
import UpdatePasswordForm from "../features/password/ui/UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <PageWrapper>
      <Title>비밀번호 변경</Title>
      <UpdatePasswordForm />
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
