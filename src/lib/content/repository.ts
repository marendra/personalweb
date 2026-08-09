import {
	estimateReadingTime,
	hrefFor,
	isPublished,
	parseFrontmatter,
	rewriteInternalLinks,
	splitFrontmatter
} from './parse';
import { renderMarkdown } from './markdown';
import { CONTENT_CATEGORIES } from './types';
import type {
	AdjacentContent,
	ContentCategory,
	ContentItem,
	ContentRepository,
	ContentSearchHit,
	ListOptions
} from './types';

type RawModule = string;

/**
 * Eagerly import all markdown files from the content directory.
 * Parsed at module load (build / prerender time) — no runtime filesystem access.
 */
const rawFiles = import.meta.glob('../../../content/{writing,life,notes,projects}/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, RawModule>;

function sourcePathFromKey(key: string): string {
	const marker = '/content/';
	const index = key.lastIndexOf(marker);
	if (index === -1) return key;
	return key.slice(index + marker.length);
}

function fallbackSlugFromPath(sourcePath: string): string {
	const base = sourcePath.split('/').pop() ?? sourcePath;
	return base.replace(/\.md$/i, '');
}

function buildSlugIndex(items: ContentItem[]): Map<string, string> {
	const map = new Map<string, string>();
	for (const item of items) {
		map.set(item.slug, item.href);
		map.set(item.title, item.href);
	}
	return map;
}

function parseAll(): ContentItem[] {
	const partials: Array<{
		frontmatter: ReturnType<typeof parseFrontmatter>;
		body: string;
		sourcePath: string;
	}> = [];

	for (const [key, raw] of Object.entries(rawFiles)) {
		const sourcePath = sourcePathFromKey(key);
		const { data, content } = splitFrontmatter(raw);
		const folder = sourcePath.split('/')[0];
		const inferredCategory = (CONTENT_CATEGORIES as readonly string[]).includes(folder)
			? (folder as ContentCategory)
			: undefined;
		const frontmatter = parseFrontmatter(
			data,
			sourcePath,
			fallbackSlugFromPath(sourcePath),
			inferredCategory
		);

		partials.push({ frontmatter, body: content.trim(), sourcePath });
	}

	const draftItems: ContentItem[] = partials.map(({ frontmatter, body, sourcePath }) => {
		const reading = estimateReadingTime(body);
		return {
			...frontmatter,
			sourcePath,
			href: hrefFor(frontmatter.category, frontmatter.slug),
			body,
			html: '',
			readingTimeMinutes: reading.minutes,
			wordCount: reading.words
		};
	});

	const slugIndex = buildSlugIndex(draftItems);

	return draftItems
		.map((item) => {
			const linked = rewriteInternalLinks(item.body, slugIndex);
			return {
				...item,
				body: linked,
				html: renderMarkdown(linked)
			};
		})
		.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

const ALL_ITEMS = parseAll();

function applyFilters(items: ContentItem[], options: ListOptions = {}): ContentItem[] {
	let result = items;

	if (!options.includeUnpublished) {
		result = result.filter((item) => isPublished(item.status));
	}

	if (options.category) {
		result = result.filter((item) => item.category === options.category);
	}

	if (options.tag) {
		const tag = options.tag.toLowerCase();
		result = result.filter((item) => item.tags.some((t) => t.toLowerCase() === tag));
	}

	if (options.featured !== undefined) {
		result = result.filter((item) => Boolean(item.featured) === options.featured);
	}

	const offset = options.offset ?? 0;
	const limit = options.limit;
	if (limit !== undefined) {
		return result.slice(offset, offset + limit);
	}
	if (offset > 0) {
		return result.slice(offset);
	}
	return result;
}

function toSearchHit(item: ContentItem): ContentSearchHit {
	return {
		title: item.title,
		description: item.description,
		href: item.href,
		category: item.category,
		date: item.date,
		tags: item.tags
	};
}

/** Markdown-backed content repository (Version 1). */
export const contentRepository: ContentRepository = {
	list(options = {}) {
		return applyFilters(ALL_ITEMS, options);
	},

	getBySlug(category, slug) {
		return applyFilters(ALL_ITEMS, { category }).find((item) => item.slug === slug) ?? null;
	},

	getAdjacent(item) {
		const siblings = applyFilters(ALL_ITEMS, { category: item.category });
		const index = siblings.findIndex((entry) => entry.slug === item.slug);
		if (index === -1) {
			return { previous: null, next: null } satisfies AdjacentContent;
		}
		// List is newest-first; "previous" chronologically older (higher index),
		// "next" is newer (lower index).
		return {
			previous: siblings[index + 1] ?? null,
			next: siblings[index - 1] ?? null
		};
	},

	search(query) {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return [];

		const terms = normalized.split(/\s+/).filter(Boolean);
		return applyFilters(ALL_ITEMS)
			.filter((item) => {
				const haystack = [item.title, item.description, item.tags.join(' '), item.category]
					.join(' ')
					.toLowerCase();
				return terms.every((term) => haystack.includes(term));
			})
			.map(toSearchHit);
	},

	getAllTags(category) {
		const counts = new Map<string, number>();
		for (const item of applyFilters(ALL_ITEMS, category ? { category } : {})) {
			for (const tag of item.tags) {
				counts.set(tag, (counts.get(tag) ?? 0) + 1);
			}
		}
		return [...counts.entries()]
			.map(([tag, count]) => ({ tag, count }))
			.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
	},

	getSearchIndex() {
		return applyFilters(ALL_ITEMS).map(toSearchHit);
	}
};

/** Convenience helpers used by routes. */
export function listPublished(options?: ListOptions): ContentItem[] {
	return contentRepository.list(options);
}

export function getPublishedBySlug(category: ContentCategory, slug: string): ContentItem | null {
	return contentRepository.getBySlug(category, slug);
}

export function getFeatured(category?: ContentCategory, limit = 3): ContentItem[] {
	return contentRepository.list({ category, featured: true, limit });
}

export function getRecent(category: ContentCategory, limit = 5): ContentItem[] {
	return contentRepository.list({ category, limit });
}
