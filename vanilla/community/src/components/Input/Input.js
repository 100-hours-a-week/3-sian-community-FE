import Component from "../../core/Component.js";
import { h } from "../../core/h.js";
export default class Input extends Component {
  setup() {
    this.$state = {
      error: "",
    };
  }
  template() {
    const { name, type = "text", placeholder } = this.$props;
    const { error } = this.$state;

    return h(
      "div",
      { class: "Input__wrapper" },

      h("input", {
        type,
        class: "Input__field",
        id: name,
        name,
        placeholder,
      }),

      h("p", { class: "error" }, error ? `* ${error}` : "")
    );
  }

  mounted() {
    const inputEl = this.$target.querySelector(".Input__field");
    const errorEl = this.$target.querySelector(".error");

    inputEl.addEventListener("input", (e) => {
      const value = e.target.value;

      if (this.$props.onInput) {
        this.$props.onInput(value, {
          setError: (msg) => {
            this.$state.error = msg;
            errorEl.innerHTML = `* ${msg}`;
            errorEl.classList.add("show");
          },
          clearError: () => {
            this.$state.error = "";
            errorEl.innerHTML = "";
            errorEl.classList.remove("show");
          },
        });
      }
    });
  }

  setError(message) {
    this.setState({ error: message });
  }
  clearError() {
    this.setState({ error: "" });
  }
}
