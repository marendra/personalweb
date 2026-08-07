import { entriesForCategory, loadCategoryEntry } from '$lib/content/loaders';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => entriesForCategory('writing');

export const load: PageServerLoad = ({ params }) => loadCategoryEntry('writing', params.slug);
