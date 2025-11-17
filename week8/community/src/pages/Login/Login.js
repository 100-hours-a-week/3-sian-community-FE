import Component from "../../core/Component.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";
import { apiFetch } from "../../core/apiFetch.js";
import { validateEmail, validatePassword } from "../../utils/validators.js";

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

        const result = validateEmail(email);

        if (!result.ok) {
          comp.setError("올바른 이메일 주소 형식을 입력해주세요.");
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

        if (!password.trim()) {
          comp.setError("비밀번호를 입력해주세요");
          passwordValid = false;
        } else {
          comp.clearError();
          passwordValid = true;
        }
        updateButtonState();
      },
    });

    // 엔터 입력
    window.addEventListener("keydown", async (e) => {
      if (e.key !== "Enter") return;

      const active = document.activeElement;

      if ($emailInput.contains(active) || $passwordInput.contains(active)) {
        if (emailValid && passwordValid) {
          $submitButton.click();
        }
      }
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
            profileImageUrl: res.data.profileImageUrl,
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
