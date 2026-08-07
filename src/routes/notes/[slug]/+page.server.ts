import { entriesForCategory, loadCategoryEntry } from '$lib/content/loaders';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => entriesForCategory('notes');

export const load: PageServerLoad = ({ params }) => loadCategoryEntry('notes', params.slug);
