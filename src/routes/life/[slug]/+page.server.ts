import { entriesForCategory, loadCategoryEntry } from '$lib/content/loaders';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => entriesForCategory('life');

export const load: PageServerLoad = ({ params }) => loadCategoryEntry('life', params.slug);
