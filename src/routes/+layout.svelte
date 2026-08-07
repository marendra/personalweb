<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { site } from '$lib/site';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
		rel="stylesheet"
	/>
	<meta name="author" content={site.author} />
	<meta name="theme-color" content="#eef1f4" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#12151a" media="(prefers-color-scheme: dark)" />
</svelte:head>

<div class="shell">
	<Header pathname={page.url.pathname} />
	<main id="main" class="shell__main">
		{@render children()}
	</main>
	<Footer />
</div>
