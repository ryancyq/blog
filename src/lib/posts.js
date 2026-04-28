/** @type {Record<string, {default: import('svelte').Component, metadata: {title: string, date: string, tags?: string[], modified_date?: string}}>} */
const modules = /** @type {any} */ (
  import.meta.glob("../posts/*.md", { eager: true })
);

/**
 * @returns {Promise<Array<{slug: string, title: string, date: string, tags?: string[], modified_date?: string}>>}
 */
export async function getPosts() {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = (path.split("/").pop() ?? "").replace(".md", "");
      return { slug, ...mod.metadata };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * @param {string} slug
 * @returns {Promise<{content: import('svelte').Component, metadata: {title: string, date: string, tags?: string[], modified_date?: string}} | null>}
 */
export async function getPost(slug) {
  const entry = Object.entries(modules).find(([p]) =>
    p.endsWith(`/${slug}.md`),
  );
  if (!entry) return null;
  const mod = entry[1];
  return { content: mod.default, metadata: mod.metadata };
}
