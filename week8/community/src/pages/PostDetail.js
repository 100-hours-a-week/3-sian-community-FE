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
    const $commentList = this.$target.querySelector("#comment-list");
    const $commentForm = this.$target.querySelector("#comment-form");

    let post;
    try {
      const res = await apiFetch(`/posts/${postId}`, { method: "GET" });
      post = res.data;
    } catch (err) {
      console.error("상세조회 실패:", err);
      return;
    }

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

    $editBtn.addEventListener("click", () => {
      window.history.pushState(null, null, `/editPost/${postId}`);
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    $deleteBtn.addEventListener("click", () => {
      new ConfirmModal($modalRoot, {
        title: "게시글을 삭제하시겠습니까?",
        message: "삭제한 내용은 복구 할 수 없습니다.",
        onCancel: () => {},
        onConfirm: async () => {
          try {
            await apiFetch(`/posts/${postId}`, { method: "DELETE" });

            alert("삭제되었습니다!");
            window.history.pushState(null, null, "/posts");
            window.dispatchEvent(new CustomEvent("navigate"));
          } catch (err) {
            console.error("삭제 실패:", err);
            alert("게시글 삭제에 실패했습니다.");
          }
        },
      });
    });

    // 댓글
    const loadComments = async () => {
      $commentList.innerHTML = "";

      try {
        const res = await apiFetch(`/posts/${postId}/comments`, {
          method: "GET",
        });

        const comments = res.data.content ?? [];

        comments.forEach((comment) => renderCommentItem(comment));
      } catch (err) {
        console.error("댓글 불러오기 실패:", err);
      }
    };

    const renderCommentItem = (comment) => {
      const $div = document.createElement("div");
      new CommentItem($div, {
        id: comment.id,
        author: comment.authorNickname,
        date: comment.createdAt,
        content: comment.content,
        onDelete: async () => {
          try {
            await apiFetch(`/posts/${postId}/comments/${comment.id}`, {
              method: "DELETE",
            });
            loadComments();
          } catch (err) {
            console.error("댓글 삭제 실패:", err);
            alert("댓글 삭제 실패");
          }
        },
      });
      $commentList.appendChild($div);
    };

    new CommentForm($commentForm, {
      onSubmit: async (text) => {
        try {
          await apiFetch(`/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({ content: text }),
          });

          loadComments();
        } catch (err) {
          console.error("댓글 작성 실패:", err);
        }
      },
    });

    loadComments();
  }
}
