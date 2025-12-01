// VNode → 실제 DOM
export function createElement(vnode) {
  if (vnode == null) {
    return document.createTextNode("");
  }

  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  if (typeof vnode !== "object" || !vnode.type) {
    console.warn("Invalid vnode detected:", vnode);
    return document.createTextNode("");
  }

  const el = document.createElement(vnode.type);

  // props 처리
  for (const [name, value] of Object.entries(vnode.props || {})) {
    if (name.startsWith("on") && typeof value === "function") {
      el.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (value !== null && value !== undefined) {
      el.setAttribute(name, value);
    }
  }

  const children = Array.isArray(vnode.children) ? vnode.children : [];
  children.forEach((child) => {
    el.appendChild(createElement(child));
  });

  return el;
}
