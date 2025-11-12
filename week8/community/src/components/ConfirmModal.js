import Component from "../core/Component.js";
import Button from "./Button.js";

export default class ConfirmModal extends Component {
  template() {
    const { title, message } = this.$props;
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">${title}</h2>
          <p class="modal-message">${message}</p>
          <div class="modal-buttons">
            <div id="cancel-btn"></div>
            <div id="confirm-btn"></div>
          </div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { onConfirm, onCancel } = this.$props;

    const $cancel = this.$target.querySelector("#cancel-btn");
    const $confirm = this.$target.querySelector("#confirm-btn");

    new Button($cancel, {
      text: "취소",
      variant: "secondary",
      disabled: false,
    });

    new Button($confirm, {
      text: "확인",
      variant: "primary",
      disabled: false,
    });

    $cancel.addEventListener("click", () => {
      onCancel?.();
      this.close();
    });

    $confirm.addEventListener("click", () => {
      onConfirm?.();
      this.close();
    });
  }

  close() {
    this.$target.innerHTML = "";
  }
}
