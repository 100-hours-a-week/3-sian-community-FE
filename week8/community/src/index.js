import App from "./App.js";
import { initRouter } from "./core/Router.js";

const root = document.querySelector("#app");

const app = new App(root);

initRouter(app.renderPage);
