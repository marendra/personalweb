/**
 * Content domain types.
 *
 * Designed so a future D1-backed repository can implement the same shapes
 * without changing route loaders.
 */

export const CONTENT_CATEGORIES = ['writing', 'life', 'notes', 'projects'] as const;
export type ContentCategory = (typeof CONTENT_CATEGORIES)[number];

export const CONTENT_STATUSES = ['draft', 'published', 'archived'] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export interface ContentFrontmatter {
	title: string;
	slug: string;
	description: string;
	date: string;
	updated?: string;
	category: ContentCategory;
	tags: string[];
	status: ContentStatus;
	featured?: boolean;
	heroImage?: string;
	heroAlt?: string;
}

/** Parsed content item ready for rendering or listing. */
export interface ContentItem extends ContentFrontmatter {
	/** Absolute path within the content tree, e.g. writing/foo.md */
	sourcePath: string;
	/** Canonical public href, e.g. /writing/foo */
	href: string;
	/** Raw markdown body without frontmatter */
	body: string;
	/** Rendered HTML */
	html: string;
	/** Estimated reading time in whole minutes (minimum 1 when body has text) */
	readingTimeMinutes: number;
	wordCount: number;
}

export interface ListOptions {
	category?: ContentCategory;
	tag?: string;
	featured?: boolean;
	/** Include drafts/archived. Defaults to false (published only). */
	includeUnpublished?: boolean;
	limit?: number;
	offset?: number;
}

export interface ContentSearchHit {
	title: string;
	description: string;
	href: string;
	category: ContentCategory;
	date: string;
	tags: string[];
}

export interface AdjacentContent {
	previous: ContentItem | null;
	next: ContentItem | null;
}

/**
 * Repository contract — Markdown implements this today; D1 could later.
 */
export interface ContentRepository {
	list(options?: ListOptions): ContentItem[];
	getBySlug(category: ContentCategory, slug: string): ContentItem | null;
	getAdjacent(item: ContentItem): AdjacentContent;
	search(query: string): ContentSearchHit[];
	getAllTags(category?: ContentCategory): Array<{ tag: string; count: number }>;
	getSearchIndex(): ContentSearchHit[];
}
