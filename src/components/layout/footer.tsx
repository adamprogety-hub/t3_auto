"use client";

import { openPrivacyModal } from "@/components/ui/privacy-modal";
import { Logo } from "@/components/ui/logo";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Услуги и\u00A0решения", href: "#services" },
  { label: "Отечественные ПТК и\u00A0вендоры", href: "#vendors" },
  { label: "О компании и\u00A0производство", href: "#about" },
  { label: "Сотрудничество", href: "#cooperation" },
  { label: "Регламент интеграции", href: "#process" },
  { label: "Контакты и\u00A0филиалы", href: "#contacts" },
];

const TECH_CHIPS = [
  "КАСКАД Цифра (Минцифры)",
  "ПТК БАЗИС",
  "ПТК СУРА",
  "TREI-5B",
  "ФСТЭК № 239 (КИИ)",
  "Astra Linux",
  "РТК и СТЗ",
];

export function Footer() {
  return (
    <div className="bg-surface-warm">
      <footer className="pt-12 md:pt-16 pb-28 sm:pb-32 md:pb-12 bg-graphite rounded-t-[16px] md:rounded-t-[20px] border-t border-white/5 text-white">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 mb-8 md:mb-10">
            {/* Tile 1: Brand, Mission & Tech Stack (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white/[0.035] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-[14px] p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="mb-4">
                  <Logo theme="light" iconSize={26} />
                </div>

                <p className="text-white/70 text-[13.5px] leading-relaxed max-w-xl">
                  Инжиниринговый центр АСУТП полного цикла: промышленная автоматизация, РСУ и{"\u00A0"}ПАЗ,
                  собственное цифровое производство шкафов и{"\u00A0"}платформы для{"\u00A0"}объектов генподряда и{"\u00A0"}КИИ.
                  50 ведущих инженеров, 3 филиала и собственная аккредитованная база.
                </p>

                <div className="mt-4 text-white/50 text-[12px] space-y-1 font-mono">
                  <div>Центральный офис: Москва, ул. Берзарина, д. 28А, к. 2</div>
                  <div>Филиалы: Самара (Волга / База 19 км) · Челябинск (Урал)</div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <div className="text-[11px] text-white/40 mb-2.5">
                  Базовый стек отечественной автоматизации:
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
            <div className="lg:col-span-5 bg-white/[0.035] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-[14px] p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="text-[12px] font-semibold text-white/90 uppercase tracking-wider mb-4">
                  Навигация по разделам
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between py-2 px-3.5 rounded-[8px] text-[13px] font-medium text-white/75 hover:text-white bg-white/[0.02] hover:bg-white/[0.07] border border-white/[0.04] hover:border-white/15 transition-all duration-200"
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
                <span>ФСТЭК № 239 • КИИ 2 и 3 кат.</span>
                <span className="font-mono text-[10px] text-white/30">Цифровое производство</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px] text-white/40">
            <span className="text-white/40">
              © {new Date().getFullYear()} ООО «Т3 - Автоматизация» · ИНН 9734028824 · ОГРН 1267700304178
            </span>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={openPrivacyModal}
                className="hover:text-white/90 transition-colors underline underline-offset-3 cursor-pointer text-left"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
