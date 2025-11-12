import Component from "../core/Component.js";
import Button from "../components/Button.js";

export default class CommentForm extends Component {
  template() {
    return `
      <form class="comment-form">
        <div class="comment-input-wrapper">
          <textarea
            class="comment-input"
            placeholder="댓글을 남겨주세요!"
          ></textarea>
          <div class="comment-divider"></div>
          <div class="comment-button" id="comment-button"></div>
        </div>
      </form>
    `;
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
