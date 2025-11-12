import Component from "../core/Component.js";
import Button from "../components/Button.js";
import PostCard from "../components/PostCard.js";

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

        <div class="post-list"></div>
      </div>
    `;
  }

  mounted() {
    // 게시글 작성 버튼
    const $writeButton = this.$target.querySelector("#write-button");

    new Button($writeButton, {
      text: "게시글 작성",
      disabled: false,
      variant: "mini",
    });

    $writeButton.addEventListener("click", () => {
      window.history.pushState(null, null, "/write-post");
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    // 게시글 목록
    const $postList = this.$target.querySelector(".post-list");

    Array(5)
      .fill(0)
      .forEach((_, i) => {
        const post = {
          id: i + 1,
          title: `제목 ${i + 1}`,
          likes: 0,
          comments: 0,
          views: 0,
          date: "2021-01-01 00:00:00",
          author: `더미 작성자 ${i + 1}`,
          authorImage: "",
        };

        const $card = document.createElement("div");
        $postList.appendChild($card);

        new PostCard($card, post);
      });
  }
}
