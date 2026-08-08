/**
 * Site-wide configuration.
 * Keep personal claims conservative — use placeholders until facts are confirmed.
 */
export const site = {
	name: 'Marendra',
	tagline: 'Notes on energy, technology, and ordinary life',
	description:
		'Marendra writes about commercial energy, technology, personal projects, and ordinary life in Indonesia.',
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
