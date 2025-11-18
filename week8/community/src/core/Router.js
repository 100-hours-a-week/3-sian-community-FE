let callback = null;

export function initRouter(cb) {
  if (callback) return;
  callback = cb;

  window.addEventListener("popstate", callback);
  window.addEventListener("navigate", callback);
}
