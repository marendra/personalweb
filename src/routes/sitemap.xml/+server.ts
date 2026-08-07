import { listPublished } from '$lib/content';
import { absoluteUrl } from '$lib/utils';

export const prerender = true;

const staticPaths = ['/', '/writing', '/life', '/notes', '/projects', '/now', '/about', '/search'];

export const GET = () => {
	const urls = [
		...staticPaths,
		...listPublished().map((item) => item.href),
		...Array.from(
			new Set(
				listPublished().flatMap((item) =>
					item.tags.map((tag) => `/tags/${encodeURIComponent(tag)}`)
				)
			)
		)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
