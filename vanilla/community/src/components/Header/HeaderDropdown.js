import Component from "../../core/Component.js";
import { apiFetch } from "../../core/apiFetch.js";
import { h } from "../../core/h.js";

export default class HeaderDropdown extends Component {
  visible = false;

  template() {
    return h(
      "div",
      { class: "header__dropdown" },
      h(
        "ul",
        null,
        h("li", { "data-action": "edit-profile" }, "회원정보수정"),
        h("li", { "data-action": "edit-password" }, "비밀번호수정"),
        h("li", { "data-action": "logout" }, "로그아웃")
      )
    );
  }

  mounted() {
    this.$target.style.display = "none";

    // 메뉴 클릭 처리
    this.$target.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      this.handleAction(action);
    });

    // 바깥 클릭 시 닫기
    document.addEventListener("click", (e) => {
      if (this.visible && !this.$target.contains(e.target)) {
        this.hide();
      }
    });
  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  show() {
    this.visible = true;
    this.$target.style.display = "block";
  }

  hide() {
    this.visible = false;
    this.$target.style.display = "none";
  }

  async handleAction(action) {
    switch (action) {
      case "edit-profile":
        this.navigate("/edit-profile");
        break;

      case "edit-password":
        this.navigate("/edit-password");
        break;

      case "logout":
        await this.logout();
        break;
    }
  }

  navigate(path) {
    window.history.pushState(null, null, path);
    window.dispatchEvent(new CustomEvent("navigate"));
  }

  async logout() {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {}

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.dispatchEvent(new CustomEvent("user-updated"));
    this.hide();

    setTimeout(() => {
      this.navigate("/login");
    }, 300);
  }
}
