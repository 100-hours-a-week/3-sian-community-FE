import Component from "../core/Component.js";
import Button from "../components/Button.js";

export default class Posts extends Component {
  template() {
    return `
      <div class="page posts-page">
          <p class="posts-intro">
            안녕하세요,<br />
            <strong>아무 말 대잔치 게시판</strong> 입니다.
          </p>
          <div class="button-row">
            <div id="write-button"></div>
          </div>

      <div class="post-list">
        ${Array(5)
          .fill(0)
          .map(
            () => `
          <div class="post-item">
            <div class="post-top">
              <div class="post-title">제목 1</div>
              <div class="post-date">2021-01-01 00:00:00</div>
            </div>
            <div class="post-info">
              <span>좋아요 0</span>
              <span>댓글 0</span>
              <span>조회수 0</span>
            </div>
            <hr class="post-divider" />
            <div class="post-author">
              <div class="author-image"></div>
              <div class="author-name">더미 작성자 1</div>
            </div>
          </div>
           `
          )
          .join("")}
          </div>
        </div>
    `;
  }

  mounted() {
    const $writeButton = this.$target.querySelector("#write-button");

    new Button($writeButton, {
      text: "게시글 작성",
      disabled: false,
      variant: "mini",
    });

    $writeButton.addEventListener("click", () => {
      window.history.pushState(null, null, "/writePost");
      window.dispatchEvent(new CustomEvent("navigate"));
    });
  }
}
