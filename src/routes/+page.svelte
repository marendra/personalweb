<script lang="ts">
	import EntryCard from '$lib/components/EntryCard.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/site';
	import { absoluteUrl } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title={`${site.name} — ${site.tagline}`}
	description={site.description}
	canonical={absoluteUrl('/')}
/>

<section class="home-intro" aria-labelledby="home-title">
	<div>
		<p class="home-intro__eyebrow">Hello, I'm</p>
		<h1 id="home-title" class="home-intro__title">{site.name}.</h1>
		<p class="home-intro__lede">
			I work around commercial energy and technology in Indonesia. This is where I keep notes on
			work, things I build, and life away from the screen.
		</p>
	</div>
	<aside class="home-intro__aside" aria-label="Personal motto">
		<p>A note to myself</p>
		<blockquote>
			Think boldly.<br />
			Move fast.<br />
			<em>Build for the real world.</em>
		</blockquote>
		<small>Written here so I don't forget.</small>
	</aside>
</section>

<section class="section" aria-labelledby="writing-heading">
	<div class="section__header">
		<h2 id="writing-heading" class="section__title">Writing</h2>
		<a class="section__link" href="/writing">All writing</a>
	</div>
	<p class="section__lede">Thoughts on technology, business, energy, and things I'm learning.</p>
	{#each data.featuredWriting as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">
			Nothing published here yet. The first piece is still being argued with.
		</p>
	{/each}
</section>

<section class="section" aria-labelledby="life-heading">
	<div class="section__header">
		<h2 id="life-heading" class="section__title">Life</h2>
		<a class="section__link" href="/life">All life entries</a>
	</div>
	<p class="section__lede">
		Places, experiences, fitness, family-safe stories, and life outside work.
	</p>
	{#each data.recentLife as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">Keeping this part offline for now.</p>
	{/each}
</section>

<section class="section" aria-labelledby="projects-heading">
	<div class="section__header">
		<h2 id="projects-heading" class="section__title">Projects</h2>
		<a class="section__link" href="/projects">All projects</a>
	</div>
	<p class="section__lede">Things I'm building, experimenting with, or trying to understand.</p>
	{#each data.featuredProjects as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">Project notes will turn up here when they're ready.</p>
	{/each}
</section>

<section class="section" aria-labelledby="now-heading">
	<div class="section__header">
		<h2 id="now-heading" class="section__title">Now</h2>
		<a class="section__link" href="/now">Full page</a>
	</div>
	<div class="now-panel">
		{#if data.nowExcerpt}
			<p>{data.nowExcerpt.description}</p>
			<p class="now-panel__link">
				<a href={data.nowExcerpt.href}>What I'm currently focused on</a>
			</p>
		{:else}
			<p>What I'm currently working on and thinking about.</p>
		{/if}
	</div>
</section>
