import Component from "./core/Component.js";
import Posts from "./pages/Posts.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import MyPage from "./pages/Mypage.js";
import Header from "./components/Header.js";
import WritePost from "./pages/WritePost.js";
import { initRouter } from "./router/Router.js";
import PostDetail from "./pages/PostDetail.js";
import EditPost from "./pages/EditPost.js";

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

      if (this.$state.path !== currentPath) {
        this.setState({ path: currentPath });
      }

      switch (true) {
        case currentPath === "/":
          new Posts($page);
          break;
        case currentPath === "/posts":
          new Posts($page);
          break;
        case currentPath === "/signup":
          new Signup($page);
          break;
        case currentPath === "/mypage":
          new MyPage($page);
          break;
        case currentPath === "/writePost":
          new WritePost($page);
          break;
        case /^\/post\/\d+$/.test(currentPath):
          new PostDetail($page);
          break;
        case /^\/editPost\/\d+$/.test(currentPath):
          new EditPost($page);
          break;
        default:
          new Posts($page);
      }
    };

    // 초기 렌더링
    const currentPath = window.location.pathname;
    this.$state = { path: currentPath };
    renderPage();

    initRouter(renderPage);
  }
}
