import { injectStyle } from "../core/injectStyle.js";
import Component from "../core/Component.js";

export default class Header extends Component {
  template() {
    return `
        <header class="layout-header">
            <div class="header-title">아무 말 대잔치</div>
        </header>
    `;
  }

  mounted() {
    injectStyle(
      "header-style",
      `
        .layout-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 104px;
            background: #F4F5F7;
            border-bottom: 1px solid #000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .header-title {
        font-size: 32px;
        color: #000;
        }
        `
    );
  }
}
