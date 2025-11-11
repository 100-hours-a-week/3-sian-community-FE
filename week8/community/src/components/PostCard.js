import Component from "../core/Component.js";

export default class PostCard extends Component {
  template() {
    return `
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
    `;
  }
}
