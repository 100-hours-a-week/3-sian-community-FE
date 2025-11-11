import Component from "../core/Component.js";

export default class Button extends Component {
  template() {
    const { text, disabled, variant = "primary" } = this.$props;
    return `
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
