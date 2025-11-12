import Component from "../core/Component.js";
import CommentForm from "../components/CommentForm.js";
import CommentItem from "../components/Comment.js";
import ConfirmModal from "../components/ConfirmModal.js";

export default class PostDetail extends Component {
  template() {
    return `
        <div class="post-page">
        <div class="post-header">
            <h1 class="post-title">제목 1</h1>

            <div class="post-meta">
                <div class="post-author-info">
                <div class="author-image"></div>
                <span class="author-name">더미 작성자 1</span>
                <span class="post-date">2021-01-01 00:00:00</span>
                </div>

                <div class="post-actions">
                <button class="edit-btn">수정</button>
                <button class="delete-btn">삭제</button>
                </div>
            </div>
        </div>
        <hr class="post-divider" />
        <div class="post-image"></div>

        <div class="post-content"> 
무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. 우리는 매일 새로운 경험을 하고 배우며 성장합니다. 때로는 어려움과 도전이 있지만, 그것들이 우리를 더 강하고 지혜롭게 만듭니다. 또한 우리는 주변의 사람들과 연결되며 사랑과 지지를 받습니다. 그래서 우리의 삶은 소중하고 의미가 있습니다.
자연도 아름다운 이야기입니다. 우리 주변의 자연은 끝없는 아름다움과 신비로움을 담고 있습니다. 산, 바다, 숲, 하늘 등 모든 것이 우리를 놀라게 만들고 감동시킵니다. 자연은 우리의 생명과 안정을 지키며 우리에게 힘을 주는 곳입니다.
마지막으로, 지식을 향한 탐구는 항상 흥미로운 여정입니다. 우리는 끝없는 지식의 바다에서 배우고 발견할 수 있으며, 이것이 우리를 더 깊이 이해하고 세상을 더 넓게 보게 해줍니다.
그런 의미에서, 삶은 놀라움과 경이로움으로 가득 차 있습니다. 새로운 경험을 즐기고 항상 앞으로 나아가는 것이 중요하다고 생각합니다.
        </div>

        <div class="post-stats">
          <div class="stat"><strong>123</strong><span>좋아요수</span></div>
          <div class="stat"><strong>123</strong><span>조회수</span></div>
          <div class="stat"><strong>123</strong><span>댓글</span></div>
        </div>

        <div id="comment-form"></div>
        <div id="comment-list"></div>
        <div id="modal-root"></div>
        </div>

    `;
  }

  mounted() {
    // 게시글 수정, 삭제
    const postId = window.location.pathname.split("/").pop();
    const $editBtn = this.$target.querySelector(".edit-btn");
    const $deleteBtn = this.$target.querySelector(".delete-btn");
    const $modalRoot = this.$target.querySelector("#modal-root");

    $editBtn.addEventListener("click", () => {
      window.history.pushState(null, null, `/editPost/${postId}`);
      window.dispatchEvent(new CustomEvent("navigate"));
    });

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
