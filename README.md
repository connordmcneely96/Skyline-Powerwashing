# Skyline Exterior Cleaning

Conversion-focused marketing website for **Skyline Exterior Cleaning** — an
exterior cleaning company (pressure washing, soft washing, roof / window / gutter
cleaning) serving Arkansas & Oklahoma.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with CSS-variable design tokens
- **shadcn/ui** primitives + **lucide-react** icons
- **framer-motion** scroll reveals (reduced-motion aware)
- **embla-carousel-react** before/after carousel
- Deploys to **Cloudflare Pages** via `@cloudflare/next-on-pages` (Vercel works too)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production Next.js build |
| `npm run lint` / `npm run typecheck` | Lint / type-check |
| `npm run gen:placeholders` | Regenerate the placeholder images |
| `npm run pages:build` | Build for Cloudflare Pages (`.vercel/output/static`) |
| `npm run pages:preview` | Build + preview locally with Wrangler |
| `npm run pages:deploy` | Build + deploy to Cloudflare Pages |

## Where things live

- **Brand content** (name, phone, services, areas, links): `src/lib/site-config.ts`
- **Colors / tokens**: `src/app/globals.css` + `tailwind.config.ts`
- **Images**: `public/images/` (see its `README.md` for required assets + sizes)
- **Design decisions / judgment calls**: `CONTENTLOG.md`

To **rebrand**, edit `site-config.ts` and the color tokens in `globals.css` — no
component changes needed.
