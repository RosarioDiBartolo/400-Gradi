# LLM Context: 400 Gradi

## Purpose
Digital restaurant menu (food + drinks) rendered from a headless CMS with a simple language toggle.

## Frontend Plan (Approved)
- Single main page: `/menu` only (no separate `/drinks`).
- Multiple categories open on the same page (no tabs).
- Each category shows a 3-item preview list as a quick explanation of the category.
- Provide a simple “Show all” / “Hide” toggle per category to reveal the full item list.
- Language toggle persists via localStorage (it/en).

## Quick Start
- `npm install`
- `npm run dev`

## Tech Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS v4 (PostCSS)
- Sanity CMS via GROQ over HTTPS
- Legacy UI modules include Radix UI primitives and motion (not wired to menu routes)

## Project Structure (important only)
- `src/app/layout.tsx`: global layout with header/main/footer
- `src/app/page.tsx`: redirects to `/menu`
- `src/app/menu/page.tsx`: food menu
- `src/app/drinks/page.tsx`: drinks menu
- `src/components/*`: menu UI components and legacy header/footer/hero
- `src/components/ui/*`: Radix-based UI primitives
- `src/lib/cms/client.ts`: Sanity fetchMenu
- `src/lib/i18n/lang.ts`: language persistence + localized field helper
- `src/types/menu.ts`: menu data contracts
- `src/types/sanity.types.ts`: generated Sanity schema + GROQ query types
- `src/app/globals.css`: global styles and theme tokens
- `src/fonts.ts`: font imports
- `src/lib/nav-data.tsx`: legacy nav configuration
- `src/lib/utils.ts`: cn helper for UI primitives
- `cms/sanity-typegen.json`: Sanity typegen config

## Data Model (Menu)
- Categories and items are fetched from Sanity and ordered by `order`.
- Items can have either `basePrice` or `variants[]`.
- Localization uses it/en with fallback to it.
- Images are optional: items can have `mainImage` and `gallery`, categories can have `image`.

## Type Generation
- Run `cd cms && npm run typegen` after schema or GROQ projection changes.
- Type output lives at `src/types/sanity.types.ts`.
- Schema snapshot lives at `cms/schema.json`.

## Seeding
- Run `cd cms && npm run seed` to regenerate NDJSON and import it into the dataset.
- Optional env vars: `SEED_FILE`, `SEED_REPLACE=false`.

## Environment
- Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
- Optional: NEXT_PUBLIC_SANITY_API_VERSION, SANITY_READ_TOKEN
