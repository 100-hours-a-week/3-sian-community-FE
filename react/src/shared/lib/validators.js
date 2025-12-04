// ======= 사용자 =======
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

// 비밀번호 일치 확인
export function validatePasswordConfirm(password, confirm) {
  const ok = password === confirm;
  return ok
    ? { ok: true }
    : { ok: false, message: "비밀번호가 일치하지 않습니다." };
}

// 닉네임 : 2~10자
export function validateNickname(nickname) {
  const len = nickname.trim().length;
  if (len < 2 || len > 10) {
    return { ok: false, message: "닉네임은 2~10자 사이여야 합니다." };
  }
  return { ok: true };
}

//==================게시글===================

// 제목: 필수, 1~26자
export function validateTitle(title) {
  const t = title.trim();

  if (!t) return { ok: false, message: "제목을 입력해주세요." };
  if (t.length > 26)
    return { ok: false, message: "제목은 최대 26자까지  입력 가능합니다." };

  return { ok: true };
}

// 내용: 필수
export function validateContent(content) {
  const c = content.trim();

  if (!c) return { ok: false, message: "내용을 입력해주세요." };

  return { ok: true };
}
