"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import type { Category } from "@/types/menu";
import {
  getLocalized,
  type LocalizeFn,
  type LocalizedField,
} from "@/lib/i18n/lang";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  getCachedAutoTranslation,
  normalizeAutoTranslationKey,
  translateItalianToEnglish,
} from "@/lib/i18n/auto-translate";
import {
  createCategoryAnchorId,
  getVisibleHeaderOffset,
} from "@/lib/menu/navigation";
import { sortByOrderAsc } from "@/lib/menu/order";
import { useMenuNavigation } from "@/lib/menu-navigation-context";
import { cn } from "@/lib/utils";
import CategorySection from "./CategorySection";

const ui = {
  it: {
    foodKicker: "Pizzeria contemporanea siciliana",
    foodTitle: "400 Gradi.",
    foodSubtitle: "L'Alta Cucina sulla Pizza.",
    foodDescription:
      "Tecnica contemporanea e ingredienti locali selezionati per una degustazione nel cuore di Catania.",
    drinkKicker: "Cocktail bar artigianale",
    drinkTitle: "Mixology & Spirits",
    drinkDescription: "Signature cocktail tecnici e infusioni botaniche locali.",
    browseCategories: "Sfoglia categorie",
    empty: "Nessuna voce disponibile al momento.",
  },
  en: {
    foodKicker: "Contemporary sicilian pizzeria",
    foodTitle: "400 Gradi.",
    foodSubtitle: "High Cuisine on Pizza.",
    foodDescription:
      "Contemporary technique and local ingredients curated for a tasting journey in Catania.",
    drinkKicker: "Craft cocktail bar",
    drinkTitle: "Mixology & Spirits",
    drinkDescription: "Curated technical cocktails and local botanical infusions.",
    browseCategories: "Browse categories",
    empty: "No items available right now.",
  },
};

type MenuClientProps = {
  initialData: Category[];
  kind: "food" | "drink";
};

const getMissingItalianText = (field: LocalizedField): string | null => {
  if (!field) return null;
  const it = typeof field.it === "string" ? field.it.trim() : "";
  const en = typeof field.en === "string" ? field.en.trim() : "";

  if (!it) return null;
  if (en) return null;
  return it;
};

