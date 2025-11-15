import Component from "../../core/Component.js";
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js";
import ConfirmModal from "../../components/Modal/ConfirmModal.js";
import { apiFetch } from "../../core/apiFetch.js";
import Toast from "../../components/Toast/Toast.js";

export default class EditProfile extends Component {
  template() {
    return `
      <div class="page edit-profile-page">
        <div class="title">회원정보수정</div>

        <!-- 프로필 -->
        <div class="profile-section">
          <label for="profile-image" class="profile-label">프로필 사진</label>
          <p class="helper-text"></p>

          <div class="profile-upload">
            <input type="file" id="profile-image" accept="image/*" hidden />
            <div class="profile-preview" id="profile-preview"></div>
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
    const $profileInput = this.$target.querySelector("#profile-image");
    const $profilePreview = this.$target.querySelector("#profile-preview");
    const $emailField = this.$target.querySelector(".readonly-email");
    const $updateBtn = this.$target.querySelector("#update-btn");
    const $toastRoot = this.$target.querySelector("#toast-root");

    const toast = new Toast($toastRoot);

    let nicknameValid = true;
    let nicknameValue = user.nickname;
    let selectedFile = null;

    if (user.profileImageUrl) {
      $profilePreview.style.backgroundImage = `url(${user.profileImageUrl})`;
      $profilePreview.style.backgroundSize = "cover";
      $profilePreview.style.backgroundPosition = "center";
    }

    $emailField.textContent = user.email;

    new Input($nicknameInput, {
      label: "닉네임",
      name: "nickname",
      type: "text",
      value: user.nickname,
      placeholder: user.nickname,
      onInput: (value, comp) => {
        const v = value.trim();
        nicknameValue = v;

        if (!v) {
          comp.setError("닉네임을 입력해주세요");
          nicknameValid = false;
        } else if (v.length < 2 || v.length > 10) {
          comp.setError("닉네임은 2~10자 이내여야 합니다.");
          nicknameValid = false;
        } else {
          comp.clearError();
          nicknameValid = true;
        }
      },
    });

    $profilePreview.addEventListener("click", () => $profileInput.click());

    $profileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        $profilePreview.style.backgroundImage = `url(${reader.result})`;
        $profilePreview.style.backgroundSize = "cover";
        $profilePreview.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    });

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
