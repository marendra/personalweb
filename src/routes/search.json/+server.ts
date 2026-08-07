import { contentRepository } from '$lib/content';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = () => json(contentRepository.getSearchIndex());
