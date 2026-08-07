import { env } from '$env/dynamic/public';
import { site } from '$lib/site';

export function getSiteUrl(): string {
	const configured = env.PUBLIC_SITE_URL?.replace(/\/$/, '');
	return configured && configured.length > 0 ? configured : site.defaultUrl;
}

export function getImageBaseUrl(): string {
	return (env.PUBLIC_IMAGE_BASE_URL ?? '').replace(/\/$/, '');
}

export function absoluteUrl(pathname: string): string {
	const base = getSiteUrl();
	if (!pathname || pathname === '/') return base;
	return `${base}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function resolveImageUrl(path?: string | null): string | null {
	if (!path) return null;
	if (/^https?:\/\//i.test(path)) return path;
	const base = getImageBaseUrl();
	if (!base) return null;
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `${base}${normalized}`;
}

export function formatDate(date: string, locale = 'en-GB'): string {
	const parsed = Date.parse(`${date}T00:00:00Z`);
	if (Number.isNaN(parsed)) return date;
	return new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	}).format(parsed);
}

export function formatReadingTime(minutes: number): string {
	if (minutes <= 0) return 'Quick read';
	return `${minutes} min read`;
}
