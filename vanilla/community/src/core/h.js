export function h(type, props = {}, ...children) {
  const flatChildren = children.flat().filter((c) => c !== null && c !== false);

  return {
    type,
    props: props || {},
    children: flatChildren,
  };
}
