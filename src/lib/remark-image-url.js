import visit from "unist-util-visit";

export function remarkImageUrl() {
  const base = process.env.BASE_PATH ?? "";
  return (/** @type {any} */ tree) => {
    visit(tree, "image", (/** @type {any} */ node) => {
      if (node.url.startsWith("screenshots/")) {
        node.url = new URL(node.url, `http://x${base}/`).pathname;
      }
    });
  };
}
