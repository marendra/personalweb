import { describe, expect, it } from 'vitest';
import { contentRepository, listPublished } from './repository';
import { isPublished } from './parse';

describe('contentRepository draft exclusion', () => {
	it('excludes drafts and archived items from default listings', () => {
		const published = listPublished();
		expect(published.length).toBeGreaterThan(0);
		for (const item of published) {
			expect(item.status).toBe('published');
			expect(isPublished(item.status)).toBe(true);
		}
	});

	it('never returns draft items from getBySlug without include flag', () => {
		const draft = contentRepository
			.list({ includeUnpublished: true })
			.find((item) => item.status === 'draft');
		expect(draft).toBeTruthy();
		if (!draft) return;
		expect(contentRepository.getBySlug(draft.category, draft.slug)).toBeNull();
	});

	it('keeps drafts available when includeUnpublished is true', () => {
		const withDrafts = contentRepository.list({ includeUnpublished: true });
		expect(withDrafts.some((item) => item.status === 'draft')).toBe(true);
	});

	it('search index contains only published items', () => {
		const index = contentRepository.getSearchIndex();
		expect(index.length).toBeGreaterThan(0);
		const publishedHrefs = new Set(listPublished().map((item) => item.href));
		for (const hit of index) {
			expect(publishedHrefs.has(hit.href)).toBe(true);
		}
	});
});
