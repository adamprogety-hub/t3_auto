"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ReasonItem {
  title: string;
  badge: string;
  description: string;
  icon: string;
}

const reasons: ReasonItem[] = [
  {
    title: "Генподрядчик видит каждый шкаф (QR-код)",
    badge: "Цифровой двойник",
    description:
      "QR-код на\u00A0корпусе каждого шкафа открывает его электронный техпаспорт: схемы, протоколы проверок и\u00A0статус сборки прямо со\u00A0смартфона или\u00A0планшета.",
    icon: "/icons/why-us/01.png",
  },
  {
    title: "Сборка и\u00A0ОТК на\u00A0защищённых планшетах",
    badge: "Мобильные места ОТК",
    description:
      "Пошаговый план сборки по\u00A0каждому изделию. Журнал изменений КД, фотофиксация узлов и\u00A0дефектов до\u00A0отгрузки исключают человеческий фактор.",
    icon: "/icons/why-us/02.png",
  },
  {
    title: "Сертифицированные ЭТЛ и\u00A0лаборатории",
    badge: "150+ поверенных приборов",
    description:
      "Собственные сертифицированные электротехническая и\u00A0метрологическая лаборатории с\u00A0контролем поверок приборов гарантируют прохождение госэкспертизы.",
    icon: "/icons/why-us/03.png",
  },
  {
    title: "Свой сервер и\u00A0доверенный контур",
    badge: "Безопасность КИИ",
    description:
      "Хранение проектных данных и\u00A0ревизий КД в\u00A0защищённом контуре с\u00A0разграничением прав доступа. Полная безопасность данных заказчика.",
    icon: "/icons/why-us/04.png",
  },
  {
    title: "Пожизненный архив выполненных проектов",
    badge: "База документации",
    description:
      "Даже если у\u00A0заказчика утеряна документация спустя годы эксплуатации, проектная база Т3 позволяет восстановить и\u00A0модернизировать объект в\u00A0сжатые сроки.",
    icon: "/icons/why-us/05.png",
  },
];

