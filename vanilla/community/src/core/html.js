export function html(strings, ...values) {
  const htmlString = strings
    .map((str, i) => {
      let v = values[i];

      // null -> 빈 문자열
      if (v == null) return str;

      // dom 요소 -> outerHTML
      if (v instanceof Element) {
        v = v.outerHTML;
      }

      // 배열 평탄화
      if (Array.isArray(v)) {
        v = v
          .map((item) => (item instanceof Element ? item.outerHTML : item))
          .join("");
      }

      return str + v;
    })
    .join("");

  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
}
