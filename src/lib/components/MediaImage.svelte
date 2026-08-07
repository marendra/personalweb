<script lang="ts">
	import { resolveImageUrl } from '$lib/utils';

	interface Props {
		src?: string | null;
		alt: string;
		width?: number;
		height?: number;
		caption?: string;
		eager?: boolean;
		class?: string;
	}

	let {
		src = null,
		alt,
		width = 1200,
		height = 630,
		caption,
		eager = false,
		class: className = ''
	}: Props = $props();

	const resolved = $derived(resolveImageUrl(src));
	const aspect = $derived(`${width} / ${height}`);
</script>

<figure
	class={['media-figure', className].filter(Boolean).join(' ')}
	style={`--media-aspect: ${aspect}`}
>
	{#if resolved}
		<img
			src={resolved}
			{alt}
			{width}
			{height}
			loading={eager ? 'eager' : 'lazy'}
			decoding="async"
			class="media-figure__image"
		/>
	{:else}
		<div class="media-figure__fallback" role="img" aria-label={alt}>
			<span class="media-figure__fallback-label">Image unavailable</span>
		</div>
	{/if}
	{#if caption}
		<figcaption class="media-figure__caption">{caption}</figcaption>
	{/if}
</figure>

<style>
	.media-figure {
		margin: 0;
		width: 100%;
	}

	.media-figure__image,
	.media-figure__fallback {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: var(--media-aspect, 1200 / 630);
		border: 1px solid var(--color-border);
		background: var(--color-surface-muted);
		object-fit: cover;
	}

	.media-figure__fallback {
		display: grid;
		place-items: center;
		color: var(--color-muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.media-figure__caption {
		margin-top: 0.75rem;
		color: var(--color-muted);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.5;
	}
</style>
