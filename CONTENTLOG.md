# Content & Design Log

Notes on judgment calls made while building the Skyline Exterior Cleaning
homepage. Anything brand-specific lives in `src/lib/site-config.ts` (text) and
`src/app/globals.css` (color tokens) — change those, not the components.

## Brand
- Built exactly as **Skyline Exterior Cleaning** (Little Rock, AR + OKC), per the
  reference mockup. To rebrand, edit `src/lib/site-config.ts` and the color
  tokens in `globals.css`.

## Positioning pass (drone-forward) + quote backend
- **Drone leads, ground supports.** The homepage and `/commercial` headline
  drone-powered cleaning of commercial / multi-story buildings (no scaffolding,
  no lifts, nobody at height, up to ~150 ft). Ground services (pressure/soft/
  window/gutter) are kept as the supporting "hybrid" base. Content lives in
  `site-config.ts` as `droneServices` / `groundServices` / `allServices`.
- **Honesty constraints (important).** No invented stats, testimonials, review
  counts, or project numbers. The before/after section is framed as "sample
  comparisons — real photos coming soon"; `/reviews` is an honest placeholder.
  Verifiable claims only (FAA Part 107 certified pilot). The "Licensed & Insured"
  claim was **softened/removed**; `TODO(owner)` comments mark where to add an
  insurance claim once coverage is bound (trust badges, footer tag, JSON-LD).
  Phone/email remain clearly-flagged placeholders (the `(555)` number is
  intentionally non-working). `copyrightYear` is 2026.
- **Quote form** (`/quote-request`): asks home vs business first, then branches
  fields; captures UTM + referrer silently; honeypot + accessible validation;
  POSTs to `/api/quote`. `/commercial` links with `?type=commercial` to pre-set
  the branch (read from `window.location` on mount — avoids a Suspense boundary
  and stays static-export friendly).
- **Backend** (`/api/quote`, `runtime = 'edge'`): zod validation → honeypot →
  optional KV rate limit (fails open) → D1 insert → Resend emails (owner routed
  by type with `[COMMERCIAL]`/`[Residential]` subject; customer auto-reply).
  Verified end-to-end against a local D1 via `wrangler pages dev`: valid leads
  store with parsed numerics + attribution + `status='new'`, honeypot rows are
  dropped, invalid/branch-incomplete payloads return 400. Email needs a real
  `RESEND_API_KEY` (skipped gracefully when absent). Setup steps in `DEPLOY.md`.
- **Form primitives** are lightweight native input/label/select/textarea styled
  to match shadcn (native `<select>` avoids another Radix dependency on edge).

## Stack notes
- **Next.js 14.2** (App Router, TS, Tailwind, `src/`). The spec pinned Next 14,
  so `@cloudflare/next-on-pages` is pinned to **1.13.12** — the last line that
  supports Next 14.2 (1.13.16+ requires Next ≥14.3 / 15).
- **shadcn/ui** primitives added manually (button, card, sheet, navigation-menu,
  accordion, separator) and re-themed to the brand tokens. `navigation-menu` is
  installed per spec but the header uses a simpler semantic `<ul>` nav — cleaner
  for a flat link bar with no dropdowns.
- **lucide-react** is on v1.x here, which renamed/removed some icons. Mappings:
  `Home → House`, `CheckCircle → CircleCheck`, gutter uses `CloudRain`, roof uses
  `Sparkles`, windows use `PanelTop`. Brand icons were removed from lucide, so
  **Facebook** and **Google** glyphs are hand-rolled SVGs in `components/icons.tsx`.

## Images
- No real photography yet. `scripts/gen-placeholders.mjs` generates valid
  **solid-navy PNG** placeholders (pure Node + zlib, no deps) at every documented
  path. Before/after placeholders are intentionally two different shades so the
  comparison slider visibly wipes. Real photos drop in by overwriting the file at
  the same path — see `public/images/README.md` for dimensions.
- Placeholders are **`.png`** (the generator can't emit JPEG without a native
  lib). The reference doc listed `.jpg`; paths are centralized in `site-config.ts`
  so switching to `.jpg` is a one-line-per-image change if preferred.
- `next/image` runs with `images.unoptimized: true` because Cloudflare Pages
  doesn't run Next's default optimizer. Width/height are still set everywhere to
  prevent layout shift. Cloudflare Images / a custom loader can be added later.

## Components
- **BeforeAfterSlider** supports pointer (mouse + touch via Pointer Events) and
  full keyboard control (`role="slider"`, arrow/Home/End, `aria-valuenow/min/max`,
  `aria-valuetext`). Shift+Arrow jumps 10%.
- **Header** is fixed + transparent over the hero, transitioning to solid navy on
  scroll (>24px). Mobile uses the shadcn Sheet drawer with nav + Call Now + Get
  Free Quote.
- **Reveal** wraps framer-motion scroll reveals and drops transforms under
  `prefers-reduced-motion`.

## Routing / scope
- Homepage + global header/footer + shared components are the real build.
- Stubbed (no 404s): `/quote-request`, `/services/[slug]`, `/commercial`,
  `/about`, `/reviews`, `/service-areas`, `/contact`. `[slug]` is locked to known
  services (`dynamicParams = false`) so it stays fully static for the edge build.
- CTAs wired: Get Free Quote / Request Quote → `/quote-request`; Call Now →
  `tel:`; service cards → `/services/[slug]`.
- The quote-form backend/API is intentionally **not** built (separate task).

## Deploy
- Default target: **Cloudflare Pages** via `@cloudflare/next-on-pages`.
  - `npm run pages:build` → produces `.vercel/output/static`
  - `npm run pages:deploy` → builds + `wrangler pages deploy`
  - `wrangler.toml` sets `nodejs_compat` + the Pages output dir.
- Vercel fallback works out of the box (`next build`) with no changes.
