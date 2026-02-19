"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import { useMenuNavigation } from "@/lib/menu-navigation-context";
import LanguageToggle from "@/components/LanguageToggle";
import { ScrollRevealHeaderShell } from "@/scroll-reveal-header-shell";
import { useElementHeight } from "@/use-element-height";
import { useScrollOffset } from "@/use-scroll-offset";

const links = [
  { href: "/menu", label: "Le Nostre Creazioni" },
  { href: "/drinks", label: "Mixology & Spirits" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const {
    categories,
    browseLabel,
    activeCategory,
    pendingCategory,
    selectCategory,
  } = useMenuNavigation();
  const reduceMotion = useReducedMotion();

  const { ref: hiddenRef, height: hiddenHeight } =
    useElementHeight<HTMLDivElement>();
  const { ref: alwaysRef, height: alwaysHeight } =
    useElementHeight<HTMLDivElement>();

  const maxOffset = Math.max(hiddenHeight, 1);
  const scrollOffset = useScrollOffset(0, maxOffset, 1);
  const y = useTransform(scrollOffset, [0, maxOffset], [0, -hiddenHeight]);
  const isMenuRoute =
    pathname === "/menu" ||
    pathname.startsWith("/menu/") ||
    pathname === "/drinks" ||
    pathname.startsWith("/drinks/");
  const showCategoryTabs = isMenuRoute && categories.length > 0;

  return (
    <header className="relative">
      <ScrollRevealHeaderShell
        id="site-fixed-header"
        y={y}
        className="fixed left-0 right-0 top-0 z-50"
        hiddenRef={hiddenRef}
        alwaysRef={alwaysRef}
        hidden={
          <div className="border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
            <div className="mx-auto w-full max-w-[860px] px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Link
                    href="/menu"
                    className="shrink-0 rounded-full border border-border p-2 transition-colors hover:border-gold"
                    aria-label="Vai al menu"
                  >
                    <Image
                      src="/logo.png"
                      alt="400 Gradi"
                      width={96}
                      height={40}
                      className="h-8 w-auto sm:h-9"
                      priority
                    />
                  </Link>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Corso Italia, Catania
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
               
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </div>
        }
        always={
          <div className="border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
            <div className="mx-auto w-full max-w-[860px] px-6">
              <nav className="overflow-x-auto">
                <ul className="flex min-w-max items-center gap-8  py-4">
                  {links.map((link) => {
                    const active =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);
                    return (
                      <li key={link.href} className="  ">
                        <Link
                          href={link.href}
                          className={cn(
                            "border-b border-transparent pb-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground",
                            active && "border-gold text-foreground"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {showCategoryTabs ? (
                <section className="border-t border-border/70 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    {browseLabel}
                  </p>
                  <nav className="mt-3 overflow-x-auto">
                    <ul className="flex min-w-max items-center py-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <motion.button
                            type="button"
                            onClick={() => selectCategory(category.anchorId)}
                            whileHover={reduceMotion ? undefined : { y: -1 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            className={cn(
                              "border-b border-transparent px-4 pb-2 text-[12px] uppercase tracking-[0.2em] transition-colors duration-300",
                              activeCategory === category.anchorId &&
                                "border-gold text-foreground shadow-[0_1px_0_0_rgba(201,158,74,0.9)]",
                              activeCategory !== category.anchorId &&
                                pendingCategory === category.anchorId &&
                                "border-gold/60 text-foreground/85",
                              activeCategory !== category.anchorId &&
                                pendingCategory !== category.anchorId &&
                                "text-muted-foreground hover:text-foreground"
                            )}
                            aria-current={
                              activeCategory === category.anchorId ? "true" : undefined
                            }
                          >
                            {category.label}
                          </motion.button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </section>
              ) : null}
            </div>
          </div>
        }
      />
      <div
        id="site-header-spacer"
        aria-hidden="true"
        className="w-full"
        style={{ height: hiddenHeight + alwaysHeight }}
      />
    </header>
  );
}
