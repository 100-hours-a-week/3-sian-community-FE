import Component from "../../core/Component.js";
import { html } from "../../core/html.js";

export default class Button extends Component {
  template() {
    const { text, disabled, variant = "primary" } = this.$props;
    return html`
      <button class="btn ${variant}" ${disabled ? "disabled" : ""}>
        ${text}
      </button>
    `;
  }

  setDisabled(isDisabled) {
    const btn = this.$target.querySelector("button");
    if (btn) btn.disabled = isDisabled;
  }
}
