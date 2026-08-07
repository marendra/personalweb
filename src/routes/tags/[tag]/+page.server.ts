import { contentRepository } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	contentRepository.getAllTags().map(({ tag }) => ({ tag }));

export const load: PageServerLoad = ({ params }) => {
	const tag = decodeURIComponent(params.tag);
	const items = contentRepository.list({ tag });
	if (items.length === 0) {
		error(404, 'Tag not found');
	}
	return { tag, items };
};
