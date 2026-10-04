"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProcessStep {
  num: string;
  stage: string;
  title: string;
  description: string;
  details: string[];
  deliverable: string;
  icon: string;
}

const steps: ProcessStep[] = [
  {
    num: "01",
    stage: "Аудит проекта",
    title: "Входной аудит проекта",
    description: "Анализ технологической схемы, циклограммы и\u00A0опросных листов. Находим и\u00A0устраняем ошибки в\u00A0схемах до\u00A0закупки оборудования.",
    details: [
      "Проверка схем автоматизации и\u00A0опросных листов заказчика",
      "Расчет электрических нагрузок и\u00A0сечений кабелей",
      "Устранение ошибок и\u00A0нестыковок в\u00A0проекте до\u00A0закупки",
    ],
    deliverable: "Инженерное заключение + опросный лист",
    icon: "/icons/process/01_audit_pid.webp",
  },
  {
    num: "02",
    stage: "Проект",
    title: "Проектирование схем\u00A0Э3",
    description: "Разработка принципиальных электрических схем, подбор и\u00A0расчет защитных аппаратов, кабельный журнал и\u00A0спецификация оборудования.",
    details: [
      "Схемы Э3 в\u00A0EPLAN Pro Panel и\u00A0AutoCAD",
      "Спецификация оборудования и\u00A0защитных аппаратов",
      "Кабельный журнал и\u00A0таблица внешних подключений",
    ],
    deliverable: "Комплект схем Э3 с\u00A0кабельным журналом",
    icon: "/icons/process/02_eplan_design.webp",
  },
  {
    num: "03",
    stage: "Сборка",
    title: "Сборка шкафов управления",
    description: "Монтаж на\u00A0собственном участке в\u00A0Москве. Аккуратная компоновка, маркировка проводников по\u00A0схеме и\u00A0соблюдение высокой культуры монтажа.",
    details: [
      "Корпуса DKC, Провенто или аналоги под\u00A0условия объекта (IP54/IP65)",
      "Грамотное разделение силовых и\u00A0сигнальных линий по\u00A0лоткам",
      "Четкая маркировка проводников и\u00A0клеммных рядов по\u00A0схеме",
    ],
    deliverable: "Собранный шкаф с\u00A0заводским паспортом",
    icon: "/icons/process/03_assembly_marking.webp",
  },
  {
    num: "04",
    stage: "Испытания",
    title: "Проверка на\u00A0соответствие ТЗ",
    description: "Комплексная проверка шкафа на\u00A0собственном участке в\u00A0Москве. Подача питания, прозвонка цепей и\u00A0программная симуляция алгоритмов для\u00A0подтверждения соответствия техническому заданию.",
    details: [
      "Прозвонка силовых и\u00A0контрольных цепей",
      "Подача питания и\u00A0тестирование индикации",
      "Симуляция работы алгоритмов управления по\u00A0ТЗ",
    ],
    deliverable: "Протокол заводской проверки по ТЗ",
    icon: "/icons/process/04_stand_test_48h.webp",
  },
  {
    num: "05",
    stage: "ПНР",
    title: "Шефмонтаж и\u00A0пусконаладка (ПНР)",
    description: "Выезд инженеров на\u00A0объект по\u00A0всей\u00A0России. Проверка внешних подключений, юстировка исполнительных механизмов и\u00A0настройка регуляторов под\u00A0нагрузкой.",
    details: [
      "Выезд инженерной группы на\u00A0площадку заказчика",
      "Прозвонка кабельных трасс и\u00A0проверка сигналов КИПиА",
      "Настройка ПИД-регуляторов и\u00A0испытания под\u00A0нагрузкой",
    ],
    deliverable: "Акт комплексного опробования и пуска",
    icon: "/icons/process/05_field_pnr.webp",
  },
  {
    num: "06",
    stage: "Сдача",
    title: "Сдача объекта и\u00A0документы",
    description: "Передаем схемы с\u00A0фактическими правками после монтажа, паспорта и\u00A0инструкции. Если требуется\u00A0— помогаем со\u00A0сдачей объекта в\u00A0эксплуатацию.",
    details: [
      "Исполнительные схемы с\u00A0фактическими правками",
      "Паспорт шкафа и\u00A0понятные инструкции для\u00A0персонала",
      "Помощь при\u00A0сдаче объекта в\u00A0эксплуатацию",
    ],
    deliverable: "Исполнительная документация и акты сдачи",
    icon: "/icons/process/06_handover_open_source.webp",
  },
];

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const prev = () => {
    setActiveIndex((current) => (current > 0 ? current - 1 : steps.length - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current < steps.length - 1 ? current + 1 : 0));
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

  const count = steps.length;

  return (
    <section id="process" className="py-20 md:py-28 bg-surface overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1.12] tracking-tight">
            Технологический цикл внедрения АСУ{"\u00A0"}ТП
          </h2>
        </div>

        {/* Synchronous 3D Carousel Stage */}
        <div
          className="mt-12 relative w-full flex items-center justify-center py-4 select-none min-h-[580px] md:min-h-[620px]"
          style={{ perspective: 1200 }}
        >
          {steps.map((step, i) => {
            let offset = (i - activeIndex + count) % count;
            if (offset > count / 2) offset -= count;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 1;

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
                key={step.num}
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
                    aria-label="Предыдущий этап"
                    title="Предыдущий этап"
                    className={`group/nav-btn w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-[8px] md:rounded-[10px] border border-divider/45 bg-white/95 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 backdrop-blur-xs transition-all duration-200 shadow-[0_2px_8px_rgba(19,18,16,0.04)] hover:shadow-sm active:scale-95 cursor-pointer ${
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
                    aria-label="Следующий этап"
                    title="Следующий этап"
                    className={`group/nav-btn w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-[8px] md:rounded-[10px] border border-divider/45 bg-white/95 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 backdrop-blur-xs transition-all duration-200 shadow-[0_2px_8px_rgba(19,18,16,0.04)] hover:shadow-sm active:scale-95 cursor-pointer ${
                      isCenter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-40"
                    }`}
                  >
                    <ArrowRight strokeWidth={1.5} className="w-4 h-4 transition-transform duration-200 group-hover/nav-btn:translate-x-0.5" />
                  </button>
                </div>

                {/* Upper Half: 3D Process Icon */}
                <div className="relative z-10 w-full flex-1 flex items-center justify-center min-h-0 mb-6 md:mb-7">
                  <div className="relative w-full h-full max-h-[220px] md:max-h-[240px] flex items-center justify-center">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="max-h-full max-w-full object-contain pointer-events-none select-none drop-shadow-[0_16px_32px_rgba(19,18,16,0.08)]"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Lower Half: Step Content */}
                <div className="relative z-10 flex flex-col justify-end">
                  {/* Headline */}
                  <h3 className="text-graphite text-2xl md:text-[25px] font-extrabold tracking-tight leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3.5 text-iron text-[14px] md:text-[14.5px] leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="mt-4 space-y-2">
                    {step.details.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[12.5px] text-graphite/90">
                        <span className="text-pewter shrink-0 font-light select-none">—</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimal Clean Pagination Stepper (Dashes) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Перейти к этапу ${step.num}`}
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
