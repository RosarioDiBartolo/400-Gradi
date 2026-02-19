# Codebase Context Index

Last full scan: 2026-02-17  
Scan scope: all 85 files returned by `rg --files` plus `.gitignore` (read separately).  
Excluded from content extraction: `.env` values (intentional, to avoid leaking secrets).

## Purpose

This folder is a persistent context pack for future LLM/agent runs:

- fast orientation
- full file-level summaries
- logic/utilities index
- feature-to-source map
- refactor and dedupe targets

## Documents

- `docs/codebase-context/ROOT_AND_CONFIG_FILES.md`  
  Root-level docs/config/tooling files.
- `docs/codebase-context/SRC_APP_AND_COMPONENTS_FILES.md`  
  Route files and all React component files.
- `docs/codebase-context/SRC_LOGIC_HOOKS_TYPES_FILES.md`  
  Hooks, contexts, CMS client, i18n logic, utilities, shared types.
- `docs/codebase-context/CMS_AND_ASSETS_FILES.md`  
  Sanity Studio config/schema/import pipeline and static assets/data files.
- `docs/codebase-context/LOGIC_UTILITIES_INDEX.md`  
  Central map for where business logic and reusable utilities live.
- `docs/codebase-context/FEATURE_SOURCE_MAP.md`  
  Feature ownership map: where each user-facing behavior is implemented.
- `docs/codebase-context/REFACTORING_OPPORTUNITIES.md`  
  Concrete dedupe and code-sharing opportunities for iterative agent work.

## Quick Navigation

- Menu data fetch/normalize: `src/lib/cms/client.ts`
- Language persistence/localization: `src/lib/i18n/lang.ts`, `src/lib/i18n/language-context.tsx`
- Runtime auto-translation cache: `src/lib/i18n/auto-translate.ts`
- Menu category navigation state/scroll targeting: `src/lib/menu-navigation-context.tsx`
- Shared menu sorting helper: `src/lib/menu/order.ts`
- Shared header offset + anchor id helpers: `src/lib/menu/navigation.ts`
- Route-level menu rendering: `src/components/MenuClient.tsx`
- Header and category tabs UI: `src/components/SiteHeader.tsx`

## Suggested Agent Workflow

1. Start with `FEATURE_SOURCE_MAP.md` to pick the feature slice.
2. Jump to `LOGIC_UTILITIES_INDEX.md` to identify shared logic modules.
3. Use the relevant file summary doc for exact implementation details.
4. Before refactors, check `REFACTORING_OPPORTUNITIES.md` for known duplicates and safe order.
