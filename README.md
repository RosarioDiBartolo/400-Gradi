# 400 Gradi Menu

Digital restaurant menu (food + drinks) built with Next.js App Router and Tailwind CSS.

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
