import Component from "../core/Component.js";
import Button from "../components/Button.js";
import { apiFetch } from "../core/apiFetch.js";

export default class WritePost extends Component {
  template() {
    return `
      <div class="page write-post-page">
        <h1 class="write-post-title">게시글 작성</h1>

        <form class="write-post-form" id="write-form">
          <div class="form-group">
            <label for="title" class="form-label">제목<span class="required">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              maxlength="26"
              placeholder="제목을 입력해주세요. (최대 26글자)"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="content" class="form-label">내용<span class="required">*</span></label>
            <textarea
              id="content"
              name="content"
              rows="8"
              placeholder="내용을 입력해주세요."
              class="form-textarea"
              required
            ></textarea>
            <p class="error"></p>
          </div>

          <div class="form-group">
            <label for="image" class="form-label">이미지</label>
            <div class="file-input">
              <input type="file" id="image" name="image" />
            </div>
          </div>

          <div class="form-submit" id="submit-button"></div>
        </form>
      </div>
    `;
  }

  mounted() {
    const $form = this.$target.querySelector("#write-form");
    const $title = $form.querySelector("#title");
    const $content = $form.querySelector("#content");
    const $imageInput = $form.querySelector("#image");
    const $submit = this.$target.querySelector("#submit-button");
    const $error = this.$target.querySelector(".error");

    const submitButton = new Button($submit, {
      text: "완료",
      disabled: true,
      variant: "primary",
    });

    // 이미지 파일 base64로 변환
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const validate = () => {
      const title = $title.value.trim();
      const content = $content.value.trim();

      const isValid =
        title.length > 0 && title.length <= 26 && content.length > 0;

      submitButton.setDisabled(!isValid);

      if (!title || !content) {
        $error.innerHTML = "* 제목과 내용을 모두 입력해주세요.";
        $error.classList.add("show");
      } else if (title.length > 26) {
        $error.innerHTML = "* 제목은 최대 26자까지 입력 가능합니다.";
        $error.classList.add("show");
      } else {
        $error.innerHTML = "";
        $error.classList.remove("show");
      }

      return isValid;
    };

    $title.addEventListener("input", validate);
    $content.addEventListener("input", validate);

    // 게시글 등록
    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!validate()) return;

      const title = $title.value.trim();
      const content = $content.value.trim();
      const file = $imageInput.files[0];

      try {
        const imageBase64 = await toBase64(file);

        const payload = {
          title,
          content,
          postImage: imageBase64,
        };

        const res = await apiFetch("/posts", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        alert("게시글이 등록되었습니다!");

        window.history.pushState(null, null, "/posts");
        window.dispatchEvent(new CustomEvent("navigate"));
      } catch (err) {
        console.error("게시글 등록 중 오류:", err);
        $error.innerHTML = "* 게시글 등록 중 오류가 발생했습니다.";
        $error.classList.add("show");
      }
    });
  }
}
