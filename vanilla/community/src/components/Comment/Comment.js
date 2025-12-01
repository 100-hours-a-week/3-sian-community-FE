import Component from "../../core/Component.js";
import { h } from "../../core/h.js";
import ConfirmModal from "../Modal/ConfirmModal.js";
import ProfileImage from "../ProfileImage/ProfileImage.js";

export default class Comment extends Component {
  setup() {
    this.$state = {
      isEditing: false,
      editedContent: this.$props.content,
    };
  }

  template() {
    const { author, date } = this.$props;
    const { isEditing, editedContent } = this.$state;

    return h(
      "div",
      { class: "comment-item" },
      h(
        "div",
        { class: "comment-left" },

        h(
          "div",
          { class: "comment-author-info" },
          h("div", { class: "author-image" }),
          h(
            "div",
            { class: "comment-author-meta" },
            h("span", { class: "comment-author" }, author),
            h("span", { class: "comment-date" }, date)
          )
        ),

        isEditing
          ? h(
              "div",
              { class: "comment-edit-wrapper" },
              h("textarea", { class: "comment-edit-input" }, editedContent),
              h(
                "div",
                { class: "comment-edit-actions" },
                h("button", { class: "comment-save-btn" }, "저장"),
                h("button", { class: "comment-cancel-btn" }, "취소")
              )
            )
          : h("div", { class: "comment-content" }, editedContent)
      ),

      h(
        "div",
        { class: "comment-right" },
        !isEditing &&
          h(
            "div",
            { class: "comment-btn-container" },
            h("button", { class: "comment-btn edit" }, "수정"),
            h("button", { class: "comment-btn comment-delete" }, "삭제")
          )
      ),

      h("div", { id: "modal-root" })
    );
  }

  mounted() {
    const { onEdit, onDelete } = this.$props;
    const $modalRoot = this.$target.querySelector("#modal-root");
    const $authorImage = this.$target.querySelector(".author-image");

    const $editBtn = this.$target.querySelector(".comment-btn.edit");
    const $deleteBtn = this.$target.querySelector(
      ".comment-btn.comment-delete"
    );

    new ProfileImage($authorImage, {
      imageUrl: this.$props.authorImage,
    });

    if ($editBtn) {
      $editBtn.addEventListener("click", () => {
        this.setState({ isEditing: true });
      });
    }

    if ($deleteBtn) {
      $deleteBtn.addEventListener("click", () => {
        new ConfirmModal($modalRoot, {
          title: "댓글을 삭제하시겠습니까?",
          message: "삭제한 내용은 복구할 수 없습니다.",
          onConfirm: () => {
            onDelete?.();
          },
        });
      });
    }

    // 댓글 수정
    const $saveBtn = this.$target.querySelector(".comment-save-btn");
    const $cancelBtn = this.$target.querySelector(".comment-cancel-btn");
    const $editInput = this.$target.querySelector(".comment-edit-input");

    if ($saveBtn) {
      $saveBtn.addEventListener("click", () => {
        const newContent = $editInput.value.trim();
        if (newContent) {
          this.setState({ isEditing: false, editedContent: newContent });
          onEdit?.(newContent);
        }
      });
    }

    if ($cancelBtn) {
      $cancelBtn.addEventListener("click", () => {
        this.setState({ isEditing: false });
      });
    }
  }
}
