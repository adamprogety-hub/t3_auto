"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParabolicMarquee } from "@/components/ui/parabolic-marquee";

interface VendorSlide {
  id: string;
  brands: string[];
}

const vendorSlides: VendorSlide[] = [
  {
    id: "s1",
    brands: ["ОВЕН", "Segnetics", "Weintek", "MasterSCADA 4D", "Inovance"],
  },
  {
    id: "s2",
    brands: ["Veda MC", "Innovert", "Ридан (Ridan)", "Danfoss VLT"],
  },
  {
    id: "s3",
    brands: ["КЭАЗ OptiMat", "DKC RAM block", "CHINT", "Rittal"],
  },
  {
    id: "s4",
    brands: ["Ретрофит: Siemens S7", "Danfoss", "Schneider Electric"],
  },
];

// Authentic Windows Phone Live Tile 3D Flip with Z-axis depth recession
const liveTileVariants = {
  enter: (dir: number) => ({
    rotateX: dir > 0 ? 90 : -90,
    z: -50,
    scale: 0.92,
    opacity: 0,
  }),
  center: {
    rotateX: 0,
    z: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1] as const, // Metro deceleration curve
      delay: 0.08,
    },
  },
  exit: (dir: number) => ({
    rotateX: dir > 0 ? -90 : 90,
    z: -50,
    scale: 0.92,
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.55, 0, 0.8, 1] as const,
    },
  }),
};

