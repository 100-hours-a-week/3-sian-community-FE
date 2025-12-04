import { createElement } from "./createElement.js";

export function updateElement(parent, newNode, oldNode, index = 0) {
  const child = parent.childNodes[index];

  // old만 있고 new 없음 → 제거
  if (!newNode && oldNode) {
    parent.removeChild(child);
    return;
  }

  // new만 있고 old 없음 → 추가
  if (newNode && !oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  if (typeof newNode.type === "function") {
    parent.replaceChild(createElement(newNode), child);
    return;
  }

  // 텍스트 노드
  if (newNode.type === "TEXT" && oldNode.type === "TEXT") {
    if (newNode.children[0] !== oldNode.children[0]) {
      parent.replaceChild(createElement(newNode), child);
    }
    return;
  }

  // 타입 다르면 교체
  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement(newNode), child);
    return;
  }

  // props 수정
  updateProps(child, newNode.props, oldNode.props);

  // children 재귀 diff
  const max = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < max; i++) {
    updateElement(child, newNode.children[i], oldNode.children[i], i);
  }
}

function updateProps(el, newProps = {}, oldProps = {}) {
  // 제거된 props 삭제
  for (const name in oldProps) {
    if (!(name in newProps)) {
      if (name.startsWith("on") && typeof oldProps[name] === "function") {
        el.removeEventListener(name.slice(2).toLowerCase(), oldProps[name]);
      } else {
        el.removeAttribute(name);
      }
    }
  }

  // 추가/변경된 props 적용
  for (const [name, value] of Object.entries(newProps)) {
    const oldValue = oldProps[name];

    // 변경 없음 → skip
    if (oldValue === value) continue;

    if (name.startsWith("on") && typeof value === "function") {
      if (typeof oldValue === "function") {
        el.removeEventListener(name.slice(2).toLowerCase(), oldValue);
      }
      el.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (name === "className") {
      el.setAttribute("class", value);
    } else {
      el.setAttribute(name, value);
    }
  }
}
