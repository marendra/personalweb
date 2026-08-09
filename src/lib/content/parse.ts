import matter from 'gray-matter';
import type { ContentCategory, ContentFrontmatter, ContentStatus } from './types';
import { CONTENT_CATEGORIES, CONTENT_STATUSES } from './types';

export class ContentParseError extends Error {
	constructor(
		message: string,
		readonly sourcePath?: string
	) {
		super(sourcePath ? `${sourcePath}: ${message}` : message);
		this.name = 'ContentParseError';
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown, field: string, sourcePath?: string): string {
	if (typeof value !== 'string' || value.trim() === '') {
		throw new ContentParseError(`Missing or invalid "${field}"`, sourcePath);
	}
	return value.trim();
}

function asOptionalString(value: unknown): string | undefined {
	if (value === undefined || value === null || value === '') return undefined;
	if (typeof value === 'string') return value.trim();
	if (typeof value === 'number' || typeof value === 'boolean') return String(value);
	return undefined;
}

function asBoolean(value: unknown, fallback = false): boolean {
	if (typeof value === 'boolean') return value;
	if (value === 'true') return true;
	if (value === 'false') return false;
	return fallback;
}

function asStringArray(value: unknown): string[] {
	if (value === undefined || value === null || value === '') return [];
	if (Array.isArray(value)) {
		return value
			.map((item) => (typeof item === 'string' ? item : String(item)))
			.map((item) => item.trim())
			.filter(Boolean);
	}
	if (typeof value === 'string') {
		return value
			.split(',')
			.map((item) => item.trim())
			.filter(Boolean);
	}
	return [];
}

function asCategory(value: unknown, sourcePath?: string): ContentCategory {
	const category = asString(value, 'category', sourcePath);
	if (!(CONTENT_CATEGORIES as readonly string[]).includes(category)) {
		throw new ContentParseError(
			`Invalid category "${category}". Expected one of: ${CONTENT_CATEGORIES.join(', ')}`,
			sourcePath
		);
	}
	return category as ContentCategory;
}

function resolveCategory(
	raw: Record<string, unknown>,
	sourcePath: string | undefined,
	inferredCategory: ContentCategory | undefined
): ContentCategory {
	if (inferredCategory && (CONTENT_CATEGORIES as readonly string[]).includes(inferredCategory)) {
		const rawCategory = asOptionalString(raw.category);
		if (rawCategory && rawCategory !== inferredCategory) {
			if (!(CONTENT_CATEGORIES as readonly string[]).includes(rawCategory)) {
				throw new ContentParseError(
					`Invalid category "${rawCategory}". Expected one of: ${CONTENT_CATEGORIES.join(', ')}`,
					sourcePath
				);
			}
		}
		return inferredCategory;
	}
	return asCategory(raw.category, sourcePath);
}

function asStatus(value: unknown, sourcePath?: string): ContentStatus {
	const status = asString(value, 'status', sourcePath);
	if (!(CONTENT_STATUSES as readonly string[]).includes(status)) {
		throw new ContentParseError(
			`Invalid status "${status}". Expected one of: ${CONTENT_STATUSES.join(', ')}`,
			sourcePath
		);
	}
	return status as ContentStatus;
}

function normalizeDate(value: unknown, field: string, sourcePath?: string): string {
	if (value instanceof Date && !Number.isNaN(value.valueOf())) {
		return value.toISOString().slice(0, 10);
	}

	const raw = asOptionalString(value);
	if (!raw) {
		throw new ContentParseError(`Missing or invalid "${field}"`, sourcePath);
	}

	const dateOnly = raw.slice(0, 10);
	if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
		const parsed = Date.parse(`${dateOnly}T00:00:00Z`);
		if (Number.isNaN(parsed)) {
			throw new ContentParseError(`Invalid date "${raw}" for "${field}"`, sourcePath);
		}
		return dateOnly;
	}

	const parsed = Date.parse(raw);
	if (Number.isNaN(parsed)) {
		throw new ContentParseError(`Invalid date "${raw}" for "${field}"`, sourcePath);
	}
	return new Date(parsed).toISOString().slice(0, 10);
}

function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Validate and normalize YAML frontmatter into a typed frontmatter object.
 * Exported for unit tests and for future D1 ingestion pipelines.
 */
export function parseFrontmatter(
	raw: unknown,
	sourcePath?: string,
	fallbackSlug?: string,
	inferredCategory?: ContentCategory
): ContentFrontmatter {
	if (!isRecord(raw)) {
		throw new ContentParseError('Frontmatter must be a YAML object', sourcePath);
	}

	const title = asString(raw.title, 'title', sourcePath);
	const slug = asOptionalString(raw.slug) ?? fallbackSlug ?? slugify(title);
	if (!slug) {
		throw new ContentParseError('Unable to determine slug', sourcePath);
	}

	const updated = asOptionalString(raw.updated);
	const heroImage = asOptionalString(raw.heroImage);
	const heroAlt = asOptionalString(raw.heroAlt);

	return {
		title,
		slug,
		description: asString(raw.description, 'description', sourcePath),
		date: normalizeDate(raw.date, 'date', sourcePath),
		...(updated ? { updated: normalizeDate(raw.updated ?? updated, 'updated', sourcePath) } : {}),
		category: resolveCategory(raw, sourcePath, inferredCategory),
		tags: asStringArray(raw.tags),
		status: asStatus(raw.status, sourcePath),
		featured: asBoolean(raw.featured, false),
		...(heroImage ? { heroImage } : {}),
		...(heroAlt ? { heroAlt } : {})
	};
}

/** Split a markdown file into frontmatter data and body using gray-matter. */
export function splitFrontmatter(raw: string): { data: unknown; content: string } {
	const parsed = matter(raw);
	return { data: parsed.data as unknown, content: parsed.content };
}

export function estimateReadingTime(text: string): { minutes: number; words: number } {
	const words = text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
	if (words === 0) return { minutes: 0, words: 0 };
	return { minutes: Math.max(1, Math.ceil(words / 220)), words };
}

export function hrefFor(category: ContentCategory, slug: string): string {
	return `/${category}/${slug}`;
}

export function isPublished(status: ContentStatus): boolean {
	return status === 'published';
}

/** Rewrite common Obsidian-style wiki links [[Page]] / [[Page|Label]] to markdown links when possible. */
export function rewriteInternalLinks(markdown: string, slugToHref: Map<string, string>): string {
	return markdown.replace(
		/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
		(full, target: string, label?: string) => {
			const key = target.trim();
			const href = slugToHref.get(key) ?? slugToHref.get(slugify(key));
			const text = (label ?? key).trim();
			if (!href) return text;
			return `[${text}](${href})`;
		}
	);
}
