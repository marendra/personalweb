import type { ContentCategory } from '$lib/content';
import { contentRepository, listPublished } from '$lib/content';
import { error } from '@sveltejs/kit';

export function loadCategoryList(category: ContentCategory) {
	const items = listPublished({ category });
	const tags = contentRepository.getAllTags(category);
	return { category, items, tags };
}

export function loadCategoryEntry(category: ContentCategory, slug: string) {
	const item = contentRepository.getBySlug(category, slug);
	if (!item) {
		error(404, 'Not found');
	}
	const adjacent = contentRepository.getAdjacent(item);
	return { item, ...adjacent };
}

export function entriesForCategory(category: ContentCategory) {
	return listPublished({ category }).map((item) => ({ slug: item.slug }));
}
