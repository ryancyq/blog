<script>
  import { base } from "$app/paths";
  import { formatDate } from "$lib/utils.js";

  let { data } = $props();
  let { metadata } = $derived(data);
  const Content = $derived(data.content);
</script>

<svelte:head>
  <title>{metadata.title} · Ryan's Blog</title>
</svelte:head>

<article>
  <header class="mb-8">
    <h1 class="text-2xl font-bold leading-tight">{metadata.title}</h1>
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      {formatDate(metadata.date)}
      {#if metadata.modified_date}
        · Updated {metadata.modified_date}
      {/if}
    </p>
    {#if metadata.tags?.length}
      <div class="mt-3 flex flex-wrap gap-1.5">
        {#each metadata.tags as tag}
          <a
            href="{base}/tags/{tag}"
            class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {tag}
          </a>
        {/each}
      </div>
    {/if}
  </header>

  <div class="prose prose-gray max-w-none dark:prose-invert">
    <Content />
  </div>
</article>
