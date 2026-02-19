"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { Lang } from "@/lib/i18n/lang";
import { cn } from "@/lib/utils";

const labels = {
  it: "IT",
  en: "EN",
};

export default function LanguageToggle() {
  const { lang, setLanguage } = useLanguage();

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
