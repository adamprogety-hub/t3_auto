"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  FileText,
  Archive,
  Download,
  Phone,
  Mail,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { openPrivacyModal } from "@/components/ui/privacy-modal";

interface MaterialItem {
  id: string;
  title: string;
  shortTitle: string;
  actionLabel: string;
  format: string;
  desc: string;
  file: string;
  fileName: string;
  icon: typeof FileSpreadsheet;
  isDark?: boolean;
}

const MATERIALS: MaterialItem[] = [
  {
    id: "oprosnik",
    title: "Опросный лист подбора ШУ",
    shortTitle: "опросник (XLSX)",
    actionLabel: "опросный лист",
    format: "XLSX · 420 КБ",
    desc: "Excel-таблица с расчетом I/O сигналов",
    file: "/docs/oprosnyj-list-shu-acengine.xlsx",
    fileName: "Опросный_лист_подбора_ШУ_ACEngine.xlsx",
    icon: FileSpreadsheet,
  },
  {
    id: "checklist",
    title: "Чек-лист аудита схем Э3",
    shortTitle: "чек-лист (PDF)",
    actionLabel: "чек-лист аудита",
    format: "PDF · 1.8 МБ",
    desc: "Критерии проверки рабочей документации",
    file: "/docs/chek-list-audit-skhem-e3-acengine.pdf",
    fileName: "Чек-лист_аудита_схем_Э3_ACEngine.pdf",
    icon: FileText,
  },
  {
    id: "bundle",
    title: "Скачать сразу оба материала",
    shortTitle: "оба материала (ZIP)",
    actionLabel: "оба материала сразу",
    format: "ZIP · 2.2 МБ",
    desc: "Опросный лист + чек-лист в одном архиве",
    file: "/docs/materialy-acengine-oprosnik-i-chek-list.zip",
    fileName: "Материалы_ACEngine_опросник_и_чек-лист.zip",
    icon: Archive,
    isDark: true,
  },
];

function formatRussianPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  let rest = digits;
  if (rest.startsWith("7") || rest.startsWith("8")) {
    rest = rest.slice(1);
  }
  rest = rest.slice(0, 10);

  let formatted = "+7";
  if (rest.length > 0) {
    formatted += ` (${rest.slice(0, 3)}`;
  }
  if (rest.length >= 3) {
    formatted += `) ${rest.slice(3, 6)}`;
  }
  if (rest.length >= 6) {
    formatted += `-${rest.slice(6, 8)}`;
  }
  if (rest.length >= 8) {
    formatted += `-${rest.slice(8, 10)}`;
  }
  return formatted;
}

