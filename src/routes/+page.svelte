<script>
  import { base } from "$app/paths";
  import { getPosts } from "$lib/posts.js";
  import { formatDate, readingTime } from "$lib/utils.js";

  const posts = getPosts();
</script>

<svelte:head>
  <title>Ryan's Blog</title>
</svelte:head>

{#await posts then list}
  <ul class="space-y-8">
    {#each list as post}
      <li>
        <a href="{base}/posts/{post.slug}" class="group block">
          <h2
            class="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400"
          >
            {post.title}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.date)} · {readingTime(post.title)} min read
          </p>
          {#if post.tags?.length}
            <div class="mt-2 flex flex-wrap gap-1.5">
              {#each post.tags as tag}
                <span
                  class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tag}
                </span>
              {/each}
            </div>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
{/await}
