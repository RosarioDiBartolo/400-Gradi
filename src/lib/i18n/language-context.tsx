"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getStoredLang, setStoredLang, type Lang } from "@/lib/i18n/lang";

type LanguageContextValue = {
  lang: Lang;
  setLanguage: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("it");

  useEffect(() => {
    setLang(getStoredLang());

    const syncFromStorage = () => {
      setLang(getStoredLang());
    };

    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const setLanguage = useCallback((nextLang: Lang) => {
    setStoredLang(nextLang);
    setLang(nextLang);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLanguage,
    }),
    [lang, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider.");
  }

  return context;
}
