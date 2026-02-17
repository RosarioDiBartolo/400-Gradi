"use client";

import { useMotionValueEvent, useTransform } from "motion/react";
import { ScrollRevealHeaderShell } from "./scroll-reveal-header-shell";
import { useElementHeight } from "./use-element-height";
import { useScrollOffset } from "./use-scroll-offset";
import { useState } from "react";

export function ScrollDirectionHeader() {
  const scrollOffset = useScrollOffset(0, 30, 0.25);
  const { ref: hiddenRef, height: hiddenHeight } =
    useElementHeight<HTMLDivElement>();

  // Translate from 0 to -hiddenHeight
  const y = useTransform(
    scrollOffset,
    [0, 30],
    [0, -hiddenHeight]
  );

  const [offset, setOffset] = useState(0);

  useMotionValueEvent(scrollOffset, "change", (latest) => {
    setOffset(latest);
  });

  return (
    <ScrollRevealHeaderShell
      y={y}
      className="bg-amber-500 fixed top-0 left-0 right-0 h-fit w-full"
      hiddenRef={hiddenRef}
      hidden={<>Not always visible content</>}
      always={
        <div className="bg-amber-600">
          Always visible content - offset: {offset}
        </div>
      }
    />
  );
}
