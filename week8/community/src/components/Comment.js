import Component from "../core/Component.js";

export default class Comment extends Component {
  template() {
    const { author, date, content } = this.$props;
    return `
      <div class="comment-item">
        <div class="comment-left">
          <div class="comment-author-info">
            <div class="comment-author-image"></div>
            <div class="comment-author-meta">
              <span class="comment-author">${author}</span>
              <span class="comment-date">${date}</span>
            </div>
          </div>
          <div class="comment-content">${content}</div>
        </div>
        <div class="comment-right">
          <button class="comment-btn edit">수정</button>
          <button class="comment-btn delete">삭제</button>
        </div>
      </div>
    `;
  }
}
