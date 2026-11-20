"use client";

import { Palette } from "lucide-react";
import { useTheme, THEMES } from "@/lib/theme";
import { useLanguage } from "@/lib/translator";

export function ThemeToggle({
  variant = "default",
}: {
  variant?: "default" | "capsule" | "ghost";
}) {
  const { theme, setTheme } = useTheme();
  const { isEnglish } = useLanguage();

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex].id);
  };

  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <button
      type="button"
      data-theme-trigger="true"
      onClick={cycleTheme}
      title={
        isEnglish
          ? `Theme: ${activeTheme.enLabel}. Click to switch`
          : `Тема: ${activeTheme.label}. Нажмите для смены`
      }
      aria-label={
        isEnglish
          ? `Theme: ${activeTheme.enLabel}. Click to switch`
          : `Тема: ${activeTheme.label}. Нажмите для смены`
      }
      className={`notranslate inline-flex items-center justify-center gap-1.5 h-8 sm:h-[34px] w-[64px] sm:w-[68px] rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer active:scale-95 select-none border ${
        variant === "capsule"
          ? "border-transparent bg-transparent text-white/90 hover:text-white hover:bg-white/15 shadow-none"
          : variant === "ghost"
          ? "border-transparent bg-transparent text-graphite/80 hover:text-graphite hover:bg-black/[0.04] shadow-none"
          : "border-divider/70 bg-white/90 text-graphite hover:border-graphite hover:bg-white shadow-2xs"
      }`}
    >
      <Palette
        className={`w-3.5 h-3.5 shrink-0 transition-colors duration-300 ${
          variant === "capsule"
            ? "text-white/80"
            : "text-pewter group-hover:text-graphite"
        }`}
      />

      {/* 3 mini color dots representing active theme */}
      <span className="flex items-center gap-0.5 shrink-0">
        {activeTheme.colors.map((c, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full border border-black/10 transition-colors duration-300"
            style={{ backgroundColor: c }}
          />
        ))}
      </span>
    </button>
  );
}
