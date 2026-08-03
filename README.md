# Camera Shop Landing

A landing page for a second-hand camera shop, where every item is one of a kind. Built with Next.js + Tailwind CSS, with data served from Supabase (Postgres + Storage + Auth). There is no cart or checkout — visitors browse the catalog and then contact the shop over Zalo or Messenger to buy.

## Tech Stack

- **Next.js** (App Router, TypeScript) + **Tailwind CSS v4**
- **Supabase**: Postgres (`products` table), Storage (product images), Auth (single admin, email/password)
- Deploy: **Vercel**, gated by GitHub Actions

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home — product grid
│   ├── products/[id]/page.tsx   # Product detail
│   ├── admin/                   # Admin area (login, list, create/edit)
│   ├── sitemap.ts, robots.ts    # SEO
│   └── opengraph-image.tsx      # Default OG image
├── components/                  # UI components (grid, gallery, social bar…)
│   └── admin/                   # Product form, image uploader, admin nav
├── lib/
│   ├── supabase/                # Supabase clients (browser + server)
│   ├── queries.ts               # Reading products (public)
│   ├── mutations.ts             # Writing products (admin, auth required)
│   ├── storage.ts               # Image upload/delete
│   ├── types.ts, format.ts, config.ts
└── middleware.ts                # Protects /admin/*
supabase/schema.sql              # Schema + RLS + Storage policies
.github/workflows/ci.yml         # Lint, typecheck, build
```

## Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local`, then fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase Dashboard → Settings → API), the shop name, and your social links.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. For the admin area, go to `/admin/login` and sign in with the admin account created in Supabase Auth.

## Environment Variables

Every variable is documented inline in [`.env.example`](.env.example). Only the two Supabase values are required; the rest degrade gracefully when left empty.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/publishable key |
| `NEXT_PUBLIC_SHOP_NAME` | No | Display name (defaults to `Camera Shop`) |
| `NEXT_PUBLIC_SITE_URL` | No | Base URL for `metadataBase`, sitemap, and absolute OG image URLs (defaults to `http://localhost:3000`) |
| `NEXT_PUBLIC_FACEBOOK_URL` | No | Facebook link in the social bar |
| `NEXT_PUBLIC_TIKTOK_URL` | No | TikTok link in the social bar |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Instagram link in the social bar |
| `NEXT_PUBLIC_ZALO_URL` | No | Zalo contact button |
| `NEXT_PUBLIC_MESSENGER_URL` | No | Messenger contact button |
| `SUPABASE_DB_URL` | No | Local-only Postgres connection string for `psql` debugging; unused at runtime |

All social links must be full absolute URLs including `https://`. Empty ones are filtered out and their icon or button is not rendered.

### Getting the contact links

`NEXT_PUBLIC_ZALO_URL` and `NEXT_PUBLIC_MESSENGER_URL` power the "contact to buy" buttons on each product page. When both are set, Zalo is rendered as the primary button; if only one is set, that one becomes primary. When neither is set, the page falls back to a plain "contact the shop" note.

**Zalo** — `https://zalo.me/<phone>`

- Use your phone number with the leading `0` replaced by the `84` country code, e.g. `https://zalo.me/84909123456`. Using the number as-is also works.
- For a Zalo Official Account, open the OA, tap the `⋮` menu next to its name, and choose to share it to get the link.
- Be aware that a phone-number link publicly exposes that number. A Zalo OA link avoids this.

**Messenger** — `https://m.me/<page-username>`

- Use your Facebook Page **username**, not its display name — the username has no spaces and is found under Page Settings → Username. So a Page named "Camera Shop VN" with username `camerashopvn` gives `https://m.me/camerashopvn`.
- Capitalization matters, so copy it exactly.
- The app automatically appends a `ref` query parameter carrying the product name, so you can see which item a buyer is asking about.

## Database

The schema, RLS policies, and Storage bucket are defined in [`supabase/schema.sql`](supabase/schema.sql), which is re-runnable if the project ever needs to be recreated. RLS grants the public read-only (`select`) access, while writes require an authenticated session — the system has exactly one admin.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push and pull request to `main`:

```
npm ci → npm run lint → npx next typegen → npx tsc --noEmit → npm run build
```

The build step uses placeholder Supabase values, since pages are prerendered without contacting Supabase; real values come from Vercel's environment variables at runtime.

## Deploy

1. Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). The Next.js preset and default build command are detected automatically.
2. Add the environment variables from the table above under Vercel → Settings → Environment Variables. Set `NEXT_PUBLIC_SITE_URL` to the real deployed domain. Do not add a `service_role` key — this project does not need one, as all writes go through the anon key plus a user session.
3. In Supabase Dashboard → Authentication → URL Configuration, set **Site URL** to the deployed domain and add it to **Redirect URLs**, so admin login works in production.

### Gating deploys on CI

Vercel's Git integration deploys on push regardless of GitHub Actions status, so passing checks alone cannot block a bad deploy. [`vercel.json`](vercel.json) sets an `ignoreCommand` that runs [`scripts/vercel-ignore-build-until-ci-passes.sh`](scripts/vercel-ignore-build-until-ci-passes.sh) before each build. That script polls the GitHub Checks API and only allows the build when the CI run for that exact commit concluded successfully.

This requires a `GITHUB_TOKEN` environment variable in the Vercel project — a fine-grained token with read-only access to this repository's Actions and Checks. Without it the gate fails open and deploys proceed as usual, so a misconfiguration cannot block every deploy. A failed CI run, or a timeout waiting for one, fails closed and skips the deploy.

## Build

```bash
npm run build
```
