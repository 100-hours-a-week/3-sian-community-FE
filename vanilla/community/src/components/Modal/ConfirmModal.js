import Component from "../../core/Component.js";
import { h } from "../../core/h.js";
import Button from "../Button/Button.js";

export default class ConfirmModal extends Component {
  template() {
    const { title, message } = this.$props;
    return h(
      "div",
      { class: "modal-overlay" },
      h(
        "div",
        { class: "modal-content" },
        h("h2", { class: "modal-title" }, title),
        h("p", { class: "modal-message" }, message),

        h(
          "div",
          { class: "modal-buttons" },
          h("div", { id: "cancel-btn" }),
          h("div", { id: "confirm-btn" })
        )
      )
    );
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
