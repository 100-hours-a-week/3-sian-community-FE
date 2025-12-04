import Component from "../../core/Component.js";
import ProfileArea from "./HeaderProfile.js";
import ProfileDropdown from "./HeaderDropdown.js";
import { h } from "../../core/h.js";

export default class Header extends Component {
  template() {
    return h(
      "header",
      { class: "layout-header" },
      h(
        "div",
        { class: "header__items-container" },
        h(
          "div", 
          { class: "back-button", id: "back-button" },
          h("img", { src: "/src/assets/back-icon.png", alt: "뒤로가기" })
        ),
        h("div", { class: "header-title" }, "Bremen"),
        h("div", { id: "profile-area" }),
        h("div", { id: "dropdown-area" })
      )
    );
  }

  mounted() {
    // 프로필 영역
    this.profileArea = new ProfileArea(
      this.$target.querySelector("#profile-area"),
      {
        onClick: () => this.dropdown.toggle(), // 클릭하면 드롭다운 토글
      }
    );

    // 드롭다운
    this.dropdown = new ProfileDropdown(
      this.$target.querySelector("#dropdown-area")
    );

    // 뒤로가기 버튼
    const $back = this.$target.querySelector("#back-button");
    $back.addEventListener("click", () => window.history.back());
  }
}
