import Component from "../core/Component.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import { apiFetch } from "../core/apiFetch.js";

export default class Signup extends Component {
  template() {
    return `
      <div class="page signup-page">
        <div class="title">회원가입</div>
        
        <!-- 프로필 -->
        <div class="profile-section">
          <label for="profile-image" class="profile-label">프로필 사진</label>
          <p class="error"></p>
          <div class="profile-upload">
            <input type="file" id="profile-image" accept="image/*" hidden />
            <div class="profile-preview" id="profile-preview">+</div>
          </div>
        </div>

        <!-- 그외 입력 필드 -->
        <div id="email-input"></div>
        <div id="password-input"></div>
        <div id="password-confirm-input"></div>
        <div id="nickname-input"></div>
        
        <!-- 버튼 --> 
        <div id="submit-button"></div>
        <div class="link" id="login-link">로그인하러 가기</div>
      </div>
    `;
  }

  mounted() {
    const $emailInput = this.$target.querySelector("#email-input");
    const $passwordInput = this.$target.querySelector("#password-input");
    const $passwordConfirmInput = this.$target.querySelector(
      "#password-confirm-input"
    );
    const $nicknameInput = this.$target.querySelector("#nickname-input");
    const $submitButton = this.$target.querySelector("#submit-button");
    const $LoginLink = this.$target.querySelector("#login-link");

    const $profileInput = this.$target.querySelector("#profile-image");
    const $profilePreview = this.$target.querySelector("#profile-preview");

    let email = "";
    let password = "";
    let nickname = "";
    let profileImage = "";

    let emailValid = false;
    let passwordValid = false;
    let passwordConfirmValid = false;
    let nicknameValid = false;

    const submitButton = new Button($submitButton, {
      text: "회원가입",
      disabled: true,
      variant: "primary",
    });

    const updateButtonState = () => {
      submitButton.setDisabled(
        !(emailValid && passwordValid && passwordConfirmValid && nicknameValid)
      );
    };

    new Input($emailInput, {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "이메일을 입력해주세요",
      onInput: (value, comp) => {
        email = value.trim();
        const ok =
          /^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]{2,}\.[A-Za-z]{2,}$/.test(email);
        if (!email) {
          comp.setError("이메일을 입력해주세요");
          emailValid = false;
        } else if (!ok) {
          comp.setError("올바른 이메일 주소 형식을 입력해주세요.");
          emailValid = false;
        } else {
          comp.clearError();
          emailValid = true;
        }
        updateButtonState();
      },
    });

    new Input($passwordInput, {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
      onInput: (value, comp) => {
        password = value ?? "";
        const ok =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_\-+=`{}[\]|\\:;"'<>,.?/]).{8,16}$/.test(
            password
          );
        if (!password.trim()) {
          comp.setError("비밀번호를 입력해주세요");
          passwordValid = false;
        } else if (!ok) {
          comp.setError(
            "비밀번호는 8자 이상, 16자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
          );
          passwordValid = false;
        } else {
          comp.clearError();
          passwordValid = true;
        }
        updateButtonState();
      },
    });

    new Input($passwordConfirmInput, {
      label: "비밀번호 확인",
      name: "passwordConfirm",
      type: "password",
      placeholder: "비밀번호를 한 번 더 입력해주세요",
      onInput: (value, comp) => {
        const password = $passwordInput.querySelector("input").value;
        if (!value.trim()) {
          comp.setError("비밀번호를 다시 입력해주세요");
          passwordConfirmValid = false;
        } else if (value !== password) {
          comp.setError("비밀번호가 일치하지 않습니다.");
          passwordConfirmValid = false;
        } else {
          comp.clearError();
          passwordConfirmValid = true;
        }
        updateButtonState();
      },
    });

    new Input($nicknameInput, {
      label: "닉네임",
      name: "nickname",
      type: "text",
      placeholder: "닉네임을 입력해주세요",
      onInput: (value, comp) => {
        nickname = value.trim();
        if (!nickname) {
          comp.setError("닉네임을 입력해주세요");
          nicknameValid = false;
        } else if (nickname.length < 2 || nickname.length > 10) {
          comp.setError("닉네임은 2~10자 이내여야 합니다.");
          nicknameValid = false;
        } else {
          comp.clearError();
          nicknameValid = true;
        }
        updateButtonState();
      },
    });

    $profilePreview.addEventListener("click", () => $profileInput.click());
    $profileInput.addEventListener("change", (e) => {
      profileImage = e.target.files[0];
      if (!profileImage) return;
      const reader = new FileReader();
      reader.onload = () => {
        $profilePreview.style.backgroundImage = `url(${reader.result})`;
        $profilePreview.style.backgroundSize = "cover";
        $profilePreview.style.backgroundPosition = "center";
        $profilePreview.textContent = "";
        profileImage = reader.result;
      };
      reader.readAsDataURL(profileImage);
    });

    // 회원가입 요청
    $submitButton.addEventListener("click", async () => {
      try {
        const res = await apiFetch("/users", {
          method: "POST",
          body: JSON.stringify({ email, password, nickname, profileImage }),
        });

        window.history.pushState(null, null, "/login");
        window.dispatchEvent(new CustomEvent("navigate"));
      } catch (err) {
        alert(err.message || "회원가입에 실패했습니다.");
      }
    });

    $LoginLink.addEventListener("click", () => {
      window.history.pushState(null, null, "/login");
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    updateButtonState();
  }
}
