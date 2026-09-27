"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProblemItem {
  id: string;
  code: string;
  index: string;
  title: string;
  description: string;
  tag: string;
  impact: string;
  solution: string;
  hardwareAffected: string;
  icon: string;
}

const problems: ProblemItem[] = [
  {
    id: "p1",
    code: "SYS_ERR // 01",
    index: "01",
    title: "Отсутствие согласования схем до\u00A0начала работ",
    description: "Ошибки в\u00A0перечне сигналов и\u00A0нестыковки в\u00A0чертежах кочуют в\u00A0монтаж без\u00A0входного аудита, вызывая срыв сроков запуска и\u00A0удорожание шкафа.",
    tag: "Схемотехника",
    impact: "Удорожание шкафа до\u00A0+30% и\u00A0простой монтажников на\u00A0объекте",
    solution: "Сквозной аудит адресации I/O до\u00A0сборки и\u00A0закупки кабелей",
    hardwareAffected: "Модули ввода-вывода ПЛК, клеммные ряды",
    icon: "/icons/problems/01_schematics.webp",
  },
  {
    id: "p2",
    code: "SYS_ERR // 02",
    index: "02",
    title: "Преждевременный износ и\u00A0поломки оборудования",
    description: "Из-за неотлаженных алгоритмов управления насосы и\u00A0горелки работают рывками, уходят в\u00A0аварийный стоп и\u00A0вырабатывают ресурс за\u00A0год вместо десяти лет.",
    tag: "Алгоритмы ПЛК",
    impact: "Дорогостоящий ремонт агрегатов и\u00A0внеплановые простои объекта",
    solution: "ПИД-регулирование с\u00A0плавной ротацией и\u00A0модуляцией мощности",
    hardwareAffected: "Насосные группы, приводы, горелочные устройства",
    icon: "/icons/problems/02_boiler_pump.webp",
  },
  {
    id: "p3",
    code: "SYS_ERR // 03",
    index: "03",
    title: "Размытая ответственность подрядчиков",
    description: "Когда проектирование, сборку шкафа и\u00A0наладку делают разные компании, за\u00A0запуск системы никто не\u00A0отвечает. При сбоях вину перекладывают на\u00A0чужой монтаж, а\u00A0за\u00A0простои платит заказчик.",
    tag: "Организация",
    impact: "Месяцы перекладывания вины между сторонними подрядчиками",
    solution: "Единая сквозная ответственность и\u00A0гарантия ACEngine под\u00A0ключ",
    hardwareAffected: "Стыковка силовых и\u00A0слаботочных цепей",
    icon: "/icons/problems/03_assembly_test.webp",
  },
  {
    id: "p4",
    code: "SYS_ERR // 04",
    index: "04",
    title: "Сбои удалённого мониторинга и\u00A0связи",
    description: "Зависание связи и\u00A0ложные аварийные тревоги: дежурный персонал видит устаревшие данные и\u00A0не\u00A0может оперативно контролировать объект на\u00A0расстоянии.",
    tag: "Диспетчеризация",
    impact: "Слепые зоны на\u00A0экране диспетчера во\u00A0время нештатных ситуаций",
    solution: "Резервирование двух SIM-карт + локальный кольцевой буфер",
    hardwareAffected: "Промышленные GSM/LTE шлюзы, каналы связи Modbus TCP",
    icon: "/icons/problems/04_scada_telemetry.webp",
  },
  {
    id: "p5",
    code: "SYS_ERR // 05",
    index: "05",
    title: "Шкафы-«чёрные ящики» без\u00A0документации",
    description: "Отсутствие маркировки проводников, закрытые паролями функциональные блоки и\u00A0потерянные схемы\u00A0Э3. Любая доработка требует долгого реверс-инжиниринга.",
    tag: "Документация",
    impact: "Невозможность оперативного ремонта дежурным персоналом",
    solution: "Полный комплект схем\u00A0Э3, кабельный журнал и\u00A0заводская маркировка цепей",
    hardwareAffected: "Контроллерное ПО, принципиальные электросхемы",
    icon: "/icons/problems/05_documentation.webp",
  },
  {
    id: "p6",
    code: "SYS_ERR // 06",
    index: "06",
    title: "Затянутые пусконаладочные работы",
    description: "Из-за отсутствия контроля качества и\u00A0заводской проверки перед отправкой клиенту ошибки выявляются уже на\u00A0объекте, срывая сроки сдачи.",
    tag: "Пусконаладка",
    impact: "Срыв сроков сдачи объекта, штрафы и\u00A0простой монтажных бригад",
    solution: "48-часовое комплексное тестирование цепей и\u00A0симуляция работы ПЛК до\u00A0отгрузки",
    hardwareAffected: "Интеграция ПЛК, датчиков и\u00A0частотных приводов",
    icon: "/icons/problems/06_commissioning.webp",
  },
];

