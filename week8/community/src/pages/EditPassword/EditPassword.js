import Component from "../../core/Component.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";

export default class PasswordEdit extends Component {
  template() {
    return `
      <div class="page password-edit-page">
        <h1 class="title">비밀번호 수정</h1>
        <div id="password-input"></div>
        <div id="password-confirm-input"></div>
        <div id="submit-button"></div>
        <div id="toast-message" class="toast-message"></div>
      </div>
    `;
  }

  mounted() {
    const $passwordInput = this.$target.querySelector("#password-input");
    const $passwordConfirmInput = this.$target.querySelector(
      "#password-confirm-input"
    );
    const $submitButton = this.$target.querySelector("#submit-button");
    const $toast = this.$target.querySelector("#toast-message");

    this.password = "";
    this.confirm = "";
    this.passwordValid = false;
    this.confirmValid = false;

    const submitButton = new Button($submitButton, {
      text: "수정하기",
      disabled: true,
      variant: "primary",
    });

    const updateButtonState = () => {
      submitButton.setDisabled(!(this.passwordValid && this.confirmValid));
    };

    const validateConfirm = (comp) => {
      if (!this.confirm.trim()) {
        comp.setError("비밀번호를 다시 입력해주세요");
        this.confirmValid = false;
      } else if (this.password !== this.confirm) {
        comp.setError("비밀번호가 일치하지 않습니다.");
        this.confirmValid = false;
      } else {
        comp.clearError();
        this.confirmValid = true;
      }
    };

    const passwordInput = new Input($passwordInput, {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      onInput: (value, comp) => {
        this.password = value.trim();
        const ok =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_\-+=`{}[\]|\\:;"'<>,.?/]).{8,16}$/.test(
            this.password
          );

        if (!this.password) {
          comp.setError("비밀번호를 입력해주세요");
          this.passwordValid = false;
        } else if (!ok) {
          comp.setError(
            "비밀번호는 8~16자, 대문자·소문자·숫자·특수문자를 모두 포함해야 합니다."
          );
          this.passwordValid = false;
        } else {
          comp.clearError();
          this.passwordValid = true;
        }

        if (this.confirmInputComp) validateConfirm(this.confirmInputComp);
        updateButtonState();
      },
    });

    const confirmInput = new Input($passwordConfirmInput, {
      label: "비밀번호 확인",
      name: "passwordConfirm",
      type: "password",
      placeholder: "비밀번호를 한 번 더 입력하세요",
      onInput: (value, comp) => {
        this.confirm = value.trim();
        this.confirmInputComp = comp;
        validateConfirm(comp);
        updateButtonState();
      },
    });

    $submitButton.addEventListener("click", () => {
      if (this.passwordValid && this.confirmValid) {
        this.showToast(
          $toast,
          "비밀번호가 성공적으로 변경되었습니다!",
          "success"
        );
        setTimeout(() => {
          window.history.pushState(null, null, "/mypage");
          window.dispatchEvent(new CustomEvent("navigate"));
        }, 2000);
      }
    });
  }

  showToast($toast, message, type = "success") {
    clearTimeout(this.toastTimer);
    $toast.textContent = message;
    $toast.className = `toast-message show ${type}`;
    this.toastTimer = setTimeout(() => {
      $toast.classList.remove("show");
    }, 1500);
  }
}
