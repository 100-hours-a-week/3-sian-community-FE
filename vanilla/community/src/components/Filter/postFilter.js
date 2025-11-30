import Component from "../../core/Component.js";
import { html } from "../../core/html.js";

export default class PostFilter extends Component {
  setup() {
    this.$state = {
      regionOpen: false,
    };
  }

  template() {
    const { regionOpen } = this.$state;

    return html`
      <div class="post-filter">
        <!-- 상단: 지역 드롭다운 + 포지션 -->
        <div class="filter-top-row">
          <!-- 지역 필터 -->
          <div class="region-dropdown">
            <button class="region-toggle-btn">활동 지역 ▼</button>

            <div class="region-menu ${regionOpen ? "open" : ""}">
              <div class="region-scroll">
                ${[
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
                ]
                  .map((r) => `<div class="region-option">${r}</div>`)
                  .join("")}
              </div>
            </div>
          </div>

          <!-- 포지션 필터 -->
          <div class="position-options">
            <div class="pos-item" data-pos="vocal">VOCAL</div>
            <div class="pos-item" data-pos="guitar">GUITAR</div>
            <div class="pos-item" data-pos="bass">BASS</div>
            <div class="pos-item" data-pos="drum">DRUM</div>
            <div class="pos-item" data-pos="keyboard">KEYBOARD</div>
          </div>
        </div>
      </div>
    `;
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
