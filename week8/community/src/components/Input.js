import Component from "../core/Component.js";

export default class Input extends Component {
  setup() {
    this.$state = {
      error: "",
    };
  }
  template() {
    const { label, name, type = "text", placeholder } = this.$props;

    return `
            <div class="Input__wrapper">
                <lable class="Input__label" for="${name}">${label}</lable>
                <input 
                    type="${type}" 
                    class="Input__field"
                    id="${name}"
                    name="${name}"    
                    placeholder="${placeholder}"
                />
                <p class="error"></p>
            </div>
    `;
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
