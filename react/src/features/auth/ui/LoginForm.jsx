import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../../../shared/ui/InputField";
import Button from "../../../shared/ui/Button";
import useForm from "../../../shared/hooks/useForm";
import Toast from "../../../shared/ui/Toast";
import {
  validateEmail,
  validatePassword,
} from "../../../shared/lib/validators";
import { login } from "../api/login";
import styled from "@emotion/styled";

export default function LoginForm() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const { register, handleSubmit, errors, isValid } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 1000);
  };

  const onValid = async (values) => {
    try {
      const user = await login(values);

      localStorage.setItem("accessToken", user.accessToken);

      const { accessToken: _, ...userInfo } = user;
      localStorage.setItem("user", JSON.stringify(userInfo));
      navigate("/posts");
    } catch {
      showToast("로그인 실패!", "error");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요"
        type="email"
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
        placeholder="비밀번호를 입력해주세요"
        type="password"
        error={errors.password}
        {...register("password", {
          required: { message: "비밀번호를 입력해주세요." },
          validate: (value) => {
            const r = validatePassword(value);
            return r.ok ? true : r.message;
          },
        })}
      />

      <SubmitButton type="submit" fullWidth disabled={!isValid}>
        로그인
      </SubmitButton>

      <SignupLink onClick={() => navigate("/signup")}>
        브레멘 회원가입
      </SignupLink>
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

const SignupLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  color: #555;

  &:hover {
    text-decoration: underline;
  }
`;
