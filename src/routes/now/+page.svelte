<script lang="ts">
	import PageHero from '$lib/components/PageHero.svelte';
	import Prose from '$lib/components/Prose.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl, formatDate } from '$lib/utils';

	let { data } = $props();
</script>

<Seo title="Now — Marendra" description={data.page.description} canonical={absoluteUrl('/now')} />

<PageHero
	eyebrow="Now"
	title="Now"
	lede="What I'm currently working on and thinking about."
/>

<p class="article-header__meta" style="margin-bottom: 1.5rem">
	Updated
	<time datetime={data.page.updated ?? data.page.date}
		>{formatDate(data.page.updated ?? data.page.date)}</time
	>
</p>

<Prose html={data.page.html} />
