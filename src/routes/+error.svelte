<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/utils';
	import { page } from '$app/state';

	let { error } = $props();
	const status = $derived(page.status);
</script>

<Seo
	title={`${status} — Marendra`}
	description="Page not found."
	canonical={absoluteUrl(page.url.pathname)}
/>

<section class="home-intro" style="border-bottom: 0">
	<div>
		<p class="home-intro__eyebrow">{status}</p>
		<h1 class="home-intro__title" style="max-width: 12ch">
			{status === 404 ? 'Missing page' : 'Something went wrong'}
		</h1>
		<p class="home-intro__lede">
			{error?.message || 'The page you requested is unavailable.'}
		</p>
		<p style="margin-top: 1.5rem">
			<a href="/">Return home</a>
			<span aria-hidden="true"> · </span>
			<a href="/search">Search</a>
		</p>
	</div>
</section>