const portfolioMarquee = [
  { src: "/portfolio/cabinets/cabinets_1.webp", title: "Силовой шкаф ША-К", subtitle: "Сборка ШУ (Москва)" },
  { src: "/portfolio/boiler/boiler_1.webp", title: "Котельная 15 МВт", subtitle: "Главный шкаф Viessmann" },
  { src: "/portfolio/scada/scada_1.webp", title: "MasterSCADA 4D", subtitle: "АРМ диспетчера" },
  { src: "/portfolio/cooling/cooling_1.webp", title: "Промышленный холод", subtitle: "Ярцево (Компрессоры)" },
  { src: "/portfolio/itp/itp_1.webp", title: "ИТП ЖК 1200 квартир", subtitle: "Насосные группы и клапаны" },
  { src: "/portfolio/vzu/vzu_1.webp", title: "ВЗУ посёлка", subtitle: "Повысительная станция 2-го подъема" },
  { src: "/portfolio/agro/agro_1.webp", title: "Агрокомплекс Бунятино", subtitle: "Линия автоматической сортировки" },
  { src: "/portfolio/retrofit/retrofit_1.webp", title: "Ретрофит ЦТП 2-14", subtitle: "Циркуляционная группа" },
  { src: "/portfolio/boiler/boiler_2.webp", title: "Насосная станция котлов", subtitle: "Частотные приводы Veda MC" },
  { src: "/portfolio/cabinets/cabinets_2.webp", title: "Контроллерный отсек", subtitle: "Шины DKC RAM block" },
  { src: "/portfolio/scada/scada_2.webp", title: "Графики SCADA", subtitle: "Тренды давления и расхода" },
  { src: "/portfolio/cooling/cooling_2.webp", title: "Трубная обвязка чиллеров", subtitle: "Датчики потока и давления" },
  { src: "/portfolio/itp/itp_2.webp", title: "Мнемосхема Segnetics", subtitle: "Контур отопления" },
  { src: "/portfolio/vzu/vzu_3.webp", title: "Напорный коллектор", subtitle: "Каскадное включение насосов" },
  { src: "/portfolio/agro/agro_3.webp", title: "Шкаф управления нарезкой", subtitle: "Синхронизация 6 приводов" },
  { src: "/portfolio/retrofit/retrofit_3.webp", title: "Шкаф фрикулера", subtitle: "Тверь (Модернизация)" },
];

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setSlideIndex((prev) => (prev + 1) % vendorSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : vendorSlides.length - 1));
  };

  // Autoplay flip ticker every 4.2 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setSlideIndex((prev) => (prev + 1) % vendorSlides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentSlide = vendorSlides[slideIndex];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-16 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20 relative">
        {/* Background Engineering Team Photo — Positioned with golden ratio balance */}
        <div className="absolute right-0 bottom-0 translate-x-[8%] xl:translate-x-[10%] pointer-events-none z-0 hidden lg:flex items-end justify-end select-none">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[740px] xl:w-[880px] 2xl:w-[980px]"
          >
            {/* Subtle atmospheric ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-divider/25 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <img
              src="/hero_team.webp"
              alt="Инженерная группа ACEngine"
              className="w-full h-auto object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Foreground Content — 100% natural, independent flow (z-10) */}
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="pt-10 md:pt-16 text-graphite text-[clamp(1.85rem,3.4vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight max-w-4xl"
          >
            Алгоритмизация
            <br />
            шкафов управления
            <br />
            и SCADA-диспетчеризация
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 max-w-2xl"
          >
            <p className="text-iron text-[15px] leading-[1.75]">
              Проектируем и собираем шкафы автоматики на собственном участке в Москве,
              программируем ПЛК и выезжаем на пусконаладку по всей России. Разрабатываем
              алгоритмы для котельных, ИТП, ВЗУ, очистных сооружений и технологических линий
              на доступной в РФ компонентной базе (ОВЕН, Segnetics, Weintek, MasterSCADA, Veda MC, КЭАЗ)
              по ГОСТ 21.408 и нормам Ростехнадзора.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#calculator"
              className="inline-flex items-center justify-center h-13 px-8 bg-graphite text-white text-[13px] font-semibold tracking-normal transition-all duration-200 hover:bg-carbon active:scale-[0.98] shadow-sm"
            >
              Сконфигурировать решение
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center h-13 px-8 border border-divider bg-white/60 text-graphite text-[13px] font-semibold tracking-normal transition-all duration-200 hover:bg-white hover:border-graphite active:scale-[0.98]"
            >
              Инженерные компетенции
            </a>
          </motion.div>

          {/* Windows Phone Live Tile 3D Flip with Z-depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 max-w-[530px]"
          >
            {/* Ticker Header */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-pewter text-[11px] font-medium tracking-wide">
                Элементная база со стабильным складским наличием в РФ:
              </span>
              <div className="flex items-center gap-1.5">
                {vendorSlides.map((slide, i) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setDirection(i > slideIndex ? 1 : -1);
                      setSlideIndex(i);
                    }}
                    className={`h-1 transition-all duration-300 rounded-full ${
                      i === slideIndex ? "w-5 bg-graphite" : "w-1.5 bg-divider hover:bg-pewter"
                    }`}
                    aria-label={`Группа ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3D Live Tile Stage */}
            <div
              className="relative h-12 w-full rounded-[8px] bg-white shadow-[0_12px_32px_-8px_rgba(19,18,16,0.08),0_4px_12px_-2px_rgba(19,18,16,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(19,18,16,0.12),0_6px_16px_-2px_rgba(19,18,16,0.04)] transition-shadow overflow-hidden select-none cursor-pointer"
              style={{ perspective: 1200 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={nextSlide}
              title="Нажмите для переключения"
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={liveTileVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.y < -20 || info.velocity.y < -150) nextSlide();
                    else if (info.offset.y > 20 || info.velocity.y > 150) prevSlide();
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                  }}
                  className="relative w-full h-full px-4 md:px-5 flex items-center justify-between gap-4 bg-white"
                >
                  {/* Dynamic Specular Sheen (Lighting reflection during flip) */}
                  <motion.div
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-graphite/5 pointer-events-none z-20"
                  />

                  {/* Clean Brand Names without numbering */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 text-[13px] font-bold text-graphite tracking-tight truncate relative z-10">
                    {currentSlide.brands.map((brand, idx) => (
                      <span key={brand} className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
                        <span>{brand}</span>
                        {idx < currentSlide.brands.length - 1 && (
                          <span className="text-divider font-light select-none">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar — object types & engineering team */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 md:mt-14"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <span className="text-iron text-[13px]">
              Котельные · ИТП / ЦТП · ВЗУ · Очистные сооружения · Технологические линии
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[12px]">
              <span className="text-graphite font-medium">
                Сборочный участок: Москва · ПНР по всей России
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Parabolic Lens Marquee of Real Portfolio Photos */}
        <ParabolicMarquee items={portfolioMarquee} />
      </motion.div>
    </section>
  );
}
