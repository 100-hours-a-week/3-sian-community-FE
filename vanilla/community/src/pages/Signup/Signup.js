import Component from "../../core/Component.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";
import { apiFetch } from "../../core/apiFetch.js";
import ProfileImage from "../../components/ProfileImage/ProfileImage.js";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateNickname,
} from "../../utils/validators.js";
import { h } from "../../core/h.js";

export default class Signup extends Component {
  template() {
    return h(
      "div",
      { class: "page signup-page" },

      h("div", { class: "title" }, "회원가입"),

      // 프로필
      h(
        "div",
        { class: "profile-section" },
        h("p", { class: "error" }),
        h(
          "div",
          { class: "profile-upload" },
          h("input", {
            type: "file",
            id: "profile-image",
            accept: "image/*",
            hidden: true,
          }),
          h("div", { class: "profile-preview", id: "profile-preview" })
        )
      ),

      // 입력 필드
      h("div", { id: "email-input" }),
      h("div", { id: "password-input" }),
      h("div", { id: "password-confirm-input" }),
      h("div", { id: "nickname-input" }),

      // 버튼
      h("div", { id: "submit-button" }),
      h("div", { class: "link", id: "login-link" }, "로그인하러 가기")
    );
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
    let passwordConfirm = "";
    let nickname = "";
    let profileImage = "";

    let selectedFile = null;

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
        const result = validateEmail(email);

        if (!result.ok) {
          comp.setError(result.message);
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
        const result = validatePassword(password);

        if (!result.ok) {
          comp.setError(result.message);
          passwordValid = false;
        } else {
          comp.clearError();
          passwordValid = true;
        }

        // 비밀번호 바뀌면 비밀번호 확인 재검사
        if (this.confirmInputComp) {
          const confirmResult = validatePasswordConfirm(
            password,
            passwordConfirm
          );
          if (!confirmResult.ok) {
            this.confirmInputComp.setError(confirmResult.message);
            passwordConfirmValid = false;
          } else {
            this.confirmInputComp.clearError();
            passwordConfirmValid = true;
          }
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
        passwordConfirm = value.trim();

        const result = validatePasswordConfirm(password, passwordConfirm);

        if (!result.ok) {
          comp.setError(result.message);
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
        const result = validateNickname(nickname);

        if (!result.ok) {
          comp.setError(result.message);
          nicknameValid = false;
        } else {
          comp.clearError();
          nicknameValid = true;
        }

        updateButtonState();
      },
    });

    // 프로필 이미지
    const profileImageComponent = new ProfileImage($profilePreview, {
      imageUrl: "",
      size: 149,
      rounded: true,
    });

    $profilePreview.addEventListener("click", () => $profileInput.click());

    $profileInput.addEventListener("change", (e) => {
      selectedFile = e.target.files[0];
      if (!selectedFile) return;

      const reader = new FileReader();
      reader.onload = () => {
        profileImageComponent.updateImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    });

    // 회원가입 요청
    $submitButton.addEventListener("click", async () => {
      // form data로 변경
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("nickname", nickname);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      try {
        const res = await apiFetch("/users", {
          method: "POST",
          body: formData,
        });

        window.history.pushState(null, null, "/login");
        window.dispatchEvent(new CustomEvent("navigate"));
      } catch (err) {
        alert(err.message || "회원가입에 실패했습니다.");
      }
    });

    updateButtonState();
  }
}
