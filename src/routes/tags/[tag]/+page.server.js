import { getPosts } from "$lib/posts.js";

export async function entries() {
  const posts = await getPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags ?? []))];
  return tags.map((tag) => ({ tag }));
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const posts = await getPosts();
  return {
    tag: params.tag,
    posts: posts.filter((p) => p.tags?.includes(params.tag)),
  };
}
