<script>
  import "../app.css";
  import { base } from "$app/paths";
  import { getPosts } from "$lib/posts.js";

  let { children } = $props();

  let dark = $state(false);

  $effect(() => {
    dark = document.documentElement.classList.contains("dark");
  });

  function toggleTheme() {
    dark = !dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("color-theme", dark ? "dark" : "light");
  }

  const tags = getPosts().then((posts) => {
    const all = posts.flatMap((p) => p.tags ?? []);
    return [...new Set(all)].sort();
  });
</script>

<div
  class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
>
  <header class="border-b border-gray-200 dark:border-gray-800">
    <div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
      <a href="{base}/" class="text-xl font-bold tracking-tight">Ryan's Blog</a>
      <button
        onclick={toggleTheme}
        aria-label="Toggle dark mode"
        class="rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        {#if dark}☀️{:else}🌙{/if}
      </button>
    </div>
    <nav class="mx-auto max-w-3xl px-4 pb-3">
      {#await tags then tagList}
        <div class="flex flex-wrap gap-2">
          {#each tagList as tag}
            <a
              href="{base}/tags/{tag}"
              class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {tag}
            </a>
          {/each}
        </div>
      {/await}
    </nav>
  </header>

  <main class="mx-auto max-w-3xl px-4 py-8">
    {@render children()}
  </main>

  <footer
    class="border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400"
  >
    © {new Date().getFullYear()} Ryan Chang
  </footer>
</div>
