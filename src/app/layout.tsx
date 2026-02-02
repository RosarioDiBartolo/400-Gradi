import type { Metadata } from "next";
import "./globals.css";
import "../fonts";
import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  title: "400 Gradi",
  description: "Single-page restaurant menu/order prototype.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <header className="border-b">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
              <nav className="flex items-center gap-4 text-sm font-medium">
                <Link href="/menu" className="hover:underline">
                  Menu
                </Link>
                <Link href="/drinks" className="hover:underline">
                  Drinks
                </Link>
              </nav>
              <LanguageToggle />
            </div>
          </header>
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
            {children}
          </main>
          <footer className="border-t">
            <div className="mx-auto w-full max-w-3xl space-y-1 px-4 py-4 text-xs text-muted-foreground">
              <p>Coperto: da definire</p>
              <p>Allergeni: informazioni disponibili su richiesta</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
