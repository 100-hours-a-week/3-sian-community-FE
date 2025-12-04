import { createElement } from "./createElement.js";
import { updateElement } from "./diff.js";

export default class Component {
  $target;
  $props;
  $state = {};
  oldVNode = null;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
  }

  setup() {}
  template() {
    return null;
  }
  mounted() {}
  setEvent() {}

  render() {
    const newVNode = this.template(); // template이 h()로 만든 VNode 반환

    if (!this.oldVNode) {
      this.$target.innerHTML = "";
      this.$target.appendChild(createElement(newVNode)); // 바로 DOM 생성
    } else {
      updateElement(this.$target, newVNode, this.oldVNode);
    }

    this.oldVNode = newVNode;

    this.mounted();
    requestAnimationFrame(() => this.setEvent());
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  registeredEvents = [];

  addWindowEvent(type, handler) {
    window.addEventListener(type, handler);
    this.registeredEvents.push([type, handler]);
  }

  unmount() {
    this.registeredEvents.forEach(([type, handler]) => {
      window.removeEventListener(type, handler);
    });
  }
}
