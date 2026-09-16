"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProcessStep {
  num: string;
  stage: string;
  title: string;
  description: string;
  details: string[];
  deliverable: string;
  duration: string;
  icon: string;
}

const steps: ProcessStep[] = [
  {
    num: "01",
    stage: "Аудит ТХ",
    title: "Входной аудит ТХ и P&ID",
    description: "Анализ технологической схемы, циклограммы и опросных листов. Выявляем схемотехнические коллизии до закупки оборудования.",
    details: [
      "Проверка P&ID схем и опросных листов заказчика",
      "Расчет электрических нагрузок и сечений кабелей",
      "Устранение схемотехнических коллизий до закупки",
    ],
    deliverable: "Инженерное заключение + опросный лист",
    duration: "1–2 дня",
    icon: "/icons/process/01_audit_pid.png",
  },
  {
    num: "02",
    stage: "Проект",
    title: "Проектирование Э3 в EPLAN",
    description: "Разработка принципиальных схем по ГОСТ 21.408. Расчет защитных аппаратов, кабельный журнал и адресация сигналов I/O.",
    details: [
      "Схемы Э3 в EPLAN Pro Panel и AutoCAD",
      "Спецификация аппаратуры по ГОСТ 21.408",
      "Таблица адресации I/O и карта регистров Modbus/OPC",
    ],
    deliverable: "Комплект проектной документации Э3",
    duration: "3–7 дней",
    icon: "/icons/process/02_eplan_design.png",
  },
  {
    num: "03",
    stage: "Сборка",
    title: "Сборка и маркировка ШУ",
    description: "Монтаж на собственном участке в Москве. Заводская термотрансферная маркировка проводников и клеммных рядов строго по ПУЭ.",
    details: [
      "Монтаж в корпусах DKC / Rittal со степенью IP54/IP65",
      "Термотрансферная маркировка проводов и клеммников",
      "Гребенчатая разводка сигнальных и силовых линий",
    ],
    deliverable: "Собранный шкаф с заводским паспортом",
    duration: "5–10 дней",
    icon: "/icons/process/03_assembly_marking.png",
  },
  {
    num: "04",
    stage: "Стенд",
    title: "48ч стендовые испытания",
    description: "Прогон шкафа под имитационной нагрузкой в Москве. Подача сигналов с калибратора датчиков и 100% верификация противоаварийной защиты (ПАЗ).",
    details: [
      "48-часовой стендовый прогон под нагрузкой",
      "Симуляция аварийных сценариев (обрыв, КЗ, перегрев)",
      "100% верификация контуров блокировок и ПАЗ",
    ],
    deliverable: "Протокол стендовых испытаний и ОТК",
    duration: "48 часов",
    icon: "/icons/process/04_stand_test_48h.png",
  },
  {
    num: "05",
    stage: "ПНР",
    title: "Шефмонтаж и горячая ПНР",
    description: "Выезд инженеров на объект по всей России. Юстировка исполнительных механизмов, калибровка КИПиА и тонкая настройка ПИД-контуров.",
    details: [
      "Выезд инженерной группы на площадку заказчика",
      "Прозвонка кабельных трасс и юстировка КИПиА",
      "Тонкая настройка ПИД-регуляторов под гидравлику",
    ],
    deliverable: "Акт комплексного опробования и пуска",
    duration: "2–5 дней",
    icon: "/icons/process/05_field_pnr.png",
  },
  {
    num: "06",
    stage: "Сдача",
    title: "Сдача и открытые исходники",
    description: "Передача исполнительной документации, открытых проектов ПЛК без сервисных паролей и инструктаж дежурных инженеров.",
    details: [
      "Передача проектов CoDeSys / MasterSCADA без паролей",
      "Исполнительные схемы с фактическими правками",
      "Инструктаж и регламенты для дежурной службы",
    ],
    deliverable: "Полные исходники ПО + гарантия 12 мес.",
    duration: "1 день",
    icon: "/icons/process/06_handover_open_source.png",
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
            Технологический цикл внедрения АСУ ТП
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
