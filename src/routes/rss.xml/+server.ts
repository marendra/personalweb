import { listPublished } from '$lib/content';
import { site } from '$lib/site';
import { absoluteUrl, getSiteUrl } from '$lib/utils';

export const prerender = true;

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export const GET = () => {
	const items = listPublished({ limit: 30 });
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${escapeXml(getSiteUrl())}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <atom:link href="${escapeXml(absoluteUrl('/rss.xml'))}" rel="self" type="application/rss+xml" />
    ${items
			.map(
				(item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(absoluteUrl(item.href))}</link>
      <guid isPermaLink="true">${escapeXml(absoluteUrl(item.href))}</guid>
      <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
    </item>`
			)
			.join('\n    ')}
  </channel>
</rss>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
