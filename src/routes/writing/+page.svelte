<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title="Writing — Marendra"
	description="Thoughts on technology, business, energy, and things I'm learning."
	canonical={absoluteUrl('/writing')}
/>

<PageHero
	eyebrow="Writing"
	title="Writing"
	lede="Thoughts on technology, business, energy, and things I'm learning."
/>

{#if data.tags.length > 0}
	<ul class="tag-cloud" aria-label="Writing tags">
		{#each data.tags as { tag, count } (tag)}
			<li>
				<a href={`/tags/${encodeURIComponent(tag)}`}>{tag} ({count})</a>
			</li>
		{/each}
	</ul>
{/if}

<div style="margin-top: 1.5rem">
	{#each data.items as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">No published writing yet.</p>
	{/each}
</div>
