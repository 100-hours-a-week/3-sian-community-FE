import Component from "../../core/Component.js";
import { h } from "../../core/h.js";
import Button from "../Button/Button.js";

export default class CommentForm extends Component {
  template() {
    const initialValue = this.$props.initialValue || "";
    return h(
      "form",
      { class: "comment-form" },
      h(
        "div",
        { class: "comment-input-wrapper" },
        h("textarea", { class: "comment-input" }, initialValue),
        h("div", { class: "comment-divider" }),
        h("div", { class: "comment-button", id: "comment-button" })
      )
    );
  }

  mounted() {
    const $input = this.$target.querySelector(".comment-input");
    const $buttonContainer = this.$target.querySelector("#comment-button");

    const submitButton = new Button($buttonContainer, {
      text: "댓글 등록",
      disabled: true,
      variant: "primary",
    });

    $input.addEventListener("input", () => {
      const hasText = $input.value.trim().length > 0;
      submitButton.setDisabled(!hasText);
    });

    this.$target
      .querySelector(".comment-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const text = $input.value.trim();
        if (!text) return;
        this.$props.onSubmit?.(text);
        $input.value = "";
        submitButton.setDisabled(true);
      });
  }
}
