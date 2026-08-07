<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';
	import type { ContentSearchHit } from '$lib/content/types';

	let { data } = $props();

	let query = $state('');

	const results = $derived.by(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return data.index;
		const terms = normalized.split(/\s+/).filter(Boolean);
		return data.index.filter((item: ContentSearchHit) => {
			const haystack = [item.title, item.description, item.tags.join(' '), item.category]
				.join(' ')
				.toLowerCase();
			return terms.every((term) => haystack.includes(term));
		});
	});
</script>

<Seo
	title="Search — Marendra"
	description="Something exciting will be put here :)"
	canonical={absoluteUrl('/search')}
/>

<PageHero
	eyebrow="Search"
	title="Find a piece"
	lede="Client-side search over static published metadata. No analytics, no accounts."
/>

<div class="search-box">
	<label for="site-search">Query</label>
	<input
		id="site-search"
		type="search"
		bind:value={query}
		placeholder="Try energy, walking, sveltekit…"
		autocomplete="off"
		spellcheck="false"
	/>
</div>

<p class="empty-state" style="padding-top: 0">
	{results.length} result{results.length === 1 ? '' : 's'}
</p>

{#each results as item (item.href)}
	<EntryCard {item} showCategory />
{:else}
	<p class="empty-state">No matches.</p>
{/each}
