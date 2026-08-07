# Marendra — personal website

Personal website and blog for Marendra: writing, projects, notes, and daily-life reflections. Built with SvelteKit, TypeScript, and Cloudflare Workers (Static Assets). Content is authored as Markdown (Obsidian-friendly).

## Architecture

- **Routes** are SvelteKit pages, mostly prerendered for a static-first Cloudflare deploy.
- **Content** lives in `content/{writing,life,notes,projects}` plus `content/pages` for `/now` and `/about`.
- **Repository interface** (`src/lib/content`) parses Markdown + YAML frontmatter today. The same shapes can later be backed by D1 without rewriting route loaders.
- **Images** use `PUBLIC_IMAGE_BASE_URL` (R2 custom domain). No upload dashboard in Version 1.
- **Private authoring notes** stay in `docs/` and are not routed.

```text
content/                  Markdown source of truth
src/lib/content/          Parse, render, query, types
src/lib/components/       UI primitives
src/routes/               Pages, RSS, sitemap, search index
docs/publishing-checklist.md
```

## Implementation checklist (Version 1)

- [x] SvelteKit + TypeScript (strict) + `@sveltejs/adapter-cloudflare`
- [x] Wrangler Workers Static Assets config
- [x] Markdown content pipeline with frontmatter validation
- [x] Draft / archived exclusion in production listings
- [x] Routes: `/`, `/writing`, `/life`, `/notes`, `/projects`, `/now`, `/about`
- [x] Detail pages, tags, search, RSS, sitemap, canonical + OG metadata
- [x] Light/dark appearance (system default)
- [x] Image component with lazy loading + missing-image fallback
- [x] Unit tests for parsing and draft exclusion
- [x] ESLint, Prettier, typecheck, production build
- [x] Publishing checklist (private)

## Local development

```sh
bun install
cp .env.example .env
bun run gen
bun run dev
```

Useful scripts:

| Script            | Purpose                               |
| ----------------- | ------------------------------------- |
| `bun run dev`     | Vite dev server                       |
| `bun run check`   | Wrangler types + `svelte-check`       |
| `bun run test`    | Unit tests                            |
| `bun run lint`    | Prettier + ESLint                     |
| `bun run format`  | Format                                |
| `bun run build`   | Production build for Cloudflare       |
| `bun run preview` | Preview the Worker build via Wrangler |
| `bun run deploy`  | Build and `wrangler deploy`           |

## Content authoring

1. Create a Markdown file under the correct folder (`writing`, `life`, `notes`, or `projects`).
2. Add YAML frontmatter:

```yaml
title:
slug:
description:
date: YYYY-MM-DD
updated: YYYY-MM-DD
category: writing # must match folder
tags: [example]
status: draft # draft | published | archived
featured: false
heroImage: /path/on-r2.jpg
heroAlt: Accessible description
```

3. Keep `status: draft` until the private checklist in `docs/publishing-checklist.md` is complete.
4. Only `published` items appear in production listings, search, RSS, and sitemap.
5. Ordinary Markdown is enough. Optional Obsidian-style links `[[slug]]` / `[[slug|label]]` are rewritten when the target slug exists.

Pages `/now` and `/about` are edited in `content/pages/`.

## Environment variables

See `.env.example`:

- `PUBLIC_SITE_URL` — canonical origin for SEO, RSS, sitemap
- `PUBLIC_IMAGE_BASE_URL` — public R2 / images domain
- `PUBLIC_SITE_NAME` — optional display override (defaults via `src/lib/site.ts`)

## Cloudflare deployment

1. Authenticate: `bunx wrangler login`
2. Confirm `wrangler.jsonc` (Workers Static Assets — not legacy Pages/Workers Sites)
3. Set production secrets/vars in the Cloudflare dashboard or via Wrangler, especially:
   - `PUBLIC_SITE_URL`
   - `PUBLIC_IMAGE_BASE_URL`
4. Deploy:

```sh
bun run deploy
```

Or connect the Git repository in the Cloudflare dashboard with:

- Build command: `bun run build` (or `npm run build`)
- Deploy command handled by Wrangler / Workers build

Compatibility flag `nodejs_als` is already set for SvelteKit.

## Remaining manual steps

1. **Create an R2 bucket** for article images.
2. **Attach a custom domain** to that bucket (or an image Worker/CDN in front of it).
3. Set `PUBLIC_IMAGE_BASE_URL` to that domain.
4. Upload images and reference them from frontmatter (`heroImage: /writing/example.jpg`).
5. Set `PUBLIC_SITE_URL` to the real site origin.
6. Replace placeholder Markdown with real writing.
7. Update contact details on `/about`.
8. Point DNS for the site Worker / custom domain.
9. Optionally add a Cloudflare Access policy if you later introduce private authoring tools (not in V1).

## Notes

- No D1, comments, accounts, newsletter, or analytics in Version 1.
- `docs/publishing-checklist.md` must remain unpublished.
