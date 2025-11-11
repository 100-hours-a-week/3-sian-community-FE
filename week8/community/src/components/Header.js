import Component from "../core/Component.js";

export default class Header extends Component {
  template() {
    return `
      <header class="layout-header">
        <div class="back-button" id="back-button">
          <img src="/src/assets/free-icon-arrow-left-6423874.png" alt="뒤로가기" />
        </div>
        <div class="header-title">아무 말 대잔치</div>
        <div class="header__profile-image" id="profile-image"></div>
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
        currentPath === "/index.html"
      ) {
        $backButton.style.display = "none";
      } else {
        $backButton.style.display = "flex";
      }
    };

    toggleBackButton();
    window.addEventListener("popstate", toggleBackButton);
    window.addEventListener("navigate", toggleBackButton);

    // 프로필 이미지
    const $profileImage = this.$target.querySelector("#profile-image");

    $profileImage.addEventListener("click", () => {
      window.history.pushState(null, null, "/mypage");
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    const toggleProfileImage = () => {
      const currentPath = window.location.pathname;
      if (
        currentPath === "/" ||
        currentPath === "/login" ||
        currentPath === "/index.html" ||
        currentPath === "/signup"
      ) {
        $profileImage.style.display = "none";
      } else {
        $profileImage.style.display = "flex";
      }
    };

    toggleProfileImage();
    window.addEventListener("popstate", toggleProfileImage);
    window.addEventListener("navigate", toggleProfileImage);
  }
}
