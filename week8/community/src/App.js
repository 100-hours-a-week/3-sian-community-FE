import Component from "./core/Component.js";
import Posts from "./pages/Posts.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import MyPage from "./pages/Mypage.js";
import Header from "./components/Header.js";
import { initRouter } from "./router/Router.js";

export default class App extends Component {
  setup() {
    this.$state = { path: window.location.pathname };
  }

  template() {
    return `
      <div id="layout-header"></div>
      <main id="page"></main>
    `;
  }

  mounted() {
    const $header = document.querySelector("#layout-header");
    const $page = document.querySelector("#page");

    new Header($header);

    const renderPage = () => {
      const currentPath = window.location.pathname;

      if (currentPath.endsWith("index.html")) {
        currentPath = "/";
        window.history.replaceState(null, null, "/");
      }

      if (this.$state.path !== currentPath) {
        this.setState({ path: currentPath }); // path 바뀔 때만 상태 업데이트
      }

      switch (currentPath) {
        case "/":
          new Login($page);
          break;
        case "/posts":
          new Posts($page);
          break;
        case "/signup":
          new Signup($page);
          break;
        case "/mypage":
          new MyPage($page);
          break;
        default:
          new Login($page);
      }
    };

    // 초기 렌더링
    const currentPath = window.location.pathname;
    this.$state = { path: currentPath };
    renderPage();

    initRouter(renderPage);
  }
}
