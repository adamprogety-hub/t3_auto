"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, THEMES, Theme } from "@/lib/theme";
import { useLanguage } from "@/lib/translator";

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "capsule" }) {
  const { theme, setTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left notranslate">
      {/* Trigger Button */}
      <button
        type="button"
        data-theme-trigger="true"
        onClick={() => setIsOpen((prev) => !prev)}
        title={isEnglish ? "Change theme" : "Сменить тему оформления"}
        aria-label={isEnglish ? "Change theme" : "Сменить тему оформления"}
        className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer active:scale-95 select-none border ${
          variant === "capsule"
            ? `border-transparent bg-transparent text-white/90 hover:text-white hover:bg-white/15 shadow-none ${
                isOpen ? "bg-white/15" : ""
              }`
            : isOpen
            ? "border-graphite bg-white text-graphite shadow-xs"
            : "border-divider/70 bg-white/90 text-graphite hover:border-graphite hover:bg-white shadow-2xs"
        }`}
      >
        <Palette
          className={`w-3.5 h-3.5 transition-colors duration-300 ${
            variant === "capsule" ? "text-white/80" : "text-pewter group-hover:text-graphite"
          }`}
        />

        {/* 3 mini color dots representing active theme */}
        <span className="flex items-center gap-0.5">
          {activeTheme.colors.map((c, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full border border-black/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </span>
      </button>

      {/* Compact Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            data-theme-popover="true"
            className="absolute top-full mt-2 left-0 sm:right-0 sm:left-auto z-50 w-64 rounded-[12px] bg-white border border-divider/70 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.06)] p-1.5 text-graphite"
          >
            <div className="px-2.5 py-1.5 text-[10.5px] font-mono uppercase tracking-wider text-pewter border-b border-divider/30 mb-1 flex items-center justify-between">
              <span>{isEnglish ? "Color Theme" : "Тема сайта"}</span>
              <span className="text-[10px] text-pewter/80">3 варианта</span>
            </div>

            <div className="space-y-1">
              {THEMES.map((item) => {
                const isSelected = item.id === theme;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTheme(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-[8px] flex items-center justify-between transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-surface-warm/80 font-medium text-graphite shadow-2xs"
                        : "hover:bg-surface text-graphite/90"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* 3 color preview swatches */}
                      <div className="flex items-center gap-1 p-1 rounded-[6px] bg-surface border border-divider/40 shrink-0">
                        {item.colors.map((col, idx) => (
                          <span
                            key={idx}
                            className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: col }}
                          />
                        ))}
                      </div>

                      <div className="min-w-0">
                        <div className="text-[12.5px] font-semibold tracking-tight truncate text-graphite">
                          {isEnglish ? item.enLabel : item.label}
                        </div>
                        <div className="text-[10.5px] text-pewter truncate">
                          {isEnglish ? item.enDescription : item.description}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#E66826] shrink-0 ml-1.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
