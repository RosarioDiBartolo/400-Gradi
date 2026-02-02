"use client";

import saladThumbnail from "@/assets/salad.png";
import asparagusSaladThumbnail from "@/assets/asparagus.png";
import coffeThumbnail from "@/assets/coffe.png";
import burgerThumbnail from "@/assets/burger.png";
import pizzaThumbnail from "@/assets/pizza.png";

import { motion, useScroll, useTransform } from "motion/react";

const resolveThumbnail = (thumbnail: typeof saladThumbnail) =>
  typeof thumbnail === "string" ? thumbnail : thumbnail.src;

function ParallaxBg() {
  const { scrollY } = useScroll();

  // Different depth layers for parallax
  const ySlow = useTransform(scrollY, (v) => v * 0.3);
  const yMedium = useTransform(scrollY, (v) => v * 0.6);
  const yFast = useTransform(scrollY, (v) => v * 1);

  return (
    <div className="pointer-events-none brightness-50 ">
      {/* Background layer (slowest movement) */}
      <motion.img
        src={resolveThumbnail(saladThumbnail)}
        style={{ y: ySlow }}
        className="fixed top-10 left-10 w-40 opacity-30 md:opacity-70"
      />
      <motion.img
        src={resolveThumbnail(asparagusSaladThumbnail)}
        style={{ y: ySlow }}
        className="fixed bottom-20 right-20 w-48 opacity-30 md:opacity-70"
      />

      {/* Middle layer (medium movement) */}
      <motion.img
        src={resolveThumbnail(coffeThumbnail)}
        style={{ y: yMedium }}
        className="fixed top-1/3 left-1/4 w-28 opacity-40 md:opacity-80"
      />
      <motion.img
        src={resolveThumbnail(burgerThumbnail)}
        style={{ y: yMedium }}
        className="fixed bottom-32 left-12 w-20 opacity-40 md:opacity-80"
      />

      {/* Foreground layer (fastest movement) */}
      <motion.img
        src={resolveThumbnail(pizzaThumbnail)}
        style={{ y: yFast }}
        className="fixed top-20 right-0 w-52 opacity-50 md:opacity-90"
      />
    </div>
  );
}

export default ParallaxBg;
