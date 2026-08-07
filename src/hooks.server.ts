import type { Handle } from '@sveltejs/kit';

/**
 * Edge + browser caching for this mostly-prerendered site.
 * Hashed `_app/immutable` assets keep long-lived immutable caching via `_headers`.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const { pathname } = event.url;

	// Do not override immutable hashed assets.
	if (pathname.startsWith('/_app/immutable/')) {
		return response;
	}

	const headers = new Headers(response.headers);

	if (pathname === '/rss.xml' || pathname === '/sitemap.xml' || pathname === '/search.json') {
		headers.set(
			'Cache-Control',
			'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
		);
	} else if (
		pathname.endsWith('.xml') ||
		pathname.endsWith('.txt') ||
		pathname.endsWith('.json')
	) {
		headers.set(
			'Cache-Control',
			'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
		);
	} else {
		// HTML pages: short browser cache, longer edge cache with SWR.
		headers.set(
			'Cache-Control',
			'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
		);
	}

	headers.set('CDN-Cache-Control', headers.get('Cache-Control') ?? '');

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};
