"use client";

import { useEffect, useState } from "react";
import { LANG_EVENT, getStoredLang, setStoredLang, type Lang } from "@/lib/i18n/lang";

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

  const toggle = () => {
    const next = lang === "it" ? "en" : "it";
    setStoredLang(next);
    setLang(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wide"
      aria-label="Toggle language"
    >
      {labels[lang]}
    </button>
  );
}
