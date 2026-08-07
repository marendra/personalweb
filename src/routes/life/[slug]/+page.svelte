<script lang="ts">
	import AdjacentNav from '$lib/components/AdjacentNav.svelte';
	import MediaImage from '$lib/components/MediaImage.svelte';
	import Prose from '$lib/components/Prose.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl, formatDate, formatReadingTime, resolveImageUrl } from '$lib/utils';

	let { data } = $props();
	const item = $derived(data.item);
	const image = $derived(resolveImageUrl(item.heroImage));
</script>

<Seo
	title={`${item.title} — Marendra`}
	description={item.description}
	canonical={absoluteUrl(item.href)}
	type="article"
	{image}
	publishedTime={item.date}
	modifiedTime={item.updated ?? item.date}
	tags={item.tags}
/>

<article>
	<header class="article-header">
		<p class="article-header__meta">
			<span>{item.category}</span>
			<span aria-hidden="true">·</span>
			<time datetime={item.date}>{formatDate(item.date)}</time>
			<span aria-hidden="true">·</span>
			<span>{formatReadingTime(item.readingTimeMinutes)}</span>
		</p>
		<h1 class="article-header__title">{item.title}</h1>
		<p class="article-header__description">{item.description}</p>
	</header>

	{#if item.heroImage}
		<div style="max-width: var(--width-prose); margin-bottom: 1.75rem">
			<MediaImage src={item.heroImage} alt={item.heroAlt ?? item.title} caption={item.heroAlt} />
		</div>
	{/if}

	<Prose html={item.html} />
	<AdjacentNav previous={data.previous} next={data.next} />
</article>
