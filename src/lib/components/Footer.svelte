<script lang="ts">
	import { site } from '$lib/site';
</script>

<footer class="site-footer">
	<div class="site-footer__inner">
		<p class="site-footer__brand">{site.name}</p>
		<p class="site-footer__note">
			Something exciting will be put here :)
		</p>
		<p class="site-footer__meta">
			<a href="/rss.xml">RSS</a>
			<span aria-hidden="true">·</span>
			<a href="/sitemap.xml">Sitemap</a>
			<span aria-hidden="true">·</span>
			<a href="/now">Now</a>
			<span aria-hidden="true">·</span>
			<a href="/about">About</a>
		</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: auto;
		border-top: 1px solid var(--color-border);
	}

	.site-footer__inner {
		max-width: var(--width-shell);
		margin: 0 auto;
		padding: 2.5rem var(--page-gutter) 3rem;
	}

	.site-footer__brand {
		margin: 0 0 0.55rem;
		font-family: var(--font-display);
		font-size: 1.15rem;
	}

	.site-footer__note {
		margin: 0 0 1.25rem;
		max-width: 36rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	.site-footer__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.site-footer__meta a {
		color: inherit;
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	.site-footer__meta a:hover,
	.site-footer__meta a:focus-visible {
		color: var(--color-ink);
		border-bottom-color: var(--color-accent);
	}
</style>
