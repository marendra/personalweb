<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title="Projects — Marendra"
	description="Things I'm building, experimenting with, or trying to understand."
	canonical={absoluteUrl('/projects')}
/>

<PageHero
	eyebrow="Projects"
	title="Projects"
	lede="Things I'm building, experimenting with, or trying to understand."
/>

{#each data.items as item (item.href)}
	<EntryCard {item} />
{:else}
	<p class="empty-state">No published projects yet.</p>
{/each}
