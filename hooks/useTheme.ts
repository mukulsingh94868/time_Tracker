"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/constants/theme";
import type { Theme } from "@/types/theme";

export default function useTheme(): { theme: Theme | null; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    setTheme(next);
  };

  return { theme, toggleTheme };
}
