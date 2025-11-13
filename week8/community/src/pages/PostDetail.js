import Component from "../core/Component.js";
import CommentForm from "../components/CommentForm.js";
import CommentItem from "../components/Comment.js";
import ConfirmModal from "../components/ConfirmModal.js";
import { apiFetch } from "../core/apiFetch.js";

export default class PostDetail extends Component {
  template() {
    return `
        <div class="post-page">
        <div class="post-header">
            <h1 class="post-title"></h1>

            <div class="post-meta">
                <div class="post-author-info">
                <div class="author-image"></div>
                <span class="author-name"></span>
                <span class="post-date"></span>
                </div>

                <div class="post-actions">
                <button class="edit-btn">수정</button>
                <button class="delete-btn">삭제</button>
                </div>
            </div>
        </div>

        <hr class="post-divider" />

        <div class="post-image"></div>

        <div class="post-content"></div>

        <div class="post-stats">
          <div class="stat"><strong class="like-count">0</strong><span>좋아요수</span></div>
          <div class="stat"><strong class="view-count">0</strong><span>조회수</span></div>
          <div class="stat"><strong class="comment-count">0</strong><span>댓글</span></div>
        </div>

        <div id="comment-form"></div>
        <div id="comment-list"></div>
        <div id="modal-root"></div>
        </div>

    `;
  }

  async mounted() {
    // 게시글 수정, 삭제
    const postId = window.location.pathname.split("/").pop();

    const $title = this.$target.querySelector(".post-title");
    const $authorName = this.$target.querySelector(".author-name");
    const $authorImage = this.$target.querySelector(".author-image");
    const $date = this.$target.querySelector(".post-date");
    const $postImage = this.$target.querySelector(".post-image");
    const $content = this.$target.querySelector(".post-content");

    const $likeCount = this.$target.querySelector(".like-count");
    const $viewCount = this.$target.querySelector(".view-count");
    const $commentCount = this.$target.querySelector(".comment-count");

    const $editBtn = this.$target.querySelector(".edit-btn");
    const $deleteBtn = this.$target.querySelector(".delete-btn");
    const $modalRoot = this.$target.querySelector("#modal-root");

    // 게시글 상세 조회
    let post;
    try {
      const res = await apiFetch(`/posts/${postId}`, { method: "GET" });
      post = res.data;
    } catch (err) {
      console.error("상세조회 실패:", err);
      return;
    }

    // 게시글 상세 출력
    $title.textContent = post.title;
    $authorName.textContent = post.authorNickname;
    $date.textContent = post.createdAt;

    if (post.authorProfileImage) {
      $authorImage.style.backgroundImage = `url(${post.authorProfileImage})`;
    }

    if (post.postImageUrl) {
      $postImage.innerHTML = `<img src="${post.postImageUrl}" class="detail-post-image" />`;
    } else {
      $postImage.style.display = "none";
    }

    $content.textContent = post.content;

    $likeCount.textContent = post.likeCount;
    $viewCount.textContent = post.viewCount;
    $commentCount.textContent = post.commentCount;

    // 게시글 수정 버튼
    $editBtn.addEventListener("click", () => {
      window.history.pushState(null, null, `/editPost/${postId}`);
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    // 게시글 삭제 버튼
    $deleteBtn.addEventListener("click", () => {
      new ConfirmModal($modalRoot, {
        title: "게시글을 삭제하시겠습니까?",
        message: "삭제한 내용은 복구 할 수 없습니다.",
        onCancel: () => console.log("취소됨"),
        onConfirm: () => {
          console.log("삭제 확인됨");
          alert("삭제되었습니다!");
          window.history.pushState(null, null, "/posts");
          window.dispatchEvent(new CustomEvent("navigate"));
        },
      });
    });

    // 댓글 작성
    const $commentForm = this.$target.querySelector("#comment-form");
    const $commentList = this.$target.querySelector("#comment-list");

    new CommentForm($commentForm, {
      onSubmit: (text) => {
        console.log("새 댓글:", text);
        // 댓글 추가 로직 구현 가능
      },
    });

    // 댓글 리스트
    const comments = Array(3)
      .fill(0)
      .map((_, i) => ({
        id: i + 1,
        author: `더미 작성자 ${i + 1}`,
        date: "2021-01-01 00:00:00",
        content: "댓글 내용",
      }));

    comments.forEach((c) => {
      const $comment = document.createElement("div");
      $commentList.appendChild($comment);
      new CommentItem($comment, c);
    });
  }
}
