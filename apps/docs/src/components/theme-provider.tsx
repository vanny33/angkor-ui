"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "default" | "angkor-gold" | "bayon-stone" | "mekong-blue" | "royal-red";

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("default");
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("angkor-theme") as ThemeType;
    if (["default", "angkor-gold", "bayon-stone", "mekong-blue", "royal-red"].includes(savedTheme)) {
      setThemeState(savedTheme);
    }

    const savedDarkMode = localStorage.getItem("angkor-dark") === "true";
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = localStorage.getItem("angkor-dark") !== null ? savedDarkMode : systemPrefersDark;
    setDarkModeState(isDark);
  }, []);

  useEffect(() => {
    // Apply theme variables to root HTML element
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("angkor-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("angkor-dark", String(darkMode));
  }, [darkMode]);

  const setTheme = (newTheme: ThemeType) => setThemeState(newTheme);
  const setDarkMode = (dark: boolean) => setDarkModeState(dark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
