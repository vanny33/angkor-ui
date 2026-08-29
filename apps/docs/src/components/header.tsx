"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Languages, Palette, Menu, X, Github } from "lucide-react";
import { useTranslation } from "./translation-provider";
import { useTheme, type ThemeType } from "./theme-provider";
import { Button } from "@angkor-ui/react";

export function Header() {
  const { t, locale, setLocale } = useTranslation();
  const { theme, setTheme, darkMode, setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLanguageToggle = () => {
    setLocale(locale === "en" ? "km" : "en");
  };

  const themesList: Array<{ name: ThemeType; label: string; color: string }> = [
    { name: "default", label: "Default", color: "bg-zinc-500" },
    { name: "angkor-gold", label: "Angkor Gold", color: "bg-amber-500" },
    { name: "bayon-stone", label: "Bayon Stone", color: "bg-emerald-700" },
    { name: "mekong-blue", label: "Mekong Blue", color: "bg-blue-600" },
    { name: "royal-red", label: "Royal Red", color: "bg-red-600" },
  ];

  const docsLink = `/${locale}/docs`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Branding Logo */}
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-2 select-none">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-lg border border-primary/20 shadow-md">
              A
            </span>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Angkor UI
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href={`/${locale}`}
              className={pathname === `/${locale}` ? "text-primary" : "text-muted-foreground hover:text-foreground"}
            >
              {t("common.home")}
            </Link>
            <Link
              href={docsLink}
              className={pathname.startsWith(`/${locale}/docs`) ? "text-primary" : "text-muted-foreground hover:text-foreground"}
            >
              {t("common.docs")}
            </Link>
            <Link
              href={`/${locale}/playground`}
              className={pathname.startsWith(`/${locale}/playground`) ? "text-primary" : "text-muted-foreground hover:text-foreground"}
            >
              {t("common.playground")}
            </Link>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Selector */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              animated={false}
              aria-label="Change theme"
            >
              <Palette className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md border border-border bg-popover p-1 shadow-md scale-0 group-hover:scale-100 transition-transform z-50">
              {themesList.map((tItem) => (
                <button
                  key={tItem.name}
                  onClick={() => setTheme(tItem.name)}
                  className={`flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-xs text-left cursor-pointer hover:bg-accent ${
                    theme === tItem.name ? "font-semibold text-primary" : ""
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${tItem.color}`} />
                  {tItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLanguageToggle}
            leftIcon={<Languages className="h-4 w-4" />}
            className="text-xs h-9 px-3"
            animated={false}
          >
            {locale === "en" ? "ខ្មែរ" : "English"}
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9"
            animated={false}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </Button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9"
            animated={false}
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9"
            animated={false}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 p-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3 font-medium text-sm">
            <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)}>
              {t("common.home")}
            </Link>
            <Link href={docsLink} onClick={() => setMobileMenuOpen(false)}>
              {t("common.docs")}
            </Link>
            <Link href={`/${locale}/playground`} onClick={() => setMobileMenuOpen(false)}>
              {t("common.playground")}
            </Link>
          </nav>
          
          <div className="border-t border-border pt-4 flex flex-col gap-3">
            {/* Theme switcher for mobile */}
            <div className="flex flex-wrap gap-2">
              {themesList.map((tItem) => (
                <button
                  key={tItem.name}
                  onClick={() => setTheme(tItem.name)}
                  className={`flex items-center gap-1 px-3 py-1.5 border rounded-md text-xs cursor-pointer ${
                    theme === tItem.name ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${tItem.color}`} />
                  {tItem.name.replace("-", " ")}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleLanguageToggle();
                  setMobileMenuOpen(false);
                }}
                leftIcon={<Languages className="h-4 w-4" />}
                className="text-xs flex-1"
                animated={false}
              >
                {locale === "en" ? "ភាសាខ្មែរ" : "English"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
