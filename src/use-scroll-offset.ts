"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, MotionValue } from "motion/react";

function clampInt(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

/**
 * Delta-based scroll offset using MotionValue
 * - increases when scrolling down
 * - decreases when scrolling up
 * - clamped between min/max
 * - no React re-renders (pure motion value)
 */
export function useScrollOffset(
  min = 0,
  max = 30,
  sensitivity = 0.25
): MotionValue<number> {
  const offset = useMotionValue(0);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY.current;

        const next = clampInt(
          offset.get() + delta * sensitivity,
          min,
          max
        );

        offset.set(next);

        lastY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [min, max, sensitivity, offset]);

  return offset;
}