import Component from "./core/Component.js";
import Posts from "./pages/Posts/Posts.js";
import Login from "./pages/Login/Login.js";
import Signup from "./pages/Signup/Signup.js";
import EditProfile from "./pages/EditProfile/EditProfile.js";
import Header from "./components/Header/Header.js";
import WritePost from "./pages/EditPost/WritePost.js";
import PostDetail from "./pages/PostDetail/PostDetail.js";
import EditPost from "./pages/EditPost/EditPost.js";
import EditPassword from "./pages/EditPassword/EditPassword.js";

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

      if (this.$state.path !== currentPath) {
        this.setState({ path: currentPath });
      }

      switch (true) {
        case currentPath === "/":
          new Login($page);
          break;
        case currentPath === "/posts":
          new Posts($page);
          break;
        case currentPath === "/signup":
          new Signup($page);
          break;
        case currentPath === "/edit-profile":
          new EditProfile($page);
          break;
        case currentPath === "/write-post":
          new WritePost($page);
          break;
        case currentPath === "/login":
          new Login($page);
          break;
        case currentPath === "/edit-password":
          new EditPassword($page);
          break;
        case /^\/post\/\d+$/.test(currentPath):
          new PostDetail($page);
          break;
        case /^\/editPost\/\d+$/.test(currentPath):
          new EditPost($page);
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