export function Problems() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const prev = () => {
    setActiveIndex((current) => (current > 0 ? current - 1 : problems.length - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current < problems.length - 1 ? current + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const count = problems.length;

  return (
    <section className="py-20 md:py-28 bg-surface overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight">
            С{"\u00A0"}какими трудностями сталкиваются заказчики на{"\u00A0"}объекте
          </h2>
        </div>

        {/* Synchronous 3D Carousel Stage */}
        <div
          className="mt-12 relative w-full flex items-center justify-center py-4 select-none min-h-[580px] md:min-h-[620px]"
          style={{ perspective: 1200 }}
        >
          {problems.map((problem, i) => {
            // Wrap-around offset calculation: -1 (left), 0 (center), 1 (right), etc.
            let offset = (i - activeIndex + count) % count;
            if (offset > count / 2) offset -= count;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 1;

            // Desktop layout coordinates
            let targetX = 0;
            let targetRotateY = 0;
            let targetScale = 1;
            let targetOpacity = 0;
            let targetZIndex = 0;

            if (isDesktop) {
              if (isCenter) {
                targetX = 0;
                targetRotateY = 0;
                targetScale = 1;
                targetOpacity = 1;
                targetZIndex = 20;
              } else if (isLeft) {
                targetX = -380;
                targetRotateY = 22;
                targetScale = 0.88;
                targetOpacity = 0.38;
                targetZIndex = 10;
              } else if (isRight) {
                targetX = 380;
                targetRotateY = -22;
                targetScale = 0.88;
                targetOpacity = 0.38;
                targetZIndex = 10;
              } else if (offset < -1) {
                targetX = -540;
                targetRotateY = 35;
                targetScale = 0.75;
                targetOpacity = 0;
                targetZIndex = 0;
              } else {
                targetX = 540;
                targetRotateY = -35;
                targetScale = 0.75;
                targetOpacity = 0;
                targetZIndex = 0;
              }
            } else {
              // Mobile & Tablet
            if (isCenter) {
                targetX = 0;
                targetRotateY = 0;
                targetScale = 1;
                targetOpacity = 1;
                targetZIndex = 20;
              } else if (offset < 0) {
                targetX = -320;
                targetRotateY = 28;
                targetScale = 0.85;
                targetOpacity = 0;
                targetZIndex = 0;
              } else {
                targetX = 320;
                targetRotateY = -28;
                targetScale = 0.85;
                targetOpacity = 0;
                targetZIndex = 0;
              }
            }

            return (
              <motion.div
                key={problem.id}
                animate={{
                  x: targetX,
                  rotateY: targetRotateY,
                  scale: targetScale,
                  opacity: targetOpacity,
                  zIndex: targetZIndex,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1], // Signature Metro deceleration curve
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -45 || info.velocity.x < -250) next();
                  else if (info.offset.x > 45 || info.velocity.x > 250) prev();
                }}
                onClick={() => {
                  if (isLeft) prev();
                  if (isRight) next();
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: offset < 0 ? "right center" : offset > 0 ? "left center" : "center center",
                }}
                className={`absolute w-[92vw] max-w-[450px] h-[550px] md:h-[580px] px-8 pb-8 pt-4 md:px-9 md:pb-9 md:pt-5 rounded-[14px] bg-white shadow-[0_20px_50px_-12px_rgba(19,18,16,0.09),0_6px_20px_-4px_rgba(19,18,16,0.04)] flex flex-col justify-between overflow-hidden ${
                  isCenter
                    ? "cursor-grab active:cursor-grabbing pointer-events-auto"
                    : isVisible
                    ? "cursor-pointer hover:opacity-60 transition-opacity pointer-events-auto"
                    : "pointer-events-none"
                }`}
              >
                {/* Dynamic 3D Depth Shading Overlay */}
                <motion.div
                  animate={{ opacity: isCenter ? 0 : 0.45 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-graphite/20 backdrop-blur-[0.5px] pointer-events-none z-30"
                />

                {/* Corner Navigation Arrows in Rectangular Rounded Outline */}
                <div className="absolute top-4 left-4 right-4 md:top-5 md:left-5 md:right-5 z-40 flex items-center justify-between pointer-events-none">
                  {/* Prev Button (Top-Left) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    aria-label="Предыдущий слайд"
                    title="Предыдущий слайд"
                    className={`group/nav-btn w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-[8px] md:rounded-[9px] border border-divider/45 bg-white/95 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 backdrop-blur-xs transition-all duration-200 shadow-[0_2px_8px_rgba(19,18,16,0.04)] hover:shadow-sm active:scale-95 cursor-pointer ${
                      isCenter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-40"
                    }`}
                  >
                    <ArrowLeft strokeWidth={1.5} className="w-4 h-4 transition-transform duration-200 group-hover/nav-btn:-translate-x-0.5" />
                  </button>

                  {/* Next Button (Top-Right) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    aria-label="Следующий слайд"
                    title="Следующий слайд"
                    className={`group/nav-btn w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-[8px] md:rounded-[9px] border border-divider/45 bg-white/95 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 backdrop-blur-xs transition-all duration-200 shadow-[0_2px_8px_rgba(19,18,16,0.04)] hover:shadow-sm active:scale-95 cursor-pointer ${
                      isCenter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-40"
                    }`}
                  >
                    <ArrowRight strokeWidth={1.5} className="w-4 h-4 transition-transform duration-200 group-hover/nav-btn:translate-x-0.5" />
                  </button>
                </div>

                {/* Upper Half: 3D Isometric Icon */}
                <div className="relative z-10 w-full flex-1 flex items-center justify-center min-h-0 mb-7 md:mb-8">
                  <div className="relative w-full h-full max-h-[230px] md:max-h-[250px] flex items-center justify-center">
                    <img
                      src={problem.icon}
                      alt={problem.title}
                      className="max-h-full max-w-full object-contain pointer-events-none select-none drop-shadow-[0_16px_32px_rgba(19,18,16,0.08)]"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Lower Half: Problem Content */}
                <div className="relative z-10 flex flex-col justify-end">
                  {/* Problem Headline */}
                  <h3 className="text-graphite text-2xl md:text-[25px] font-extrabold tracking-tight leading-snug">
                    {problem.title}
                  </h3>

                  {/* Problem Description */}
                  <p className="mt-3.5 text-iron text-[14px] md:text-[14.5px] leading-relaxed">
                    {problem.description}
                  </p>

                  <div className="mt-4 text-[12px] font-mono text-pewter">
                    Узел риска: <span className="text-graphite font-medium">{problem.hardwareAffected}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimal Clean Pagination Stepper (Dashes) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {problems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Перейти к карточке ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? "w-8 bg-graphite"
                  : "w-2.5 bg-divider hover:bg-pewter"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
