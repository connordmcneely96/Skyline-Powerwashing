# Deploy & Backend Setup

The site deploys to **Cloudflare Pages** via `@cloudflare/next-on-pages`. The
`/api/quote` route is an **edge** handler that stores leads in **D1** and sends
email through **Resend**.

## 0. Build locally

```bash
npm run build            # Next.js build
npm run pages:build      # Cloudflare adapter → .vercel/output/static
```

## 1. Create the D1 database

```bash
wrangler d1 create skyline-leads
```

Copy the printed `database_id` into `wrangler.toml` under `[[d1_databases]]`
(replace `REPLACE_WITH_D1_DATABASE_ID`).

## 2. Apply the migration

```bash
# remote (production D1)
wrangler d1 execute skyline-leads --remote --file=./migrations/0001_leads.sql

# local (wrangler dev D1), optional
wrangler d1 execute skyline-leads --local --file=./migrations/0001_leads.sql
```

The migration is idempotent (`CREATE TABLE/INDEX IF NOT EXISTS`).

## 3. (Optional) Create a KV namespace for rate limiting

```bash
wrangler kv namespace create RATE_LIMIT
```

Uncomment the `[[kv_namespaces]]` block in `wrangler.toml` and paste the id. The
API limits to 5 submissions per IP per hour and **fails open** if KV is absent.

## 4. Environment variables & secrets

| Name | Type | Example |
|------|------|---------|
| `RESEND_API_KEY` | secret | `re_...` |
| `RESEND_FROM` | var | `Skyline <quotes@yourdomain.com>` (verified sender) |
| `RESIDENTIAL_INBOX` | var | `leads@yourdomain.com` |
| `COMMERCIAL_INBOX` | var | `commercial@yourdomain.com` (may equal residential) |

- **Local:** copy `.dev.vars.example` → `.dev.vars` and fill in. `.dev.vars` is
  gitignored — never commit real secrets.
- **Production:** set these in **Pages → Settings → Environment variables**
  (mark `RESEND_API_KEY` as a Secret). Domain + sender must be verified in Resend.

## 5. Bind D1 (and KV) in the Pages dashboard

`wrangler.toml` bindings cover the CLI/local dev. **Production Pages Functions
read bindings from the dashboard**, so add them there too:

- **Settings → Functions → D1 database bindings:** variable `DB` → `skyline-leads`
- **Settings → Functions → KV namespace bindings** (if using rate limiting):
  variable `RATE_LIMIT` → your namespace

## 6. Deploy

```bash
npm run pages:deploy     # builds + wrangler pages deploy
```

…or connect the repo to Pages and use build command `npx @cloudflare/next-on-pages`
with output directory `.vercel/output/static`.

## Verify the lead pipeline

1. Submit `/quote-request` (try both Home and Business).
2. Confirm a row in D1:
   ```bash
   wrangler d1 execute skyline-leads --remote --command "SELECT id, type, name, city, created_at FROM leads ORDER BY created_at DESC LIMIT 5"
   ```
3. Confirm the owner inbox got `[COMMERCIAL]` / `[Residential]` mail and the
   customer received the on-brand auto-reply.

## Honesty / launch checklist (owner)

- [ ] Replace the `(555)` phone + placeholder email/domain in `src/lib/site-config.ts`.
- [ ] Add an insurance claim **only once coverage is in place** (trust badges in
      `site-config.ts`, the footer tag, and the JSON-LD in `layout.tsx`).
- [ ] Swap placeholder images in `public/images/` for real photos.
