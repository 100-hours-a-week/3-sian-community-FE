import Component from "./core/Component.js";
import { h } from "./core/h.js";
import { initRouter } from "./core/Router.js";
import { routes } from "./core/routes.js";

export default class App extends Component {
  setup() {
    this.$state = {};
  }

  template() {
    return h("main", { id: "page" });
  }
  mounted() {
    const $page = this.$target.querySelector("#page");

    const renderPage = () => {
      const currentPath = window.location.pathname;

      // 이전 페이지 unmount
      if (this.currentPage && this.currentPage.unmount) {
        this.currentPage.unmount();
      }

      const matchedRoute = routes.find((r) => r.path.test(currentPath));

      const PageComponent = matchedRoute?.component || routes[0].component;

      this.currentPage = new PageComponent($page);
    };
    this.renderPage = renderPage;
    renderPage();

    initRouter(() => this.renderPage());
  }
}
