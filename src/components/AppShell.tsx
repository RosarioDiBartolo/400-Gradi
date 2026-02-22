"use client";

import { usePathname } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";

type AppShellProps = {
  children: React.ReactNode;
};

const isMenuRoute = (pathname: string) =>
  pathname === "/menu" ||
  pathname.startsWith("/menu/") ||
  pathname === "/drinks" ||
  pathname.startsWith("/drinks/");

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const menuShell = isMenuRoute(pathname);

  if (!menuShell) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[860px] flex-1 px-6 py-16">
        {children}
      </main>
      <footer className="border-t border-border/80">
        <div className="mx-auto w-full max-w-[860px] space-y-2 px-6 py-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <p>Coperto: da definire</p>
          <p>Allergeni su richiesta.</p>
        </div>
      </footer>
    </div>
  );
}
