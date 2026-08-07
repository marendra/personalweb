import { describe, expect, it } from 'vitest';
import {
	estimateReadingTime,
	isPublished,
	parseFrontmatter,
	rewriteInternalLinks,
	splitFrontmatter
} from './parse';

const sampleMarkdown = `---
title: Sample Title
slug: sample-title
description: A short description.
date: 2026-03-01
category: writing
tags:
  - energy
  - notes
status: published
featured: true
---

Body paragraph with [[other-post|another piece]].
`;

describe('splitFrontmatter', () => {
	it('extracts yaml data and body', () => {
		const { data, content } = splitFrontmatter(sampleMarkdown);
		expect(data).toMatchObject({
			title: 'Sample Title',
			slug: 'sample-title',
			status: 'published'
		});
		expect(content.trim().startsWith('Body paragraph')).toBe(true);
	});
});

describe('parseFrontmatter', () => {
	it('normalizes valid frontmatter', () => {
		const { data } = splitFrontmatter(sampleMarkdown);
		const parsed = parseFrontmatter(data, 'writing/sample.md');
		expect(parsed).toEqual({
			title: 'Sample Title',
			slug: 'sample-title',
			description: 'A short description.',
			date: '2026-03-01',
			category: 'writing',
			tags: ['energy', 'notes'],
			status: 'published',
			featured: true
		});
	});

	it('rejects invalid status', () => {
		expect(() =>
			parseFrontmatter(
				{
					title: 'x',
					description: 'y',
					date: '2026-01-01',
					category: 'writing',
					status: 'public'
				},
				'test.md'
			)
		).toThrow(/Invalid status/);
	});

	it('rejects invalid category', () => {
		expect(() =>
			parseFrontmatter(
				{
					title: 'x',
					description: 'y',
					date: '2026-01-01',
					category: 'blog',
					status: 'published'
				},
				'test.md'
			)
		).toThrow(/Invalid category/);
	});

	it('derives slug from title when missing', () => {
		const parsed = parseFrontmatter(
			{
				title: 'Hello World',
				description: 'desc',
				date: '2026-02-02',
				category: 'notes',
				status: 'draft'
			},
			'notes/hello.md'
		);
		expect(parsed.slug).toBe('hello-world');
	});
});

describe('estimateReadingTime', () => {
	it('returns zero for empty text', () => {
		expect(estimateReadingTime('')).toEqual({ minutes: 0, words: 0 });
	});

	it('estimates at least one minute for short text', () => {
		expect(estimateReadingTime('one two three').minutes).toBe(1);
	});
});

describe('isPublished', () => {
	it('only treats published as visible', () => {
		expect(isPublished('published')).toBe(true);
		expect(isPublished('draft')).toBe(false);
		expect(isPublished('archived')).toBe(false);
	});
});

describe('rewriteInternalLinks', () => {
	it('rewrites wiki links when slug exists', () => {
		const map = new Map([['other-post', '/writing/other-post']]);
		const result = rewriteInternalLinks('See [[other-post|another piece]].', map);
		expect(result).toBe('See [another piece](/writing/other-post).');
	});

	it('falls back to plain text when missing', () => {
		const result = rewriteInternalLinks('See [[missing]].', new Map());
		expect(result).toBe('See missing.');
	});
});
