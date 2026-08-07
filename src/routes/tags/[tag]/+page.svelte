<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title={`Tag: ${data.tag} — Marendra`}
	description={`Published pieces tagged “${data.tag}”.`}
	canonical={absoluteUrl(`/tags/${encodeURIComponent(data.tag)}`)}
/>

<PageHero eyebrow="Tag" title={data.tag} lede={`${data.items.length} published piece(s).`} />

{#each data.items as item (item.href)}
	<EntryCard {item} showCategory />
{/each}
