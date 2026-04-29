<script>
  import { base } from "$app/paths";
  import { formatDate } from "$lib/utils.js";

  let { data } = $props();
</script>

<svelte:head>
  <title>#{data.tag} · Ryan's Blog</title>
</svelte:head>

<h1 class="mb-6 text-xl font-bold">
  Posts tagged <span class="text-blue-600 dark:text-blue-400">#{data.tag}</span>
</h1>

<ul class="space-y-6">
  {#each data.posts as post}
    <li>
      <a href="{base}/posts/{post.slug}" class="group block">
        <h2
          class="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400"
        >
          {post.title}
        </h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {formatDate(post.date)}
        </p>
      </a>
    </li>
  {/each}
</ul>
