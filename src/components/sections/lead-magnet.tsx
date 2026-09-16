"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, FileText } from "lucide-react";

export function LeadMagnet() {
  return (
    <section id="lead-magnet" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-0 rounded-[12px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(19,18,16,0.10)]"
        >
          {/* Left: Description & Checklist */}
          <div className="p-10 md:p-14 bg-graphite text-white flex flex-col justify-between">
            <div>
              <h2 className="text-white text-[clamp(1.35rem,2vw,1.95rem)] font-extrabold leading-[1.15] tracking-tight">
                Опросные листы
                <br />
                и чек-лист проверки схем Э3
              </h2>
              <p className="mt-5 text-white/70 text-[14px] leading-relaxed max-w-xl">
                Рабочие шаблоны сбора исходных данных для главных энергетиков, проектировщиков и инженеров КИПиА. Помогают формализовать требования к шкафам управления и исключить ошибки в перечне сигналов I/O.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-baseline gap-3 text-[13px] text-white/80">
                  <span className="text-divider font-mono font-bold select-none shrink-0">—</span>
                  <span>Таблица адресации сигналов I/O под ПЛК ОВЕН, Segnetics, Inovance</span>
                </div>
                <div className="flex items-baseline gap-3 text-[13px] text-white/80">
                  <span className="text-divider font-mono font-bold select-none shrink-0">—</span>
                  <span>Чек-лист схем Э3 по ГОСТ 21.408 (корпуса DKC, аппаратура КЭАЗ)</span>
                </div>
                <div className="flex items-baseline gap-3 text-[13px] text-white/80">
                  <span className="text-divider font-mono font-bold select-none shrink-0">—</span>
                  <span>Карта регистров Modbus RTU/TCP для интеграции в MasterSCADA 4D</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-white/40 text-[12px]">
              Прямое скачивание в 1 клик · Без ввода почты и рекламных рассылок
            </div>
          </div>

          {/* Right: Direct 1-click Download Cards */}
          <div className="p-8 md:p-12 bg-surface-warm/60 flex flex-col justify-center gap-4">
            <a
              href="#contacts"
              className="p-6 bg-white rounded-[10px] shadow-[0_6px_24px_-4px_rgba(19,18,16,0.06),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_-4px_rgba(19,18,16,0.10)] hover:-translate-y-0.5 transition-all duration-200 group block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[6px] bg-surface-warm flex items-center justify-center text-graphite">
                    <FileSpreadsheet className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-graphite text-[14px] font-bold group-hover:text-iron transition-colors">
                      Опросный лист подбора ШУ
                    </h4>
                    <span className="text-pewter text-[12px] block mt-0.5">
                      Excel-таблица с расчетом I/O сигналов
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-pewter shrink-0 px-2 py-0.5 bg-surface-warm rounded-[4px]">
                  XLSX · 420 КБ
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-divider/60 flex items-center justify-between text-[12px]">
                <span className="text-iron font-medium">Скачать шаблон опросника</span>
                <span className="text-graphite font-semibold group-hover:underline">↓ Скачать</span>
              </div>
            </a>

            <a
              href="#contacts"
              className="p-6 bg-white rounded-[10px] shadow-[0_6px_24px_-4px_rgba(19,18,16,0.06),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_-4px_rgba(19,18,16,0.10)] hover:-translate-y-0.5 transition-all duration-200 group block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[6px] bg-surface-warm flex items-center justify-center text-graphite">
                    <FileText className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-graphite text-[14px] font-bold group-hover:text-iron transition-colors">
                      Чек-лист аудита схем Э3
                    </h4>
                    <span className="text-pewter text-[12px] block mt-0.5">
                      Критерии проверки рабочей документации
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-pewter shrink-0 px-2 py-0.5 bg-surface-warm rounded-[4px]">
                  PDF · 1.8 МБ
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-divider/60 flex items-center justify-between text-[12px]">
                <span className="text-iron font-medium">Скачать чек-лист ГОСТ</span>
                <span className="text-graphite font-semibold group-hover:underline">↓ Скачать</span>
              </div>
            </a>

            <p className="text-pewter text-[11px] text-center mt-2 leading-relaxed">
              Заполненный опросный лист можно прикрепить к форме заявки ниже для точного расчета сметы.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
