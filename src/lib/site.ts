/**
 * Site-wide configuration.
 * Keep personal claims conservative — use placeholders until facts are confirmed.
 */
export const site = {
	name: 'Marendra',
	tagline: 'Something exciting will be put here :)',
	description: 'Something exciting will be put here :)',
	author: 'Marendra',
	locale: 'en',
	/** Fallback when PUBLIC_SITE_URL is unset */
	defaultUrl: 'https://marendra.com',
	nav: [
		{ href: '/writing', label: 'Writing' },
		{ href: '/life', label: 'Life' },
		{ href: '/notes', label: 'Notes' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/now', label: 'Now' },
		{ href: '/about', label: 'About' }
	] as const
} as const;

export type NavItem = (typeof site.nav)[number];
