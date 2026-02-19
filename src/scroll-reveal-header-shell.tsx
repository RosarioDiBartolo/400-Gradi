"use client";

import { motion, type MotionValue } from "motion/react";
import React from "react";

type ScrollRevealHeaderShellProps = {
  y: MotionValue<number>;
  id?: string;
  className?: string;
  hidden: React.ReactNode;
  always: React.ReactNode;
  hiddenRef?: React.Ref<HTMLDivElement>;
  alwaysRef?: React.Ref<HTMLDivElement>;
};

export function ScrollRevealHeaderShell({
  y,
  id,
  className,
  hidden,
  always,
  hiddenRef,
  alwaysRef,
}: ScrollRevealHeaderShellProps) {
  return (
    <motion.div
      id={id}
      style={{ y }}
      className={className ?? "fixed top-0 left-0 right-0 h-fit w-full"}
    >
      <div ref={hiddenRef}>{hidden}</div>

      <div
        ref={alwaysRef}
        className="absolute bottom-0 translate-y-full w-full"
      >
        {always}
      </div>
    </motion.div>
  );
}
