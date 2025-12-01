import Component from "../../core/Component.js";
import { h } from "../../core/h.js";

export default class PostFilter extends Component {
  setup() {
    this.$state = {
      regionOpen: false,
    };
  }

  template() {
    const { regionOpen } = this.$state;

    const regions = [
      "서울",
      "경기",
      "인천",
      "부산",
      "대구",
      "대전",
      "광주",
      "울산",
      "강원",
      "충북",
      "충남",
      "전북",
      "전남",
      "경북",
      "경남",
      "제주",
    ];

    return h(
      "div",
      { class: "post-filter" },
      h(
        "div",
        { class: "filter-top-row" },

        // 지역 필터
        h(
          "div",
          { class: "region-dropdown" },
          h("button", { class: "region-toggle-btn" }, "활동 지역 ▼"),
          h(
            "div",
            { class: `region-menu ${regionOpen ? "open" : ""}` },
            h(
              "div",
              { class: "region-scroll" },
              ...regions.map((r) => h("div", { class: "region-option" }, r))
            )
          )
        ),

        // 포지션 필터
        h(
          "div",
          { class: "position-options" },
          h("div", { class: "pos-item", "data-pos": "vocal" }, "VOCAL"),
          h("div", { class: "pos-item", "data-pos": "guitar" }, "GUITAR"),
          h("div", { class: "pos-item", "data-pos": "bass" }, "BASS"),
          h("div", { class: "pos-item", "data-pos": "drum" }, "DRUM"),
          h("div", { class: "pos-item", "data-pos": "keyboard" }, "KEYBOARD")
        )
      )
    );
  }

  mounted() {
    // 지역 메뉴 toggle
    const $toggle = this.$target.querySelector(".region-toggle-btn");

    $toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.setState({ regionOpen: !this.$state.regionOpen });
    });

    // 바깥 클릭 시 닫기
    document.addEventListener("click", () => {
      if (this.$state.regionOpen) {
        this.setState({ regionOpen: false });
      }
    });
  }
}
