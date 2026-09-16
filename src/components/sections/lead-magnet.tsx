"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, FileText, Archive, Download } from "lucide-react";

export function LeadMagnet() {
  return (
    <section id="lead-magnet" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-0 rounded-[14px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(19,18,16,0.10)] border border-divider/40"
        >
          {/* Left: Description & Checklist */}
          <div className="p-10 md:p-14 bg-graphite text-white flex flex-col justify-center">
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
          </div>

          {/* Right: Direct 1-click Download Cards */}
          <div className="p-8 md:p-10 bg-surface-warm/60 flex flex-col justify-center gap-3.5">
            {/* Card 1: XLSX */}
            <a
              href="/docs/oprosnyj-list-shu-acengine.xlsx"
              download="Опросный_лист_подбора_ШУ_ACEngine.xlsx"
              className="p-5 bg-white rounded-[10px] shadow-[0_4px_20px_-4px_rgba(19,18,16,0.06),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_-4px_rgba(19,18,16,0.10)] hover:-translate-y-0.5 transition-all duration-200 group block border border-divider/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[6px] bg-surface-warm flex items-center justify-center text-graphite shrink-0">
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
              <div className="mt-3.5 pt-3 border-t border-divider/50 flex items-center justify-between text-[12px]">
                <span className="text-iron font-medium">Скачать шаблон опросника</span>
                <span className="text-graphite font-semibold group-hover:underline flex items-center gap-1">
                  ↓ Скачать
                </span>
              </div>
            </a>

            {/* Card 2: PDF */}
            <a
              href="/docs/chek-list-audit-skhem-e3-acengine.pdf"
              download="Чек-лист_аудита_схем_Э3_ACEngine.pdf"
              className="p-5 bg-white rounded-[10px] shadow-[0_4px_20px_-4px_rgba(19,18,16,0.06),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_-4px_rgba(19,18,16,0.10)] hover:-translate-y-0.5 transition-all duration-200 group block border border-divider/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[6px] bg-surface-warm flex items-center justify-center text-graphite shrink-0">
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
              <div className="mt-3.5 pt-3 border-t border-divider/50 flex items-center justify-between text-[12px]">
                <span className="text-iron font-medium">Скачать чек-лист ГОСТ</span>
                <span className="text-graphite font-semibold group-hover:underline flex items-center gap-1">
                  ↓ Скачать
                </span>
              </div>
            </a>

            {/* Card 3: Download Both Materials (Bundle) */}
            <a
              href="/docs/materialy-acengine-oprosnik-i-chek-list.zip"
              download="Материалы_ACEngine_опросник_и_чек-лист.zip"
              className="p-4 sm:px-5 sm:py-4 bg-graphite hover:bg-gunmetal text-white rounded-[10px] shadow-[0_4px_20px_-2px_rgba(19,18,16,0.18)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[6px] bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Archive className="w-4.5 h-4.5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13.5px] font-bold text-white group-hover:text-white transition-colors leading-snug">
                    Скачать сразу оба материала
                  </div>
                  <div className="text-[11.5px] text-white/60">
                    Опросный лист + чек-лист в одном архиве
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 ml-2">
                <span className="text-[11px] font-mono text-white/80 bg-white/15 px-2 py-0.5 rounded-[4px]">
                  ZIP · 2.2 МБ
                </span>
                <span className="text-[13px] font-bold text-white group-hover:translate-y-0.5 transition-transform flex items-center gap-1">
                  ↓
                </span>
              </div>
            </a>

            <p className="text-pewter text-[11px] text-center mt-1 leading-relaxed">
              Заполненный опросный лист можно прикрепить к форме заявки ниже для точного расчета сметы.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

