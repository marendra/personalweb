import { entriesForCategory, loadCategoryEntry } from '$lib/content/loaders';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => entriesForCategory('projects');

export const load: PageServerLoad = ({ params }) => loadCategoryEntry('projects', params.slug);
