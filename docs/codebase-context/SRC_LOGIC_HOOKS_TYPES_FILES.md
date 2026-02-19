# Src Logic Hooks Types Files

This document covers non-visual logic modules, hooks, contexts, and shared types.

## `src/lib/cms/client.ts`

Purpose: server-side Sanity query execution + normalization into app contracts.  
Core responsibilities:
- validates required env vars
- defines GROQ query (`menuByKindQuery`)
- calls Sanity HTTP query endpoint with optional bearer token
- normalizes raw query result to `Category[]`
- filters unavailable items/inactive categories and sorts by `order`
Why important:
- this is the main backend boundary in the app
- shape changes here cascade to all menu rendering components

## `src/lib/i18n/lang.ts`

Purpose: language primitives and localization fallback.  
Core responsibilities:
- `Lang` type (`it` | `en`)
- localStorage persistence helpers (`getStoredLang`, `setStoredLang`)
- `getLocalized` fallback strategy: target lang -> Italian -> empty string

## `src/lib/i18n/language-context.tsx`

Purpose: global language context provider for client components.  
Core responsibilities:
- initializes language from localStorage
- syncs language state on browser `storage` event
- exposes `lang` and `setLanguage`
Notes:
- server default remains Italian (`it`)

## `src/lib/i18n/auto-translate.ts`

Purpose: runtime fallback translation pipeline for missing English content.  
Core responsibilities:
- normalizes Italian source strings to stable cache keys
- reads/writes localStorage cache (`menu.auto_translate.it_en.v1`)
- keeps in-memory cache + in-flight promise map to prevent duplicate requests
- fetches translation from MyMemory API (`it|en`)
- decodes HTML entities in translated output
Risks/constraints:
- depends on third-party free translation API availability
- browser-only persistence

## `src/lib/menu-navigation-context.tsx`

Purpose: shared state and actions for category tabs and scroll-to-section behavior.  
Core responsibilities:
- stores category nav model (`id`, `anchorId`, `label`)
- tracks `activeCategory` and `pendingCategory`
- sorts categories by rendered DOM position (not just input order)
- computes visible header offset for accurate scroll targeting
- implements smooth scroll category selection
Why important:
- central coordination point between `MenuClient` and `SiteHeader`

## `src/lib/menu/order.ts`

Purpose: shared ordering comparator utility.  
Core responsibilities:
- exposes `sortByOrderAsc` for entities with optional nullable `order`
- removes duplicate inline order sort logic across CMS/client/UI layers

## `src/lib/menu/navigation.ts`

Purpose: shared menu navigation helpers.  
Core responsibilities:
- exposes `createCategoryAnchorId` for stable category section IDs
- exposes `getVisibleHeaderOffset` used by both scroll-sync and click-scroll paths
- centralizes fallback offset (`136`) and fixed-header visibility calculation

## `src/lib/nav-data.tsx`

Purpose: static nav config for legacy header/footer flows.  
Notes:
- used by legacy components (`header.tsx`, `footer.tsx`)
- not primary for current active menu shell
- includes mojibake in some Italian strings

## `src/lib/utils.ts`

Purpose: utility class name merger.  
Exports:
- `cn(...inputs) = twMerge(clsx(inputs))`

## `src/types/menu.ts`

Purpose: app-level normalized menu contract types.  
Defines:
- `i18nString`, `i18nText`, `MenuImage`, `Variant`, `Item`, `Category`
Notes:
- this is the contract expected by UI components after normalization

## `src/types/sanity.types.d.ts`

Purpose: generated Sanity schema and GROQ query typings.  
Details:
- includes schema document types + `MenuByKindQueryResult`
- generated from `cms/sanity-typegen.json`
- should not be manually edited

## Hook And Utility Explanations

## `src/use-scroll-offset.ts`

Type: custom hook returning `MotionValue<number>`.  
Behavior details:
- tracks scroll delta (`currentY - lastY`)
- updates a clamped numeric offset (`min..max`) with sensitivity scaling
- uses `requestAnimationFrame` batching to avoid frequent synchronous updates
- avoids React re-renders by using motion value directly
Used by:
- `src/components/SiteHeader.tsx`
- `src/scroll-direction-header.tsx`

## `src/use-element-height.ts`

Type: custom hook returning `{ ref, height }`.  
Behavior details:
- uses `ResizeObserver` to keep height state synced to a DOM element
- computes initial `offsetHeight` on mount
- useful for dynamic sticky/reveal layout calculations
Used by:
- `src/components/SiteHeader.tsx`
- `src/scroll-direction-header.tsx`

## `src/scroll-reveal-header-shell.tsx`

Type: reusable component utility for two-layer reveal headers.  
Behavior details:
- receives motion `y` transform
- renders `hidden` layer and `always` layer (always layer absolutely positioned below hidden layer)
- accepts refs for external height measurement

## `src/scroll-direction-header.tsx`

Purpose: sandbox/demo component for testing reveal logic.  
Behavior details:
- uses `useScrollOffset` + `useElementHeight` + `useTransform`
- displays live offset in always-visible row
- tied to `/tests/scroll` route

## Logic Ownership Summary

- Data fetch/normalization: `src/lib/cms/client.ts`
- i18n storage/fallback/context: `src/lib/i18n/*`
- category nav state and scrolling actions: `src/lib/menu-navigation-context.tsx`
- shared menu helpers: `src/lib/menu/order.ts`, `src/lib/menu/navigation.ts`
- scroll/reveal infra hooks: `src/use-scroll-offset.ts`, `src/use-element-height.ts`
- cross-component type contracts: `src/types/menu.ts`
