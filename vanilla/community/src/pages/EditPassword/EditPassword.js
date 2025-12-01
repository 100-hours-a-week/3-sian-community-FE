import Component from "../../core/Component.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";
import { apiFetch } from "../../core/apiFetch.js";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../utils/validators.js";
import { h } from "../../core/h.js";

export default class PasswordEdit extends Component {
  template() {
    return h(
      "div",
      { class: "page password-edit-page" },

      h("h1", { class: "title" }, "비밀번호 수정"),

      h("div", { id: "password-input" }),
      h("div", { id: "password-confirm-input" }),

      h("div", { id: "submit-button" }),

      h("div", { id: "toast-message", class: "toast-message" })
    );
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

    // 엔터 입력
    window.addEventListener("keydown", async (e) => {
      if (e.key !== "Enter") return;

      const active = document.activeElement;

      if (
        $passwordInput.contains(active) ||
        $passwordConfirmInput.contains(active)
      ) {
        if (this.passwordValid && this.confirmValid) {
          $submitButton.click();
        }
      }
    });

    const updateButtonState = () => {
      submitButton.setDisabled(!(this.passwordValid && this.confirmValid));
    };

    const passwordInput = new Input($passwordInput, {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      onInput: (value, comp) => {
        this.password = value.trim();
        const result = validatePassword(this.password);

        if (!result.ok) {
          comp.setError(result.message);
          this.passwordValid = false;
        } else {
          comp.clearError();
          this.passwordValid = true;
        }

        // 비밀번호 바뀌면 확인 재검사
        if (this.confirmInputComp) {
          const confirmResult = validatePasswordConfirm(
            this.password,
            this.confirm
          );
          if (!confirmResult.ok) {
            this.confirmInputComp.setError(confirmResult.message);
            this.confirmValid = false;
          } else {
            this.confirmInputComp.clearError();
            this.confirmValid = true;
          }
        }

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

        const result = validatePasswordConfirm(this.password, this.confirm);

        if (!result.ok) {
          comp.setError(result.message);
          this.confirmValid = false;
        } else {
          comp.clearError();
          this.confirmValid = true;
        }

        updateButtonState();
      },
    });

    // 비밀번호 변경
    $submitButton.addEventListener("click", async () => {
      if (this.passwordValid && this.confirmValid) {
        try {
          const res = await apiFetch(`/users/me/password`, {
            method: "PATCH",
            body: JSON.stringify({
              newPassword: this.password,
              newPasswordConfirm: this.confirm,
            }),
          });

          this.showToast(
            $toast,
            "비밀번호가 성공적으로 변경되었습니다!",
            "success"
          );

          setTimeout(() => {
            window.history.pushState(null, null, "/posts");
            window.dispatchEvent(new CustomEvent("navigate"));
          }, 2000);
        } catch (err) {
          alert(err.message || "비밀번호 변경에 실패했습니다.");
        }
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
