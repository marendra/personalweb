<script lang="ts">
	import type { ContentItem } from '$lib/content';

	interface Props {
		previous: ContentItem | null;
		next: ContentItem | null;
	}

	let { previous, next }: Props = $props();
</script>

{#if previous || next}
	<nav class="adjacent" aria-label="Adjacent articles">
		{#if previous}
			<a class="adjacent__item adjacent__item--prev" href={previous.href}>
				<span class="adjacent__label">Previous</span>
				<span class="adjacent__title">{previous.title}</span>
			</a>
		{:else}
			<span></span>
		{/if}
		{#if next}
			<a class="adjacent__item adjacent__item--next" href={next.href}>
				<span class="adjacent__label">Next</span>
				<span class="adjacent__title">{next.title}</span>
			</a>
		{/if}
	</nav>
{/if}

<style>
	.adjacent {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	@media (min-width: 720px) {
		.adjacent {
			grid-template-columns: 1fr 1fr;
		}
	}

	.adjacent__item {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		text-decoration: none;
		color: inherit;
		padding: 0.85rem 0;
		border-bottom: 1px solid transparent;
	}

	.adjacent__item:hover,
	.adjacent__item:focus-visible {
		border-bottom-color: var(--color-accent);
	}

	.adjacent__item--next {
		text-align: right;
	}

	.adjacent__label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.adjacent__title {
		font-family: var(--font-display);
		font-size: 1.05rem;
		line-height: 1.35;
	}
</style>
