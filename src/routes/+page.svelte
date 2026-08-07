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
		<p class="home-intro__lede">
			Thoughts on technology, business, energy, and the rest of life — written simply and updated
			over time.
		</p>
	</div>
	<aside class="home-intro__aside">
		<strong>Status</strong>
		Writing, life notes, projects, and a current focus page. Add Markdown under
		<code>content/</code> to publish.
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
		<h2 id="writing-heading" class="section__title">Writing</h2>
		<a class="section__link" href="/writing">All writing</a>
	</div>
	<p class="section__lede">
		Thoughts on technology, business, energy, and things I'm learning.
	</p>
	{#each data.featuredWriting as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">No published writing yet.</p>
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
		<p class="empty-state">No published life entries yet.</p>
	{/each}
</section>

<section class="section" aria-labelledby="projects-heading">
	<div class="section__header">
		<h2 id="projects-heading" class="section__title">Projects</h2>
		<a class="section__link" href="/projects">All projects</a>
	</div>
	<p class="section__lede">
		Things I'm building, experimenting with, or trying to understand.
	</p>
	{#each data.featuredProjects as item (item.href)}
		<EntryCard {item} />
	{:else}
		<p class="empty-state">No published projects yet.</p>
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
				<a href={data.nowExcerpt.href}>What I'm currently focused on</a>
			</p>
		{:else}
			<p>What I'm currently working on and thinking about.</p>
		{/if}
	</div>
</section>
