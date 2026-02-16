import type { Metadata } from "next";
import "./globals.css";
import "../fonts";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "400 Gradi",
  description: "Digital menu for 400 Gradi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-background text-foreground antialiased">
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
      </body>
    </html>
  );
}
