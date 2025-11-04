import Signup from "./pages/Signup.js";
import MyPage from "./pages/MyPage.js";
import Posts from "./pages/Posts.js";
import UpdatePassword from "./pages/UpdatePassword.js";
import Login from "./pages/Login.js";

const routes = [
    { path: "/", view: Posts},
    { path: "/login", view: Login},
    { path: "/signup", view: Signup},
    { path: "/mypage", view: MyPage},
    { path: "/update-password", view: UpdatePassword}
];

function render(html) {
  document.getElementById("app").innerHTML = html;
}

function getHashPath() {
  const hash = location.hash || "#/";
  return hash.replace(/^#/, "");
}

function App() {
  const path = getHashPath();
  const route = routes.find(r => r.path === path);

  if (!route) {
    render(`<h1>404 페이지</h1><a href="#/">홈으로</a>`);
    return;
  }

  render(route.view());
  route.onMount?.();
}

window.addEventListener("hashchange", App);
window.addEventListener("load", App);