import Component from "../../core/Component.js";
import Button from "../../components/Button/Button.js";
import PostCard from "../../components/PostCard/PostCard.js";
import { apiFetch } from "../../core/apiFetch.js";
import { html } from "../../core/html.js";
import PostFilter from "../../components/Filter/postFilter.js";

export default class Posts extends Component {
  setup() {
    this.$state = {
      posts: [],
    };
  }

  template() {
    return html`<div class="page posts-page">
      <div class="posts-intro">
        <p>음악은 혼자보다, 함께일 때 더 즐겁다</p>
        <p>밴드 모집 커뮤니티, <strong>브레멘</strong></p>
      </div>
      <div id="post-filter"></div>

      <div class="button-row">
        <div id="write-button"></div>
      </div>

      <div class="post-list"></div>
    </div>`;
  }

  async mounted() {
    // 게시물 필터
    const $filter = this.$target.querySelector("#post-filter");
    new PostFilter($filter);

    // 게시글 작성 버튼
    const $writeButton = this.$target.querySelector("#write-button");

    new Button($writeButton, {
      text: "모집글 작성",
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