export function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const prev = () => {
    setActiveIndex((current) => (current > 0 ? current - 1 : reasons.length - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current < reasons.length - 1 ? current + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") prev();
      if (e.key === "ArrowDown") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Autoplay every 5s, pause on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, activeIndex]);

  const count = reasons.length;

  return (
    <section id="about" className="bg-graphite lg:bg-surface-warm">
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-0">
        {/* Left — dark column with rounded bottom on desktop, flat on mobile to connect with Services */}
        <div className="bg-graphite p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center text-white rounded-none lg:rounded-b-[16px] relative z-10">
          <h2 className="text-white text-[clamp(1.4rem,2.2vw,2.15rem)] font-bold leading-[1.15] tracking-tight">
            Инжиниринговый
            <br />
            центр АСУТП:
            <br />
            команда и{"\u00A0"}ресурсы
          </h2>

          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-4 my-2">
            <div>
              <div className="text-2xl font-black text-[#E66826]">3 года</div>
              <div className="text-[11px] text-white/50 leading-tight mt-0.5">слаженная работа команды</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">50</div>
              <div className="text-[11px] text-white/50 leading-tight mt-0.5">ведущих инженеров</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">50+</div>
              <div className="text-[11px] text-white/50 leading-tight mt-0.5">сданных объектов</div>
            </div>
          </div>

          <p className="mt-4 text-white/70 text-[13.5px] leading-relaxed">
            Команда объединяет ведущих специалистов из{"\u00A0"}ключевых проектных институтов и{"\u00A0"}системных интеграторов страны.
          </p>

          <div className="mt-4 space-y-1.5 text-[12px] font-mono text-white/60">
            <div>• <strong className="text-white">Москва:</strong> управление проектами, проектирование по РФ</div>
            <div>• <strong className="text-white">Самара (Волга):</strong> Нефтегаз, АПК, производство 19 км</div>
            <div>• <strong className="text-white">Челябинск (Урал):</strong> Добыча, ТЭК, металлургия</div>
          </div>
        </div>

        {/* Right — vertical carousel with clean brutalist corners */}
        <div className="bg-graphite">
          <div
            className="bg-surface-warm w-full h-full relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 select-none overflow-hidden min-h-[440px] sm:min-h-[480px] md:min-h-[500px] lg:min-h-[520px] rounded-t-[16px] lg:rounded-t-[20px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          {/* Planar Stage */}
          <div
            className="relative w-full h-[370px] sm:h-[400px] md:h-[450px] flex items-center justify-center"
          >
            {reasons.map((reason, i) => {
              // Wrap-around offset calculation: -1 (top), 0 (center), 1 (bottom), etc.
              let offset = (i - activeIndex + count) % count;
              if (offset > count / 2) offset -= count;

              const isCenter = offset === 0;
              const isTop = offset === -1;
              const isBottom = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              // Planar layout coordinates without 3D perspective distortion
              let targetY = 0;
              let targetScale = 1;
              let targetOpacity = 0;
              let targetZIndex = 0;

              if (isDesktop) {
                if (isCenter) {
                  targetY = 0;
                  targetScale = 1;
                  targetOpacity = 1;
                  targetZIndex = 20;
                } else if (isTop) {
                  targetY = -120;
                  targetScale = 0.92;
                  targetOpacity = 0.45;
                  targetZIndex = 10;
                } else if (isBottom) {
                  targetY = 120;
                  targetScale = 0.92;
                  targetOpacity = 0.45;
                  targetZIndex = 10;
                } else if (offset < -1) {
                  targetY = -210;
                  targetScale = 0.8;
                  targetOpacity = 0;
                  targetZIndex = 0;
                } else {
                  targetY = 210;
                  targetScale = 0.8;
                  targetOpacity = 0;
                  targetZIndex = 0;
                }
              } else {
                // Mobile & Tablet
                if (isCenter) {
                  targetY = 0;
                  targetScale = 1;
                  targetOpacity = 1;
                  targetZIndex = 20;
                } else if (isTop) {
                  targetY = -92;
                  targetScale = 0.92;
                  targetOpacity = 0.45;
                  targetZIndex = 10;
                } else if (isBottom) {
                  targetY = 92;
                  targetScale = 0.92;
                  targetOpacity = 0.45;
                  targetZIndex = 10;
                } else if (offset < -1) {
                  targetY = -160;
                  targetScale = 0.8;
                  targetOpacity = 0;
                  targetZIndex = 0;
                } else {
                  targetY = 160;
                  targetScale = 0.8;
                  targetOpacity = 0;
                  targetZIndex = 0;
                }
              }

              return (
                <motion.div
                  key={reason.title}
                  animate={{
                    y: targetY,
                    scale: targetScale,
                    opacity: targetOpacity,
                    zIndex: targetZIndex,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  drag={isCenter ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.y < -40 || info.velocity.y < -220) next();
                    else if (info.offset.y > 40 || info.velocity.y > 220) prev();
                  }}
                  onClick={() => {
                    if (isTop) prev();
                    if (isBottom) next();
                  }}
                  className={`absolute w-[calc(100vw-36px)] max-w-[560px] md:max-w-[620px] lg:max-w-[580px] xl:max-w-[640px] h-[145px] sm:h-[160px] md:h-[175px] rounded-[14px] bg-white border border-divider/40 shadow-[0_12px_36px_-6px_rgba(19,18,16,0.06),0_2px_8px_rgba(0,0,0,0.02)] flex overflow-hidden ${
                    isCenter
                      ? "cursor-grab active:cursor-grabbing pointer-events-auto"
                      : isVisible
                      ? "cursor-pointer hover:opacity-60 transition-opacity pointer-events-auto"
                      : "pointer-events-none"
                  }`}
                >
                  {/* Dynamic 3D Depth Shading Overlay (matches process.tsx / problems.tsx) */}
                  <motion.div
                    animate={{ opacity: isCenter ? 0 : 0.45 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-graphite/20 backdrop-blur-[0.5px] pointer-events-none z-30"
                  />

                  {/* Left Side: 3D Icon, bottom-anchored, enlarged on mobile with slight left bleed */}
                  <div className="w-[35%] sm:w-[32%] md:w-[30%] shrink-0 h-full bg-surface-card relative overflow-hidden">
                    <img
                      src={reason.icon}
                      alt={reason.title}
                      draggable={false}
                      className="absolute bottom-0 -left-2.5 sm:left-[4%] w-[114%] sm:w-[92%] max-h-[104%] sm:max-h-[92%] object-contain object-bottom pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(19,18,16,0.08)]"
                    />
                  </div>

                  {/* Center Area: Reason Content — Only Title with Right Clearance */}
                  <div className="flex-1 p-3.5 sm:p-5 md:p-6 pr-13 sm:pr-15 md:pr-18 flex flex-col justify-center overflow-hidden">
                    <h3 className="text-graphite text-[14px] sm:text-[16px] md:text-[19px] font-extrabold tracking-tight leading-snug font-heading">
                      {reason.title}
                    </h3>
                  </div>

                  {/* Top-Right Corner Navigation Arrow (Arrow Up) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    aria-label="Предыдущий слайд"
                    title="Предыдущий слайд"
                    className={`group/up-btn absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-[8px] border border-divider/45 bg-white/95 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 backdrop-blur-xs transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer ${
                      isCenter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <ArrowUp strokeWidth={1.5} className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/up-btn:-translate-y-0.5" />
                  </button>

                  {/* Bottom-Right Corner Navigation Arrow (Arrow Down) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    aria-label="Следующий слайд"
                    title="Следующий слайд"
                    className={`group/down-btn absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-[8px] border border-divider/45 bg-white/95 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 backdrop-blur-xs transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer ${
                      isCenter ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <ArrowDown strokeWidth={1.5} className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/down-btn:translate-y-0.5" />
                  </button>
                </motion.div>
              );
            })}

            {/* Vertical Dash Stepper (Desktop only) */}
            <div className="hidden lg:flex absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-1.5">
              {reasons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Перейти к пункту 0${idx + 1}`}
                  className={`w-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "h-8 bg-graphite"
                      : "h-2.5 bg-divider hover:bg-pewter"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Horizontal Dash Stepper (Mobile & Tablet only) */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-4 z-30">
            {reasons.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Перейти к пункту 0${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-7 bg-graphite"
                    : "w-2 bg-divider hover:bg-pewter"
                }`}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
