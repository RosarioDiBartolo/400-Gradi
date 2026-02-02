import type { i18nString, i18nText } from "@/types/menu";

export type Lang = "it" | "en";

const STORAGE_KEY = "menu.lang";
export const LANG_EVENT = "menu:lang-change";

export const getStoredLang = (): Lang => {
  if (typeof window === "undefined") return "it";
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "en" ? "en" : "it";
};

export const setStoredLang = (lang: Lang) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new Event(LANG_EVENT));
};

export const getLocalized = (
  field: i18nString | i18nText | undefined | null,
  lang: Lang
): string => {
  if (!field) return "";
  return field[lang] ?? field.it ?? "";
};
