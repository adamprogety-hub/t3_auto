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
    stage: "Обследование",
    title: "Предпроектное обследование и\u00A0аудит",
    description: "Аудит действующей автоматики, выезд экспертов на\u00A0объект, сбор исходных данных и\u00A0формирование технического задания (ТЗ).",
    details: [
      "Обследование объекта и\u00A0анализ технологических схем (P&ID)",
      "Ревизия существующего оборудования КИПиА и\u00A0полевой сети",
      "Разработка и\u00A0согласование технического задания на\u00A0АСУТП, РСУ и\u00A0ПАЗ",
    ],
    deliverable: "Утверждённое ТЗ + отчёт обследования",
    icon: "/icons/process/01_audit_pid.webp",
  },
  {
    num: "02",
    stage: "Проектирование",
    title: "Разработка проектной документации",
    description: "Разделы АТХ, АСУТП, ПАЗ. Разработка эскизных проектов, рабочей документации и\u00A0спецификаций на\u00A0отечественное оборудование.",
    details: [
      "Спецификации оборудования из\u00A0реестров Минпромторга РФ",
      "Принципиальные схемы Э3, кабельные журналы по\u00A0ГОСТ 34/21",
      "Согласование проектных решений и\u00A0защита в\u00A0госэкспертизе",
    ],
    deliverable: "Комплект РД разделов АТХ / АСУТП / ПАЗ",
    icon: "/icons/process/02_eplan_design.webp",
  },
  {
    num: "03",
    stage: "Производство",
    title: "Цифровое производство и\u00A0поставка",
    description: "Сборка шкафов на\u00A0производственной базе в\u00A0Самаре (19 км). Электронный техпаспорт по\u00A0QR-коду, ОТК на\u00A0планшетах и\u00A0заводские испытания.",
    details: [
      "Шкафы АСУТП, АСУЭ, аналитики газов/жидкостей, ПТК и\u00A0РТК",
      "Проверка в\u00A0сертифицированных ЭТЛ и\u00A0метрологической лаборатории",
      "Фотофиксация узлов и\u00A0онлайн-доступ заказчика к\u00A0статусу сборки",
    ],
    deliverable: "Шкафы с паспортом и QR цифрового двойника",
    icon: "/icons/process/03_assembly_marking.webp",
  },
  {
    num: "04",
    stage: "Разработка ПО",
    title: "Программирование ПЛК, HMI и\u00A0SCADA",
    description: "Разработка прикладного ПО для\u00A0контроллеров и\u00A0диспетчеризации. Сквозное моделирование контуров регулирования и\u00A0защит ПАЗ на\u00A0стенде.",
    details: [
      "ПО для\u00A0ПТК «БАЗИС», «СУРА», TREI, АБАК, ONI",
      "Интеграция с\u00A0платформой «КАСКАД Цифра» (ОРС UA, БДРВ)",
      "Стендовая симуляция алгоритмов до\u00A0выезда на\u00A0объект",
    ],
    deliverable: "Отлаженное ПО + карты регистров I/O",
    icon: "/icons/process/04_stand_test_48h.webp",
  },
  {
    num: "05",
    stage: "Шефмонтаж и ПНР",
    title: "Пусконаладочные работы на\u00A0объекте",
    description: "Выезд инженерных бригад по\u00A0всей России: контроль монтажа, наладка контуров, юстировка датчиков и\u00A0комплексные испытания под\u00A0нагрузкой.",
    details: [
      "Прозвонка внешних кабельных линий и\u00A0проверка полевых датчиков",
      "Настройка контуров регулирования и\u00A0комплексное опробование",
      "Оформление протоколов ПНР и\u00A0инструктаж персонала заказчика",
    ],
    deliverable: "Акт комплексных испытаний и опробования",
    icon: "/icons/process/05_field_pnr.webp",
  },
  {
    num: "06",
    stage: "Сдача и Сервис",
    title: "Ввод в\u00A0эксплуатацию и\u00A0сопровождение",
    description: "Помощь во\u00A0взаимодействии с\u00A0надзорными органами (Ростехнадзор), сдача исполнительной документации и\u00A0гарантийный сервис 24/7.",
    details: [
      "Полный комплект исполнительной документации по\u00A0ГОСТ",
      "Сопровождение проверок принимающих организаций",
      "Пожизненный архив проекта: КД доступна даже при\u00A0утере заказчиком",
    ],
    deliverable: "Ввод в эксплуатацию + гарантийный сервис",
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
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-[1.12] tracking-tight">
            Ваши этапы — наш раздел АСУТП
          </h2>
          <p className="mt-3 text-iron text-[14.5px] leading-relaxed">
            Работаем субподрядчиком по разделу АСУТП или техническим партнёром уже на этапе тендера и сметы.
          </p>
        </div>

        {/* Clean Synchronous Carousel Stage */}
        <div
          className="mt-12 relative w-full flex items-center justify-center py-4 select-none min-h-[580px] md:min-h-[620px]"
        >
          {steps.map((step, i) => {
            let offset = (i - activeIndex + count) % count;
            if (offset > count / 2) offset -= count;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 1;

            // Planar layout coordinates without 3D perspective distortion
            let targetX = 0;
            let targetScale = 1;
            let targetOpacity = 0;
            let targetZIndex = 0;

            if (isDesktop) {
              if (isCenter) {
                targetX = 0;
                targetScale = 1;
                targetOpacity = 1;
                targetZIndex = 20;
              } else if (isLeft) {
                targetX = -400;
                targetScale = 0.92;
                targetOpacity = 0.45;
                targetZIndex = 10;
              } else if (isRight) {
                targetX = 400;
                targetScale = 0.92;
                targetOpacity = 0.45;
                targetZIndex = 10;
              } else if (offset < -1) {
                targetX = -560;
                targetScale = 0.8;
                targetOpacity = 0;
                targetZIndex = 0;
              } else {
                targetX = 560;
                targetScale = 0.8;
                targetOpacity = 0;
                targetZIndex = 0;
              }
            } else {
              // Mobile & Tablet
              if (isCenter) {
                targetX = 0;
                targetScale = 1;
                targetOpacity = 1;
                targetZIndex = 20;
              } else if (offset < 0) {
                targetX = -320;
                targetScale = 0.9;
                targetOpacity = 0;
                targetZIndex = 0;
              } else {
                targetX = 320;
                targetScale = 0.9;
                targetOpacity = 0;
                targetZIndex = 0;
              }
            }

            return (
              <motion.div
                key={step.num}
                animate={{
                  x: targetX,
                  scale: targetScale,
                  opacity: targetOpacity,
                  zIndex: targetZIndex,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
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
                className={`absolute w-[92vw] max-w-[450px] h-[550px] md:h-[580px] px-8 pb-8 pt-4 md:px-9 md:pb-9 md:pt-5 rounded-[14px] bg-white border border-divider/40 shadow-[0_12px_36px_-6px_rgba(19,18,16,0.06),0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between overflow-hidden ${
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
