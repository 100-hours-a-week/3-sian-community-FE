import Component from "../../core/Component.js";
import { h } from "../../core/h.js";
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
    const defaultProfile = "src/assets/profile-image.png";

    return h("div", {
      class: "profile-image-component",
      style: `
        width: ${size}px;
        height: ${size}px;
        background-image: url('${imageUrl || defaultProfile}');
        background-size: cover;
        background-position: center;
        border-radius: ${rounded ? "50%" : "8px"};
      `,
    });
  }

  updateImage(newUrl) {
    this.setState({ imageUrl: newUrl });
  }

  resetImage() {
    const defaultProfile = "/src/assets/profile-image.png";
    this.setState({ imageUrl: defaultProfile });
  }
}
