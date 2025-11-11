import Component from "../core/Component.js";

export default class Button extends Component {
  template() {
    return `
        <button class="btn" ${this.$props.disabled ? "disabled" : ""}>
            ${this.$props.text}
        </button>
    `;
  }

  setDisabled(isDisabled) {
    const btn = this.$target.querySelector("button");
    if (btn) btn.disabled = isDisabled;
  }
}
