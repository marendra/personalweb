import { getFeatured, getRecent } from '$lib/content';
import { getPage } from '$lib/content/pages';

export const load = () => {
	const now = getPage('now');

	return {
		featuredWriting: getFeatured('writing', 2),
		recentLife: getRecent('life', 3),
		featuredProjects: getFeatured('projects', 2),
		nowExcerpt: now
			? {
					title: now.title,
					description: now.description,
					href: now.href
				}
			: null
	};
};
