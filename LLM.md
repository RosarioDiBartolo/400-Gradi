# LLM Context: 400 Gradi

## Purpose
Single-page restaurant menu/order prototype. Users browse categories, open product detail pages, and view a cart. Firestore helpers exist for table sessions but are not fully wired into the UI.

## Quick Start
- `npm install`
- `npm run dev` (Vite dev server; host enabled, default port 5173)
- `npm run build` / `npm run preview`

## Tech Stack
- React 19 + TypeScript + Vite 7 (SWC plugin)
- React Router v7
- Tailwind CSS v4 + `@tailwindcss/vite` + `tw-animate-css`
- Radix UI primitives (via custom components)
- Firebase (Firestore + Auth) + firelordjs (typed Firestore)
- Motion library note: dependency is `motion`, but `src/components/footer.tsx` imports `framer-motion` (verify or install if needed)

## Project Structure (important only)
- `src/main.tsx`: app entry; router setup
- `src/layout.tsx`: layout wrapper for non-home routes (renders `Outlet` + `Footer`)
- `src/pages/*`: top-level routes
- `src/lib/menu.tsx`: static menu data and helpers
- `src/lib/db.ts`: Firestore helpers and hooks
- `src/lib/firebase.ts`: Firebase init and exports
- `src/index.css`: Tailwind + theme tokens and base styles
- `src/fonts.ts`: font imports
- `vite.config.ts`: Vite config + alias

## Routing
Defined in `src/main.tsx`:
- `/` -> `Home` (no layout)
- `/about`, `/menu`, `/cart`, `/settings`, `/products/:category/:name` -> `Layout` (footer present)

Notes:
- `Header` exists but is not rendered in `Layout`, so primary nav is not currently shown.
- Route params use raw category/product names (spaces and accents). `Product` does a case-insensitive match, but URL encoding can still be brittle.

## Data Model (Menu)
`src/lib/menu.tsx`:
- `menuData` contains categories and products with name/description/price/ingredients.
- Product thumbnails are chosen randomly at module load from `src/assets`.
- `getCategory(name)` is case-insensitive.
- Some Italian strings show mojibake (encoding issues) and may need cleanup.

## Firestore (Tables/Sessions)
`src/lib/db.ts`:
- Collections:
  - `tables`: `{ lastSessionId: string }`
  - `sessions`: `{ table: number, orders: { product: ProductReference }[] }`
- Helpers:
  - `getTable(tableId)` creates table + session if missing
  - `closeTable(tableId)` deletes table doc
  - `useTables()` and `useTable(id)` subscribe via `onSnapshot`

`src/lib/firebase.ts` uses `VITE_PUBLIC_FIREBASE_*` env vars from `.env`.

## UI Flow (current behavior)
- `Menu` builds tabs from `menuData` and links to `/products/:category/:name`.
- `Product` reads params and renders detail view; reads `table` query param but does not act on it.
- `Cart` shows static sample orders; checkout button is disabled unless `?table=<number>` is present.

## Styling / Theme
- `src/index.css` sets Tailwind base and CSS variables for light/dark themes.
- Fonts loaded in `src/fonts.ts` and used via Tailwind class names (`font-great-vibes`, `font-cinzel`, `font-cormorant`).
- Alias `@` maps to `src` (see `vite.config.ts` and `tsconfig.json`).

