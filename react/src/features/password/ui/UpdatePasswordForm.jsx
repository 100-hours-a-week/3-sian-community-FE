import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useState } from "react";

import InputField from "../../../shared/ui/InputField";
import Button from "../../../shared/ui/Button";
import Toast from "../../../shared/ui/Toast";

import useForm from "../../../shared/hooks/useForm";
import updatePasswordRequest from "../api/updatePasswordRequest";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../../shared/lib/validators";

export default function UpdatePasswordForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, errors, isValid, watch } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const password = watch?.("password");
  const passwordConfirm = watch?.("passwordConfirm");
  const isDisabled = !isValid; // 버튼 비활성화

  const [toast, setToast] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const onValid = async (values) => {
    try {
      await updatePasswordRequest(values);
      showToast("비밀번호가 변경되었습니다!", "success");
      navigate("/posts");
    } catch (e) {
      showToast("변경 실패! 다시 시도해주세요.", "error");
      alert(e.response?.data?.message || "변경 실패");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <InputField
        label="비밀번호"
        placeholder="새 비밀번호를 입력해주세요"
        type="password"
        error={errors.password}
        {...register("password", {
          required: { message: "비밀번홀를 입력해주세요." },
          validate: (value) => {
            const r = validatePassword(value);
            return r.ok ? true : r.message;
          },
        })}
      />
      <InputField
        label="비밀번호 확인"
        type="password"
        placeholder="새 비밀번호를 한 번 더 입력해주세요."
        error={
          (passwordConfirm ?? "").length > 0 && password != passwordConfirm
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
      <SubmitButton fullWidth disabled={isDisabled}>
        변경하기
      </SubmitButton>
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
