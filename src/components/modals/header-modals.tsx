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

export function openPrivacyModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-header-modal", { detail: { modal: "privacy" } })
    );
  }
}

export function closeHeaderModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("close-header-modal"));
  }
}

export type HeaderModalType = "certificates" | "cases" | "requisites" | "privacy";

export interface HeaderModalsProps {
  headerRef: React.RefObject<HTMLElement | null>;
  activeModal: HeaderModalType | null;
  onClose: () => void;
  onSelectModal: (modal: HeaderModalType) => void;
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
    <div className="h-full min-h-full w-full relative flex items-start md:items-center justify-center p-3 pt-14 sm:p-6 lg:p-8 overflow-hidden">
      {/* Desktop Left Engineer: Grounded at bottom-0, exact 640px scale approved by user */}
      <div className="hidden lg:block absolute bottom-0 right-[calc(50%+448px-35px)] z-0 pointer-events-none select-none">
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          src="/images/modals/engineer-left.png"
          alt="Инженер Т3 Автоматизация"
          className="h-[640px] w-auto max-w-none object-contain object-bottom filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.14)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl bg-white border border-divider/60 rounded-2xl p-4 sm:p-8 shadow-sm flex flex-col gap-5 sm:gap-6 my-auto"
      >
          {/* Header Intro */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 sm:pb-3">
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

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-3 border-b border-divider/30 pb-2">
                <span className="text-[12px] text-pewter shrink-0">Полное наименование:</span>
                <span className="text-[13px] font-medium text-graphite sm:text-right">
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

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-3">
                <span className="text-[12px] text-pewter shrink-0">Система налогообложения:</span>
                <span className="text-[13px] font-medium text-graphite sm:text-right">
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

      {/* Desktop Right Engineer: Grounded at bottom-0, exact 640px scale approved by user */}
      <div className="hidden lg:block absolute bottom-0 left-[calc(50%+448px-45px)] z-0 pointer-events-none select-none">
        <motion.img
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          src="/images/modals/engineer-right.png"
          alt="Инженер Т3 Автоматизация"
          className="h-[640px] w-auto max-w-none object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
        />
      </div>
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
      <div className="mb-6 pr-12">
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
              className={`rounded-[18px] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col bg-white select-none p-2 pb-2 ${
                isExpanded
                  ? "border-graphite shadow-lg ring-1 ring-graphite/20"
                  : "border-divider/60 hover:border-graphite/50 hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {/* Photo Area with Concentric Radius: R_card = 18px, Inset = 8px -> R_photo = 10px */}
              <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden bg-surface border border-black/[0.04] shrink-0 group">
                <img
                  src={currentImg.src}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Title Bar Under Photo */}
              <div className="px-2 pt-3 pb-1 flex items-center justify-between gap-2 bg-white">
                <div className="min-w-0">
                  <h4 className="text-[13.5px] sm:text-[14px] font-bold text-graphite tracking-tight leading-snug font-heading">
                    {proj.title}
                  </h4>
                  {proj.type && (
                    <span className="text-[11px] text-iron line-clamp-1 mt-0.5">
                      {proj.type}
                    </span>
                  )}
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
                    className="overflow-hidden mt-2 rounded-[10px] border border-divider/40 bg-surface/70"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 flex flex-col gap-2 text-[12px]">
                      {/* Equipment */}
                      {proj.hardware && (
                        <div className="text-[11px]">
                          <span className="text-pewter block font-mono">Оборудование:</span>
                          <span className="text-graphite font-semibold">{proj.hardware}</span>
                        </div>
                      )}

                      {/* Details */}
                      {proj.details && (
                        <p className="text-iron text-[11px] leading-relaxed pt-2 border-t border-divider/30">
                          {proj.details}
                        </p>
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
      <div className="mb-6 pr-12">
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
// 4. PRIVACY POLICY VIEW (ФЗ-152 РФ & NDA Architecture)
// =========================================================================
function PrivacyPolicyView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto pb-12">
      {/* Intro Header */}
      <div className="mb-6 sm:mb-8 pr-12">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-graphite tracking-tight">
          Политика конфиденциальности и защиты данных
        </h3>
        <p className="text-[13px] text-iron mt-1 max-w-2xl leading-relaxed">
          Порядок обработки информации, защиты коммерческой тайны и режима неразглашения (NDA) при разработке и внедрении систем АСУТП.
        </p>
      </div>

      {/* Structured Legal Cards */}
      <div className="space-y-4">
        {/* Общие положения и оператор */}
        <div className="bg-white rounded-xl border border-divider/60 p-5 sm:p-6 shadow-2xs">
          <h4 className="text-[14px] sm:text-[15px] font-bold font-heading text-graphite tracking-tight mb-3">
            Общие положения и статус оператора
          </h4>
          <div className="space-y-2.5 text-[12.5px] sm:text-[13px] text-iron leading-relaxed">
            <p>
              Настоящая Политика определяет порядок обработки и защиты информации пользователей сайта{" "}
              <strong>ООО «Т3 - Автоматизация»</strong> («Оператор»), оставляющих заявки на расчет стоимости, скачивающих инженерные материалы или передающих технические задания.
            </p>
            <p>
              Оператор ставит важнейшей целью соблюдение прав и свобод человека при обработке его персональных данных, включая защиту прав на неприкосновенность частной жизни, коммерческую тайну и безопасность информации на объектах критической информационной инфраструктуры (КИИ).
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-pewter">
              <span className="px-2.5 py-1 rounded-[6px] bg-surface border border-divider/50">ИНН: 9734028824</span>
              <span className="px-2.5 py-1 rounded-[6px] bg-surface border border-divider/50">ОГРН: 1267700304178</span>
              <span className="px-2.5 py-1 rounded-[6px] bg-surface border border-divider/50">Москва / Самара</span>
            </div>
          </div>
        </div>

        {/* Категории обрабатываемых данных */}
        <div className="bg-white rounded-xl border border-divider/60 p-5 sm:p-6 shadow-2xs">
          <h4 className="text-[14px] sm:text-[15px] font-bold font-heading text-graphite tracking-tight mb-3">
            Категории обрабатываемых данных
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-surface/70 rounded-lg border border-divider/50">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-pewter font-semibold block mb-1">
                Контактные лица
              </span>
              <p className="text-[12px] text-graphite leading-relaxed">
                Номер мобильного или рабочего телефона, адрес электронной почты (e-mail), имя, должность и предприятие.
              </p>
            </div>

            <div className="p-3.5 bg-surface/70 rounded-lg border border-divider/50">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-pewter font-semibold block mb-1">
                Инженерные данные
              </span>
              <p className="text-[12px] text-graphite leading-relaxed">
                Схемы Э3, опросные листы, спецификации КИПиА, алгоритмы работы оборудования и файлы ТЗ, прикрепляемые к заявке.
              </p>
            </div>

            <div className="p-3.5 bg-surface/70 rounded-lg border border-divider/50">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-pewter font-semibold block mb-1">
                Реквизиты контрагента
              </span>
              <p className="text-[12px] text-graphite leading-relaxed">
                Карточка предприятия, ИНН, КПП, банковские счета для оформления коммерческих предложений и договоров.
              </p>
            </div>

            <div className="p-3.5 bg-surface/70 rounded-lg border border-divider/50">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-pewter font-semibold block mb-1">
                Технические Cookie
              </span>
              <p className="text-[12px] text-graphite leading-relaxed">
                Обезличенные данные о сессии для сохранения настроек калькулятора шкафов, выбранного языка и темы оформления.
              </p>
            </div>
          </div>
        </div>

        {/* Цели обработки и соглашение NDA */}
        <div className="bg-white rounded-xl border border-divider/60 p-5 sm:p-6 shadow-2xs">
          <h4 className="text-[14px] sm:text-[15px] font-bold font-heading text-graphite tracking-tight mb-3">
            Цели обработки и защита информации (NDA)
          </h4>

          <div className="space-y-3 text-[12.5px] sm:text-[13px] text-iron leading-relaxed">
            <p>
              Обработка данных осуществляется исключительно для подготовки сметной документации, расчета стоимости шкафов управления, подбора оборудования и выполнения пусконаладочных работ (ПНР).
            </p>

            <div className="p-4 bg-surface rounded-lg border-l-3 border-accent text-[12px] text-graphite">
              <strong className="font-semibold block text-graphite mb-1">
                Соглашение о неразглашении (NDA):
              </strong>
              Все передаваемые технологические схемы, алгоритмы работы установок и исходные коды считаются конфиденциальной информацией и защищены от передачи третьим лицам. До передачи рабочей документации по запросу заказчика оформляется двустороннее соглашение NDA.
            </div>
          </div>
        </div>

        {/* Безопасность и порядок отзыва */}
        <div className="bg-white rounded-xl border border-divider/60 p-5 sm:p-6 shadow-2xs">
          <h4 className="text-[14px] sm:text-[15px] font-bold font-heading text-graphite tracking-tight mb-3">
            Хранение данных и отзыв согласия
          </h4>

          <div className="space-y-2.5 text-[12.5px] sm:text-[13px] text-iron leading-relaxed">
            <p>
              Безопасность персональных данных обеспечивается правовыми, организационными и техническими мерами защиты (включая протокол шифрования SSL/TLS). Серверная инфраструктура и базы данных локализованы на территории Российской Федерации.
            </p>
            <p>
              Срок обработки является неограниченным до момента достижения целей обработки или отзыва согласия. Пользователь может в любой момент отозвать свое согласие, направив обращение на контактный email:{" "}
              <a
                href="mailto:info@t3-auto.com"
                className="font-mono font-semibold text-graphite hover:text-accent underline underline-offset-2 transition-colors"
              >
                info@t3-auto.com
              </a>{" "}
              или{" "}
              <a
                href="mailto:aleksey.ivanov@t3-auto.com"
                className="font-mono font-semibold text-graphite hover:text-accent underline underline-offset-2 transition-colors"
              >
                aleksey.ivanov@t3-auto.com
              </a>{" "}
              с пометкой «Отзыв согласия на обработку персональных данных».
            </p>
          </div>
        </div>
      </div>
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
  const [bottomMargin, setBottomMargin] = useState(16);
  const [copied, setCopied] = useState(false);

  // Track header bottom, mobile dock height and responsive margin
  useEffect(() => {
    const updateGeometry = () => {
      const isMobile = window.innerWidth < 768;
      const m = isMobile ? 12 : 20;
      setMargin(m);

      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderBottom(rect.bottom);
      }

      if (isMobile) {
        // Measure mobile bottom floating dock container if present
        const dockEl = document.getElementById("mobile-bottom-dock-container");
        if (dockEl) {
          const dockRect = dockEl.getBoundingClientRect();
          // Height of window minus top of dock gives the space occupied by dock from window bottom
          const dockHeightFromBottom = window.innerHeight - dockRect.top;
          // Equal distance to dock: space occupied by dock + margin
          setBottomMargin(dockHeightFromBottom + m);
        } else {
          // Standard bottom dock (16px bottom + ~48px dock + 12px margin = ~76px)
          setBottomMargin(76);
        }
      } else {
        setBottomMargin(m);
      }
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry);
    window.addEventListener("scroll", updateGeometry, { passive: true });
    // Also re-check on tick after dock renders
    const timer = setTimeout(updateGeometry, 50);
    return () => {
      clearTimeout(timer);
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
        modal: HeaderModalType;
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

          {/* Modal Container: z-[60], exactly margin distance from left, right, bottom (or bottom dock on mobile) and bottom of header */}
          <motion.div
            key="header-modal-card"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: `${headerBottom + margin}px`,
              bottom: `${bottomMargin}px`,
              left: `${margin}px`,
              right: `${margin}px`,
              zIndex: 60,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-divider/60 rounded-2xl md:rounded-[20px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative"
          >
            {/* Desktop Close Button (on mobile the close button is the separate bottom island next to dock) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть окно"
              className="hidden md:flex absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 items-center justify-center rounded-[8px] bg-white/95 hover:bg-graphite hover:text-white text-graphite border border-divider/60 backdrop-blur-xs transition-all hover:border-graphite active:scale-95 cursor-pointer shadow-2xs"
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

              {activeModal === "privacy" && <PrivacyPolicyView />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
