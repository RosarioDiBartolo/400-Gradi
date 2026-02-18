# Root And Config Files

This document summarizes all root-level non-`src`/non-`cms` files in the current repository.

## `AGENTS.md`

Purpose: project SSOT and execution constraints for coding agents.  
Important details:
- defines the menu app goal and non-goals
- defines required env vars and run steps
- states typegen workflow (`cd cms && npm run typegen`)
- clarifies legacy components are mostly unwired to active routes

## `README.md`

Purpose: developer quickstart and operational notes.  
Important details:
- local run instructions for app and CMS
- seed process (`cd cms && npm run seed`)
- type generation notes and generated file destinations

## `CODEBASE_MAP.md`

Purpose: existing high-level architecture map.  
Important details:
- identifies entry points and key modules
- highlights fragile modules (`client.ts`, `lang.ts`, etc.)
- includes AI-oriented guardrails and assumptions

## `LLM.md`

Purpose: prior AI context summary and UI direction.  
Important details:
- contains planning notes (including an older statement about `/menu` only)
- partially stale against current code (both `/menu` and `/drinks` exist)

## `Brand.md`

Purpose: brand positioning notes for 400 Gradi.  
Important details:
- marketing/voice context, not implementation logic

## `Design-Goal.md`

Purpose: design strategy memo.  
Important details:
- defines visual direction (dark, restrained, gold accents, typography-first)
- includes product/design process guidance, not runtime logic

## `package.json`

Purpose: root app scripts and dependency manifest.  
Important details:
- scripts: `dev`, `build`, `start`, `lint`
- Next.js app runtime deps, Radix UI, motion, Tailwind v4
- `next` is pinned to `"latest"` (upgrade behavior is non-deterministic over time)

## `package-lock.json`

Purpose: exact root dependency lockfile.  
Important details:
- auto-generated, large
- no app logic; treat as generated artifact

## `tsconfig.json`

Purpose: TypeScript compiler config (strict mode enabled).  
Important details:
- `strict: true`, `noEmit: true`
- path alias `@/* -> ./src/*`
- includes `.next/types` for Next route typings

## `tsconfig.tsbuildinfo`

Purpose: incremental TypeScript build metadata cache.  
Important details:
- generated artifact, not source logic

## `next.config.mjs`

Purpose: Next.js runtime/build configuration.  
Important details:
- `reactStrictMode: true`
- allows remote images from `https://cdn.sanity.io`

## `postcss.config.mjs`

Purpose: PostCSS plugin config.  
Important details:
- uses `@tailwindcss/postcss` plugin

## `eslint.config.js`

Purpose: linting ruleset.  
Important details:
- combines JS recommended + TypeScript recommended + React Hooks plugin
- ignores `dist`
- browser globals enabled

## `components.json`

Purpose: shadcn/ui generator settings.  
Important details:
- alias configuration points ui components to `src/components/ui`
- references `src/index.css` for Tailwind, while app uses `src/app/globals.css` (tooling mismatch risk if regenerated blindly)

## `next-env.d.ts`

Purpose: Next.js ambient typings bridge.  
Important details:
- includes `./.next/types/routes.d.ts`
- standard generated scaffold; generally not edited manually

## `.gitignore`

Purpose: VCS ignore policy.  
Important details:
- excludes `.env`, `node_modules`, build outputs
- excludes Sanity typegen outputs (`cms/schema.json`, `src/types/sanity.types.ts`)

## Root-Level Observations

- No test framework config file exists at root.
- No formatter config (`prettier`, etc.) exists.
- `.env` is present in workspace, but values were intentionally not scanned in this context pack.

## Generated Context Docs (`docs/codebase-context`)

## `docs/codebase-context/INDEX.md`

Purpose: entrypoint and navigation map for this context pack.

## `docs/codebase-context/ROOT_AND_CONFIG_FILES.md`

Purpose: root/config summary (this file).

## `docs/codebase-context/SRC_APP_AND_COMPONENTS_FILES.md`

Purpose: route and component-level summaries.

## `docs/codebase-context/SRC_LOGIC_HOOKS_TYPES_FILES.md`

Purpose: hooks, contexts, logic modules, shared contracts.

## `docs/codebase-context/CMS_AND_ASSETS_FILES.md`

Purpose: CMS schema/import pipeline and static asset summaries.

## `docs/codebase-context/LOGIC_UTILITIES_INDEX.md`

Purpose: reusable logic and utility location index.

## `docs/codebase-context/FEATURE_SOURCE_MAP.md`

Purpose: feature ownership to source file map.

## `docs/codebase-context/REFACTORING_OPPORTUNITIES.md`

Purpose: dedupe/refactor opportunities for iterative agent work.
