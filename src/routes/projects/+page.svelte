<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title="Projects — Marendra"
	description="Something exciting will be put here :)"
	canonical={absoluteUrl('/projects')}
/>

<PageHero
	eyebrow="Projects"
	title="Selected work"
	lede="Something exciting will be put here :)"
/>

{#each data.items as item (item.href)}
	<EntryCard {item} />
{:else}
	<p class="empty-state">No published projects yet.</p>
{/each}
