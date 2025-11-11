export function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new CustomEvent("urlchange"));
}

export function initRouter(callback) {
  window.addEventListener("popstate", callback);
  window.addEventListener("urlchange", callback);
}