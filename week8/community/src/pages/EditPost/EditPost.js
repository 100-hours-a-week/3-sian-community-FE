import Component from "../../core/Component.js";
import Button from "../../components/Button/Button.js";
import { apiFetch } from "../../core/apiFetch.js";

export default class EditPost extends Component {
  template() {
    return `
      <div class="page edit-post-page">
        <h1 class="edit-post-title">게시글 수정</h1>

        <form class="write-post-form" id="edit-form">
          <div class="form-group">
            <label for="title" class="form-label">제목</label>
            <input type="text" id="title" class="form-input" maxlength="26" />
          </div>

          <div class="form-group">
            <label for="content" class="form-label">내용</label>
            <textarea id="content" rows="8" class="form-textarea"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">이미지</label>
            <div class="current-file-name" id="current-file-name"></div>
            <div class="file-input">
              <input type="file" id="image" accept="image/*" />
            </div>
          </div>

          <div class="form-submit" id="submit-button"></div>
        </form>
      </div>
    `;
  }

  async mounted() {
    const $form = this.$target.querySelector("#edit-form");
    const $title = this.$target.querySelector("#title");
    const $content = this.$target.querySelector("#content");
    const $imageInput = this.$target.querySelector("#image");
    const $submit = this.$target.querySelector("#submit-button");
    const $fileName = this.$target.querySelector("#current-file-name");

    const postId = window.location.pathname.split("/").pop();
    let selectedFile = null;
    let existingImageUrl = null;

    try {
      const res = await apiFetch(`/posts/${postId}`, { method: "GET" });
      const post = res.data;

      $title.value = post.title;
      $content.value = post.content;

      if (post.postImageUrl) {
        existingImageUrl = post.postImageUrl;

        const fileName = existingImageUrl.split("/").pop();
        $fileName.textContent = `현재 이미지: ${fileName}`;
      }
    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
      alert("게시글 데이터를 불러올 수 없습니다.");
      return;
    }

    const validate = () => {
      const title = $title.value.trim();
      const content = $content.value.trim();

      const v1 = validateTitle(title);
      const v2 = validateContent(content);

      if (!v1.ok) {
        $error.textContent = v1.message;
        $error.classList.add("show");
        submitButton.setDisabled(true);
        return false;
      }

      if (!v2.ok) {
        $error.textContent = v2.message;
        $error.classList.add("show");
        submitButton.setDisabled(true);
        return false;
      }

      $error.textContent = "";
      $error.classList.remove("show");
      submitButton.setDisabled(false);
      return true;
    };

    $title.addEventListener("input", validate);
    $content.addEventListener("input", validate);

    // 파일명
    $imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      selectedFile = file;

      $fileName.textContent = `선택된 파일: ${file.name}`;
    });

    const submitButton = new Button($submit, {
      text: "수정 완료",
      disabled: false,
      variant: "primary",
    });

    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", $title.value.trim());
      formData.append("content", $content.value.trim());

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      try {
        const res = await apiFetch(`/posts/${postId}`, {
          method: "PATCH",
          body: formData,
          useFormData: true,
        });

        alert("수정 완료!");
        window.history.pushState(null, null, `/post/${postId}`);
        window.dispatchEvent(new CustomEvent("navigate"));
      } catch (err) {
        console.error(err);
        alert("수정 실패");
      }
    });
  }
}
