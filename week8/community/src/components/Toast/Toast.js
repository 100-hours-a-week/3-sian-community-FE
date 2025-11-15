import Component from "../../core/Component.js";

export default class Toast extends Component {
  template() {
    return `
      <div class="toast-message" id="toast-message"></div>
    `;
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
