"use client";

import Image from "next/image";
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
  const restaurantPhone = process.env.NEXT_PUBLIC_RESTAURANT_PHONE?.trim() ?? "";
  const callHref =
    restaurantPhone.length > 0
      ? `tel:${restaurantPhone.replace(/[^+\d]/g, "")}`
      : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
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
            {callHref ? (
              <a
                href={callHref}
                className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-gold"
                aria-label="Chiama il ristorante"
              >
                Call
              </a>
            ) : (
              <span
                className="rounded-full border border-border/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                aria-disabled="true"
                title="Set NEXT_PUBLIC_RESTAURANT_PHONE to enable calling."
              >
                Call
              </span>
            )}
            <LanguageToggle />
          </div>
        </div>

        <nav className="mt-3 overflow-x-auto border-y border-border/70">
          <ul className="flex min-w-max items-center gap-8 py-3">
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
