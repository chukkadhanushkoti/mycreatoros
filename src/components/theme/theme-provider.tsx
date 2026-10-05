"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
let fallbackTheme: Theme | undefined;
function snapshot(): Theme {
  try {
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch { /* Persistent storage can be disabled. */ }
  return fallbackTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}
function subscribe(change: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", change);
  window.addEventListener("creatoros-theme-change", change);
  media.addEventListener("change", change);
  return () => {
    window.removeEventListener("storage", change);
    window.removeEventListener("creatoros-theme-change", change);
    media.removeEventListener("change", change);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "light" as Theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    fallbackTheme = theme === "dark" ? "light" : "dark";
    try { window.localStorage.setItem("theme", fallbackTheme); } catch { /* Keep the in-memory preference. */ }
    window.dispatchEvent(new Event("creatoros-theme-change"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
