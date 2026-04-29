import visit from "unist-util-visit";

export function remarkRaw() {
  return (/** @type {any} */ tree) => {
    let inRaw = false;

    visit(tree, (/** @type {any} */ node) => {
      if (node.type === "html") {
        if (node.value.trim() === "<!-- raw -->") {
          inRaw = true;
          return;
        }
        if (node.value.trim() === "<!-- endraw -->") {
          inRaw = false;
          return;
        }
      }
      if (!inRaw) return;
      if (node.type === "text" || node.type === "inlineCode") {
        node.value = node.value
          .replace(/\{/g, "&#123;")
          .replace(/\}/g, "&#125;");
      }
    });
  };
}
