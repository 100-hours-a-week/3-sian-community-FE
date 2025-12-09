import styled from "@emotion/styled";
import InputField from "../../../shared/ui/InputField";
import Button from "../../../shared/ui/Button";
import ProfileUploader from "../../../shared/ui/ProfileUploader";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../shared/hooks/useForm";
import { signup } from "../api/signup";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateNickname,
} from "../../../shared/lib/validators";

export default function SignupForm() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const { register, handleSubmit, errors, isValid, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
    },
  });

  const password = watch?.("password");
  const passwordConfirm = watch?.("passwordConfirm");

  // 폼 제출 (회원가입)
  const onValid = async (values) => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("nickname", values.nickname);

    if (file) {
      formData.append("image", file);
    }

    try {
      await signup(formData);
      navigate("/login");
    } catch (e) {
      alert(e.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <ProfileUploader
        onChange={({ file }) => {
          setFile(file);
        }}
      />

      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요"
        error={errors.email}
        {...register("email", {
          required: { message: "이메일을 입력해주세요." },
          validate: (value) => {
            const r = validateEmail(value);
            return r.ok ? true : r.message;
          },
        })}
      />

      <InputField
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
        {...register("password", {
          required: { message: "비밀번호를 입력해주세요." },
          validate: (value) => {
            const r = validatePassword(value);
            return r.ok ? true : r.message;
          },
        })}
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한 번 더 입력해주세요"
        error={
          (passwordConfirm ?? "").length > 0 && password !== passwordConfirm
            ? "비밀번호가 일치하지 않습니다."
            : errors.passwordConfirm
        }
        {...register("passwordConfirm", {
          required: { message: "비밀번호 확인을 입력해주세요." },
          validate: (value) => {
            const currentPassword = watch?.("password") ?? "";
            const r = validatePasswordConfirm(currentPassword, value);
            return r.ok ? true : r.message;
          },
        })}
      />

      <InputField
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        error={errors.nickname}
        {...register("nickname", {
          required: { message: "닉네임을 입력해주세요." },
          validate: (value) => {
            const r = validateNickname(value);
            return r.ok ? true : r.message;
          },
        })}
      />

      <SubmitButton fullWidth disabled={!isValid}>
        회원가입
      </SubmitButton>

      <LoginLink onClick={() => navigate("/login")}>로그인하러 가기</LoginLink>
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

const LoginLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  color: #555;

  &:hover {
    text-decoration: underline;
  }
`;
