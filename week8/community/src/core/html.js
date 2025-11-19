// HTML -> v-dom
export function html(strings, ...values) {
  const template = document.createElement("template");
  template.innerHTML = strings
    .map((s, i) => s + (values[i] ?? ""))
    .join("")
    .trim();

  return template.content.firstElementChild;
}
