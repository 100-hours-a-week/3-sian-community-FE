import Component from "../core/Component.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";

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
        const v = value.trim();
        const ok =
          /^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]{2,}\.[A-Za-z]{2,}$/.test(v);
        if (!v) {
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
        const v = value ?? "";
        const ok =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_\-+=`{}[\]|\\:;"'<>,.?/]).{8,16}$/.test(
            v
          );
        if (!v.trim()) {
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

    $submitButton.addEventListener("click", () => {
      alert("로그인 요청");
      window.history.pushState(null, null, "/posts");
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    $signupLink.addEventListener("click", () => {
      window.history.pushState(null, null, "/signup");
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    updateButtonState();
  }
}
