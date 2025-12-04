// ======= User =======
// 이메일
// 필수, 형식
export function validateEmail(email) {
  const regex = /^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]{2,}\.[A-Za-z]{2,}$/;
  if (!email.trim()) {
    return { ok: false, message: "이메일을 입력해주세요." };
  }

  if (!regex.test(email.trim())) {
    return { ok: false, message: "올바른 이메일 주소 형식을 입력해주세요." };
  }

  return { ok: true };
}

// 비밀번호 : 8~20자, 형식
export function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}$/;

  if (!password.trim()) {
    return { ok: false, message: "비밀번호를 입력해주세요." };
  }

  if (!regex.test(password.trim())) {
    return {
      ok: false,
      message:
        "비밀번호는 8~20자이며 대문자/소문자/숫자/특수문자를 모두 포함해야 합니다.",
    };
  }

  return { ok: true };
}