export function LeadMagnet() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [channel, setChannel] = useState<"phone" | "email">("phone");
  const [contact, setContact] = useState("");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isAgreed, setIsAgreed] = useState(true);

  const selectedItem = MATERIALS.find((m) => m.id === selectedId) || null;
  const otherItems = selectedId
    ? MATERIALS.filter((m) => m.id !== selectedId)
    : [];

  const isValidPhone = (val: string) => val.replace(/\D/g, "").length >= 11;
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const isValid = channel === "phone" ? isValidPhone(contact) : isValidEmail(contact);
  const isFormValid = isValid && isAgreed;

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDownloaded(false);
    if (channel === "phone") {
      setContact(formatRussianPhone(e.target.value));
    } else {
      setContact(e.target.value);
    }
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedItem) return;

    // Trigger file download
    const link = document.createElement("a");
    link.href = selectedItem.file;
    link.download = selectedItem.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloaded(true);
  };

  return (
    <section id="lead-magnet" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-0 rounded-[14px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(19,18,16,0.10)] border border-divider/40 relative"
        >
          {/* Left: Description & Checklist */}
          <div className="p-8 md:p-12 xl:p-14 bg-graphite text-white flex flex-col justify-between relative overflow-hidden min-h-[460px]">
            {/* Top: Heading */}
            <div className="relative z-20 max-w-[340px] xl:max-w-[380px]">
              <h2 className="text-white text-[clamp(1.35rem,2vw,2rem)] font-extrabold leading-[1.12] tracking-tight">
                Опросные листы
                <br />
                и чек-лист проверки схем Э3
              </h2>
            </div>

            {/* Bottom: Description smaller and at bottom */}
            <div className="relative z-20 max-w-[320px] xl:max-w-[360px] mt-auto pt-10">
              <p className="text-white/60 text-[12.5px] sm:text-[13px] leading-[1.65]">
                Рабочие шаблоны сбора исходных данных для главных энергетиков, проектировщиков и инженеров КИПиА. Помогают формализовать требования к шкафам управления и исключить ошибки в перечне сигналов I/O.
              </p>
            </div>
          </div>

          {/* 3D Cabinet Render peeking out from under the right white background */}
          <div className="absolute right-[240px] xl:right-[280px] 2xl:right-[310px] top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 hidden lg:block">
            <motion.img
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              src="/asu_cabinet_transparent.webp"
              alt="Шкаф АСУ ТП"
              className="w-[500px] xl:w-[570px] 2xl:w-[630px] h-auto object-contain -scale-x-100 drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
              draggable={false}
            />
          </div>

          {/* Right: Dynamic Interactive Download Column */}
          <div className="relative z-20 p-6 sm:p-8 md:p-10 bg-surface-warm/95 lg:bg-[#EAEEF2] flex flex-col justify-center min-h-[460px] border-t lg:border-t-0 lg:border-l border-divider/40">
            {selectedItem ? (
              /* Selected State: Active Card on Top + Form + Other options switcher */
              <div className="space-y-3.5">
                {/* Active Selected Card Lifted To Top */}
                <motion.div
                  layoutId={`card-${selectedItem.id}`}
                  className={`p-5 rounded-[12px] transition-all duration-300 relative ${
                    selectedItem.isDark
                      ? "bg-graphite text-white shadow-[0_12px_32px_-6px_rgba(19,18,16,0.22)] border border-white/10"
                      : "bg-white text-graphite shadow-[0_12px_32px_-6px_rgba(19,18,16,0.12)] border-2 border-graphite"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-[14px] font-bold ${
                            selectedItem.isDark ? "text-white" : "text-graphite"
                          }`}
                        >
                          {selectedItem.title}
                        </h4>
                      </div>
                      <span
                        className={`text-[12px] block mt-0.5 ${
                          selectedItem.isDark ? "text-white/60" : "text-pewter"
                        }`}
                      >
                        {selectedItem.desc}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-[4px] ${
                          selectedItem.isDark
                            ? "bg-white/15 text-white/80"
                            : "bg-surface-warm text-pewter"
                        }`}
                      >
                        {selectedItem.format}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(null);
                          setIsDownloaded(false);
                        }}
                        className={`p-1 rounded-[4px] transition-colors ${
                          selectedItem.isDark
                            ? "text-white/40 hover:text-white hover:bg-white/10"
                            : "text-pewter hover:text-graphite hover:bg-surface-warm"
                        }`}
                        title="Выбрать все материалы"
                        aria-label="Свернуть выбор"
                      >
                        <X className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Inline Contact Form directly under the lifted card */}
                <motion.form
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleDownloadSubmit}
                  className="bg-white rounded-[12px] p-5 shadow-[0_8px_30px_-6px_rgba(19,18,16,0.08)] border border-divider/60 space-y-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-bold text-graphite">
                      Куда отправить материалы?
                    </span>
                    <div className="flex bg-surface-warm p-0.5 rounded-[6px] text-[11px]">
                      <button
                        type="button"
                        onClick={() => {
                          setChannel("phone");
                          setContact("");
                          setIsDownloaded(false);
                        }}
                        className={`px-2.5 py-1 rounded-[5px] font-medium transition-all ${
                          channel === "phone"
                            ? "bg-white text-graphite shadow-xs font-semibold"
                            : "text-pewter hover:text-graphite"
                        }`}
                      >
                        Телефон
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setChannel("email");
                          setContact("");
                          setIsDownloaded(false);
                        }}
                        className={`px-2.5 py-1 rounded-[5px] font-medium transition-all ${
                          channel === "email"
                            ? "bg-white text-graphite shadow-xs font-semibold"
                            : "text-pewter hover:text-graphite"
                        }`}
                      >
                        Почта
                      </button>
                    </div>
                  </div>

                  {/* Input with icon */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pewter">
                      {channel === "phone" ? (
                        <Phone className="w-4 h-4" strokeWidth={1.5} />
                      ) : (
                        <Mail className="w-4 h-4" strokeWidth={1.5} />
                      )}
                    </div>
                    <input
                      type={channel === "phone" ? "tel" : "email"}
                      value={contact}
                      onChange={handleContactChange}
                      placeholder={
                        channel === "phone"
                          ? "+7 (___) ___-__-__"
                          : "ivanov@company.ru"
                      }
                      autoFocus
                      className="w-full pl-10 pr-3.5 py-2.5 bg-surface rounded-[8px] border border-divider/80 text-[13px] text-graphite placeholder:text-pewter/60 focus:outline-none focus:border-graphite focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <label className="flex items-start gap-2 cursor-pointer select-none pt-0.5 group">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-3.5 h-3.5 rounded-[3px] border border-divider peer-checked:bg-graphite peer-checked:border-graphite peer-focus-visible:ring-2 peer-focus-visible:ring-graphite/30 flex items-center justify-center shrink-0 mt-0.5 transition-all bg-white group-hover:border-graphite/60">
                      <Check
                        className={`w-2.5 h-2.5 text-white transition-opacity ${
                          isAgreed ? "opacity-100" : "opacity-0"
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="text-[11px] text-pewter leading-[1.35]">
                      Согласен с{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          openPrivacyModal();
                        }}
                        className="text-graphite font-semibold underline underline-offset-2 hover:text-accent transition-colors cursor-pointer"
                      >
                        Политикой конфиденциальности
                      </button>
                    </span>
                  </label>

                  {/* Dynamic Action Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-3 px-4 rounded-[8px] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isFormValid
                        ? "bg-graphite hover:bg-gunmetal text-white cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
                        : "bg-surface-warm text-pewter/50 border border-divider/30 cursor-not-allowed"
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" strokeWidth={2} />
                        <span>Файл скачан! Скачать повторно</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" strokeWidth={1.5} />
                        <span>
                          {!isValid
                            ? "Заполните контакт для скачивания"
                            : !isAgreed
                            ? "Подтвердите согласие с политикой"
                            : `Скачать ${selectedItem.actionLabel}`}
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-[10.5px] text-pewter text-center leading-tight">
                    Прямая ссылка откроется сразу после отправки. Без спама.
                  </p>
                </motion.form>

                {/* Other materials switcher */}
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-pewter uppercase tracking-wider block mb-2 px-1">
                    Или выберите другой материал:
                  </span>
                  <div className="space-y-2">
                    {otherItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedId(item.id);
                          setIsDownloaded(false);
                        }}
                        className="w-full p-3 bg-white/80 hover:bg-white rounded-[8px] border border-divider/60 hover:border-graphite/40 transition-all text-left flex items-center justify-between group shadow-2xs cursor-pointer"
                      >
                        <div className="min-w-0">
                          <span className="text-[12.5px] font-semibold text-graphite truncate block group-hover:text-iron">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-[10.5px] font-mono text-pewter bg-surface-warm px-1.5 py-0.5 rounded-[4px]">
                            {item.format}
                          </span>
                          <span className="text-[11px] text-graphite font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            Выбрать <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Unselected Initial State: 3 clickable cards */
              <div className="space-y-3.5">
                {MATERIALS.map((item) => {
                  if (item.isDark) {
                    return (
                      <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        className="p-4 sm:px-5 sm:py-4 bg-graphite hover:bg-gunmetal text-white rounded-[10px] shadow-[0_4px_20px_-2px_rgba(19,18,16,0.18)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex items-center justify-between group cursor-pointer border border-white/10"
                      >
                        <div>
                          <div className="text-[13.5px] font-bold text-white group-hover:text-white transition-colors leading-snug">
                            {item.title}
                          </div>
                          <div className="text-[11.5px] text-white/60 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0 ml-2">
                          <span className="text-[11px] font-mono text-white/80 bg-white/15 px-2 py-0.5 rounded-[4px]">
                            {item.format}
                          </span>
                          <span className="text-[12px] text-white font-medium group-hover:translate-y-0.5 transition-transform flex items-center gap-1">
                            ↓ Скачать
                          </span>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.id}
                      layoutId={`card-${item.id}`}
                      onClick={() => setSelectedId(item.id)}
                      className="p-5 bg-white rounded-[10px] shadow-[0_4px_20px_-4px_rgba(19,18,16,0.06),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_-4px_rgba(19,18,16,0.10)] hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer border border-divider/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-graphite text-[14px] font-bold group-hover:text-iron transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-pewter text-[12px] block mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-pewter shrink-0 px-2 py-0.5 bg-surface-warm rounded-[4px]">
                          {item.format}
                        </span>
                      </div>
                      <div className="mt-3.5 pt-3 border-t border-divider/50 flex items-center justify-between text-[12px]">
                        <span className="text-iron font-medium">Нажмите, чтобы скачать</span>
                        <span className="text-graphite font-semibold group-hover:underline flex items-center gap-1">
                          ↓ Скачать
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                <p className="text-pewter text-[11px] text-center mt-1 leading-relaxed">
                  Заполненный опросный лист можно прикрепить к форме заявки ниже для точного расчета сметы.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


