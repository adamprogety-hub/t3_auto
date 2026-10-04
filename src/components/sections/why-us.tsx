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
    title: "Заводской контроль и\u00A0запуск по\u00A0всей\u00A0РФ",
    badge: "Контроль качества и\u00A0выезды",
    description:
      "Прозваниваем монтаж, подаём контрольное питание и\u00A0симулируем технологические сигналы на\u00A0стенде перед отгрузкой. Это сокращает время ПНР на\u00A0объекте.",
    icon: "/icons/why-us/01.png",
  },
  {
    title: "Широкая база комплектующих в\u00A0наличии",
    badge: "Складской пул в\u00A0РФ",
    description:
      "Работаем с\u00A0широким пулом брендов: ОВЕН, Segnetics, Inovance, Weintek, Veda MC, DKC, КЭАЗ и\u00A0др. Не\u00A0зависим от\u00A0долгой логистики и\u00A0санкционных задержек.",
    icon: "/icons/why-us/02.png",
  },
  {
    title: "Отлаженное ПО и\u00A0документация",
    badge: "ПО ПЛК / SCADA",
    description:
      "Передаём протестированное исполняемое ПО, карту регистров Modbus и\u00A0руководство оператора. Передача открытых исходных кодов\u00A0— по\u00A0отдельному договору.",
    icon: "/icons/why-us/03.png",
  },
  {
    title: "Полная исполнительная документация",
    badge: "Э3 / Кабели / ПУЭ",
    description:
      "Разрабатываем принципиальные схемы\u00A0Э3, кабельные журналы, спецификации и\u00A0паспорта изделий в\u00A0соответствии с\u00A0ПУЭ и\u00A0ТЗ для\u00A0беспрепятственной сдачи объекта.",
    icon: "/icons/why-us/04.png",
  },
  {
    title: "Гарантийное сопровождение после запуска",
    badge: "Гарантийная поддержка",
    description:
      "Не\u00A0бросаем объект после подписания актов. Инженеры на\u00A0связи: оперативно консультируем дежурный персонал и\u00A0помогаем скорректировать уставки под\u00A0реальную эксплуатационную нагрузку.",
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
    <section className="bg-graphite lg:bg-surface-warm">
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-0">
        {/* Left — dark column with rounded bottom on desktop, flat on mobile to connect with Services */}
        <div className="bg-graphite p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center text-white rounded-none lg:rounded-b-[36px] relative z-10">
          <h2 className="text-white text-[clamp(1.4rem,2.2vw,2.15rem)] font-extrabold leading-[1.15] tracking-tight">
            Инжиниринг
            <br />
            полного цикла:
            <br />
            от схемы до пуска
          </h2>
          <p className="mt-4 sm:mt-6 text-white/60 text-[14px] leading-relaxed">
            Проектирование схем Э3, сборка шкафов в{"\u00A0"}Москве и{"\u00A0"}пусконаладка на{"\u00A0"}объектах выполняются одной инженерной командой. Это исключает нестыковки между проектной документацией и{"\u00A0"}реальным монтажом на{"\u00A0"}площадке.
          </p>
        </div>

        {/* Right — vertical 3D carousel with rounded top corners */}
        <div className="bg-graphite">
          <div
            className="bg-surface-warm w-full h-full relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 select-none overflow-hidden min-h-[440px] sm:min-h-[480px] md:min-h-[500px] lg:min-h-[520px] rounded-t-[28px] lg:rounded-t-[36px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          {/* 3D Viewport Stage */}
          <div
            className="relative w-full h-[370px] sm:h-[400px] md:h-[450px] flex items-center justify-center"
            style={{ perspective: 1200 }}
          >
            {reasons.map((reason, i) => {
              // Wrap-around offset calculation: -1 (top), 0 (center), 1 (bottom), etc.
              let offset = (i - activeIndex + count) % count;
              if (offset > count / 2) offset -= count;

              const isCenter = offset === 0;
              const isTop = offset === -1;
              const isBottom = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              // Vertical 3D layout coordinates (matching style of problems.tsx / process.tsx)
              let targetY = 0;
              let targetRotateX = 0;
              let targetScale = 1;
              let targetOpacity = 0;
              let targetZIndex = 0;

              if (isDesktop) {
                if (isCenter) {
                  targetY = 0;
                  targetRotateX = 0;
                  targetScale = 1;
                  targetOpacity = 1;
                  targetZIndex = 20;
                } else if (isTop) {
                  targetY = -120;
                  targetRotateX = -18;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (isBottom) {
                  targetY = 120;
                  targetRotateX = 18;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (offset < -1) {
                  targetY = -210;
                  targetRotateX = -28;
                  targetScale = 0.75;
                  targetOpacity = 0;
                  targetZIndex = 0;
                } else {
                  targetY = 210;
                  targetRotateX = 28;
                  targetScale = 0.75;
                  targetOpacity = 0;
                  targetZIndex = 0;
                }
              } else {
                // Mobile & Tablet: top and bottom cards remain slightly visible
                if (isCenter) {
                  targetY = 0;
                  targetRotateX = 0;
                  targetScale = 1;
                  targetOpacity = 1;
                  targetZIndex = 20;
                } else if (isTop) {
                  targetY = -92;
                  targetRotateX = -15;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (isBottom) {
                  targetY = 92;
                  targetRotateX = 15;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (offset < -1) {
                  targetY = -160;
                  targetRotateX = -22;
                  targetScale = 0.75;
                  targetOpacity = 0;
                  targetZIndex = 0;
                } else {
                  targetY = 160;
                  targetRotateX = 22;
                  targetScale = 0.75;
                  targetOpacity = 0;
                  targetZIndex = 0;
                }
              }

              return (
                <motion.div
                  key={reason.title}
                  animate={{
                    y: targetY,
                    rotateX: targetRotateX,
                    scale: targetScale,
                    opacity: targetOpacity,
                    zIndex: targetZIndex,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // Signature Metro deceleration curve
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
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin:
                      offset < 0
                        ? "center bottom"
                        : offset > 0
                        ? "center top"
                        : "center center",
                  }}
                  className={`absolute w-[calc(100vw-36px)] max-w-[560px] md:max-w-[620px] lg:max-w-[580px] xl:max-w-[640px] h-[145px] sm:h-[160px] md:h-[175px] rounded-[14px] bg-white shadow-[0_20px_50px_-12px_rgba(19,18,16,0.09),0_6px_20px_-4px_rgba(19,18,16,0.04)] flex overflow-hidden ${
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
