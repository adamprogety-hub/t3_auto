"use client";

import { openPrivacyModal } from "@/components/ui/privacy-modal";

export function Footer() {
  return (
    <footer className="py-8 bg-graphite">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-8">
            <span className="text-white text-base font-black tracking-tight font-heading">
              ACEngine
            </span>
            <span className="text-white/40 text-[12px]">
              Промышленная автоматизация
            </span>
          </div>
          <div className="flex items-center gap-6">
            {["Услуги", "Проекты", "Процесс", "Контакты"].map((label, i) => (
              <a
                key={label}
                href={`#${["services", "projects", "process", "contacts"][i]}`}
                className="text-white/40 text-[12px] hover:text-white/80 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px]">
          <span className="text-white/30">
            © {new Date().getFullYear()} ACEngine
          </span>
          <button
            type="button"
            onClick={openPrivacyModal}
            className="text-white/40 hover:text-white/90 transition-colors underline underline-offset-3 cursor-pointer text-left md:text-center"
          >
            Политика конфиденциальности
          </button>
          <span className="text-white/20">
            Инженерная интеграция полного цикла
          </span>
        </div>
      </div>
    </footer>
  );
}
