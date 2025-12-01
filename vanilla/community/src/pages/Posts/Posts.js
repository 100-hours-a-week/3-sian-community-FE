import Component from "../../core/Component.js";
import Button from "../../components/Button/Button.js";
import PostCard from "../../components/PostCard/PostCard.js";
import { apiFetch } from "../../core/apiFetch.js";
import PostFilter from "../../components/Filter/postFilter.js";
import { h } from "../../core/h.js";

export default class Posts extends Component {
  setup() {
    this.$state = {
      posts: [],
    };
  }

  template() {
    return h(
      "div",
      { class: "page posts-page" },

      h(
        "div",
        { class: "posts-intro" },
        h("p", null, "음악은 혼자보다, 함께일 때 더 즐겁다"),
        h("p", null, ["밴드 모집 커뮤니티, ", h("strong", null, "브레멘")])
      ),

      h("div", { id: "post-filter" }),

      h("div", { class: "button-row" }, h("div", { id: "write-button" })),

      h("div", { class: "post-list" })
    );
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
