# Portfolio

A polished personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Sanity.

It is designed to feel premium, fast, and editorial — blending strong visual storytelling with a clean technical foundation and content-first architecture.

## Copyright and reuse policy

Copyright © 2026 Sayandeep Adhikary. All rights reserved.

This repository is a personal portfolio project and is not a reusable template, portfolio starter, or derivative work. You may not copy, reproduce, redistribute, adapt, or repurpose this project for another portfolio or commercial project without explicit written permission.

The full legal text is in [LICENSE](LICENSE).

## Why this project

- Fast and accessible by default
- Built for a strong personal brand presence
- Content-driven architecture with a CMS backend
- Responsive and presentation-focused UI
- Clean TypeScript setup with validation and testing

## Tech stack

| Area | Stack |
| --- | --- |
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | Sanity |
| UI | Radix + custom components |
| Theme | next-themes |
| Testing | Vitest + Playwright |

## Featured sections

- Hero and personal positioning
- Project showcase and case studies
- Experience and certifications
- Social links and contact section
- Gallery and editorial content blocks
- CMS-powered editing through Sanity Studio

## Getting started

### Prerequisites

- Node.js 18.18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app runs on http://localhost:3000 by default.

This project includes local fallback content, so you can work without a Sanity project configured.

## Environment variables

Copy `.env.example` to `.env.local` and only add the values you need.

Most variables are optional; if Sanity is not configured, the app continues to use local content.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional | Used for metadata, canonical URLs, and sitemap generation |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Optional | Enables the Sanity content layer and Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Optional | Sanity dataset name, defaults to `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional | API version used by Sanity |
| `SANITY_REVALIDATE_SECRET` | Optional | Shared secret for the revalidation webhook |
| `SANITY_API_READ_TOKEN` | Optional | For preview/draft access |
| `SANITY_API_WRITE_TOKEN` | Optional | Used for local content seeding |
| `GITHUB_TOKEN` | Optional | Enables GitHub footprint data |

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run test:unit
npm run test:e2e
npm run clean
```

## Sanity setup

The project includes an embedded Studio at `/studio`.

To enable CMS content:

1. Copy `.env.example` to `.env.local`
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Set your dataset, API version, and any optional tokens
4. Open `/studio` to edit content
5. Optionally configure the `/api/revalidate` webhook

If Sanity is not configured, the site continues to render from local fallback content.

## Deployment

This project is ready for deployment on Vercel and other compatible Node-based environments.

> Windows note: avoid running `npm run build` while `npm run dev` is active because both use the same `.next` cache.

## License

This project is protected by an all-rights-reserved copyright. See [LICENSE](LICENSE) for the complete legal terms.

## Gallery

![Homepage](https://placehold.co/1400x900/111827/ffffff?text=Homepage)

![Project showcase](https://placehold.co/1400x900/1f2937/ffffff?text=Project+Showcase)

![Mobile experience](https://placehold.co/900x1600/0f172a/ffffff?text=Mobile+View)

![Studio workflow](https://placehold.co/1400x900/374151/ffffff?text=Studio+Workflow)

![Theme preview](https://placehold.co/1400x900/111827/ffffff?text=Theme+Preview)
