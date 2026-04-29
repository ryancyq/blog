import { getPosts, getPost } from "$lib/posts.js";
import { error } from "@sveltejs/kit";

export async function entries() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const post = await getPost(params.slug);
  if (!post) error(404, "Post not found");
  return post;
}
