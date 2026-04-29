import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { remarkRaw } from "./src/lib/remark-raw.js";
import { remarkPostUrl } from "./src/lib/remark-post-url.js";
import { remarkImageUrl } from "./src/lib/remark-image-url.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      remarkPlugins: [remarkRaw, remarkPostUrl, remarkImageUrl],
    }),
  ],
  kit: {
    adapter: adapter({ fallback: "404.html" }),
    paths: {
      base: process.env.BASE_PATH ?? "",
    },
  },
};

export default config;
