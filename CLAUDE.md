# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm.

- `pnpm dev` — start Vite dev server
- `pnpm build` — typecheck (`tsc`) + production build
- `pnpm preview` — preview production build
- `pnpm server` — run standalone Express server (`server/index.js`)
- `pnpm lint` — ESLint on `src` (max-warnings 0)
- `pnpm format` — Prettier write on `src/**/*.{ts,tsx,css}`
- `pnpm tsc --noEmit` — typecheck only
- `pnpm test:e2e` — Playwright e2e tests (auto-starts dev server on :5173)
- `pnpm exec playwright test e2e/<file>.spec.ts` — run a single e2e test file

## Architecture

Single-page React 18 + TypeScript app, built with Vite, not a Next.js app.

- **Path alias**: `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.json`).
- **State**: local component state via `useState`; global state via Zustand, organized by domain in `src/stores/`; server/remote state via TanStack Query — server data must not be duplicated into Zustand stores.
- **Data layer**: all API/Supabase calls live in `src/services/`. `src/services/supabase.ts` creates the Supabase client from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (see `src/vite-env.d.ts` for the typed env interface).
- **Backend**: Supabase (Postgres + Auth + Realtime + Storage). Schema lives in `supabase/migrations/` — tables use UUID PKs (`gen_random_uuid()`), snake_case, plural names, and `created_at`/`updated_at` TIMESTAMPTZ columns.
- **Optional Node backend**: `server/index.js` is a minimal Express server (currently just a `/health` route), separate from the Vite app — started independently via `pnpm server`.
- **Routing**: React Router v6 (routes to live under `src/routes/`).
- **Forms**: React Hook Form + Zod for validation.
- **Styling**: Tailwind CSS 3 via PostCSS (`tailwind.config.js` + `postcss.config.js`), utility-first, mobile-first, no inline styles except for dynamic values, no `!important`.

### Conventions

- One component per file, functional components + hooks only, props typed via an explicit `interface`, ≤150 lines per component.
- Custom hooks prefixed `use`, business logic extracted out of components.
- TypeScript strict mode; no `any`; `type` for unions/intersections, `interface` for object shapes.
- Lazy-load pages with `React.lazy` + `Suspense`; use stable list keys (never array index); `React.memo` for expensive components.
- Error handling: Error Boundaries per feature/page; Axios interceptors handle errors centrally.
- Git: branches `{type}/{description}` kebab-case; commits `<type>(<scope>): <subject>`, imperative, English, ≤50 chars.

## Note

`RN_Storybook_Hub_Architecture.md` in this repo root documents a **separate, unrelated project** (a Next.js monorepo for publishing/distributing React Native Storybook packages, scaffolded at `/Users/tuanvm37/rnstorybook-hub`) — it is not the architecture of this repository.
