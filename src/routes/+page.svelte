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
		<p class="home-intro__eyebrow">Personal site</p>
		<h1 id="home-title" class="home-intro__title">{site.name}</h1>
		<p class="home-intro__lede">Energy professional. Technology builder. 20+ years turning complex problems into practical solutions</p>
	</div>
	<aside class="home-intro__aside">
		<strong>Status</strong>
		Fresh start. Real writing, life notes, and projects are on the way.
	</aside>
</section>

<section class="manifesto" aria-labelledby="manifesto-heading">
	<div class="manifesto__meta" aria-hidden="true">
		<span>Operating principle</span>
		<span>01—03</span>
	</div>

	<h2 id="manifesto-heading" class="visually-hidden">Personal motto</h2>
	<blockquote class="manifesto__statement">
		<span class="manifesto__line manifesto__line--think">
			<span class="manifesto__index" aria-hidden="true">01</span>
			<span><strong>Think</strong> boldly.</span>
		</span>
		<span class="manifesto__line manifesto__line--move">
			<span class="manifesto__index" aria-hidden="true">02</span>
			<span><strong>Move</strong> fast.</span>
		</span>
		<span class="manifesto__line manifesto__line--build">
			<span class="manifesto__index" aria-hidden="true">03</span>
			<span><strong>Build</strong> for the real world.</span>
		</span>
	</blockquote>

	<div class="manifesto__trajectory" aria-hidden="true">
		<span class="manifesto__track"></span>
		<span class="manifesto__marker"></span>
		<span class="manifesto__destination">Make it matter</span>
	</div>
</section>

<section class="section" aria-labelledby="writing-heading">
	<div class="section__header">
		<h2 id="writing-heading" class="section__title">Selected writing</h2>
		<a class="section__link" href="/writing">All writing</a>
	</div>
	<p class="section__lede">Something exciting will be put here :)</p>
	{#each data.featuredWriting as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">Something exciting will be put here :)</p>
	{/each}
</section>

<section class="section" aria-labelledby="life-heading">
	<div class="section__header">
		<h2 id="life-heading" class="section__title">Recent life</h2>
		<a class="section__link" href="/life">All life entries</a>
	</div>
	<p class="section__lede">Something exciting will be put here :)</p>
	{#each data.recentLife as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">Something exciting will be put here :)</p>
	{/each}
</section>

<section class="section" aria-labelledby="projects-heading">
	<div class="section__header">
		<h2 id="projects-heading" class="section__title">Selected projects</h2>
		<a class="section__link" href="/projects">All projects</a>
	</div>
	<p class="section__lede">Something exciting will be put here :)</p>
	{#each data.featuredProjects as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">Something exciting will be put here :)</p>
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
			<p style="margin-top: 0.9rem">
				<a href={data.nowExcerpt.href}>What I am focused on</a>
			</p>
		{:else}
			<p>Something exciting will be put here :)</p>
		{/if}
	</div>
</section>
