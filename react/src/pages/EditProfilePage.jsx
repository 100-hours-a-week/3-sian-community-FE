import styled from "@emotion/styled";
import EditProfileForm from "../features/profile/ui/EditProfileForm";

export default function EditProfilePage() {
  return (
    <PageWrapper>
      <Title>회원 정보 수정</Title>
      <EditProfileForm />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 32px;
  max-width: 360px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: "Galmuri11";
  margin-bottom: 32px;
  font-size: 27px;
  font-weight: 700;
`;
