import Component from "../../core/Component.js";
import { html } from "../../core/html.js";

export default class ProfileImage extends Component {
  setup() {
    this.$state = {
      imageUrl: this.$props.imageUrl || null,
      size: this.$props.size || 36,
      rounded: this.$props.rounded ?? true,
    };
  }

  template() {
    const { imageUrl, size, rounded } = this.$state;

    const style = `
      width: ${size}px;
      height: ${size}px;
      ${imageUrl ? `background-image: url('${imageUrl}');` : ""}
      background-size: cover;
      background-position: center;
      border-radius: ${rounded ? "50%" : "8px"};
    `;

    return html` <div class="profile-image-component" style="${style}"></div> `;
  }
}
