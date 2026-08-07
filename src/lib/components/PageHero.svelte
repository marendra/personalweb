<script lang="ts">
	interface Props {
		eyebrow?: string;
		title: string;
		lede?: string;
	}

	let { eyebrow, title, lede }: Props = $props();
</script>

<header class="page-hero">
	{#if eyebrow}
		<p class="page-hero__eyebrow">{eyebrow}</p>
	{/if}
	<h1 class="page-hero__title">{title}</h1>
	{#if lede}
		<p class="page-hero__lede">{lede}</p>
	{/if}
</header>

<style>
	.page-hero {
		padding: 2.75rem 0 1.75rem;
		border-bottom: 1px solid var(--color-border);
		margin-bottom: 2rem;
	}

	.page-hero__eyebrow {
		margin: 0 0 0.85rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.page-hero__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1.1;
		max-width: 14ch;
	}

	.page-hero__lede {
		margin: 1rem 0 0;
		max-width: 38rem;
		color: var(--color-text-secondary);
		font-size: 1.05rem;
		line-height: 1.65;
	}
</style>
