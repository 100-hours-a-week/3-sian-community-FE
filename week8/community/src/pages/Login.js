import Component from "../core/Component.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import { apiFetch } from "../core/apiFetch.js";

export default class Login extends Component {
  template() {
    return `
          <div class="page login-page">
              <div class="title">로그인</div>
              <div id="email-input"></div>
              <div id="password-input"></div>
              <div id="submit-button"></div>
              <div class="link" id="signup-link">회원가입</div>
          </div>
          `;
  }

  mounted() {
    const $emailInput = this.$target.querySelector("#email-input");
    const $passwordInput = this.$target.querySelector("#password-input");
    const $submitButton = this.$target.querySelector("#submit-button");
    const $signupLink = this.$target.querySelector("#signup-link");

    let email = "";
    let password = "";

    let emailValid = false;
    let passwordValid = false;

    const submitButton = new Button($submitButton, {
      text: "로그인",
      disabled: true,
      variant: "primary",
    });

    const updateButtonState = () => {
      submitButton.setDisabled(!(emailValid && passwordValid));
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

    // 로그인 요청
    $submitButton.addEventListener("click", async () => {
      try {
        const res = await apiFetch("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: res.data.id,
            email: res.data.email,
            nickname: res.data.nickname,
            profileImage: res.data.profileImage,
          })
        );

        window.history.pushState(null, null, "/posts");
        window.dispatchEvent(new CustomEvent("navigate"));
      } catch (err) {
        alert(err.message || "로그인에 실패했습니다.");
      }
    });

    $signupLink.addEventListener("click", () => {
      window.history.pushState(null, null, "/signup");
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    updateButtonState();
  }
}
