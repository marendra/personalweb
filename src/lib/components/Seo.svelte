<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		canonical?: string;
		type?: 'website' | 'article';
		image?: string | null;
		publishedTime?: string;
		modifiedTime?: string;
		tags?: string[];
	}

	let {
		title,
		description,
		canonical,
		type = 'website',
		image = null,
		publishedTime,
		modifiedTime,
		tags = []
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if canonical}
		<link rel="canonical" href={canonical} />
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}
	<meta property="og:type" content={type} />
	<meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={title} />
	{#if image}
		<meta property="og:image" content={image} />
		<meta name="twitter:image" content={image} />
	{/if}
	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}
	{#if modifiedTime}
		<meta property="article:modified_time" content={modifiedTime} />
	{/if}
	{#each tags as tag (tag)}
		<meta property="article:tag" content={tag} />
	{/each}
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
</svelte:head>
