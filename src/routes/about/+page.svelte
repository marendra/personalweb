<script lang="ts">
	import PageHero from '$lib/components/PageHero.svelte';
	import Prose from '$lib/components/Prose.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo title="About — Marendra" description={data.page.description} canonical={absoluteUrl('/about')} />

<PageHero eyebrow="About" title="Biography & contact" lede={data.page.description} />

<Prose html={data.page.html} />
