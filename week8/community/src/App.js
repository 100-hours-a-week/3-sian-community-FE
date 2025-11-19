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
import { html } from "./core/html.js";
import { initRouter } from "./core/Router.js";

export default class App extends Component {
  setup() {
    this.$state = {};
  }

  template() {
    return html`
      <div class="app-root">
        <div id="layout-header"></div>
        <main id="page"></main>
      </div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector("#layout-header");
    const $page = this.$target.querySelector("#page");

    new Header($header);
    this.currentPage = null;

    const renderPage = () => {
      const currentPath = window.location.pathname;

      // 이전 페이지 unmount
      if (this.currentPage && this.currentPage.unmount) {
        this.currentPage.unmount();
      }

      switch (true) {
        case currentPath === "/":
          this.currentPage = new Login($page);
          break;
        case currentPath === "/posts":
          this.currentPage = new Posts($page);
          break;
        case currentPath === "/signup":
          this.currentPage = new Signup($page);
          break;
        case currentPath === "/edit-profile":
          this.currentPage = new EditProfile($page);
          break;
        case currentPath === "/write-post":
          this.currentPage = new WritePost($page);
          break;
        case currentPath === "/login":
          this.currentPage = new Login($page);
          break;
        case currentPath === "/edit-password":
          this.currentPage = new EditPassword($page);
          break;
        case /^\/post\/\d+$/.test(currentPath):
          this.currentPage = new PostDetail($page);
          break;
        case /^\/editPost\/\d+$/.test(currentPath):
          this.currentPage = new EditPost($page);
          break;
        default:
          this.currentPage = new Login($page);
      }
    };
    this.renderPage = renderPage;
    renderPage();

    initRouter(() => this.renderPage());
  }
}
