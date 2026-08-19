# Portfolio

A production-grade personal portfolio built with the Next.js App Router, React Server
Components, and a CMS-ready Sanity read layer. It is designed to be fast by default,
accessible to WCAG 2.2 AA, and maintainable enough to hand to another engineer.

> **Personalize before deploying.** Identity values (name, job title, social handles,
> résumé, project copy) live in [`src/lib/site.ts`](src/lib/site.ts) and
> [`src/lib/content.ts`](src/lib/content.ts) (or Sanity once configured). Replace the
> placeholders (`"Portfolio"`, `"@username"`) with real values.

## Copyright and reuse policy

Copyright © 2026 Sayandeep Adhikary. All rights reserved.

This repository is a personal portfolio project and is not a reusable template. The
code, layout, styling, content, assets, and project structure are protected by copyright
law. You may not copy, redistribute, adapt, reuse, or repurpose this project as a
portfolio template or for any derivative project without explicit written permission.

The full legal text is in [LICENSE](LICENSE).

## Highlights

- **Server-first.** Every route is statically prerendered; only nine small client
  islands ship JavaScript (theme toggle, mobile dialog, copy button, filter grid, form).
- **Accessible.** Skip link, `h1 → h2 → h3` hierarchy, named region landmarks, visible
  focus rings, reduced-motion kill-switch, and measured colour contrast (WCAG 2.2 AA).
- **Fast.** ~103 kB shared First Load JS, AVIF/WebP images, self-hosted fonts with metric
  fallbacks, CSS-only scroll-driven motion (no animation library).
- **CMS-ready.** A typed Sanity read layer with per-tag ISR and graceful local fallback,
  so the site renders identically with or without a configured project.
- **Typed end-to-end.** `strict` TypeScript with `noUncheckedIndexedAccess`, zero `any`
  (ESLint-enforced), and precise content contracts.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, oklch tokens) |
| UI primitives | Radix Dialog + `class-variance-authority` |
| Theming | `next-themes` (class strategy, pre-paint script) |
| Content | Sanity (`next-sanity`) with local fallback |
| Icons | `lucide-react` (named imports) |
| Testing | Vitest (unit) + Playwright/axe (a11y smoke) |

## Getting started

```bash
nvm use            # Node 20 (see .nvmrc)
npm install
npm run dev        # http://localhost:3000
```

The site runs fully from local fallback content — no Sanity project is required to
develop or build.

### Environment

Copy `.env.example` to `.env.local`. All variables are optional; when Sanity is unset the
site uses local content.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for metadata/sitemap |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Enables the Sanity read layer + Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API date |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the revalidation webhook |

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` / `format:check` | Prettier write / verify |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:e2e` | Playwright accessibility smoke |
| `npm run clean` | Remove `.next` (cache recovery) |

> **Windows note:** do not run `npm run build` while `npm run dev` is running — they share
> `.next` and the webpack cache can corrupt (`ENOENT .pack.gz` rename races). If the dev
> server starts throwing `clientReferenceManifest` / `_document.js` errors, stop it, run
> `npm run clean`, and restart.

## Architecture

```
src/
├─ app/                 # App Router: routes, layouts, SEO file-conventions
│  ├─ (site)/           # Public site (shared header/footer chrome)
│  ├─ studio/           # Embedded Sanity Studio
│  ├─ api/revalidate/   # Sanity webhook → revalidateTag
│  ├─ global-error.tsx  # Root error boundary
│  ├─ robots.ts · sitemap.ts · manifest.ts
│  └─ icon.tsx · opengraph-image.tsx · twitter-image.tsx
├─ components/
│  ├─ layout/           # Header, footer, nav, skip link
│  ├─ sections/         # One folder per homepage section
│  ├─ ui/               # Design-system primitives
│  ├─ seo/              # JSON-LD
│  └─ theme/            # Theme provider + toggle
├─ lib/                 # site config, metadata, fonts, content, projects, utils
├─ sanity/              # env, client, fetch, image, loaders, queries, schema
└─ types/               # Content contracts
```

**Data flow.** Server Components call typed loaders in
[`src/sanity/lib/loaders.ts`](src/sanity/lib/loaders.ts). Each loader wraps `sanityFetch`
with a local fallback from [`src/lib/content.ts`](src/lib/content.ts) /
[`src/lib/projects.ts`](src/lib/projects.ts), so a missing/unconfigured CMS never breaks a
render. Card queries use `Pick` projections to avoid over-fetching bodies/galleries.

**Rendering.** The homepage and project detail pages are prerendered
(`generateStaticParams`). The theme is resolved before first paint via the `next-themes`
inline script to avoid a flash. No live `Date`/time is rendered on the client.

**Motion.** Scroll reveals use the native `animation-timeline: view()` (compositor-only,
zero JS), gated by `@supports` and `prefers-reduced-motion`.

## Content management (Sanity)

The Studio is embedded at `/studio` and its schemas mirror the types in
[`src/types/content.ts`](src/types/content.ts). To connect a real project:

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (and dataset) in `.env.local`.
2. Visit `/studio` to author content.
3. Configure a Sanity webhook to `POST /api/revalidate` with `SANITY_REVALIDATE_SECRET`
   so published changes invalidate the matching cache tags.

Until a project is configured, all loaders serve local fallback content unchanged.

## Testing

- **Unit** (Vitest): pure functions — form validation, link resolution, project
  adjacency, nav mapping.
- **Accessibility** (Playwright + axe): a smoke test asserting no serious/critical
  violations on the homepage.

```bash
npm run test:unit
npm run test:e2e     # requires a running dev/preview server
```

## Deployment

Optimized for Vercel (zero-config). `sharp` is an optional dependency for image
optimization on self-hosted Node. Security headers (CSP, HSTS, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) are set in
[`next.config.ts`](next.config.ts).

## License

This project is copyrighted and distributed under a custom all-rights-reserved license.
See [LICENSE](LICENSE) for the complete terms.
