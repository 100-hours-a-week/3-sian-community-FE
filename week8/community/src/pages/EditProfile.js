import Component from "../core/Component.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import ConfirmModal from "../components/ConfirmModal.js";
import { apiFetch } from "../core/apiFetch.js";

export default class EditProfile extends Component {
  template() {
    return `
      <div class="page edit-profile-page">
        <div class="title">회원정보수정</div>

        <!-- 프로필 -->
        <div class="profile-section">
          <label for="profile-image" class="profile-label">프로필 사진<span class="required">*</span></label>
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

        <!-- 토스트 메시지 -->
        <div id="toast-message" class="toast-message"></div>

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
    const $withdrawLink = this.$target.querySelector("#withdraw-link");

    const $toast = this.$target.querySelector("#toast-message");
    const $modalRoot = this.$target.querySelector("#modal-root");

    let nicknameValid = true;
    let nicknameValue = user.nickname;

    const existingNicknames = ["sian", "testuser", "hello"];

    if (user && user.profileImage) {
      $profilePreview.style.backgroundImage = `url(${user.profileImage})`;
      $profilePreview.style.backgroundSize = "cover";
      $profilePreview.style.backgroundPosition = "center";
    }
    if ($emailField) {
      $emailField.textContent = user.email;
    }

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
      const reader = new FileReader();
      reader.onload = () => {
        $profilePreview.style.backgroundImage = `url(${reader.result})`;
        $profilePreview.style.backgroundSize = "cover";
        $profilePreview.style.backgroundPosition = "center";
        $profilePreview.textContent = "";
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

      const updatedData = {
        nickname: nicknameValue,
        profileImage: $profilePreview.style.backgroundImage.replace(
          /^url\("(.*)"\)$/,
          "$1"
        ),
      };

      try {
        const res = await apiFetch(`/users/me`, {
          method: "PATCH",
          body: JSON.stringify(updatedData),
        });

        const updatedUser = {
          nickname: res.data.nickname,
          profileImage: res.data.profileImage,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.dispatchEvent(new CustomEvent("user-updated"));
        window.history.pushState(null, null, "/edit-profile");
        this.showToast($toast, "수정 완료되었습니다!");
      } catch (err) {
        console.error(err);
        this.showToast($toast, "수정 실패");
      }
    });

    $withdrawLink.addEventListener("click", () => {
      new ConfirmModal($modalRoot, {
        title: "회원 탈퇴하시겠습니까?",
        message: "삭제한 계정은 복구할 수 없습니다.",
        onConfirm: () => {
          alert("회원 탈퇴가 완료되었습니다.");
          window.history.pushState(null, null, "/");
          window.dispatchEvent(new CustomEvent("navigate"));
        },
      });
    });
  }

  showToast($toast, message, type = "success") {
    $toast.textContent = message;
    $toast.className = `toast-message show ${type}`;

    setTimeout(() => {
      $toast.classList.remove("show");
    }, 2500);
  }
}
