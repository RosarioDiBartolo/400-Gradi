import type { Metadata } from "next";
import "./globals.css";
import "../fonts";
import AppShell from "@/components/AppShell";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { MenuNavigationProvider } from "@/lib/menu-navigation-context";

export const metadata: Metadata = {
  title: "400 Gradi",
  description: "Digital menu for 400 Gradi.",
  icons: {
    icon: "/favicon-rounded.png",
    shortcut: "/favicon-rounded.png",
    apple: "/favicon-rounded.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LanguageProvider>
          <MenuNavigationProvider>
            <AppShell>{children}</AppShell>
          </MenuNavigationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
