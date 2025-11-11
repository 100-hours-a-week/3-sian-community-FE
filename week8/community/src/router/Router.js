export function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new CustomEvent("urlchange"));
}

export function initRouter(renderPage) {
  window.addEventListener("popstate", renderPage);
  window.addEventListener("navigate", renderPage);
}
