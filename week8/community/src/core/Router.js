export function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new CustomEvent("navigate"));
}

export function initRouter(renderPage) {
  window.addEventListener("popstate", renderPage);
  window.addEventListener("navigate", renderPage);
}
