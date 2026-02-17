import type { i18nString, i18nText } from "@/types/menu";

export type Lang = "it" | "en";
export type LocalizedField = i18nString | i18nText | undefined | null;
export type LocalizeFn = (field: LocalizedField, lang: Lang) => string;

const STORAGE_KEY = "menu.lang";

export const getStoredLang = (): Lang => {
  if (typeof window === "undefined") return "it";
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "en" ? "en" : "it";
};

export const setStoredLang = (lang: Lang) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, lang);
};

export const getLocalized = (
  field: LocalizedField,
  lang: Lang
): string => {
  if (!field) return "";

  const preferred = field[lang];
  if (typeof preferred === "string" && preferred.trim().length > 0) {
    return preferred;
  }

  const fallback = field.it;
  if (typeof fallback === "string" && fallback.trim().length > 0) {
    return fallback;
  }

  return "";
};
