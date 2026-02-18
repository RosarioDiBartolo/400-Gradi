"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getVisibleHeaderOffset } from "@/lib/menu/navigation";

type MenuCategoryLink = {
  id: string;
  anchorId: string;
  label: string;
};

type SetMenuNavigationInput = {
  categories: MenuCategoryLink[];
  browseLabel: string;
};

type MenuNavigationContextValue = {
  categories: MenuCategoryLink[];
  browseLabel: string;
  activeCategory: string | null;
  pendingCategory: string | null;
  setMenuNavigation: (input: SetMenuNavigationInput) => void;
  clearMenuNavigation: () => void;
  setActiveCategory: (anchorId: string | null) => void;
  selectCategory: (anchorId: string) => void;
};

const MenuNavigationContext = createContext<MenuNavigationContextValue | undefined>(
  undefined
);

const sortCategoriesByRenderedOrder = (input: MenuCategoryLink[]): MenuCategoryLink[] => {
  if (typeof window === "undefined") return input;

  const withPosition = input.map((category, index) => {
    const element = document.getElementById(category.anchorId);
    const absoluteTop = element
      ? element.getBoundingClientRect().top + window.scrollY
      : Number.NaN;

    return { category, index, absoluteTop };
  });

  withPosition.sort((a, b) => {
    const aHasPosition = Number.isFinite(a.absoluteTop);
    const bHasPosition = Number.isFinite(b.absoluteTop);

    if (aHasPosition && bHasPosition && a.absoluteTop !== b.absoluteTop) {
      return a.absoluteTop - b.absoluteTop;
    }

    if (aHasPosition !== bHasPosition) {
      return aHasPosition ? -1 : 1;
    }

    return a.index - b.index;
  });

  return withPosition.map((entry) => entry.category);
};

export function MenuNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<MenuCategoryLink[]>([]);
  const [browseLabel, setBrowseLabel] = useState("");
  const [activeCategory, setActiveCategoryState] = useState<string | null>(null);
  const [pendingCategory, setPendingCategoryState] = useState<string | null>(null);

  const setMenuNavigation = useCallback(
    ({ categories: nextCategories, browseLabel: nextBrowseLabel }: SetMenuNavigationInput) => {
      const orderedCategories = sortCategoriesByRenderedOrder(nextCategories);
      setCategories(orderedCategories);
      setBrowseLabel(nextBrowseLabel);

      if (orderedCategories.length === 0) {
        setActiveCategoryState(null);
        setPendingCategoryState(null);
        return;
      }

      setActiveCategoryState((prev) => {
        if (prev && orderedCategories.some((category) => category.anchorId === prev)) {
          return prev;
        }
        return null;
      });

      setPendingCategoryState((prev) => {
        if (prev && orderedCategories.some((category) => category.anchorId === prev)) {
          return prev;
        }
        return null;
      });
    },
    []
  );

  const clearMenuNavigation = useCallback(() => {
    setCategories([]);
    setBrowseLabel("");
    setActiveCategoryState(null);
    setPendingCategoryState(null);
  }, []);

  const setActiveCategory = useCallback((anchorId: string | null) => {
    setActiveCategoryState((prev) => (prev === anchorId ? prev : anchorId));
    if (anchorId !== null) {
      setPendingCategoryState(null);
    }
  }, []);

  const selectCategory = useCallback((anchorId: string) => {
    if (typeof window === "undefined") return;

    const target = document.getElementById(anchorId);
    if (!target) return;

    const headerOffset = getVisibleHeaderOffset();
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset - 8;

    setPendingCategoryState(anchorId);
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
  }, []);

  const value = useMemo(
    () => ({
      categories,
      browseLabel,
      activeCategory,
      pendingCategory,
      setMenuNavigation,
      clearMenuNavigation,
      setActiveCategory,
      selectCategory,
    }),
    [
      categories,
      browseLabel,
      activeCategory,
      pendingCategory,
      setMenuNavigation,
      clearMenuNavigation,
      setActiveCategory,
      selectCategory,
    ]
  );

  return (
    <MenuNavigationContext.Provider value={value}>
      {children}
    </MenuNavigationContext.Provider>
  );
}

export function useMenuNavigation() {
  const context = useContext(MenuNavigationContext);

  if (!context) {
    throw new Error("useMenuNavigation must be used within a MenuNavigationProvider.");
  }

  return context;
}
