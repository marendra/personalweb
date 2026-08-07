import { getPage } from '$lib/content/pages';
import { error } from '@sveltejs/kit';

export const load = () => {
	const page = getPage('about');
	if (!page) error(404, 'Not found');
	return { page };
};
