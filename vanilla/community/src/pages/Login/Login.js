import Component from "../../core/Component.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";
import { apiFetch } from "../../core/apiFetch.js";
import { validateEmail } from "../../utils/validators.js";
import { h } from "../../core/h.js";

export default class Login extends Component {
  setup() {
    this.$state = {
      email: "",
      password: "",
    };
  }

  template() {
    return h(
      "div",
      { class: "page login-page" },

      h("div", { class: "title" }, "로그인"),

      h("div", { id: "email-input" }),
      h("div", { id: "password-input" }),
      h("div", { id: "submit-button" }),

      h("div", { class: "link", id: "signup-link" }, "브레멘 회원가입")
    );
  }

  mounted() {
    const $emailInput = this.$target.querySelector("#email-input");
    const $passwordInput = this.$target.querySelector("#password-input");
    const $submitButton = this.$target.querySelector("#submit-button");
    const $signupLink = this.$target.querySelector("#signup-link");

    // 내부 상태
    let email = "";
    let password = "";

    let emailValid = false;
    let passwordValid = false;

    const submitBtn = new Button($submitButton, {
      text: "로그인",
      disabled: true,
      variant: "primary",
    });

    const updateButtonState = () => {
      submitBtn.setDisabled(!(emailValid && passwordValid));
    };

    // 이메일 입력
    new Input($emailInput, {
      name: "email",
      type: "email",
      placeholder: "이메일을 입력해주세요",
      onInput: (value, comp) => {
        email = value.trim();

        const result = validateEmail(email);
        if (!result.ok) {
          comp.setError("올바른 이메일 주소 형식을 입력해주세요.");
          emailValid = false;
        } else {
          comp.clearError();
          emailValid = true;
        }

        updateButtonState();
      },
    });

    // 비밀번호 입력
    new Input($passwordInput, {
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
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;

      const active = document.activeElement;
      const inEmail = $emailInput.contains(active);
      const inPassword = $passwordInput.contains(active);

      if (inEmail || inPassword) {
        if (emailValid && passwordValid) {
          submitBtn.$target.querySelector("button").click();
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

        const user = res.data;

        // AccessToken 저장
        localStorage.setItem("accessToken", user.accessToken);

        // 사용자 정보 저장
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            profileImageUrl: user.profileImageUrl,
          })
        );

        // 라우팅 이동
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
