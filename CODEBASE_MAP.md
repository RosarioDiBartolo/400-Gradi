# Codebase map

## Entry points
- Frontend: src/app/layout.tsx (providers + metadata), src/components/AppShell.tsx (route-aware shell), src/app/page.tsx (landing homepage), src/app/menu/page.tsx, src/app/drinks/page.tsx.
- Backend: None (no API routes).

## Main directories
- /src/app -> App Router routes/layouts and global CSS.
- /src/components -> Menu UI components and legacy UI elements.
- /src/components/ui -> Radix-based UI primitives.
- /src/lib -> CMS client + i18n helpers + legacy nav/util modules.
- /src/types -> TypeScript contracts for menu data.
- /src/assets -> Legacy image assets.
- /public -> Static assets (logo/background).
- /cms -> Sanity Studio + schema + typegen config.

## Key modules
- src/lib/cms/client.ts -> Sanity fetchMenu() with normalization, sorting, filtering.
- src/types/sanity.types.ts -> Generated Sanity schema + GROQ query result types (typegen output).
- cms/sanity-typegen.json -> Typegen config (schema extract + query scan paths).
- cms/schema.json -> Generated schema snapshot used by typegen.
- src/lib/i18n/lang.ts -> language storage helpers + getLocalized fallback.
- src/components/MenuClient.tsx -> client wrapper that reads lang and renders categories.
- src/components/CategorySection.tsx -> category title + list of ItemCard.
- src/components/ItemCard.tsx -> item name/description/allergens + PriceBlock.
- src/components/PriceBlock.tsx -> basePrice vs variants list, ordered by order.
- src/lib/utils.ts -> cn helper used by UI primitives.
- src/lib/nav-data.tsx -> legacy nav configuration for header/footer.
- src/fonts.ts -> font CSS imports.

## Data & contracts
- DTOs location: src/types/menu.ts
- Generated CMS types: src/types/sanity.types.ts (via Sanity typegen, driven by GROQ projections).
- Images: items support `mainImage` + `gallery`, categories support `image` (all optional).
- Validation layer: None (only filtering/sorting in cms client).
- API boundaries: Server components call fetchMenu() which performs HTTPS GROQ query to Sanity; client components receive data via props.

## Config & env
- Config files: next.config.mjs, postcss.config.mjs, tsconfig.json, eslint.config.js.
- Env handling: process.env in src/lib/cms/client.ts; requires NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET; optional NEXT_PUBLIC_SANITY_API_VERSION, SANITY_READ_TOKEN.

## Fragile / sensitive areas
- Do not change without strong reason:
  - src/lib/cms/client.ts
  - src/types/menu.ts
  - src/lib/i18n/lang.ts
  - src/app/layout.tsx

## Notes for AI agents
- Patterns to follow: fetch data in server pages, pass to MenuClient for language-aware rendering; keep components small; use getLocalized() for i18n fallback to it; sort by order; keep GROQ projections named (for typegen) and regenerate types when schemas or projections change.
- Anti-patterns to avoid: adding client state to server pages, bypassing getLocalized(), introducing new deps or advanced features.
- Legacy note: header/footer/hero and src/components/ui are present but not wired to the current menu routes.

## Assumptions
- Sanity schemas and references match the GROQ query in src/lib/cms/client.ts.
- No backend services beyond Sanity are required for Phase 1.
