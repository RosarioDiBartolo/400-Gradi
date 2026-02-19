# Src App And Components Files

This document covers route files and UI component files.

## Simple React Component Inventory (quick list)

Simple/presentational components worth remembering:

- `src/components/LanguageToggle.tsx`: two-button language switch (`it`/`en`) wired to `useLanguage`.
- `src/components/CategorySection.tsx`: renders one menu category section with optional featured first item.
- `src/components/PriceBlock.tsx`: price formatter/renderer for base price vs variants.
- `src/components/dynamic-border.tsx`: motion-based `<hr>` opacity on scroll.
- `src/components/hero.tsx`: legacy hero block (not part of active menu routes).
- `src/components/header.tsx`: legacy header using generic `Navbar`.
- `src/components/footer.tsx`: legacy sticky footer nav with motion.
- `src/components/parallax-bg.tsx`: legacy decorative parallax image layer.
- `src/components/animated-glowing-search-bar.tsx`: standalone visual demo search input.

## App Router Files

## `src/app/layout.tsx`

Purpose: global app shell for all routes.  
Behavior:
- sets page metadata/title/icons
- wraps app with `LanguageProvider` and `MenuNavigationProvider`
- renders `SiteHeader`, route content, and a small static footer disclaimer

## `src/app/globals.css`

Purpose: global Tailwind/theme styles and tokens.  
Behavior:
- defines theme variables and dark palette
- maps variables to Tailwind theme tokens
- sets base typography families and global styles

## `src/app/page.tsx`

Purpose: root redirect route.  
Behavior:
- redirects `/` to `/menu`

## `src/app/menu/page.tsx`

Purpose: food menu route (server component).  
Behavior:
- calls `fetchMenu("food")`
- renders `MenuClient` with normalized data
- catches errors and returns minimal error UI

## `src/app/menu/loading.tsx`

Purpose: loading fallback UI for `/menu`.  
Behavior:
- simple localized text placeholder `"Caricamento..."`

## `src/app/drinks/page.tsx`

Purpose: drinks menu route (server component).  
Behavior:
- calls `fetchMenu("drink")`
- renders `MenuClient`
- catches errors and returns minimal error UI

## `src/app/drinks/loading.tsx`

Purpose: loading fallback UI for `/drinks`.  
Behavior:
- same visual structure as menu loading component

## `src/app/tests/scroll/page.tsx`

Purpose: internal test route for scroll header experiment.  
Behavior:
- mounts `ScrollDirectionHeader` in a tall container for manual testing

## Primary Menu Components

## `src/components/MenuClient.tsx`

Purpose: client-side orchestrator for menu rendering and route-level UX logic.  
Behavior:
- sorts categories and items by order
- localizes labels using language context
- auto-translates missing English fields from Italian via `auto-translate` helper
- writes category tab model into `MenuNavigationContext`
- computes/updates active category based on viewport + header offset
- renders hero copy and mapped `CategorySection` list
Key side effects:
- local state for translation cache hydration
- scroll event driven active-category updates via motion value events

## `src/components/SiteHeader.tsx`

Purpose: sticky/reveal header with route links + category tabs + language toggle.  
Behavior:
- builds two-layer reveal shell (hidden top bar + always-visible nav bar)
- links `/menu` and `/drinks`
- consumes `MenuNavigationContext` to render scroll-to-category tabs
- uses `useScrollOffset` and measured heights to compute reveal translation

## `src/components/CategorySection.tsx`

Purpose: renders one category block.  
Behavior:
- localizes category title
- picks a featured item if any item has `mainImage`
- renders featured card first, then rest in divider list

## `src/components/ItemCard.tsx`

Purpose: full item rendering for featured and non-featured layouts.  
Behavior:
- localizes name/description
- deduplicates image list (main + gallery)
- featured mode: large split layout, image gallery strip, allergens chips
- default mode: accordion row with compact preview and expandable details
- uses `PriceBlock` for price display in both modes

## `src/components/PriceBlock.tsx`

Purpose: shared menu price renderer.  
Behavior:
- resolves primary price from `basePrice` or default/first variant
- supports compact display mode
- renders sorted variant list when variants exist
- formats EUR price using `Intl.NumberFormat` based on language

## `src/components/LanguageToggle.tsx`

Purpose: language switch control.  
Behavior:
- reads/writes language from context
- button UI with `aria-pressed` state

## Legacy Or Experimental Components

## `src/components/header.tsx`

Purpose: legacy wrapper around generic `Navbar`.  
Status:
- not used by current active App Router layout

## `src/components/footer.tsx`

Purpose: animated legacy footer navigation bar.  
Status:
- not used by active layout/footer

## `src/components/hero.tsx`

Purpose: legacy homepage hero block.  
Notes:
- contains mojibake/encoding artifacts in some Italian strings
- not currently wired to active menu pages

## `src/components/parallax-bg.tsx`

Purpose: decorative parallax background from local assets.  
Status:
- not wired into current menu route flow

## `src/components/dynamic-border.tsx`

Purpose: motion prototype (`<hr>` opacity on scroll).  
Status:
- utility/demo-like component; not a core route dependency

## `src/components/animated-glowing-search-bar.tsx`

Purpose: standalone animated visual component.  
Status:
- not integrated in menu route flow

## Reusable UI Primitive Files (`src/components/ui`)

## `src/components/ui/accordion.tsx`

Purpose: Radix Accordion wrappers with project styling.  
Exports:
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

## `src/components/ui/animated-tabs.tsx`

Purpose: custom animated tabs demo component using clip-path transitions.  
Status:
- not used in active menu flow

## `src/components/ui/badge.tsx`

Purpose: badge primitive using class-variance-authority variants.

## `src/components/ui/button.tsx`

Purpose: button primitive with size/variant system.

## `src/components/ui/card.tsx`

Purpose: card primitive family (`Card`, `CardHeader`, etc.).

## `src/components/ui/input.tsx`

Purpose: styled input primitive.

## `src/components/ui/navigation-menu.tsx`

Purpose: Radix navigation menu wrappers used by legacy `Navbar`.

## `src/components/ui/navbar.tsx`

Purpose: full desktop/mobile nav component with nested menu support.  
Status:
- generic template-like component, used by legacy `src/components/header.tsx`, not current menu layout

## `src/components/ui/sheet.tsx`

Purpose: Radix dialog/sheet wrappers (mobile side panel support).

## `src/components/ui/tabs.tsx`

Purpose: Radix tabs wrappers.

## Font Loader

## `src/fonts.ts`

Purpose: side-effect font CSS imports (`@fontsource/cormorant-sc` weights).  
Usage:
- imported from `src/app/layout.tsx`
