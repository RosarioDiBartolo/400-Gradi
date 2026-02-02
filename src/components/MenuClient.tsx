"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "@/types/menu";
import {
  LANG_EVENT,
  getStoredLang,
  type Lang,
} from "@/lib/i18n/lang";
import CategorySection from "./CategorySection";

const ui = {
  it: {
    foodTitle: "Menu",
    drinkTitle: "Bevande",
    empty: "Nessuna voce disponibile al momento.",
  },
  en: {
    foodTitle: "Menu",
    drinkTitle: "Drinks",
    empty: "No items available right now.",
  },
};

const sortByOrder = <T extends { order: number }>(a: T, b: T) =>
  (a.order ?? 0) - (b.order ?? 0);

type MenuClientProps = {
  initialData: Category[];
  kind: "food" | "drink";
};

export default function MenuClient({ initialData, kind }: MenuClientProps) {
  const [lang, setLang] = useState<Lang>("it");

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

  const title = kind === "food" ? ui[lang].foodTitle : ui[lang].drinkTitle;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">{ui[lang].empty}</p>
      ) : (
        <div className="space-y-8">
          {data.map((category) => (
            <CategorySection key={category._id} category={category} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
