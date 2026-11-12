"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/translator";

interface LanguageToggleProps {
  variant?: "default" | "capsule";
}

export function LanguageToggle({ variant = "default" }: LanguageToggleProps) {
  const { isEnglish, toggleLanguage } = useLanguage();
  const isCapsule = variant === "capsule";

  return (
    <button
      type="button"
      data-lang-toggle="true"
      onClick={toggleLanguage}
      title={isEnglish ? "Переключить на русский" : "Translate website to English"}
      aria-label={isEnglish ? "Переключить на русский" : "Translate website to English"}
      className={`notranslate inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer active:scale-95 select-none border ${
        isCapsule
          ? "border-transparent bg-transparent text-white/90 hover:text-white hover:bg-white/15 shadow-none"
          : isEnglish
          ? "bg-graphite text-white shadow-xs border-graphite"
          : "border-divider/70 bg-white/90 text-graphite hover:border-graphite hover:bg-white shadow-2xs"
      }`}
    >
      <Globe
        className={`w-3.5 h-3.5 transition-colors duration-300 ${
          isCapsule || isEnglish ? "text-[#E66826]" : "text-graphite/70"
        }`}
      />
      <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-wider">
        {isEnglish ? "RU" : "EN"}
      </span>
    </button>
  );
}
