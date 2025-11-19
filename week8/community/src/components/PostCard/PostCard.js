import Component from "../../core/Component.js";
import { html } from "../../core/html.js";
import ProfileImage from "../ProfileImage/ProfileImage.js";

export default class PostCard extends Component {
  template() {
    const { id, title, likes, comments, views, date, author, authorImage } =
      this.$props;
    return html`
      <div class="postcard-item" data-id="${id}">
        <div class="postcard-top">
          <div class="postcard-title">${title}</div>
          <div class="postcard-info-section">
            <div class="postcard-info">
              <span>좋아요 ${likes}</span>
              <span>댓글 ${comments}</span>
              <span>조회수 ${views}</span>
            </div>
            <div class="postcard-date">${date}</div>
          </div>
        </div>

        <hr class="postcard-divider" />

        <div class="postcard-author">
          <div class="author-image"></div>
          <div class="author-name">${author}</div>
        </div>
      </div>
    `;
  }

  mounted() {
    const postId = this.$props.id;
    const $postItem = this.$target.querySelector(".postcard-item");

    const $profileArea = this.$target.querySelector(".author-image");

    new ProfileImage($profileArea, {
      imageUrl: this.$props.authorImage,
    });

    $postItem.addEventListener("click", () => {
      window.history.pushState(null, null, `/post/${postId}`);
      window.dispatchEvent(new CustomEvent("navigate"));
    });
  }
}
