import Component from "../../core/Component.js";
import { apiFetch } from "../../core/apiFetch.js";
import Toast from "../Toast/Toast.js";
import ProfileImage from "../ProfileImage/ProfileImage.js";
import { html } from "../../core/html.js";

export default class Header extends Component {
  template() {
    return html`
      <header class="layout-header">
        <div class="header__items-container">
          <div class="back-button" id="back-button">
            <img src="/src/assets/back-icon.png" alt="뒤로가기" />
          </div>
          <div class="header-title">Bremen</div>
          <div class="header-author-image"></div>

          <!-- 드롭다운 메뉴 -->
          <div class="header__dropdown" id="dropdown-menu">
            <ul>
              <li data-action="edit-profile">회원정보수정</li>
              <li data-action="edit-password">비밀번호수정</li>
              <li data-action="logout">로그아웃</li>
            </ul>
          </div>
        </div>
        <div class="toast-root"></div>
      </header>
    `;
  }

  mounted() {
    // 이전 페이지로 이동
    const $backButton = this.$target.querySelector("#back-button");
    const $toastRoot = this.$target.querySelector(".toast-root");

    const toast = new Toast($toastRoot);

    if (!$backButton) return;

    $backButton.addEventListener("click", () => {
      window.history.back();
    });

    const toggleBackButton = () => {
      const currentPath = window.location.pathname;
      if (
        currentPath === "/" ||
        currentPath === "/login" ||
        currentPath === "/index.html" ||
        currentPath === "/posts"
      ) {
        $backButton.style.display = "none";
      } else {
        $backButton.style.display = "flex";
      }
    };

    toggleBackButton();
    window.addEventListener("popstate", toggleBackButton);
    window.addEventListener("navigate", toggleBackButton);

    // 타이틀 -> 게시글 페이지로 이동
    const $title = this.$target.querySelector(".header-title");

    $title.addEventListener("click", () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        window.history.pushState(null, null, "/posts");
      } else {
        window.history.pushState(null, null, "/login");
      }
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    // 프로필
    const $profileArea = this.$target.querySelector(".header-author-image");
    const user = JSON.parse(localStorage.getItem("user"));

    // 프로필 인스턴스 저장
    this.profileImageComp = new ProfileImage($profileArea, {
      imageUrl: user?.profileImageUrl,
    });

    // user-updated 이벤트 발생 -> 이미지 갱신
    window.addEventListener("user-updated", () => {
      const latest = JSON.parse(localStorage.getItem("user"));
      this.profileImageComp.updateImage(latest?.profileImageUrl || null);
    });

    const toggleProfileImage = () => {
      const currentPath = window.location.pathname;

      if (
        currentPath === "/" ||
        currentPath === "/login" ||
        currentPath === "/index.html" ||
        currentPath === "/signup"
      ) {
        $profileArea.style.display = "none";
      } else {
        $profileArea.style.display = "flex";
      }
    };

    toggleProfileImage();
    window.addEventListener("popstate", toggleProfileImage);
    window.addEventListener("navigate", toggleProfileImage);

    // 드롭다운
    const $dropdown = this.$target.querySelector("#dropdown-menu");

    $profileArea.addEventListener("click", (e) => {
      e.stopPropagation();
      $dropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!$dropdown.contains(e.target) && e.target !== $profileArea) {
        $dropdown.classList.remove("show");
      }
    });

    $dropdown.addEventListener("click", async (e) => {
      const action = e.target.dataset.action;
      if (!action) return;

      switch (action) {
        case "edit-profile":
          window.history.pushState(null, null, "/edit-profile");
          window.dispatchEvent(new CustomEvent("navigate"));
          break;
        case "edit-password":
          window.history.pushState(null, null, "/edit-password");
          window.dispatchEvent(new CustomEvent("navigate"));
          break;
        case "logout":
          try {
            await apiFetch("/auth/logout", { method: "POST" });
          } catch (err) {
            // ❗ AccessToken/RefreshToken 만료 등으로 로그아웃 API 실패해도
            //    클라이언트 내부에서는 강제 로그아웃 진행
            console.warn(
              "로그아웃 API 실패 — 클라이언트에서 강제 로그아웃 진행"
            );
          }

          // === 클라이언트 토큰 삭제 ===
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");

          // === 헤더 UI 즉시 갱신 ===
          this.profileImageComp.updateImage(null);

          // === 다른 컴포넌트들도 유저 정보 갱신 필요할 수 있음 ===
          window.dispatchEvent(new CustomEvent("user-updated"));

          // === 안내 메시지 ===
          toast.show("로그아웃되었습니다.");

          // === 로그인 페이지로 이동 ===
          setTimeout(() => {
            window.history.pushState(null, null, "/login");
            window.dispatchEvent(new CustomEvent("navigate"));
          }, 500);

          break;
      }
    });

    window.addEventListener("navigate", () => this.updateHeaderState());
    window.addEventListener("popstate", () => this.updateHeaderState());
  }

  updateHeaderState() {
    const user = JSON.parse(localStorage.getItem("user"));

    // 프로필 이미지 갱신
    this.profileImageComp.updateImage(user?.profileImageUrl || null);

    // back 버튼 업데이트
    const currentPath = window.location.pathname;
    const $backButton = this.$target.querySelector("#back-button");

    if (["/", "/login", "/signup", "/posts"].includes(currentPath)) {
      $backButton.style.display = "none";
    } else {
      $backButton.style.display = "flex";
    }

    // 프로필 표시 여부
    const $profileArea = this.$target.querySelector(".header-author-image");

    if (["/", "/login", "/signup"].includes(currentPath)) {
      $profileArea.style.display = "none";
    } else {
      $profileArea.style.display = "flex";
    }
  }
}
