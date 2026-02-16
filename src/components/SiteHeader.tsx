"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import LanguageToggle from "@/components/LanguageToggle";

const links = [
  { href: "/menu", label: "Le Nostre Creazioni" },
  { href: "/drinks", label: "Mixology & Spirits" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border/80 sticky -top-20 bg-background  ">
      <div className="mx-auto w-full max-w-[860px] px-6 pb-6 pt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Corso Italia, Catania
          </p>
          <LanguageToggle />
        </div>

        <nav className="mt-8 overflow-x-auto border-y border-border/70">
          <ul className="flex min-w-max items-center gap-8 py-4">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
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
      </div>
    </header>
  );
}
