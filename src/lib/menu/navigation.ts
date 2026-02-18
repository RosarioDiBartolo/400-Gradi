const DEFAULT_HEADER_OFFSET = 136;

export const createCategoryAnchorId = (rawId: string) =>
  `category-${rawId.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`;

export const getVisibleHeaderOffset = (): number => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return DEFAULT_HEADER_OFFSET;
  }

  const fixedHeader = document.getElementById("site-fixed-header");
  if (fixedHeader) {
    const rect = fixedHeader.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight));
    if (visibleHeight > 0) return visibleHeight;
  }

  const spacer = document.getElementById("site-header-spacer");
  return spacer?.getBoundingClientRect().height ?? DEFAULT_HEADER_OFFSET;
};
