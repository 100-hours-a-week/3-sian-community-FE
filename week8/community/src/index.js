import App from "./App.js";
import Header from "./components/Header/Header.js";
import { initRouter } from "./core/Router.js";

const headerRoot = document.querySelector("#layout-header");
new Header(headerRoot);

const root = document.querySelector("#app");
const app = new App(root);

setTimeout(() => {
  initRouter(() => app.renderPage());
}, 0);
