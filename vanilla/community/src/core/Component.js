import { domToVNode } from "./domToVNode.js";
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
    // template() → 실제 DOM 생성
    const dom = this.template();

    // 실제 DOM → Virtual DOM 변환
    const newVNode = domToVNode(dom);

    if (!this.oldVNode) {
      this.$target.innerHTML = "";
      this.$target.appendChild(createElement(newVNode));
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
}
