# Logic And Utilities Index

This is the primary map for where business logic lives and where to refactor shared logic.

## Core Logic Modules

## `src/lib/menu/order.ts`

Category: shared utility  
Owns:
- order comparator (`sortByOrderAsc`) used across modules
Used by:
- `src/lib/cms/client.ts`
- `src/components/MenuClient.tsx`
- `src/components/PriceBlock.tsx`

## `src/lib/menu/navigation.ts`

Category: shared utility  
Owns:
- category anchor id generator
- visible header offset resolver
Used by:
- `src/components/MenuClient.tsx`
- `src/lib/menu-navigation-context.tsx`

## `src/lib/cms/client.ts`

Category: data access + normalization  
Owns:
- env validation for Sanity fetch
- GROQ query definition
- filtering/sorting normalization
- conversion from generated Sanity type to app type
Used by:
- `src/app/menu/page.tsx`
- `src/app/drinks/page.tsx`

## `src/lib/i18n/lang.ts`

Category: localization utility  
Owns:
- language persistence key
- storage get/set
- localized field resolution with Italian fallback
Used by:
- `src/lib/i18n/language-context.tsx`
- `src/components/MenuClient.tsx` (via `getLocalized`)
- type dependencies in `PriceBlock`, `ItemCard`, etc.

## `src/lib/i18n/language-context.tsx`

Category: global state context  
Owns:
- active language state
- storage synchronization listener
Used by:
- `src/app/layout.tsx` (provider)
- `src/components/LanguageToggle.tsx`
- `src/components/MenuClient.tsx`

## `src/lib/i18n/auto-translate.ts`

Category: asynchronous fallback utility  
Owns:
- runtime + localStorage cache for IT->EN fallback
- deduplication of concurrent translation requests
- translation API call wrapper
Used by:
- `src/components/MenuClient.tsx`

## `src/lib/menu-navigation-context.tsx`

Category: global navigation state + DOM interaction  
Owns:
- category tabs model state
- active/pending category states
- smooth scroll targeting by anchor
- category ordering by rendered DOM positions
Used by:
- `src/app/layout.tsx` (provider)
- `src/components/SiteHeader.tsx`
- `src/components/MenuClient.tsx`

## `src/use-scroll-offset.ts`

Category: reusable behavior hook  
Owns:
- motion-based delta scroll offset model
- clamped/sensitivity-adjusted scroll signal
Used by:
- `src/components/SiteHeader.tsx`
- `src/scroll-direction-header.tsx`

## `src/use-element-height.ts`

Category: reusable behavior hook  
Owns:
- element height tracking with `ResizeObserver`
Used by:
- `src/components/SiteHeader.tsx`
- `src/scroll-direction-header.tsx`

## `src/components/PriceBlock.tsx`

Category: domain formatting utility component  
Owns:
- EUR price formatting
- variant ordering for display
- main price resolution policy
Used by:
- `src/components/ItemCard.tsx`

## `src/lib/utils.ts`

Category: shared utility  
Owns:
- class name merge helper (`cn`)
Used by:
- most component primitives and visual components

## Feature Logic Entry Points

- menu route orchestration: `src/components/MenuClient.tsx`
- category scroll sync algorithm: `src/components/MenuClient.tsx`
- category click scroll action: `src/lib/menu-navigation-context.tsx`
- fixed/reveal header motion composition: `src/components/SiteHeader.tsx`
- source of truth app contracts: `src/types/menu.ts`

## Deduplication Status

Completed:
- shared `sortByOrderAsc` extracted and adopted
- shared `getVisibleHeaderOffset` extracted and adopted
- shared category anchor ID helper extracted and adopted

## Legacy nav structures

Current duplication risk:
- route links in `SiteHeader.tsx` hardcoded
- separate legacy nav config in `src/lib/nav-data.tsx`
Refactor option:
- keep only active nav model or clearly separate legacy namespace to avoid confusion

## Utilities To Reuse First In New Work

- reuse `fetchMenu` for all menu data reads
- reuse `getLocalized` and language context for any user-visible text
- reuse `MenuNavigationContext` for category/tab state
- reuse `PriceBlock` for all menu pricing displays
- reuse `cn` in all new styled components
