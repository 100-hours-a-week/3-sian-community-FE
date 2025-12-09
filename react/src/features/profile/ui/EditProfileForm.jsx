import { useState } from "react";
import styled from "@emotion/styled";

import InputField from "../../../shared/ui/InputField";
import Button from "../../../shared/ui/Button";
import Toast from "../../../shared/ui/Toast";
import ProfileUploader from "../../../shared/ui/ProfileUploader";

import useForm from "../../../shared/hooks/useForm";
import updateProfile from "../api/updateProfile";
import { validateNickname } from "../../../shared/lib/validators";

export default function EditProfileForm() {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};

  const [file, setFile] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false); // 프로필 이미지 삭제 여부
  const [toast, setToast] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      nickname: user.nickname,
    },
  });

  // 최종 저장
  const onValid = async (values) => {
    const formData = new FormData();

    formData.append("nickname", values.nickname);

    if (file) {
      formData.append("image", file);
    }

    if (isDeleted) {
      formData.append("profileDeleted", "true");
    }

    try {
      const res = await updateProfile(formData);

      const updatedUser = res?.data;
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("user-updated"));
      }

      showToast("프로필이 수정되었습니다!", "success");
    } catch (e) {
      console.error("프로필 수정 에러:", e);
      showToast("수정 실패! 다시 시도해주세요.", "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  return (
    // 프로필 이미지
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <ProfileUploader
        initialImageUrl={user.profileImageUrl}
        onChange={({ file, isDeleted }) => {
          setFile(file);
          setIsDeleted(isDeleted);
        }}
      />

      <InputField label="이메일" readOnly placeholder={user.email} />

      <InputField
        label="닉네임"
        error={errors.nickname}
        {...register("nickname", {
          validate: (value) => {
            const r = validateNickname(value);
            return r.ok ? true : r.message;
          },
        })}
      />
      <SubmitButton fullWidth>수정하기</SubmitButton>
      <DeleteAccountLink>회원 탈퇴</DeleteAccountLink>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </FormContainer>
  );
}

const FormContainer = styled.form`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

const DeleteAccountLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  color: var(--gray-700);

  &:hover {
    text-decoration: underline;
  }
`;
