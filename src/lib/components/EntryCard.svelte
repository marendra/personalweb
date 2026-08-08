<script lang="ts">
	import type { ContentItem } from '$lib/content';
	import { formatDate, formatReadingTime } from '$lib/utils';

	interface Props {
		item: Pick<ContentItem, 'title' | 'description' | 'href' | 'date' | 'category' | 'tags'> & {
			readingTimeMinutes?: number;
		};
		showCategory?: boolean;
	}

	let { item, showCategory = false }: Props = $props();
</script>

<article class="entry">
	<a class="entry__link" href={item.href}>
		<p class="entry__meta">
			{#if showCategory}
				<span class="entry__category">{item.category}</span>
				<span aria-hidden="true">·</span>
			{/if}
			<time datetime={item.date}>{formatDate(item.date)}</time>
			{#if item.readingTimeMinutes !== undefined}
				<span aria-hidden="true">·</span>
				<span>{formatReadingTime(item.readingTimeMinutes)}</span>
			{/if}
		</p>
		<h3 class="entry__title">{item.title}</h3>
		<p class="entry__description">{item.description}</p>
	</a>
	{#if item.tags.length > 0}
		<ul class="entry__tags">
			{#each item.tags.slice(0, 4) as tag (tag)}
				<li><a href={`/tags/${encodeURIComponent(tag)}`}>{tag}</a></li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	.entry {
		padding: 1.35rem 0 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.entry:first-child {
		border-top: 1px solid var(--color-border);
	}

	.entry__link {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.entry__link:hover .entry__title,
	.entry__link:focus-visible .entry__title {
		color: var(--color-accent);
	}

	.entry__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0 0 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.01em;
		color: var(--color-muted);
	}

	.entry__category {
		color: var(--color-accent);
	}

	.entry__title {
		margin: 0 0 0.45rem;
		font-family: var(--font-display);
		font-size: clamp(1.3rem, 2vw, 1.6rem);
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: -0.01em;
	}

	.entry__description {
		margin: 0;
		max-width: 42rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	.entry__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 0.85rem;
		list-style: none;
		margin: 0.85rem 0 0;
		padding: 0;
		font-family: var(--font-mono);
		font-size: 0.72rem;
	}

	.entry__tags a {
		color: var(--color-muted);
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	.entry__tags a:hover,
	.entry__tags a:focus-visible {
		color: var(--color-accent);
		border-bottom-color: var(--color-accent);
	}
</style>
