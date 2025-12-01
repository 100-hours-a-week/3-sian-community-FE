import Component from "../../core/Component.js";
import { h } from "../../core/h.js";

export default class PostCard extends Component {
  template() {
    const { id, title, likes, comments, views, date, author } = this.$props;
    return h(
      "div",
      { class: "postcard-item", "data-id": id },

      h(
        "div",
        { class: "postcard-top" },
        h("div", { class: "postcard-title" }, title),

        h(
          "div",
          { class: "postcard-filter-section" },
          h("div", { class: "postcard-filter bass" }, "베이스"),
          h("div", { class: "postcard-filter vocal" }, "보컬"),
          h("div", { class: "postcard-filter region" }, "경기도")
        )
      ),

      h("hr", { class: "postcard-divider" }),

      h(
        "div",
        { class: "postcard-info-section" },

        h(
          "div",
          { class: "postcard-info left" },
          h("span", null, `좋아요 ${likes}`),
          h("span", null, `댓글 ${comments}`),
          h("span", null, `조회수 ${views}`)
        ),

        h(
          "div",
          { class: "postcard-info right" },
          h("div", { class: "postcard-date" }, date),
          h("div", { class: "author-name" }, author)
        )
      )
    );
  }

  mounted() {
    const postId = this.$props.id;
    const $postItem = this.$target.querySelector(".postcard-item");

    $postItem.addEventListener("click", () => {
      window.history.pushState(null, null, `/post/${postId}`);
      window.dispatchEvent(new CustomEvent("navigate"));
    });
  }
}
