# Tahir Wishes

A wish wall for Tahir's 1st birthday — Birthday Soirée, 6 May 2026, Cave Lux, Fortunate Hub, Ilorin.

Built with Next.js 15 (App Router) and Vercel KV (Upstash Redis). Guests submit wishes that wait for parent approval before appearing on the public wall.

## Features

- Public landing page with hero, countdown, event details, and wish wall (approved wishes only)
- Submission form for guests — wishes start as `pending` until a parent approves
- Parent moderation console at `/admin` (password-gated)
- Filter tabs: Pending / Approved / Hidden / All
- Approve, hide, mark-pending, or delete actions per wish
- Confetti when a wish is sent

## Local development

```bash
pnpm install
cp .env.local.example .env.local   # then fill in the values below
pnpm dev
```

If `KV_REST_API_URL` / `KV_REST_API_TOKEN` are not set in development, wishes are stored in memory and reset on every server restart — fine for local UI work.

### Environment variables

| Name | Required | Notes |
| --- | --- | --- |
| `KV_REST_API_URL` | prod | Set automatically by Vercel when you add a KV store. |
| `KV_REST_API_TOKEN` | prod | Same as above. |
| `ADMIN_PASSWORD` | always | Password for the `/admin` page. |
| `ADMIN_SESSION_SECRET` | recommended | Used to sign the admin session cookie. Generate with `openssl rand -hex 32`. |

## Deploying to Vercel

1. Push this repo to GitHub.
2. Visit [vercel.com/new](https://vercel.com/new) and import the repo.
3. In the project's **Storage** tab, add a **KV / Upstash** store. Vercel injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
4. In **Settings → Environment Variables**, add `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
5. Redeploy. Open `/admin` and sign in with `ADMIN_PASSWORD` to approve wishes.

## Project layout

```
app/
  layout.tsx              # global layout, fonts, metadata
  globals.css             # design tokens + ported styles
  page.tsx                # public landing page (server component)
  admin/                  # parent moderation console
  api/                    # JSON endpoints (wishes, admin)
components/               # Hero, Countdown, Details, Wishes, Confetti, Admin, Login
lib/
  kv.ts                   # Vercel KV / Upstash storage layer
  auth.ts                 # admin session cookie + password check
  types.ts                # Wish + status types
```

## Design

The UI is a 1:1 port of the design package shared from Claude Design. The design tokens — Honey accent (`#D4923C`), cream base, sky-blue and gold balloons, Italiana / Cormorant Garamond / Montserrat type — match the original spec.
