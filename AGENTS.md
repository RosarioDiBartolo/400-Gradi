# Project SSOT (read this first)

## Goal
- Build: Digital restaurant menu (food + drinks) rendered from a headless CMS with a simple language toggle.
- Primary user: Restaurant guests browsing the menu on mobile.
- Core flows: Open /menu or /drinks, read categories/items/prices, switch language it/en.

## Non-goals
- Explicitly not doing: Ordering/checkout, user accounts/auth, CMS editing UI, advanced UI features (filters/animations/analytics).

## Constraints
- Performance: Server fetch uses cache: no-store; keep payload small and simple.
- SEO / Accessibility: Minimal metadata and simple semantic markup; no SEO tuning found.
- Security / Privacy: Public read where possible; optional token only on server; localStorage only for language.
- Compatibility: Requires modern browsers with localStorage; server default language is it.
- Budget / Hosting: No hosting config found in repo.
- Dependency rules (avoid / prefer): Prefer built-in fetch; avoid adding new deps unless required.

## Tech stack (as-is)
- Frontend: Next.js App Router + React + Tailwind CSS - App Router pages and Tailwind globals live in src/app.
- UI utilities: Radix UI primitives + class-variance-authority + lucide-react + motion - used by legacy components in src/components.
- Backend: None - no API routes present.
- Database: Sanity headless CMS via GROQ over HTTPS - fetchMenu in src/lib/cms/client.ts.
- Auth: None - no auth modules used in the menu flow.
- Deployment: Not specified - no deployment config present.

## Code rules (implicit & explicit)
- Type safety: TypeScript with strict mode enabled (tsconfig.json); shared menu types in src/types/menu.ts.
- Error handling: fetchMenu throws clear errors; pages catch and render minimal error UI.
- Validation: No runtime validation; only filtering by isActive/isAvailable and sorting by order.
- Logging: None in the App Router menu flow.
- Style / formatting: Tailwind utility classes; no explicit formatter config found.

## Repo structure (high-level)
- /src/app -> App Router routes/layouts and globals.
- /src/components -> Menu UI components plus legacy UI/hero/footer/header.
- /src/components/ui -> Radix-based UI primitives.
- /src/lib -> CMS client and i18n helpers.
- /src/lib/nav-data.tsx -> Legacy nav data used by header/footer.
- /src/lib/utils.ts -> cn helper for UI primitives.
- /src/types -> Shared TS types (menu contracts).
- /src/assets -> Legacy images for UI components.
- /src/fonts.ts -> Font CSS imports used by the layout.
- /public -> Static assets.

## Environment
- Required env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET.
- How to run locally:
  1. Create .env with Sanity vars (optional: NEXT_PUBLIC_SANITY_API_VERSION, SANITY_READ_TOKEN).
  2. npm install
  3. npm run dev

## Definition of Done
- Build passes
- No type errors
- No regressions
- API contracts preserved

## Assumptions
- Sanity schemas exist for category and item and items reference categories as queried in src/lib/cms/client.ts.
- Legacy components (header/footer/hero and src/components/ui) are not wired into the current menu routes.
- Deployment target is not defined in this repo.
