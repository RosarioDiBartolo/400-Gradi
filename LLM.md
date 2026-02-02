# LLM Context: 400 Gradi

## Purpose
Digital restaurant menu (food + drinks) rendered from a headless CMS with a simple language toggle.

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
- `src/app/globals.css`: global styles and theme tokens
- `src/fonts.ts`: font imports
- `src/lib/nav-data.tsx`: legacy nav configuration
- `src/lib/utils.ts`: cn helper for UI primitives

## Data Model (Menu)
- Categories and items are fetched from Sanity and ordered by `order`.
- Items can have either `basePrice` or `variants[]`.
- Localization uses it/en with fallback to it.

## Environment
- Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
- Optional: NEXT_PUBLIC_SANITY_API_VERSION, SANITY_READ_TOKEN
