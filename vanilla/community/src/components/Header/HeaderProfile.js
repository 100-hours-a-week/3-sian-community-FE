import Component from "../../core/Component.js";
import { h } from "../../core/h.js";
import ProfileImage from "../ProfileImage/ProfileImage.js";

export default class HeaderProfile extends Component {
  template() {
    return h("div", { class: "header-author-image" });
  }

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.profileImage = new ProfileImage(this.$target, {
      imageUrl: user?.profileImageUrl,
    });

    this.$target.addEventListener("click", (e) => {
      e.stopPropagation();
      this.$props.onClick && this.$props.onClick();
    });

    this.addWindowEvent("user-updated", () => this.updateImage());
    this.addWindowEvent("navigate", () => this.updateDisplay());
    this.addWindowEvent("popstate", () => this.updateDisplay());

    this.updateDisplay();
  }

  updateImage() {
    const latest = JSON.parse(localStorage.getItem("user"));
    this.profileImage.updateImage(latest?.profileImageUrl || null);
  }

  updateDisplay() {
    const hidePaths = ["/", "/login", "/signup"];
    const current = window.location.pathname;

    this.$target.style.display = hidePaths.includes(current) ? "none" : "flex";
  }
}
