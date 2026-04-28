import visit from "unist-util-visit";

export function remarkPostUrl() {
  const base = process.env.BASE_PATH ?? "";
  return (/** @type {any} */ tree) => {
    visit(tree, "definition", (/** @type {any} */ node) => {
      if (node.url.startsWith("posts/")) {
        node.url = new URL(node.url, `http://x${base}/`).pathname;
      }
    });
  };
}
