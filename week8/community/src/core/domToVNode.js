// DOM → VNode 변환
export function domToVNode(node) {
  if (!node) return null;
  // 텍스트 노드
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue.trim();
    if (text.length === 0) return null;

    return {
      type: "TEXT",
      props: {},
      children: [text],
    };
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const type = node.tagName.toLowerCase();
  const props = {};

  // props
  for (const attr of node.attributes) {
    const name = attr.name;

    if (name.startsWith("on")) {
      props[name] = node[name];
    } else {
      props[name] = attr.value;
    }
  }

  // children 재귀 처리
  const children = [];
  node.childNodes.forEach((child) => {
    const v = domToVNode(child);
    if (v != null) children.push(v);
  });

  // VNode 객체 반환
  return {
    type,
    props,
    children,
  };
}
