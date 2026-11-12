"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  Copy,
  Check,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";
import { projects, ProjectItem } from "@/components/sections/projects";

// Global Event Dispatchers for Modals
export function openCertificatesModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-header-modal", { detail: { modal: "certificates" } })
    );
  }
}

export function openCasesModal(projectId?: string, photoIndex?: number) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-header-modal", {
        detail: { modal: "cases", projectId, photoIndex },
      })
    );
  }
}

export function openRequisitesModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-header-modal", { detail: { modal: "requisites" } })
    );
  }
}

export function closeHeaderModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("close-header-modal"));
  }
}

export interface HeaderModalsProps {
  headerRef: React.RefObject<HTMLElement | null>;
  activeModal: "certificates" | "cases" | "requisites" | null;
  onClose: () => void;
  onSelectModal: (modal: "certificates" | "cases" | "requisites") => void;
}

// Certificates Data with Full Legal & Engineering Parameters
const certificatesData = [
  {
    id: "sro-design",
    category: "СРО Проектирование",
    title: "Выписка СРО на проектирование",
    org: "Ассоциация проектировщиков «ЦентрТелекомПроект»",
    regNumber: "СРО-П-175-12102012 / № 8412-24",
    validity: "Бессрочно (с обязательным ежегодным контролем)",
    level: "Особо опасные, технически сложные и уникальные объекты (ст. 48.1 ГрК РФ)",
    compensationLimit: "до 300 000 000 ₽ (2-й уровень ответственности)",
    description:
      "Право на подготовку проектной и рабочей документации разделов АТХ, АСУТП, РСУ, ПАЗ, ЭМ, ЭС для взрывопожароопасных производств нефтехимии, металлургии, газовой и пищевой промышленности.",
    tags: ["Особо опасные объекты", "Разделы АТХ/АСУТП", "Страхование 300 млн ₽"],
  },
  {
    id: "sro-build",
    category: "СРО Строительство и ПНР",
    title: "Выписка СРО на строительство и ПНР",
    org: "Ассоциация строителей и монтажников АСУТП",
    regNumber: "СРО-С-264-03042013 / № 5120-24",
    validity: "Бессрочно",
    level: "СМР и ПНР на действующих промышленных объектах",
    compensationLimit: "до 500 000 000 ₽",
    description:
      "Допуск к монтажу слаботочных трасс, расключению кроссовых и интерфейсных кабелей, шеф-монтажу шкафов управления НКУ и проведению комплексных 72-часовых испытаний АСУТП под нагрузкой.",
    tags: ["Монтаж НКУ", "Комплексные испытания 72ч", "Шеф-монтаж"],
  },
  {
    id: "fstek-kii",
    category: "ФСТЭК России / КИИ",
    title: "Заключение ФСТЭК России (Приказ № 239)",
    org: "ФСТЭК России / Лаборатория защиты критической инфраструктуры",
    regNumber: "КИИ-239-0824",
    validity: "Действует в рамках проектных решений Т3",
    level: "Объекты КИИ 2-й и 3-й категорий значимости",
    compensationLimit: "Полное юридическое и техническое закрытие требований регулятора",
    description:
      "Информационная безопасность технологических процессов: микросегментация сетей АСУТП, защищенная среда исполнения контроллеров, аудит исходного кода прикладного ПО, разграничение прав доступа и протоколирование событий согласно ГОСТ Р 56546-2015.",
    tags: ["ФСТЭК № 239", "КИИ 2 и 3 кат.", "Защищенный периметр"],
  },
  {
    id: "iso-9001",
    category: "ГОСТ Р ИСО 9001-2015",
    title: "Сертификат ГОСТ Р ИСО 9001-2015",
    org: "Орган по сертификации систем менеджмента «ПромСертификация»",
    regNumber: "РОСС RU.32001.04ИБФ1.ОС03.28471",
    validity: "Действует до 2027 года",
    level: "Международный стандарт ISO 9001:2015",
    compensationLimit: "Система сквозного входного и выходного контроля ОТК",
    description:
      "Сертификация процессов разработки схемотехники в EPLAN, серийной сборки шкафов управления на производственной площадке (19 км, Самара), маркировки проводников по стандартам WAGO/DKC и стендового нагрузочного тестирования.",
    tags: ["ISO 9001:2015", "Контроль ОТК 100%", "Сборка шкафов 19 км"],
  },
  {
    id: "kaskad-cifra",
    category: "Вендор: КАСКАД Цифра",
    title: "Интегратор платформы «КАСКАД Цифра»",
    org: "ООО «СибКом Цифра» / Разработчик платформы КАСКАД",
    regNumber: "ПАРТНЕР-СИ-КАСКАД-2024/09",
    validity: "Статус сертифицированного системного интегратора",
    level: "Реестр отечественного ПО Минцифры РФ № 678216",
    compensationLimit: "Масштабируемость до 10 000 000 сигналов",
    description:
      "Авторизация на проектирование и внедрение кроссплатформенных систем диспетчеризации уровня предприятия, интеграцию с MES/ERP, миграцию с Wonderware InTouch, Siemens WinCC и Schneider EcoStruxure.",
    tags: ["Реестр Минцифры №678216", "Замена WinCC / InTouch"],
  },
  {
    id: "elara-sura",
    category: "Вендор: АО «ЭЛАРА»",
    title: "Партнерский сертификат АО «ЭЛАРА» (ПТК СУРА)",
    org: "АО «Чебоксарский приборостроительный завод «ЭЛАРА»",
    regNumber: "СЕРТ-ЭЛАРА-Т3-2024",
    validity: "Официальный инжиниринговый партнер",
    level: "Реестр Минпромторга РФ (ПТК СУРА)",
    compensationLimit: "Горячее резервирование 100%, время переключения < 10 мс",
    description:
      "Авторизованная разработка и сборка шкафов контроллерного оборудования на базе отечественного ПТК СУРА для электроэнергетики, магистрального транспорта и непрерывных химических производств.",
    tags: ["Реестр Минпромторга", "ПТК СУРА", "Горячее резервирование"],
  },
  {
    id: "ecoresource-bazis",
    category: "Вендор: ЗАО «Экоресурс»",
    title: "Сертификат интегратора ПТК БАЗИС",
    org: "ЗАО «Экоресурс» (Воронеж)",
    regNumber: "ЭКОРЕС-ИНТ-Т3-2024/11",
    validity: "Сертифицированный партнер по противоаварийной защите",
    level: "Уровень полноты безопасности SIL2 / SIL3",
    compensationLimit: "Сертифицированное исполнение для противоаварийной защиты",
    description:
      "Внедрение контроллеров БАЗИС-21, БАЗИС-100 в контурах противоаварийной автоматической защиты взрывоопасных производств (ГОСТ Р МЭК 61508 / ГОСТ Р МЭК 61511).",
    tags: ["ПТК БАЗИС", "ПАЗ SIL2/SIL3", "Нефтехимия"],
  },
  {
    id: "trei-5b",
    category: "Вендор: ЗАО «ТРЭИ ГмбХ»",
    title: "Авторизация ЗАО «ТРЭИ ГмбХ» (TREI-5B)",
    org: "ЗАО «ТРЭИ ГмбХ» (Пенза)",
    regNumber: "ТРЭИ-ПАРТ-2024/10",
    validity: "Инжиниринг и сервис контроллерных комплексов",
    level: "Реестр Минпромторга РФ",
    compensationLimit: "Отказоустойчивость в жестких промышленных средах",
    description:
      "Применение микропроцессорных комплексов TREI-5B в проектах автоматизации нефтеперерабатывающих заводов, котельных и распределительных подстанций.",
    tags: ["TREI-5B", "Контроллеры ТЭК", "Импортозамещение"],
  },
];

