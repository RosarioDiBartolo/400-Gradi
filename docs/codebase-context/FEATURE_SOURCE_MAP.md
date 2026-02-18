# Feature Source Map

This map answers: "Where is the code for each feature?"

## 1. App Shell And Global Layout

Primary files:
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/SiteHeader.tsx`
Supporting files:
- `src/fonts.ts`
- `src/lib/i18n/language-context.tsx`
- `src/lib/menu-navigation-context.tsx`

## 2. Root Routing

Primary files:
- `src/app/page.tsx` (redirect `/` -> `/menu`)
- `src/app/menu/page.tsx`
- `src/app/drinks/page.tsx`
- `src/app/menu/loading.tsx`
- `src/app/drinks/loading.tsx`

## 3. Menu Data Fetching From CMS

Primary files:
- `src/lib/cms/client.ts`
Supporting files:
- `src/types/menu.ts`
- `src/types/sanity.types.d.ts`
- `next.config.mjs` (remote image domain for Sanity)

## 4. Data Modeling And Normalization

Primary files:
- `src/lib/cms/client.ts`
- `src/types/menu.ts`
Behavior:
- category/item filtering by active/available flags
- sorting by `order`
- image and i18n field normalization

## 5. Language Toggle And Persistence

Primary files:
- `src/components/LanguageToggle.tsx`
- `src/lib/i18n/language-context.tsx`
- `src/lib/i18n/lang.ts`
Behavior:
- language stored in localStorage (`menu.lang`)
- default/fallback language is Italian

## 6. Runtime Auto-Translation Fallback

Primary files:
- `src/lib/i18n/auto-translate.ts`
- `src/components/MenuClient.tsx`
Behavior:
- only used when active language is English and CMS English is missing
- caches translated strings in localStorage and memory

## 7. Menu Page Rendering

Primary files:
- `src/components/MenuClient.tsx`
- `src/components/CategorySection.tsx`
- `src/components/ItemCard.tsx`
- `src/components/PriceBlock.tsx`
Behavior:
- hero copy + categories list
- featured/non-featured card variants
- variants/base price formatting

## 8. Header Navigation (Route Tabs + Category Tabs)

Primary files:
- `src/components/SiteHeader.tsx`
- `src/lib/menu-navigation-context.tsx`
- `src/components/MenuClient.tsx`
- `src/lib/menu/navigation.ts`
Behavior:
- route-level links (`/menu`, `/drinks`)
- context-driven category tab rendering
- scroll tracking and smooth scroll category selection

## 9. Scroll-Reveal Header Behavior

Primary files:
- `src/components/SiteHeader.tsx`
- `src/use-scroll-offset.ts`
- `src/use-element-height.ts`
- `src/scroll-reveal-header-shell.tsx`
Test/sandbox:
- `src/scroll-direction-header.tsx`
- `src/app/tests/scroll/page.tsx`

## 10. Legacy/Experimental UI Blocks

Files:
- `src/components/header.tsx`
- `src/components/footer.tsx`
- `src/components/hero.tsx`
- `src/components/parallax-bg.tsx`
- `src/components/dynamic-border.tsx`
- `src/components/animated-glowing-search-bar.tsx`
- `src/lib/nav-data.tsx`
- `src/components/ui/navbar.tsx`
Notes:
- mostly not wired into current menu route architecture

## 11. UI Primitive System

Files:
- `src/components/ui/accordion.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/navigation-menu.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/animated-tabs.tsx`

## 12. CMS Studio And Schema

Primary files:
- `cms/sanity.config.ts`
- `cms/sanity.cli.ts`
- `cms/schemaTypes/index.ts`
- `cms/schemaTypes/category.ts`
- `cms/schemaTypes/item.ts`
- `cms/schemaTypes/i18nString.ts`
- `cms/schemaTypes/i18nText.ts`

## 13. Seed Data And Import Pipeline

Primary files:
- `cms/import/menu.seed.json`
- `cms/import/generate-ndjson.mjs`
- `cms/import/menu.ndjson`
- `cms/import/seed.mjs`

## 14. Tooling/Build/Lint

Primary files:
- `package.json`
- `tsconfig.json`
- `eslint.config.js`
- `next.config.mjs`
- `postcss.config.mjs`
- `components.json`

## Shared Helper Layer

Primary files:
- `src/lib/menu/order.ts`
- `src/lib/menu/navigation.ts`
Behavior:
- cross-module sorting and navigation utility contracts

## 15. Project Guidance Docs

Primary files:
- `AGENTS.md`
- `README.md`
- `CODEBASE_MAP.md`
- `LLM.md`
- `Brand.md`
- `Design-Goal.md`
