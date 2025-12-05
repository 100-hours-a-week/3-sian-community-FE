import styled from "@emotion/styled";
import InputField from "../../../shared/ui/InputField";
import Button from "../../../shared/ui/Button";
import ProfilePreview from "../../../shared/ui/ProfilePreview";
import Dropdown from "../../../shared/ui/Dropdown";
import EditProfileDropdown from "./EditProfileDropdown";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useForm from "../../../shared/hooks/useForm";
import updateProfileRequest from "../api/updateProfile";
import { validateNickname } from "../../../shared/lib/validators";

export default function EditProfileForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false); // 드롭다운 열림 여부
  const [isDeleted, setIsDeleted] = useState(false); // 프로필 이미지 삭제 여부
  const [toast, setToast] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      nickname: "",
    },
  });

  // 프로필 이미지 변경/등록
  const handleProfileImage = (uploaded) => {
    setFile(uploaded);
    setPreview(URL.createObjectURL(uploaded));
    setIsDeleted(false);
  };

  // 프로필 이미지 삭제
  const handleDeleteProfileImage = () => {
    setFile(null);
    setPreview(null);
    setIsDeleted(true);
  };

  // 최종 저장
  const onValid = async (values) => {
    const formData = new FormData();

    formData.append("nickname", values.nickname);
    if (file) {
      formData.append("image", file);
    }

    if (isDeleted) {
      formData.append("deleteImage", true);
    }

    try {
      await updateProfileRequest(formData);
      showToast("프로필이 수정되었습니다!", "success");
      navigate("/users/me");
    } catch (e) {
      showToast("수정 실패! 다시 시도해주세요.", "error");
      alert(e.response?.data?.message || "프로필 이미지 수정 실패");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <UploadWrapper onClick={() => setOpen((prev) => !prev)}>
        <ProfilePreview imageUrl={preview || user.profileImageUrl} />
      </UploadWrapper>
      <Dropdown open={open} onClose={() => setOpen(false)} top={70} right={0}>
        <EditProfileDropdown
          onChange={() => {
            setOpen(false);
            handleProfileImage;
          }}
          onDelete={() => {
            setOpen(false);
            handleDeleteProfileImage;
          }}
        />
      </Dropdown>

      <InputField label="이메일" readOnly />
      <InputField
        label="닉네임"
        placeholder={user.nickname}
        error={errors.nickname}
        {...register("nickname", {
          required: { message: "닉네임을 입력해주세요." },
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

const UploadWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 12px;
`;

const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

const DeleteAccountLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  color: #555;

  &:hover {
    text-decoration: underline;
  }
`;
