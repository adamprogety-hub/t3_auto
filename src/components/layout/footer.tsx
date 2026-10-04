"use client";

import { openPrivacyModal } from "@/components/ui/privacy-modal";
import { Logo } from "@/components/ui/logo";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Услуги и\u00A0решения", href: "#services" },
  { label: "Каталог шкафов (38+)", href: "#projects" },
  { label: "Конфигуратор проекта", href: "#calculator" },
  { label: "Регламент сборки и\u00A0ПНР", href: "#process" },
];

const TECH_CHIPS = [
  "ОВЕН ПЛК",
  "Siemens S7",
  "Segnetics",
  "MasterSCADA 4D",
  "DKC / Chint",
];

export function Footer() {
  return (
    <div className="bg-surface-warm">
      <footer className="pt-12 md:pt-16 pb-28 sm:pb-32 md:pb-12 bg-graphite rounded-t-[24px] md:rounded-t-[36px] lg:rounded-t-[44px] border-t border-white/5 text-white">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 mb-8 md:mb-10">
            {/* Tile 1: Brand, Mission & Tech Stack (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white/[0.035] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="mb-4">
                  <Logo theme="light" iconSize={26} />
                </div>

                <p className="text-white/65 text-[13.5px] leading-relaxed max-w-lg">
                  Разработка прикладного ПО, сертифицированная сборка шкафов управления и{"\u00A0"}пусконаладка с{"\u00A0"}заводским контролем качества по{"\u00A0"}всей России и{"\u00A0"}ЕАЭС.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <div className="text-[11px] text-white/40 mb-2.5">
                  Базовый стек автоматизации:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/[0.04] border border-white/10 text-white/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tile 2: Navigation Hub (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white/[0.035] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="text-[12px] font-semibold text-white/90 uppercase tracking-wider mb-4">
                  Навигация
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between py-2.5 px-3.5 rounded-lg text-[13px] font-medium text-white/75 hover:text-white bg-white/[0.02] hover:bg-white/[0.07] border border-white/[0.04] hover:border-white/15 transition-all duration-200"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors"
                        strokeWidth={1.5}
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/40 flex items-center justify-between">
                <span>ТР ТС 004/2011 • ТР ТС 020/2011</span>
                <span className="font-mono text-[10px] text-white/30">Заводской контроль</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px] text-white/40">
            <span className="text-white/40">
              © {new Date().getFullYear()} АЦИнжиниринг • Собственное сертифицированное производство
            </span>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={openPrivacyModal}
                className="hover:text-white/90 transition-colors underline underline-offset-3 cursor-pointer text-left"
              >
                Политика конфиденциальности
              </button>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="text-white/30 hidden sm:inline">
                Инженерная интеграция полного цикла
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
