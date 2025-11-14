import Component from "../../core/Component.js";

export default class Header extends Component {
  template() {
    return `
      <header class="layout-header">
        <div class="header__items-container">
          <div class="back-button" id="back-button">
            <img src="/src/assets/free-icon-arrow-left-6423874.png" alt="뒤로가기" />
          </div>
          <div class="header-title">아무 말 대잔치</div>
          <div class="header__profile-image" id="profile-image"></div>
          <div class="header__dropdown" id="dropdown-menu">
              <ul>
                <li data-action="edit-profile">회원정보수정</li>
                <li data-action="edit-password">비밀번호수정</li>
                <li data-action="logout">로그아웃</li>
              </ul>
            </div>
        </div>
      </header>
    `;
  }

  mounted() {
    // 이전 페이지로 이동
    const $backButton = this.$target.querySelector("#back-button");
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
    const $profile = this.$target.querySelector("#profile-image");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.profileImageUrl) {
      $profile.style.backgroundImage = `url(${user.profileImageUrl})`;
    }

    const toggleProfileImage = () => {
      const currentPath = window.location.pathname;

      if (
        currentPath === "/" ||
        currentPath === "/login" ||
        currentPath === "/index.html" ||
        currentPath === "/signup"
      ) {
        $profile.style.display = "none";
      } else {
        $profile.style.display = "flex";
      }
    };

    toggleProfileImage();
    window.addEventListener("popstate", toggleProfileImage);
    window.addEventListener("navigate", toggleProfileImage);

    // 드롭다운
    const $dropdown = this.$target.querySelector("#dropdown-menu");

    $profile.addEventListener("click", (e) => {
      e.stopPropagation();
      $dropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!$dropdown.contains(e.target) && e.target !== $profile) {
        $dropdown.classList.remove("show");
      }
    });

    $dropdown.addEventListener("click", (e) => {
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
          alert("로그아웃 되었습니다!");
          window.history.pushState(null, null, "/login");
          window.dispatchEvent(new CustomEvent("navigate"));
          break;
      }
    });
  }
}
