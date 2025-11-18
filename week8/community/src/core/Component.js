export default class Component {
  $target;
  $props;
  $state;
  _eventListeners = [];

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  mounted() {}

  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const handler = (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    };

    this.$target.addEventListener(eventType, handler);

    this._eventListeners.push({
      target: this.$target,
      type: eventType,
      handler,
    });
  }

  addGlobalEvent(target, type, handler) {
    target.addEventListener(type, handler);

    this._eventListeners.push({
      target,
      type,
      handler,
    });
  }

  unmount() {
    this._eventListeners.forEach(({ target, type, handler }) => {
      target.removeEventListener(type, handler);
    });
    this._eventListeners = [];
  }
}
