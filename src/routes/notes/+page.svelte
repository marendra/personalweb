<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title="Notes — Marendra"
	description="Short observations and working fragments."
	canonical={absoluteUrl('/notes')}
/>

<PageHero
	eyebrow="Notes"
	title="Notes"
	lede="Short observations — smaller than essays, still intentional."
/>

{#each data.items as item (item.href)}
	<EntryCard {item} />
{:else}
	<p class="empty-state">No published notes yet.</p>
{/each}
