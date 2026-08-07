import { contentRepository } from '$lib/content';

export const load = () => {
	return {
		index: contentRepository.getSearchIndex()
	};
};
