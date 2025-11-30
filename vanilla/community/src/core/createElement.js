// VNode → 실제 DOM
export function createElement(vnode) {
  // 텍스트 노드
  if (vnode.type === "TEXT") {
    return document.createTextNode(vnode.children[0]);
  }

  // element 노드
  const el = document.createElement(vnode.type);

  // props
  for (const [name, value] of Object.entries(vnode.props || {})) {
    // 이벤트 핸들러
    if (name.startsWith("on") && typeof value === "function") {
      el.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (name === "className") {
      el.setAttribute("class", value);
    } else {
      el.setAttribute(name, value);
    }
  }

  // children
  vnode.children.forEach((child) => {
    el.appendChild(createElement(child));
  });

  return el;
}
