# 400 Gradi Menu

Digital restaurant menu (food + drinks) built with Next.js App Router and Tailwind CSS.
Supports optional images (item mainImage/gallery, category image) from Sanity.

## Environment variables (Sanity)
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- NEXT_PUBLIC_SANITY_API_VERSION (optional)
- SANITY_READ_TOKEN (optional, for private datasets)

## Run locally
1. Create .env with the required Sanity vars
2. npm install
3. npm run dev

## Sanity Studio (CMS)
Run the Studio locally:
1. cd cms
2. npm run dev

Env vars (used later by Next.js):
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- NEXT_PUBLIC_SANITY_API_VERSION

Note: Data lives in Sanity Cloud; the Studio is a local/admin UI.

## Seed CMS data
Rebuild the dataset from the seed files:
1. cd cms
2. npm run seed

Optional env vars:
- `SEED_FILE` (default: `import/menu.ndjson`)
- `SEED_REPLACE` (`false` to avoid `--replace`; default replaces the dataset)

## Sanity type generation
Keep CMS schemas and GROQ query result types in sync:
1. cd cms
2. npm run typegen

This generates:
- `cms/schema.json` (schema snapshot)
- `src/types/sanity.types.ts` (schema + GROQ query result types)

Config lives in `cms/sanity-typegen.json`.
Generated files are gitignored, so run typegen after cloning or when schemas/queries change.
