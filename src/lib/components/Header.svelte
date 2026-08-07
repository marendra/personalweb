<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/site';

	interface Props {
		pathname: string;
	}

	let { pathname }: Props = $props();
	let currentTheme = $state<'light' | 'dark'>('light');

	function isActive(href: string, current: string): boolean {
		if (href === '/') return current === '/';
		return current === href || current.startsWith(`${href}/`);
	}

	function toggleTheme() {
		const root = document.documentElement;
		const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
		root.dataset.theme = next;
		currentTheme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			// Ignore storage failures.
		}
	}

	onMount(() => {
		// Ensure dataset exists if the inline boot script was blocked.
		if (!document.documentElement.dataset.theme) {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
		}

		currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});
</script>

<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
	<div class="site-header__inner">
		<a class="brand" href="/" aria-label={`${site.name} home`}>
			<span class="brand__mark" aria-hidden="true"></span>
			<span class="brand__name">{site.name}</span>
		</a>

		<nav class="nav" aria-label="Primary">
			<ul class="nav__list">
				{#each site.nav as item (item.href)}
					<li>
						<a
							href={item.href}
							class:active={isActive(item.href, pathname)}
							aria-current={isActive(item.href, pathname) ? 'page' : undefined}
						>
							{item.label}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="/search"
						class:active={pathname.startsWith('/search')}
						aria-current={pathname.startsWith('/search') ? 'page' : undefined}
					>
						Search
					</a>
				</li>
			</ul>
		</nav>

		<button
			type="button"
			class="theme-toggle"
			onclick={toggleTheme}
			aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'black'} mode`}
		>
			<span class="theme-toggle__icon" aria-hidden="true"></span>
			<span class="theme-toggle__label">
				{currentTheme === 'dark' ? 'Light mode' : 'Black mode'}
			</span>
		</button>
	</div>
</header>

<style>
	.skip-link {
		position: absolute;
		left: 1rem;
		top: -3rem;
		z-index: 100;
		padding: 0.55rem 0.8rem;
		background: var(--color-ink);
		color: var(--color-paper);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		text-decoration: none;
	}

	.skip-link:focus {
		top: 1rem;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 40;
		border-bottom: 1px solid var(--color-border);
		background: color-mix(in oklab, var(--color-paper) 88%, transparent);
		backdrop-filter: blur(10px);
	}

	.site-header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: var(--width-shell);
		margin: 0 auto;
		padding: 0.9rem var(--page-gutter);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		text-decoration: none;
		color: var(--color-ink);
		min-width: 0;
	}

	.brand__mark {
		width: 0.7rem;
		height: 0.7rem;
		border: 1px solid var(--color-ink);
		transform: rotate(45deg);
		flex-shrink: 0;
		transition: transform 0.35s ease;
	}

	.brand:hover .brand__mark,
	.brand:focus-visible .brand__mark {
		transform: rotate(225deg);
	}

	.brand__name {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.nav {
		flex: 1;
		min-width: 0;
	}

	.nav__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.35rem 0.9rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav a {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--color-muted);
		border-bottom: 1px solid transparent;
		padding-bottom: 0.1rem;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.nav a:hover,
	.nav a:focus-visible,
	.nav a.active {
		color: var(--color-ink);
		border-bottom-color: var(--color-accent);
	}

	.theme-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		border: 1px solid var(--color-border-strong);
		background: transparent;
		color: var(--color-muted);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding: 0.35rem 0.55rem;
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.theme-toggle:hover,
	.theme-toggle:focus-visible {
		color: var(--color-ink);
		border-color: var(--color-ink);
	}

	.theme-toggle__icon {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		border: 1px solid currentColor;
		background: var(--color-accent-soft);
	}

	@media (max-width: 820px) {
		.site-header__inner {
			flex-wrap: wrap;
		}

		.nav {
			order: 3;
			flex-basis: 100%;
		}

		.nav__list {
			justify-content: flex-start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.brand__mark,
		.nav a,
		.theme-toggle {
			transition: none;
		}
	}
</style>
