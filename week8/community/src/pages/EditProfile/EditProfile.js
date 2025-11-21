import Component from "../../core/Component.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";
import ConfirmModal from "../../components/Modal/ConfirmModal.js";
import { apiFetch } from "../../core/apiFetch.js";
import Toast from "../../components/Toast/Toast.js";
import { validateNickname } from "../../utils/validators.js";
import { html } from "../../core/html.js";
import ProfileImage from "../../components/ProfileImage/ProfileImage.js";

export default class EditProfile extends Component {
  template() {
    return html`
      <div class="page edit-profile-page">
        <div class="title">회원정보수정</div>

        <!-- 프로필 -->
        <div class="profile-section">
          <p class="error"></p>
          <div class="profile-upload">
            <input type="file" id="profile-image" accept="image/*" hidden />
            <div class="profile-preview" id="profile-preview"></div>
            <div class="profile-options" id="profile-options">
              <div class="option change">프로필 변경</div>
              <div class="option option-delete">프로필 삭제</div>
            </div>
          </div>
        </div>

        <!-- 이메일 -->
        <div class="form-group">
          <label class="form-label">이메일</label>
          <p class="readonly-email"></p>
        </div>

        <!-- 닉네임 -->
        <div id="nickname-input"></div>

        <div id="update-btn"></div>
        <div class="link" id="withdraw-link">회원 탈퇴</div>

        <div id="toast-root"></div>
        <div id="modal-root"></div>
      </div>
    `;
  }

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));

    const $nicknameInput = this.$target.querySelector("#nickname-input");
    const $emailField = this.$target.querySelector(".readonly-email");
    const $updateBtn = this.$target.querySelector("#update-btn");
    const $toastRoot = this.$target.querySelector("#toast-root");
    const $profilePreview = this.$target.querySelector("#profile-preview");
    const $profileInput = this.$target.querySelector("#profile-image");
    const $profileOptions = this.$target.querySelector("#profile-options");

    const toast = new Toast($toastRoot);

    let nicknameValid = true;
    let nicknameValue = user.nickname;
    let selectedFile = null;
    let profileDeleted = false;

    $emailField.textContent = user.email;

    new Input($nicknameInput, {
      label: "닉네임",
      name: "nickname",
      type: "text",
      value: user.nickname,
      placeholder: user.nickname,
      onInput: (value, comp) => {
        nicknameValue = value.trim();
        const result = validateNickname(nicknameValue);

        if (!result.ok) {
          comp.setError(result.message);
          nicknameValid = false;
        } else {
          comp.clearError();
          nicknameValid = true;
        }
      },
    });

    // 프로필 이미지
    const profileImageComponent = new ProfileImage($profilePreview, {
      imageUrl: user.profileImageUrl ?? null,
      size: 149,
      rounded: true,
    });

    // 드롭다운 옵션 : 프로필 변경/삭제
    $profilePreview.addEventListener("click", (e) => {
      e.stopPropagation();
      $profileOptions.style.display =
        $profileOptions.style.display === "block" ? "none" : "block";
    });

    // 옵션 1 : 프로필 변경
    $profileOptions.querySelector(".change").addEventListener("click", () => {
      $profileInput.click();
      $profileOptions.style.display = "none";
    });

    $profileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        profileImageComponent.updateImage(reader.result);
      };
      reader.readAsDataURL(file);
    });

    // 옵션 2 : 프로필 삭제
    $profileOptions
      .querySelector(".option-delete")
      .addEventListener("click", () => {
        profileImageComponent.resetImage();
        selectedFile = null;
        profileDeleted = true;
      });

    // 옵션 닫기
    document.addEventListener("click", (e) => {
      if (
        !$profilePreview.contains(e.target) &&
        !$profileOptions.contains(e.target)
      ) {
        $profileOptions.style.display = "none";
      }
    });

    // DB에 반영
    const updateButton = new Button($updateBtn, {
      text: "수정하기",
      disabled: false,
      variant: "primary",
    });

    $updateBtn.addEventListener("click", async () => {
      if (!nicknameValid) return;

      const formData = new FormData();
      formData.append("nickname", nicknameValue);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      formData.append("profileDeleted", String(profileDeleted));

      try {
        const res = await apiFetch(`/users/me`, {
          method: "PATCH",
          body: formData,
          useFormData: true,
        });

        const updatedUser = res.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.dispatchEvent(new CustomEvent("user-updated"));

        toast.show("수정 완료되었습니다!");
      } catch (err) {
        console.error(err);
        toast.show("수정 실패", "error");
      }
    });
  }
}