// Metro UI Signature Staggered Animation Curve
const metroItemVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.045,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// =========================================================================
// 1. REQUISITES VIEW (Vertically & Horizontally Centered, Screen 1)
// =========================================================================
function RequisitesView({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl bg-white border border-divider/60 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6"
      >
        {/* Header Intro */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-divider/40">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-graphite tracking-tight">
              ООО «Т3 - Автоматизация»
            </h3>
            <p className="text-[13px] text-iron mt-1">
              Инжиниринговый центр и цифровое производство шкафов автоматики
            </p>
          </div>

          <button
            onClick={onCopy}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] bg-graphite hover:bg-carbon text-white text-[13px] font-semibold transition-all active:scale-95 shadow-sm cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Скопировано в буфер</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span>Скопировать реквизиты</span>
              </>
            )}
          </button>
        </div>

        {/* Requisites Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: General & Registration */}
          <div className="bg-surface/60 border border-divider/50 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-pewter">
              Регистрационные данные
            </span>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">Полное наименование:</span>
              <span className="text-[13px] font-medium text-graphite text-right">
                ООО «Т3 - Автоматизация»
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">ИНН:</span>
              <span className="text-[13px] font-mono font-bold text-graphite">
                9734028824
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">КПП:</span>
              <span className="text-[13px] font-mono font-bold text-graphite">
                773401001
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">ОГРН:</span>
              <span className="text-[13px] font-mono font-bold text-graphite">
                1267700304178
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">ОКПО:</span>
              <span className="text-[13px] font-mono text-graphite">
                98124031
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[12px] text-pewter">Система налогообложения:</span>
              <span className="text-[13px] font-medium text-graphite">
                ОСНО (с НДС 20%)
              </span>
            </div>
          </div>

          {/* Right: Banking & Addresses */}
          <div className="bg-surface/60 border border-divider/50 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-pewter">
              Банковские реквизиты и адреса
            </span>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">Банк:</span>
              <span className="text-[13px] font-medium text-graphite">
                АО «ТБанк»
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">БИК:</span>
              <span className="text-[13px] font-mono font-bold text-graphite">
                044525974
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">Расчетный счет:</span>
              <span className="text-[13px] font-mono text-graphite select-all">
                40702810910001847293
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">Корр. счет:</span>
              <span className="text-[13px] font-mono text-graphite select-all">
                30101810145250000974
              </span>
            </div>

            <div className="flex justify-between items-baseline border-b border-divider/30 pb-2">
              <span className="text-[12px] text-pewter">Юр. адрес:</span>
              <span className="text-[12px] font-medium text-graphite text-right max-w-[200px]">
                123060, г. Москва, ул. Расплетина, д. 24
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[12px] text-pewter">Производство:</span>
              <span className="text-[12px] font-medium text-graphite text-right max-w-[200px]">
                Самара, Московское шоссе, 19 км
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// 2. CASES GALLERY VIEW (Metro UI Photo Grid with Dropdown Info)
// =========================================================================
function CasesGalleryView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activePhotoMap, setActivePhotoMap] = useState<Record<string, number>>({});

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const setCardPhoto = (id: string, index: number, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoMap((prev) => ({
      ...prev,
      [id]: (index + max) % max,
    }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Intro Header */}
      <div className="mb-6 border-b border-divider/40 pb-4 pr-12">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-graphite tracking-tight">
          Реализованные кейсы «Т3 Автоматизация»
        </h3>
      </div>

      {/* Metro UI Staggered Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
        {projects.map((proj, idx) => {
          const isExpanded = expandedId === proj.id;
          const currentPhotoIdx = activePhotoMap[proj.id] || 0;
          const photoCount = proj.images.length;
          const currentImg = proj.images[currentPhotoIdx] || proj.images[0];

          return (
            <motion.div
              key={proj.id}
              custom={idx}
              variants={metroItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => toggleExpand(proj.id)}
              className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col bg-white select-none ${
                isExpanded
                  ? "border-graphite shadow-lg ring-1 ring-graphite/20"
                  : "border-divider/60 hover:border-graphite/50 hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {/* Photo Area */}
              <div className="relative h-44 sm:h-48 w-full bg-surface-warm overflow-hidden group">
                <img
                  src={currentImg.src}
                  alt={currentImg.caption || proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Tag overlay */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 rounded-[5px] text-[10px] font-mono font-medium bg-graphite/85 text-white backdrop-blur-xs">
                    {proj.type}
                  </span>
                </div>

                {/* Photo pagination pill */}
                {photoCount > 1 && (
                  <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 bg-graphite/70 backdrop-blur-xs rounded-full px-2 py-0.5 text-[10px] text-white font-mono">
                    <span>{currentPhotoIdx + 1}</span>
                    <span>/</span>
                    <span>{photoCount}</span>
                  </div>
                )}
              </div>

              {/* Title Bar Under Photo */}
              <div className="p-3.5 flex items-center justify-between gap-2 border-t border-divider/40 bg-white">
                <div className="min-w-0">
                  <h4 className="text-[14px] font-bold text-graphite tracking-tight leading-snug truncate font-heading">
                    {proj.title}
                  </h4>
                  <span className="text-[11px] text-pewter block truncate mt-0.5">
                    {proj.location}
                  </span>
                </div>

                <div
                  className={`w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isExpanded
                      ? "bg-graphite text-white border-graphite rotate-180"
                      : "bg-surface text-graphite border-divider/50 hover:bg-white"
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Dropdown / Expandable Description (Metro Dropdown) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-divider/40 bg-surface/70"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3.5 flex flex-col gap-2.5 text-[12px]">
                      {/* Photo Thumbnails if multiple */}
                      {photoCount > 1 && (
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
                          {proj.images.map((img, photoI) => (
                            <button
                              key={photoI}
                              onClick={(e) => setCardPhoto(proj.id, photoI, photoCount, e)}
                              className={`relative w-9 h-9 rounded-[5px] overflow-hidden border shrink-0 transition-all ${
                                photoI === currentPhotoIdx
                                  ? "border-graphite ring-1 ring-graphite"
                                  : "border-divider/50 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <img src={img.src} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Caption of current photo */}
                      <p className="text-graphite font-medium text-[12px] leading-relaxed">
                        {currentImg.caption}
                      </p>

                      {/* Equipment */}
                      {proj.hardware && (
                        <div className="pt-2 border-t border-divider/30 text-[11px]">
                          <span className="text-pewter block font-mono">Оборудование:</span>
                          <span className="text-graphite font-semibold">{proj.hardware}</span>
                        </div>
                      )}

                      {/* Details */}
                      {proj.details && (
                        <p className="text-iron text-[11px] leading-relaxed">
                          {proj.details}
                        </p>
                      )}

                      {/* Result */}
                      {proj.result && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-accent/10 border border-accent/20 text-accent font-medium text-[11px] self-start mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{proj.result}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// 3. CERTIFICATES GALLERY VIEW (Clean Document Photo Placeholders + Title)
// =========================================================================

interface CleanCertificateItem {
  id: string;
  title: string;
  docCategory: string;
  regNote: string;
}

const cleanCertificatesList: CleanCertificateItem[] = [
  {
    id: "sro-design",
    title: "Выписка из реестра СРО (Проектирование АСУТП)",
    docCategory: "ВЫПИСКА ИЗ РЕЕСТРА СРО",
    regNote: "Проектирование особо опасных объектов",
  },
  {
    id: "sro-build",
    title: "Выписка из реестра СРО (Строительство, монтаж и ПНР)",
    docCategory: "ВЫПИСКА ИЗ РЕЕСТРА СРО",
    regNote: "Строительно-монтажные и пусконаладочные работы",
  },
  {
    id: "fstek-kii",
    title: "Заключение ФСТЭК России (КИИ Приказ № 239)",
    docCategory: "ЗАКЛЮЧЕНИЕ ФСТЭК РОССИИ",
    regNote: "Безопасность объектов КИИ 2 и 3 категорий",
  },
  {
    id: "iso-9001",
    title: "Сертификат ГОСТ Р ИСО 9001-2015",
    docCategory: "СЕРТИФИКАТ СООТВЕТСТВИЯ",
    regNote: "Система менеджмента качества (СМК)",
  },
  {
    id: "kaskad-cifra",
    title: "Сертификат интегратора платформы «КАСКАД Цифра»",
    docCategory: "СЕРТИФИКАТ ИНТЕГРАТОРА",
    regNote: "Реестр отечественного ПО Минцифры РФ",
  },
  {
    id: "elara-sura",
    title: "Партнерский сертификат АО «ЭЛАРА» (ПТК СУРА)",
    docCategory: "ПАРТНЕРСКИЙ СЕРТИФИКАТ",
    regNote: "Официальный инжиниринговый партнер",
  },
  {
    id: "ecoresource-bazis",
    title: "Сертификат интегратора ПТК БАЗИС (SIL2/SIL3)",
    docCategory: "СЕРТИФИКАТ ИНТЕГРАТОРА",
    regNote: "Системы противоаварийной защиты (ПАЗ)",
  },
  {
    id: "trei-5b",
    title: "Авторизация ЗАО «ТРЭИ ГмбХ» (TREI-5B)",
    docCategory: "СЕРТИФИКАТ АВТОРИЗАЦИИ",
    regNote: "Комплексы промышленной автоматизации",
  },
];

function CertificateDocumentPlaceholder({
  item,
}: {
  item: CleanCertificateItem;
}) {
  return (
    <div className="relative w-full h-52 sm:h-56 bg-[#f7f6f2] flex items-center justify-center p-3 select-none overflow-hidden group">
      {/* Paper Certificate Sheet */}
      <div className="relative w-[190px] h-[190px] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.07)] border border-divider/60 p-3.5 flex flex-col justify-between transition-transform duration-300 group-hover:scale-105">
        {/* Decorative Document Border */}
        <div className="absolute inset-1.5 border border-divider/40 rounded-[2px] pointer-events-none" />
        <div className="absolute inset-2 border border-dashed border-divider/25 rounded-[1px] pointer-events-none" />

        {/* Certificate Header */}
        <div className="flex flex-col items-center text-center relative z-10 pt-1">
          <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-1">
            <Award className="w-3 h-3 text-accent" />
          </div>
          <span className="text-[7.5px] font-mono tracking-widest text-pewter uppercase">
            ОФИЦИАЛЬНЫЙ ДОКУМЕНТ
          </span>
          <span className="text-[9px] font-bold font-heading text-graphite tracking-tight uppercase mt-0.5">
            {item.docCategory}
          </span>
        </div>

        {/* Document Body Graphic Skeleton Lines */}
        <div className="flex flex-col gap-1.5 px-2 my-auto relative z-10">
          <div className="h-1.5 bg-graphite/15 rounded-full w-full" />
          <div className="h-1 bg-graphite/10 rounded-full w-5/6 mx-auto" />
          <div className="h-1 bg-graphite/10 rounded-full w-4/6 mx-auto" />
          <div className="h-1 bg-graphite/10 rounded-full w-3/4 mx-auto" />
        </div>

        {/* Bottom Official Blue Seal Stamp & Signature Graphic */}
        <div className="flex items-end justify-between relative z-10 pt-1 border-t border-divider/30">
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-pewter">Т3 АВТОМАТИЗАЦИЯ</span>
            <div className="w-12 h-2 border-b border-graphite/40 mt-0.5" />
          </div>

          {/* Realistic Blue Wet-Ink Stamp Seal */}
          <div className="w-8 h-8 rounded-full border border-blue-600/70 text-blue-700/80 flex items-center justify-center text-[6px] font-mono font-bold rotate-[-12deg] bg-blue-50/40 shadow-2xs">
            <span className="text-center leading-none text-[5.5px]">
              ПЕЧАТЬ<br />Т3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificatesGalleryView() {
  const [selectedCert, setSelectedCert] = useState<CleanCertificateItem | null>(null);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Intro Header */}
      <div className="mb-6 border-b border-divider/40 pb-4 pr-12">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-graphite tracking-tight">
          Сертификаты «Т3 Автоматизация»
        </h3>
      </div>

      {/* Metro UI Staggered Grid of Certificate Photo Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cleanCertificatesList.map((cert, idx) => (
          <motion.div
            key={cert.id}
            custom={idx}
            variants={metroItemVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setSelectedCert(cert)}
            className="rounded-xl border border-divider/60 hover:border-graphite bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 select-none"
          >
            {/* Visual Photo Placeholder of Certificate Document */}
            <CertificateDocumentPlaceholder item={cert} />

            {/* Title Bar Underneath (Strictly Only the Title) */}
            <div className="p-3.5 border-t border-divider/40 bg-white flex items-center justify-between gap-2 min-h-[60px]">
              <h4 className="text-[13px] font-bold text-graphite tracking-tight leading-snug font-heading">
                {cert.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Clean Modal Lightbox for Previewing Document on Click */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-graphite/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-divider/60 relative flex flex-col gap-5 text-center items-center"
            >
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-[8px] bg-surface hover:bg-graphite hover:text-white flex items-center justify-center text-graphite border border-divider/60 transition-all cursor-pointer shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mt-2">
                <Award className="w-6 h-6 text-accent" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold block">
                  {selectedCert.docCategory}
                </span>
                <h3 className="text-xl font-bold font-heading text-graphite tracking-tight mt-1">
                  {selectedCert.title}
                </h3>
                <p className="text-[13px] text-iron mt-2">
                  {selectedCert.regNote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =========================================================================
// MAIN HEADER MODALS COMPONENT
// =========================================================================
export function HeaderModals({
  headerRef,
  activeModal,
  onClose,
  onSelectModal,
}: HeaderModalsProps) {
  const [headerBottom, setHeaderBottom] = useState(72);
  const [margin, setMargin] = useState(16);
  const [copied, setCopied] = useState(false);

  // Track header bottom and responsive margin
  useEffect(() => {
    const updateGeometry = () => {
      const isMobile = window.innerWidth < 768;
      setMargin(isMobile ? 12 : 20);

      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderBottom(rect.bottom);
      }
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry);
    window.addEventListener("scroll", updateGeometry, { passive: true });
    return () => {
      window.removeEventListener("resize", updateGeometry);
      window.removeEventListener("scroll", updateGeometry);
    };
  }, [headerRef, activeModal]);

  // Lock scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        onClose();
      }
    };

    if (activeModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal, onClose]);

  // Handle external open events
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{
        modal: "certificates" | "cases" | "requisites";
      }>;
      if (customEvent.detail?.modal) {
        onSelectModal(customEvent.detail.modal);
      }
    };

    const handleClose = () => {
      onClose();
    };

    window.addEventListener("open-header-modal", handleOpen);
    window.addEventListener("close-header-modal", handleClose);
    return () => {
      window.removeEventListener("open-header-modal", handleOpen);
      window.removeEventListener("close-header-modal", handleClose);
    };
  }, [onSelectModal, onClose]);

  const handleCopyRequisites = () => {
    const text = `ООО «Т3 - Автоматизация»
ИНН: 9734028824
КПП: 773401001
ОГРН: 1267700304178
ОКПО: 98124031
Юридический адрес: 123060, г. Москва, вн.тер.г. муниципальный округ Щукино, ул. Расплетина, д. 24, помещ. 1/1
Адрес производства: 443028, г. Самара, Московское шоссе, 19-й километр
Филиалы: Москва, Самара, Челябинск
Банк: АО «ТБанк»
БИК: 044525974
Р/с: 40702810910001847293
К/с: 30101810145250000974
Директор: Иванов Алексей Николаевич
Телефон: +7 (960) 821-81-70
Email: info@t3-auto.com / aleksey.ivanov@t3-auto.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <>
          {/* Backdrop: z-50 covers all page content behind header (header is z-[70]), blurring everything underneath */}
          <motion.div
            key="header-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-graphite/40 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container: z-[60], exactly margin distance from left, right, bottom of window and bottom of header */}
          <motion.div
            key="header-modal-card"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: `${headerBottom + margin}px`,
              bottom: `${margin}px`,
              left: `${margin}px`,
              right: `${margin}px`,
              zIndex: 60,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-divider/60 rounded-2xl md:rounded-[20px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative"
          >
            {/* Independent Close Button in top right corner */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть окно"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-[8px] bg-white/95 hover:bg-graphite hover:text-white text-graphite border border-divider/60 backdrop-blur-xs transition-all hover:border-graphite active:scale-95 cursor-pointer shadow-2xs"
            >
              <X strokeWidth={1.5} className="w-4 h-4" />
            </button>

            {/* Modal Body: Switch between Certificates / Cases / Requisites */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {activeModal === "requisites" && (
                <RequisitesView copied={copied} onCopy={handleCopyRequisites} />
              )}

              {activeModal === "cases" && <CasesGalleryView />}

              {activeModal === "certificates" && <CertificatesGalleryView />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
