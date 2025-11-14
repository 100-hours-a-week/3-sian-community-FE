import Component from "../../core/Component.js";
import ConfirmModal from "../Modal/ConfirmModal.js";

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

    return `
      <div class="comment-item">
        <div class="comment-left">
          <div class="comment-author-info">
            <div class="comment-author-image"></div>
            <div class="comment-author-meta">
              <span class="comment-author">${author}</span>
              <span class="comment-date">${date}</span>
            </div>
          </div>
          ${
            isEditing
              ? `
                <div class="comment-edit-wrapper">
                  <textarea 
                    class="comment-edit-input"
                    placeholder="${editedContent}"
                  ></textarea>
                  <div class="comment-edit-actions">
                    <button class="comment-save-btn">저장</button>
                    <button class="comment-cancel-btn">취소</button>
                  </div>
                </div>
              `
              : `<div class="comment-content">${editedContent}</div>`
          }
        </div>
        <div class="comment-right">
          ${
            !isEditing
              ? `
                <button class="comment-btn edit">수정</button>
                <button class="comment-btn delete">삭제</button>
              `
              : ""
          }
        </div>
        <div id="modal-root"></div> 
      </div>
    `;
  }

  mounted() {
    const { onEdit, onDelete } = this.$props;
    const $modalRoot = this.$target.querySelector("#modal-root");

    const $editBtn = this.$target.querySelector(".comment-btn.edit");
    const $deleteBtn = this.$target.querySelector(".comment-btn.delete");

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
