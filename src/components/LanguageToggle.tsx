"use client";

import { useEffect, useState } from "react";
import { LANG_EVENT, getStoredLang, setStoredLang, type Lang } from "@/lib/i18n/lang";
import { cn } from "@/lib/utils";

const labels = {
  it: "IT",
  en: "EN",
};

export default function LanguageToggle() {
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

  const setLanguage = (next: Lang) => {
    setStoredLang(next);
    setLang(next);
  };

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center rounded-full border border-border/80 bg-surface p-1"
    >
      {(Object.keys(labels) as Lang[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors",
            lang === option
              ? "bg-gold text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={lang === option}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  );
}
