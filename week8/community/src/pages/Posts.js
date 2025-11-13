import Component from "../core/Component.js";
import Button from "../components/Button.js";
import PostCard from "../components/PostCard.js";
import { apiFetch } from "../core/apiFetch.js";

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

  async mounted() {
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
    // TODO: 무한 스크롤 기능 추가 예정
    const $postList = this.$target.querySelector(".post-list");

    try {
      const res = await apiFetch("/posts?page=0&size=10", {
        method: "GET",
      });

      const posts = res.data.content;

      posts.forEach((post) => {
        const postData = {
          id: post.id,
          title: post.title,
          likes: post.likeCount,
          comments: post.commentCount,
          views: post.viewCount,
          date: post.createdAt,
          author: post.authorNickname,
          authorImage: post.authorProfileImage,
        };

        const $card = document.createElement("div");
        $postList.appendChild($card);

        new PostCard($card, postData);
      });
    } catch (error) {
      $postList.innerHTML = `<p class="error-message">게시글을 불러오지 못했습니다.</p>`;
    }
  }
}
