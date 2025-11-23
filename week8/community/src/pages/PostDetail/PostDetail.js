import Component from "../../core/Component.js";
import CommentForm from "../../components/Comment/CommentForm.js";
import CommentItem from "../../components/Comment/Comment.js";
import ConfirmModal from "../../components/Modal/ConfirmModal.js";
import { apiFetch } from "../../core/apiFetch.js";
import ProfileImage from "../../components/ProfileImage/ProfileImage.js";
import { html } from "../../core/html.js";

export default class PostDetail extends Component {
  template() {
    return html`
      <div class="post-page">
        <div class="post-container">
          <div class="post-header">
            <h1 class="post-title"></h1>

            <div class="post-meta">
              <div class="post-author-info">
                <div class="author-image"></div>
                <span class="author-name"></span>
              </div>

              <!-- 드롭다운 메뉴 -->
              <div class="post-actions">
                <div class="post-menu-icon">⋮</div>
                <div class="post-menu-dropdown">
                  <div class="post-menu-item edit">수정하기</div>
                  <div class="post-menu-item delete">삭제하기</div>
                </div>
              </div>
            </div>
          </div>

          <hr class="post-divider" />
          <div class="post-info">
            <span class="post-date"></span>
            <div class="post-stats">
              <div class="stat like-stat">
                <span>좋아요</span><strong class="like-count">0</strong>
              </div>
              <div class="stat">
                <span>조회</span><strong class="view-count">0</strong>
              </div>
              <div class="stat">
                <span>댓글</span><strong class="comment-count">0</strong>
              </div>
            </div>
          </div>

          <div class="post-image"></div>

          <div class="post-content"></div>
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
    const $likeStat = this.$target.querySelector(".like-stat");

    const $viewCount = this.$target.querySelector(".view-count");
    const $commentCount = this.$target.querySelector(".comment-count");

    const $menuIcon = this.$target.querySelector(".post-menu-icon");
    const $dropdown = this.$target.querySelector(".post-menu-dropdown");
    const $menuEdit = this.$target.querySelector(".post-menu-item.edit");
    const $menuDelete = this.$target.querySelector(".post-menu-item.delete");

    const $modalRoot = this.$target.querySelector("#modal-root");
    const $commentList = this.$target.querySelector("#comment-list");
    const $commentForm = this.$target.querySelector("#comment-form");

    // 게시글 조회
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

    new ProfileImage($authorImage, {
      imageUrl: post.authorProfileImage,
    });

    if (post.authorProfileImage) {
      $authorImage.style.backgroundImage = `url(${post.authorProfileImage})`;
      $authorImage.style.backgroundSize = "cover";
    }

    // 게시글 이미지
    if (post.postImageUrl) {
      $postImage.innerHTML = "";

      const img = document.createElement("img");
      img.src = post.postImageUrl;
      img.className = "detail-post-image";

      $postImage.appendChild(img);
    } else {
      $postImage.style.display = "none";
    }

    $content.textContent = post.content;
    $likeCount.textContent = post.likeCount;
    $viewCount.textContent = post.viewCount;
    $commentCount.textContent = post.commentCount;

    // 좋아요
    let isLiked = post.liked;

    const updateLikeUI = () => {
      if (isLiked) {
        $likeStat.classList.add("like-active");
      } else {
        $likeStat.classList.remove("like-active");
      }
    };

    updateLikeUI();

    $likeStat.addEventListener("click", async () => {
      const hasToken = localStorage.getItem("accessToken");
      if (!hasToken) {
        alert("로그인 후 이용해주세요.");
        window.history.pushState(null, null, "/login");
        window.dispatchEvent(new CustomEvent("navigate"));
        return;
      }

      try {
        if (!isLiked) {
          await apiFetch(`/posts/${postId}/likes`, { method: "POST" });
          isLiked = true;
          $likeCount.textContent = Number($likeCount.textContent) + 1;
        } else {
          await apiFetch(`/posts/${postId}/likes`, { method: "DELETE" });
          isLiked = false;
          $likeCount.textContent = Number($likeCount.textContent) - 1;
        }

        updateLikeUI();
      } catch (err) {
        console.error("좋아요 토글 실패:", err);
      }
    });

    // 게시글 메뉴
    if (!post.isAuthor) {
      $menuIcon.style.display = "none";
    } else {
      $menuIcon.style.display = "block";
    }

    $menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      $dropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!$dropdown.contains(e.target) && e.target !== $menuIcon) {
        $dropdown.classList.remove("show");
      }
    });

    // 게시글 수정
    $menuEdit.addEventListener("click", () => {
      window.history.pushState(null, null, `/editPost/${postId}`);
      window.dispatchEvent(new CustomEvent("navigate"));
    });

    // 게시글 삭제
    $menuDelete.addEventListener("click", () => {
      new ConfirmModal($modalRoot, {
        title: "게시글 삭제",
        message: "삭제한 게시글은 복구되지 않아요!",
        onConfirm: async () => {
          try {
            await apiFetch(`/posts/${postId}`, { method: "DELETE" });
            alert("삭제되었습니다!");
            window.history.pushState(null, null, "/posts");
            window.dispatchEvent(new CustomEvent("navigate"));
          } catch (err) {
            console.error("삭제 실패:", err);
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
        authorImage: comment.authorProfileImage,
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
