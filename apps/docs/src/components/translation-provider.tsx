"use client";

import React, { createContext, useContext } from "react";
import en from "../../messages/en.json";
import km from "../../messages/km.json";

const translations: Record<string, any> = { en, km };

export type Locale = "en" | "km";

interface TranslationContextProps {
  t: (key: string) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const TranslationContext = createContext<TranslationContextProps | null>(null);

export function TranslationProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = (key: string) => {
    const keys = key.split(".");
    let current = translations[locale];
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        return key;
      }
    }
    return typeof current === "string" ? current : key;
  };

  const setLocale = (newLocale: Locale) => {
    const pathname = window.location.pathname;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  };

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}
