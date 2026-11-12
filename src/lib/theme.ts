"use client";

import { useEffect, useState } from "react";

export type Theme = "default" | "presentation" | "cyber";

export interface ThemeOption {
  id: Theme;
  label: string;
  enLabel: string;
  description: string;
  enDescription: string;
  colors: string[]; // 3 preview swatches
}

export const THEMES: ThemeOption[] = [
  {
    id: "default",
    label: "Индустриальная",
    enLabel: "Industrial Light",
    description: "Светлый строгий инженерный минимализм (Графит и оранж)",
    enDescription: "Light engineering minimalism (Graphite & orange)",
    colors: ["#FFFFFF", "#212529", "#E66826"],
  },
  {
    id: "presentation",
    label: "Презентация Т3",
    enLabel: "T3 Presentation",
    description: "Светлая: ледяной сланец, глубокий синий нэви и терракота",
    enDescription: "Light theme: ice slate, deep navy & terracotta",
    colors: ["#F2F5F9", "#0A1C2E", "#D45B13"],
  },
  {
    id: "cyber",
    label: "Cyber Copilot",
    enLabel: "Cyber Copilot Light",
    description: "Светлая: ночной индиго, кибер-фиолетовый и тёплый янтарь",
    enDescription: "Light theme: midnight indigo, cyber violet & amber",
    colors: ["#F6F6FB", "#18172E", "#7C3AED"],
  },
];

let currentTheme: Theme = "default";

export function getTheme(): Theme {
  return currentTheme;
}

export function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  currentTheme = theme;
  localStorage.setItem("preferred-theme", theme);

  const root = document.documentElement;
  if (theme === "default") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }

  window.dispatchEvent(
    new CustomEvent("theme-changed", { detail: { theme } })
  );
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("default");

  useEffect(() => {
    const saved = (localStorage.getItem("preferred-theme") as Theme) || "default";
    setThemeState(saved);
    applyTheme(saved);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    window.addEventListener("theme-changed", handleThemeChange);
    return () => {
      window.removeEventListener("theme-changed", handleThemeChange);
    };
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  };

  return {
    theme,
    setTheme,
    themes: THEMES,
    activeOption: THEMES.find((t) => t.id === theme) || THEMES[0],
  };
}
