import Component from "../../core/Component.js";
import { h } from "../../core/h.js";

export default class Button extends Component {
  template() {
    const { text, disabled, variant = "primary" } = this.$props;
    return h(
      "button",
      {
        class: `btn ${variant}`,
        disabled: disabled ? true : null,
      },
      text
    );
  }

  setDisabled(isDisabled) {
    const btn = this.$target.querySelector("button");
    if (btn) btn.disabled = isDisabled;
  }
}
