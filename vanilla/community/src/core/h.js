export function h(type, props = {}, ...children) {
  children = children.length ? children : [];

  return {
    type,
    props: props || {},
    children: children.flat(),
  };
}