export default function MenuClient({ initialData, kind }: MenuClientProps) {
  const { lang } = useLanguage();
  const {
    setMenuNavigation,
    clearMenuNavigation,
    setActiveCategory,
    activeCategory,
  } = useMenuNavigation();
  const { scrollY } = useScroll();
  const [autoTranslations, setAutoTranslations] = useState<Record<string, string>>({});

  const data = useMemo(
    () =>
      initialData
        .slice()
        .sort(sortByOrderAsc)
        .map((category) => ({
          ...category,
          items: (category.items ?? []).slice().sort(sortByOrderAsc),
        })),
    [initialData]
  );

  useEffect(() => {
    if (lang !== "en") return;

    const missingItalianStrings = new Set<string>();

    data.forEach((category) => {
      const categoryTitle = getMissingItalianText(category.title);
      if (categoryTitle) missingItalianStrings.add(categoryTitle);

      category.items.forEach((item) => {
        const itemName = getMissingItalianText(item.name);
        if (itemName) missingItalianStrings.add(itemName);

        const itemDescription = getMissingItalianText(item.description);
        if (itemDescription) missingItalianStrings.add(itemDescription);

        (item.variants ?? []).forEach((variant) => {
          const variantLabel = getMissingItalianText(variant.label);
          if (variantLabel) missingItalianStrings.add(variantLabel);
        });
      });
    });

    const pending = [...missingItalianStrings]
      .map((text) => normalizeAutoTranslationKey(text))
      .filter((text) => text.length > 0)
      .filter((text) => !(text in autoTranslations));

    if (pending.length === 0) return;

    let cancelled = false;

    const load = async () => {
      const collected: Record<string, string> = {};

      for (const text of pending) {
        const cached = getCachedAutoTranslation(text);
        if (cached) {
          collected[text] = cached;
          continue;
        }

        const translated = await translateItalianToEnglish(text);
        collected[text] = translated;
      }

      if (!cancelled) {
        setAutoTranslations((prev) => ({ ...prev, ...collected }));
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [autoTranslations, data, lang]);

  const localize = useCallback<LocalizeFn>(
    (field, targetLang) => {
      const text = getLocalized(field, targetLang);
      if (targetLang !== "en") return text;
      if (!field) return text;

      const hasEnglish =
        typeof field.en === "string" && field.en.trim().length > 0;
      if (hasEnglish) return text;

      const italian = typeof field.it === "string" ? field.it.trim() : "";
      if (!italian) return text;

      const key = normalizeAutoTranslationKey(italian);
      return autoTranslations[key] ?? getCachedAutoTranslation(key) ?? italian;
    },
    [autoTranslations]
  );

  const sections = useMemo(
    () =>
      data.map((category) => ({
        ...category,
        anchorId: createCategoryAnchorId(category._id),
        label: localize(category.title, lang),
      })),
    [data, lang, localize]
  );

  useEffect(() => {
    setMenuNavigation({
      categories: sections.map((section) => ({
        id: section._id,
        anchorId: section.anchorId,
        label: section.label,
      })),
      browseLabel: ui[lang].browseCategories,
    });
  }, [sections, lang, setMenuNavigation]);

  useEffect(() => () => clearMenuNavigation(), [clearMenuNavigation]);

  const sectionAnchorIds = useMemo(
    () => sections.map((section) => section.anchorId),
    [sections]
  );

  const activeCategoryRef = useRef<string | null>(activeCategory);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  const syncActiveCategoryFromViewport = useCallback(() => {
    if (typeof window === "undefined") return;

    if (sectionAnchorIds.length === 0) {
      if (activeCategoryRef.current !== null) {
        activeCategoryRef.current = null;
        setActiveCategory(null);
      }
      return;
    }

    const headerOffset = getVisibleHeaderOffset();
    const thresholdY = headerOffset + 12;

    let bestPast: { id: string; distance: number } | null = null;
    let bestFuture: { id: string; distance: number } | null = null;

    for (const anchorId of sectionAnchorIds) {
      const element = document.getElementById(anchorId);
      if (!element) continue;

      const delta = element.getBoundingClientRect().top - thresholdY;
      if (delta <= 0) {
        const distance = Math.abs(delta);
        if (!bestPast || distance < bestPast.distance) {
          bestPast = { id: anchorId, distance };
        }
        continue;
      }

      if (!bestFuture || delta < bestFuture.distance) {
        bestFuture = { id: anchorId, distance: delta };
      }
    }

    let nextActive: string | null = sectionAnchorIds[0] ?? null;
    if (bestFuture) {
      nextActive = bestFuture.id;
    }
    if (bestPast) {
      nextActive = bestPast.id;
    }
    if (nextActive !== activeCategoryRef.current) {
      activeCategoryRef.current = nextActive;
      setActiveCategory(nextActive);
    }
  }, [sectionAnchorIds, setActiveCategory]);

  useMotionValueEvent(scrollY, "change", () => {
    syncActiveCategoryFromViewport();
  });

  useEffect(() => {
    syncActiveCategoryFromViewport();
    window.addEventListener("resize", syncActiveCategoryFromViewport);
    return () => {
      window.removeEventListener("resize", syncActiveCategoryFromViewport);
    };
  }, [syncActiveCategoryFromViewport]);

  const isFood = kind === "food";
  const kicker = isFood ? ui[lang].foodKicker : ui[lang].drinkKicker;
  const title = isFood ? ui[lang].foodTitle : ui[lang].drinkTitle;
  const subtitle = isFood ? ui[lang].foodSubtitle : null;
  const description = isFood
    ? ui[lang].foodDescription
    : ui[lang].drinkDescription;

  return (
    <div className="space-y-[120px]">
      <section className="space-y-8">
        <div className="max-w-[620px] space-y-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            {kicker}
          </p>
          <h1 className="text-[clamp(2.25rem,8vw,4.5rem)] leading-[0.95]">
            <span className="block">{title}</span>
            {subtitle ? <span className="block italic">{subtitle}</span> : null}
          </h1>
          <p
            className={cn(
              "max-w-[560px] text-[15px] leading-7 text-muted-foreground",
              !isFood && "text-[clamp(1rem,3vw,1.8rem)] uppercase tracking-[0.08em]"
            )}
          >
            {description}
          </p>
        </div>
        <div className="h-px w-full bg-gold/70" />
      </section>

      {sections.length === 0 ? (
        <p className="text-sm text-muted-foreground">{ui[lang].empty}</p>
      ) : (
        <div className="space-y-[80px]">
          {sections.map((category, index) => (
            <CategorySection
              key={category._id}
              category={category}
              lang={lang}
              localize={localize}
              anchorId={category.anchorId}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
