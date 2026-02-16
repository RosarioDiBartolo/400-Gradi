"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Category } from "@/types/menu";
import {
  LANG_EVENT,
  getLocalized,
  getStoredLang,
  type LocalizeFn,
  type LocalizedField,
  type Lang,
} from "@/lib/i18n/lang";
import {
  getCachedAutoTranslation,
  normalizeAutoTranslationKey,
  translateItalianToEnglish,
} from "@/lib/i18n/auto-translate";
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

const sortByOrder = <T extends { order: number }>(a: T, b: T) =>
  (a.order ?? 0) - (b.order ?? 0);

const toAnchorId = (rawId: string) =>
  `category-${rawId.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const smoothScrollTo = (targetY: number, duration = 650) => {
  if (typeof window === "undefined") return;

  const startY = window.scrollY;
  const distance = targetY - startY;
  const start = performance.now();

  const step = (timestamp: number) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
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
  const [lang, setLang] = useState<Lang>("it");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [autoTranslations, setAutoTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const update = () => setLang(getStoredLang());
    update();
    window.addEventListener(LANG_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LANG_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const data = useMemo(
    () =>
      initialData
        .slice()
        .sort(sortByOrder)
        .map((category) => ({
          ...category,
          items: (category.items ?? []).slice().sort(sortByOrder),
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
        anchorId: toAnchorId(category._id),
        label: localize(category.title, lang),
      })),
    [data, lang, localize]
  );

  const handleCategorySelect = useCallback((anchorId: string) => {
    if (typeof window === "undefined") return;

    const target = document.getElementById(anchorId);
    if (!target) return;

    const topOffset = 136;
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - topOffset;

    setActiveCategory(anchorId);
    smoothScrollTo(Math.max(0, targetY));
  }, []);

  useEffect(() => {
    if (sections.length === 0) {
      setActiveCategory(null);
      return;
    }

    if (!activeCategory || !sections.some((section) => section.anchorId === activeCategory)) {
      setActiveCategory(sections[0].anchorId);
    }
  }, [sections, activeCategory]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          )[0];

        if (visible?.target?.id) {
          setActiveCategory(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.anchorId);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

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
          <section className="sticky top-0 z-30 -mx-6 border-y border-border/70 bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              {ui[lang].browseCategories}
            </p>
            <nav className="mt-3 overflow-x-auto">
              <ul className="flex min-w-max items-center py-4">
                {sections.map((section) => (
                  <li key={section._id}>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(section.anchorId)}
                      className={cn(
                        "border-b px-4 border-transparent pb-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground",
                        activeCategory === section.anchorId && "border-gold text-foreground"
                      )}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

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
        </div>
      )}
    </div>
  );
}
