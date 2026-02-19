# CMS And Assets Files

This document covers the `cms/` workspace plus static files in `public/` and `src/assets/`.

## CMS Workspace Files

## `cms/package.json`

Purpose: Sanity Studio scripts/deps.  
Scripts:
- `dev`, `build`, `deploy`, `start`
- `typegen`: schema extract + typegen generate
- `seed`: run seed pipeline script

## `cms/package-lock.json`

Purpose: exact lockfile for CMS dependencies.  
Notes:
- generated artifact; no business logic

## `cms/tsconfig.json`

Purpose: TypeScript config for Studio workspace.  
Notes:
- strict mode enabled
- no emit

## `cms/sanity.config.ts`

Purpose: Sanity Studio runtime config.  
Behavior:
- resolves project/dataset/apiVersion from env with fallbacks
- throws if project id is missing
- defines content structure with two document lists (`category`, `item`)
- wires schema types export

## `cms/sanity.cli.ts`

Purpose: Sanity CLI config for project/dataset resolution.  
Behavior:
- same project/dataset env fallback logic
- throws if project id missing

## `cms/sanity-typegen.json`

Purpose: typegen config contract.  
Behavior:
- schema source: `cms/schema.json` (generated)
- scans `../src/**/*.{ts,tsx}` for GROQ queries
- outputs `../src/types/sanity.types.d.ts`

## Schema Files (`cms/schemaTypes`)

## `cms/schemaTypes/index.ts`

Purpose: exports combined schema type list.  
Includes:
- `i18nString`, `i18nText`, `category`, `variant`, `item`

## `cms/schemaTypes/i18nString.ts`

Purpose: localized short text object schema (`it`, `en` strings).

## `cms/schemaTypes/i18nText.ts`

Purpose: localized long text object schema (`it`, `en` text fields).

## `cms/schemaTypes/category.ts`

Purpose: category document schema.  
Fields:
- localized title, slug, optional image+alt, `kind`, `order`, `isActive`
- preview chooses Italian then English title

## `cms/schemaTypes/item.ts`

Purpose: item document schema + `variant` object schema.  
Fields:
- localized name/description
- category reference
- basePrice, images, gallery, variants, allergens, tags, order, availability
- preview chooses Italian then English name

## Import/Seed Pipeline (`cms/import`)

## `cms/import/generate-ndjson.mjs`

Purpose: transforms legacy seed JSON into schema-compatible NDJSON for Sanity import.  
Key transformations:
- drops `settings` docs
- maps legacy `_type: menuItem` to `_type: item`
- normalizes ids from `menuItem.*` to `item.*`
- infers `kind` for categories based on known drink category slugs
- normalizes i18n fields and arrays
- writes `import/menu.ndjson`

## `cms/import/seed.mjs`

Purpose: orchestrates full seed import process.  
Behavior:
- runs NDJSON generation first
- invokes local Sanity CLI binary
- imports dataset with optional `--replace` (default replace enabled)
- supports env overrides `SEED_FILE`, `SEED_REPLACE`

## `cms/import/menu.seed.json`

Purpose: source seed dataset (legacy-style, verbose JSON array).  
Current snapshot:
- ~79 KB
- 3,837 lines
- includes categories and many menu items with Italian-first content
Notes:
- contains some mojibake in accented text due encoding history

## `cms/import/menu.ndjson`

Purpose: generated import payload for Sanity dataset import.  
Current snapshot:
- ~48 KB
- 137 lines (one JSON document per line)
- normalized for current schema (`category` + `item`)

## Public Static Files (`public`)

## `public/favicon-rounded.png`

Purpose: site icon (also used by metadata icon config).  
Approx size: 22,947 bytes.

## `public/home-bg.png`

Purpose: background image asset (currently not central in active menu shell).  
Approx size: 1,647,182 bytes.

## `public/logo.png`

Purpose: brand logo used in header and legacy components.  
Approx size: 109,955 bytes.

## `public/menu-image-placeholder.svg`

Purpose: fallback placeholder image for menu items without media.  
Approx size: 1,270 bytes.

## `public/vite.svg`

Purpose: leftover static asset from earlier scaffold/tooling.  
Approx size: 1,497 bytes.

## Source Assets (`src/assets`)

## `src/assets/asparagus.png`

Purpose: decorative image used in legacy parallax background.  
Approx size: 986,139 bytes.

## `src/assets/burger.png`

Purpose: decorative image used in legacy parallax background.  
Approx size: 480,013 bytes.

## `src/assets/coffe.png`

Purpose: decorative image used in legacy parallax background.  
Approx size: 632,214 bytes.

## `src/assets/pizza.png`

Purpose: decorative image used in legacy parallax background.  
Approx size: 666,916 bytes.

## `src/assets/react.svg`

Purpose: leftover scaffold asset.  
Approx size: 4,126 bytes.

## `src/assets/salad.png`

Purpose: decorative image used in legacy parallax background.  
Approx size: 793,369 bytes.

## CMS/Asset Context Notes

- CMS integration is file-based and schema-driven; no API routes in Next app.
- Seed pipeline still carries compatibility logic for older document shapes.
- Several static assets appear legacy or unused in the current route composition.
