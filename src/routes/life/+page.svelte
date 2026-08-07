<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title="Life — Marendra"
	description="Places, experiences, fitness, family-safe stories, and life outside work."
	canonical={absoluteUrl('/life')}
/>

<PageHero
	eyebrow="Life"
	title="Life"
	lede="Places, experiences, fitness, family-safe stories, and life outside work."
/>

{#each data.items as item (item.href)}
	<EntryCard {item} />
{:else}
	<p class="empty-state">No published life entries yet.</p>
{/each}
