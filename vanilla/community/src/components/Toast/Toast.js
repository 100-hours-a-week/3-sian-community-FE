import Component from "../../core/Component.js";
import { h } from "../../core/h.js";

export default class Toast extends Component {
  template() {
    return h("div", { class: "toast-message", id: "toast-message" });
  }

  show(message, type = "success") {
    const $toast = this.$target.querySelector("#toast-message");

    $toast.textContent = message;
    $toast.className = `toast-message show ${type}`;

    setTimeout(() => {
      $toast.classList.remove("show");
    }, 2500);
  }
}
