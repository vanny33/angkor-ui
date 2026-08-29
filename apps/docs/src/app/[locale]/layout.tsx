import type { Metadata } from "next";
import { Noto_Sans_Khmer, Outfit } from "next/font/google";
import "../globals.css";
import { TranslationProvider, type Locale } from "@/components/translation-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@angkor-ui/react";

const notoKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-khmer",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angkor UI - Bilingual React Component Library",
  description:
    "Beautiful, accessible, animated copy-owned React components built for Khmer and international applications.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "km" }];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const activeLocale = (locale === "km" ? "km" : "en") as Locale;

  return (
    <html lang={activeLocale} className="h-full">
      <body
        className={`${notoKhmer.variable} ${outfit.variable} min-h-full font-sans antialiased`}
        style={{
          // Override the default font fallback to use our custom web fonts
          //@ts-ignore
          "--font-sans": `var(--font-outfit), var(--font-khmer), "Khmer OS System", system-ui, sans-serif`,
        }}
      >
        <ThemeProvider>
          <TranslationProvider locale={activeLocale}>
            {children}
            <Toaster locale={activeLocale} />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
