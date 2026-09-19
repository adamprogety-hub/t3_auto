"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ReasonItem {
  title: string;
  badge: string;
  description: string;
  icon: string;
}

const reasons: ReasonItem[] = [
  {
    title: "Тестируем в\u00A0Москве, запускаем по\u00A0всей\u00A0РФ",
    badge: "Логистика и\u00A0выезды",
    description:
      "Мы\u00A0с\u00A0командой 48\u00A0часов гоняем каждый щит на\u00A0стенде в\u00A0Москве. К\u00A0вам на\u00A0объект шкаф приезжает проверенным\u00A0— остаётся только чистый пуск.",
    icon: "/icons/why-us/01.png",
  },
  {
    title: "Комплектующие всегда в\u00A0наличии",
    badge: "Складской запас в\u00A0РФ",
    description:
      "Собираем на\u00A0надёжной базе: ОВЕН, Segnetics, DKC, КЭАЗ. Держим запас на\u00A0складе, поэтому вам не\u00A0придётся месяцами ждать поставку.",
    icon: "/icons/why-us/02.png",
  },
  {
    title: "Открытый исходный код без\u00A0паролей",
    badge: "CoDeSys / MasterSCADA 4D",
    description:
      "Мы\u00A0отдаём все проекты в\u00A0CoDeSys и\u00A0SCADA открытыми. Никаких скрытых паролей\u00A0— ваши инженеры смогут сами легко вносить правки.",
    icon: "/icons/why-us/03.png",
  },
  {
    title: "Схемы и\u00A0документы по\u00A0ГОСТ",
    badge: "Э3 + EPLAN + ПАЗ",
    description:
      "Мы\u00A0готовим полный пакет схем\u00A0Э3, кабельные журналы и\u00A0карты регистров. Вы\u00A0спокойно сдадите объект технадзору с\u00A0первого раза.",
    icon: "/icons/why-us/04.png",
  },
  {
    title: "Ведём объект весь первый сезон",
    badge: "Сопровождение 12\u00A0мес.",
    description:
      "Мы\u00A0не\u00A0бросаем проект после пуска. Команда на\u00A0связи весь сезон: если нужно, приедем и\u00A0донастроим контуры под\u00A0реальные пиковые нагрузки.",
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
            Архитектура
            <br />
            сквозной
            <br />
            ответственности
          </h2>
          <p className="mt-4 sm:mt-6 text-white/60 text-[14px] leading-relaxed">
            Павел Петров выстроил процесс так, чтобы проектирование схем, сборка шкафов в{"\u00A0"}Москве и{"\u00A0"}пусконаладка в{"\u00A0"}регионах РФ{"\u00A0"}замыкались на{"\u00A0"}одной команде. Это ликвидирует главную причину аварий{"\u00A0"}— конфликт между проектом и{"\u00A0"}наладкой.
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
                  targetY = -135;
                  targetRotateX = -18;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (isBottom) {
                  targetY = 135;
                  targetRotateX = 18;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (offset < -1) {
                  targetY = -230;
                  targetRotateX = -28;
                  targetScale = 0.75;
                  targetOpacity = 0;
                  targetZIndex = 0;
                } else {
                  targetY = 230;
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
                  targetY = -108;
                  targetRotateX = -15;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (isBottom) {
                  targetY = 108;
                  targetRotateX = 15;
                  targetScale = 0.88;
                  targetOpacity = 0.4;
                  targetZIndex = 10;
                } else if (offset < -1) {
                  targetY = -180;
                  targetRotateX = -22;
                  targetScale = 0.75;
                  targetOpacity = 0;
                  targetZIndex = 0;
                } else {
                  targetY = 180;
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
                  className={`absolute w-[calc(100vw-36px)] max-w-[560px] md:max-w-[620px] lg:max-w-[640px] h-[180px] sm:h-[195px] md:h-[210px] rounded-[14px] bg-white shadow-[0_20px_50px_-12px_rgba(19,18,16,0.09),0_6px_20px_-4px_rgba(19,18,16,0.04)] flex overflow-hidden ${
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

                  {/* Left Side: 3D Icon, bottom-anchored */}
                  <div className="w-[28%] sm:w-[32%] shrink-0 h-full bg-surface-card relative overflow-hidden">
                    <img
                      src={reason.icon}
                      alt={reason.title}
                      draggable={false}
                      className="absolute bottom-0 left-[6%] right-[6%] w-[88%] max-h-[92%] object-contain object-bottom pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(19,18,16,0.08)]"
                    />
                  </div>

                  {/* Right Side: Reason Content */}
                  <div className="flex-1 p-3.5 sm:p-5 md:p-6 flex flex-col justify-center overflow-hidden">
                    <h3 className="text-graphite text-[14px] sm:text-[16px] md:text-[17px] font-extrabold tracking-tight leading-snug">
                      {reason.title}
                    </h3>

                    <p className="mt-1.5 sm:mt-2 text-iron text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed line-clamp-3">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Vertical Dash Stepper (Desktop only) */}
            <div className="hidden lg:flex absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-1.5">
              {reasons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Перейти к пункту 0${idx + 1}`}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "h-8 bg-graphite"
                      : "h-2.5 bg-divider hover:bg-pewter"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Horizontal Dash Stepper (Mobile & Tablet only) */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-3 z-30">
            {reasons.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Перейти к пункту 0${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
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
