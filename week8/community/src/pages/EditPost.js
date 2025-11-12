import Component from "../core/Component.js";
import Button from "../components/Button.js";

export default class EditPost extends Component {
  template() {
    return `
      <div class="page write-post-page">
        <h1 class="write-post-title">게시글 수정</h1>

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
    const $submit = this.$target.querySelector("#submit-button");
    const $error = this.$target.querySelector(".error");

    const postData = {
      title: "기존 제목입니다.",
      content: "기존 내용이 여기에 표시됩니다.",
    };

    $title.value = postData.title;
    $content.value = postData.content;

    const submitButton = new Button($submit, {
      text: "수정하기",
      disabled: false,
      variant: "primary",
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

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;

      const title = $title.value.trim();
      const content = $content.value.trim();
      const image = $form.image.files[0];

      console.log({ title, content, image });
      alert("게시글이 수정되었습니다!");

      window.history.pushState(null, null, "/posts");
      window.dispatchEvent(new CustomEvent("navigate"));
    });
  }
}
