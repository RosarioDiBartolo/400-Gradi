# Refactoring Opportunities

This document is focused on logic sharing and duplicate reduction for agent-led iteration.

## High-Value Dedupe Targets

## 1. Shared `order` Sorting Helper

Status: completed (first pass).

Implemented:
- `src/lib/menu/order.ts` -> `sortByOrderAsc`
- callsites updated in CMS/client/UI modules

## 2. Header Offset Computation

Status: completed (first pass).

Implemented:
- `src/lib/menu/navigation.ts` -> `getVisibleHeaderOffset`
- shared use in both viewport sync and click-scroll flows

## 3. Anchor ID Generation Contract

Status: completed (first pass).

Implemented:
- `src/lib/menu/navigation.ts` -> `createCategoryAnchorId`
- adopted in `src/components/MenuClient.tsx`

## 4. Price Formatting Rules

Current implementation:
- localized EUR formatting in `src/components/PriceBlock.tsx`
Opportunity:
- expose formatting helper if pricing appears in additional components/routes

## 5. Legacy vs Active Navigation Separation

Current overlap:
- active route header logic in `src/components/SiteHeader.tsx`
- legacy nav config/components in `src/lib/nav-data.tsx`, `src/components/header.tsx`, `src/components/footer.tsx`
Recommendation:
- either remove unused legacy nav files or move them under `src/legacy/` to reduce future confusion

## 6. Encoding Cleanup (Mojibake)

Observed files:
- `src/components/hero.tsx`
- `src/lib/nav-data.tsx`
- `cms/import/menu.seed.json` (seed content)
Recommendation:
- normalize UTF-8 text in source-of-truth data and legacy strings before additional localization work

## Proposed Next Refactor Order (Low Risk -> Higher Risk)

1. Add minimal tests for `sortByOrderAsc`, `createCategoryAnchorId`, and header offset behavior.
2. Separate or delete legacy nav/UI files if confirmed unused.
3. Consolidate menu navigation math (threshold tuning, active section selection) into focused pure helpers.
4. Tackle larger domain reorganizations (menu logic module boundaries).

## Candidate Next Shared Modules (Optional)

- `src/lib/menu/pricing.ts` (if price policies expand)
- `src/lib/menu/section-activation.ts` (if active-section algorithm evolves)

## Regression-Sensitive Areas During Refactors

- `src/lib/cms/client.ts` normalization contract
- `src/components/MenuClient.tsx` active-category sync
- `src/lib/menu-navigation-context.tsx` scroll-to-category behavior
- `src/components/PriceBlock.tsx` variant/default price resolution
