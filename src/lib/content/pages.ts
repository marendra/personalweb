import { estimateReadingTime, parseFrontmatter, splitFrontmatter } from './parse';
import { renderMarkdown } from './markdown';
import type { ContentItem } from './types';

const pageFiles = import.meta.glob('../../../content/pages/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

function sourcePathFromKey(key: string): string {
	const marker = '/content/';
	const index = key.lastIndexOf(marker);
	if (index === -1) return key;
	return key.slice(index + marker.length);
}

function loadPages(): Map<string, ContentItem> {
	const map = new Map<string, ContentItem>();

	for (const [key, raw] of Object.entries(pageFiles)) {
		const sourcePath = sourcePathFromKey(key);
		const { data, content } = splitFrontmatter(raw);
		const body = content.trim();
		// Pages reuse frontmatter validation; category is informational only.
		const frontmatter = parseFrontmatter(
			data,
			sourcePath,
			sourcePath.split('/').pop()?.replace(/\.md$/i, '')
		);
		const reading = estimateReadingTime(body);
		const slug = frontmatter.slug;
		map.set(slug, {
			...frontmatter,
			sourcePath,
			href: `/${slug}`,
			body,
			html: renderMarkdown(body),
			readingTimeMinutes: reading.minutes,
			wordCount: reading.words
		});
	}

	return map;
}

const PAGES = loadPages();

export function getPage(slug: string): ContentItem | null {
	return PAGES.get(slug) ?? null;
}
