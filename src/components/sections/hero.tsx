"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { ArrowUp, ArrowDown, Search, Loader2 } from "lucide-react";

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
    brands: ["Veda MC", "Innovert", "Ридан (Ridan)", "Danfoss VLT", "Росма"],
  },
  {
    id: "s3",
    brands: ["КЭАЗ OptiMat", "DKC RAM block", "CHINT", "DEKraft", "Rittal"],
  },
  {
    id: "s4",
    brands: ["Ретрофит: Siemens S7", "Danfoss", "Schneider Electric", "ABB"],
  },
  {
    id: "s5",
    brands: ["ПЛК и приводы: Kinco", "Delta", "Меандр", "и ещё 20+ брендов"],
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
  // 1. Шкафы управления (сборка, шины, внутренняя компоновка)
  { src: "/portfolio/cabinets/cabinets_1.webp", title: "Силовой шкаф ША-К", subtitle: "Силовые шины и выключатели" },
  { src: "/portfolio/cabinets/cabinets_2.webp", title: "Контроллерный отсек", subtitle: "Шины DKC RAM block" },
  { src: "/portfolio/cabinets/cabinets_3.webp", title: "Сборка шкафа автоматики", subtitle: "Жгутование и монтаж" },
  { src: "/portfolio/cabinets/cabinets_4.webp", title: "Клеммные ряды", subtitle: "Маркировка проводки" },
  { src: "/portfolio/boiler/boiler_1.webp", title: "Главный шкаф управления", subtitle: "Серийная сборка ШУ" },

  // 2. Панели оператора (HMI и локальный контроль)
  { src: "/portfolio/retrofit/retrofit_3.webp", title: "Шкаф из нержавеющей стали", subtitle: "Сенсорная панель на двери" },
  { src: "/portfolio/itp/itp_2.webp", title: "Мнемосхема Segnetics", subtitle: "Локальный контур отопления" },
  { src: "/portfolio/itp/itp_3.webp", title: "Интерфейс оператора", subtitle: "Сенсорная панель Weintek" },
  { src: "/portfolio/itp/itp_4.webp", title: "Настройка контуров", subtitle: "Мнемосхема насосной группы" },

  // 3. SCADA и диспетчеризация (верхний уровень)
  { src: "/portfolio/scada/scada_1.webp", title: "MasterSCADA 4D", subtitle: "АРМ диспетчера" },
  { src: "/portfolio/scada/scada_2.webp", title: "Графики SCADA", subtitle: "Тренды давления и расхода" },
  { src: "/portfolio/scada/scada_3.webp", title: "Мнемосхема системы", subtitle: "Диспетчеризация объекта" },
  { src: "/portfolio/scada/scada_5.webp", title: "Журнал аварий и событий", subtitle: "Телеметрия и алармы" },

  // 4. Объекты и пусконаладка (оборудование на площадке)
  { src: "/portfolio/boiler/boiler_2.webp", title: "Насосная станция котлов", subtitle: "Частотные приводы Veda MC" },
  { src: "/portfolio/cooling/cooling_1.webp", title: "Промышленный холод", subtitle: "Ярцево (Компрессоры)" },
  { src: "/portfolio/vzu/vzu_1.webp", title: "ВЗУ посёлка", subtitle: "Повысительная станция 2-го подъема" },
];

function ScrollableBrandRow({
  brands,
  slideKey,
  isPaused,
  onFinished,
}: {
  brands: string[];
  slideKey: string;
  isPaused: boolean;
  onFinished: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const measureAndAnimate = () => {
      if (!containerRef.current || !scope.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = scope.current.scrollWidth;
      const overflow = Math.max(0, contentWidth - containerWidth + 8);

      if (overflow > 0) {
        const scrollSpeed = 35; // px per second
        const scrollDuration = Math.max(2.0, overflow / scrollSpeed);
        const initialPause = 1.3;
        const endPause = 1.4;
        const totalDuration = initialPause + scrollDuration + endPause;

        const controls = animate(
          scope.current,
          { x: [0, 0, -overflow, -overflow] },
          {
            duration: totalDuration,
            times: [
              0,
              initialPause / totalDuration,
              (initialPause + scrollDuration) / totalDuration,
              1,
            ],
            ease: [0.25, 0.1, 0.25, 1],
          }
        );

        animRef.current = controls;

        controls.then(() => {
          if (!isCancelled) {
            onFinished();
          }
        });
      } else {
        const controls = animate(
          scope.current,
          { opacity: [1, 1] },
          { duration: 3.5 }
        );
        animRef.current = controls;

        controls.then(() => {
          if (!isCancelled) {
            onFinished();
          }
        });
      }
    };

    const timer = setTimeout(measureAndAnimate, 60);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      if (animRef.current) {
        animRef.current.stop();
      }
    };
  }, [brands, slideKey, animate, scope, onFinished]);

  useEffect(() => {
    if (!animRef.current) return;
    try {
      if (isPaused) {
        animRef.current.pause();
      } else {
        animRef.current.play();
      }
    } catch {
      // safe fallback
    }
  }, [isPaused]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full min-w-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,black_calc(100%-18px),transparent_100%)] z-10"
    >
      <div
        ref={scope}
        className="flex items-center gap-2 sm:gap-3 text-[13px] font-bold text-graphite tracking-tight shrink-0 whitespace-nowrap will-change-transform"
      >
        {brands.map((brand, idx) => (
          <span key={brand} className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span>{brand}</span>
            {idx < brands.length - 1 && (
              <span className="text-divider font-light select-none">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function MarqueePhotoItem({
  item,
  isItemActive,
}: {
  item: typeof portfolioMarquee[0];
  isItemActive: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [item.src]);

  return (
    <a
      href="#projects"
      title={`${item.title} — ${item.subtitle}`}
      className="relative shrink-0 h-28 md:h-36 w-44 md:w-56 overflow-hidden bg-surface-warm group select-none block"
    >
      {/* Neat circular preloader on light background */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-warm/95 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white shadow-2xs border border-divider/25 flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-graphite/70 animate-spin" strokeWidth={1.5} />
          </div>
        </div>
      )}

      <img
        ref={imgRef}
        src={item.src}
        alt={item.title}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover filter transition-all duration-300 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${
          isItemActive
            ? "brightness-110 scale-105"
            : "brightness-[0.96] contrast-[1.04] group-hover:scale-105 group-hover:brightness-110"
        }`}
        loading="lazy"
      />

      {/* Lightened Frosted Overlay with Centered Loupe Badge on Hover & Mobile Center Spotlight */}
      <div
        className={`absolute inset-0 bg-white/55 backdrop-blur-[2px] transition-opacity duration-200 ease-out flex flex-col items-center justify-center p-3 pointer-events-none z-20 ${
          isItemActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-graphite text-white shadow-lg border border-white/20 transition-transform duration-200 ease-out ${
            isItemActive
              ? "translate-y-0"
              : "transform translate-y-1 group-hover:translate-y-0"
          }`}
        >
          <Search strokeWidth={1.5} className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
            Смотреть кейсы
          </span>
        </div>

        {/* Subtle technical caption at bottom */}
        <span className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-graphite/75 text-center truncate font-medium">
          {item.title}
        </span>
      </div>
    </a>
  );
}

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setSlideIndex((prev) => (prev + 1) % vendorSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : vendorSlides.length - 1));
  }, []);

  const currentSlide = vendorSlides[slideIndex];

  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const [centerMarqueeIndex, setCenterMarqueeIndex] = useState<number | null>(null);

  // Auto-spotlight horizontal center card on mobile devices as marquee rotates
  // O(1) single-element geometry check every 100ms — zero layout thrashing, ultra-light on battery
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767px), (hover: none)");
    if (!media.matches) return;

    let timer: NodeJS.Timeout | null = null;

    const checkCenter = () => {
      const track = marqueeTrackRef.current;
      if (!track || !track.firstElementChild) return;

      const firstItem = track.firstElementChild as HTMLElement;
      const itemWidth = firstItem.offsetWidth;
      // Tailwind gap-1.5 is 6px
      const step = itemWidth + 6;
      const trackRect = track.getBoundingClientRect();
      const screenCenterX = window.innerWidth / 2;

      // Relative offset from current track visual left to horizontal screen center
      const offset = screenCenterX - trackRect.left;
      const totalItems = portfolioMarquee.length * 2;
      const index = Math.floor(offset / step);

      if (index >= 0 && index < totalItems) {
        setCenterMarqueeIndex((prev) => (prev === index ? prev : index));
      } else {
        setCenterMarqueeIndex(null);
      }
    };

    timer = setInterval(checkCenter, 100);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

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
          {/* Mobile / Tablet Engineering Team Photo — Positioned first before H1 with balanced optical padding */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden relative w-full pt-6 sm:pt-8 mb-6 sm:mb-8 flex justify-center select-none overflow-visible"
          >
            {/* Subtle atmospheric ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-divider/25 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10 scale-125" />

            <div className="relative w-[118%] -mx-[9%] sm:w-[108%] sm:-mx-[4%] max-w-[560px]">
              <img
                src="/hero_team.webp"
                alt="Инженерная группа ACEngine"
                className="w-full h-auto object-contain object-bottom scale-105 sm:scale-100 origin-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
                draggable={false}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="pt-0 lg:pt-16 text-graphite text-[clamp(1.85rem,3.4vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight max-w-4xl"
          >
            Программирование ПЛК,
            <br />
            сборка шкафов управления
            <br />
            и{"\u00A0"}разработка SCADA-систем
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 max-w-2xl"
          >
            <p className="text-iron text-[15px] leading-[1.75]">
              Проектируем и{"\u00A0"}собираем шкафы автоматики на{"\u00A0"}собственном участке в{"\u00A0"}Москве,
              программируем ПЛК и{"\u00A0"}выезжаем на{"\u00A0"}пусконаладку по{"\u00A0"}всей{"\u00A0"}России. Разрабатываем
              прикладное ПО для{"\u00A0"}котельных, ИТП, ВЗУ, очистных сооружений и{"\u00A0"}технологических линий
              на{"\u00A0"}проверенной компонентной базе со{"\u00A0"}складским наличием в{"\u00A0"}РФ (ОВЕН, Segnetics, Inovance, Weintek, MasterSCADA, Veda MC, КЭАЗ и{"\u00A0"}более 25{"\u00A0"}других брендов)
              в{"\u00A0"}строгом соответствии с{"\u00A0"}ПУЭ-7 и{"\u00A0"}вашим ТЗ.
            </p>
          </motion.div>

          {/* Engineering Competencies Chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-6 flex flex-wrap gap-2 max-w-2xl"
          >
            {[
              "Проектирование Э3",
              "Сборка ШУ / ША",
              "Программирование ПЛК и HMI",
              "Разработка SCADA",
              "Шефмонтаж и ПНР",
              "Ретрофит и модернизация",
            ].map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-medium tracking-tight bg-surface border border-divider/70 text-graphite/80 rounded-[6px]"
              >
                {comp}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-7 flex flex-col sm:flex-row gap-3 w-full max-w-[500px] sm:w-[500px]"
          >
            <a
              href="#calculator"
              className="w-full sm:flex-1 inline-flex items-center justify-center h-12 sm:h-[50px] min-h-[48px] px-4 sm:px-5 py-3.5 bg-graphite text-white text-[13px] sm:text-[14px] font-semibold tracking-normal transition-all duration-200 hover:bg-carbon active:scale-[0.98] shadow-sm text-center whitespace-nowrap rounded-[8px]"
            >
              Рассчитать проект
            </a>
            <a
              href="#services"
              className="w-full sm:flex-1 inline-flex items-center justify-center h-12 sm:h-[50px] min-h-[48px] px-4 sm:px-5 py-3.5 border border-divider bg-white text-graphite text-[13px] sm:text-[14px] font-semibold tracking-normal transition-all duration-200 hover:bg-surface hover:border-graphite active:scale-[0.98] text-center whitespace-nowrap rounded-[8px]"
            >
              Инженерные компетенции
            </a>
          </motion.div>

          {/* Windows Phone Live Tile 3D Flip with Z-depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 w-full max-w-[500px] sm:w-[500px]"
          >
            {/* Ticker Header */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-pewter text-[11px] font-medium tracking-wide">
                Элементная база и{"\u00A0"}ретрофит (более 30{"\u00A0"}брендов на{"\u00A0"}складах в{"\u00A0"}РФ):
              </span>
              <div className="flex items-center gap-1.5">
                {vendorSlides.map((slide, i) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setDirection(i > slideIndex ? 1 : -1);
                      setSlideIndex(i);
                    }}
                    className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                      i === slideIndex ? "w-5 bg-graphite" : "w-1.5 bg-divider hover:bg-pewter"
                    }`}
                    aria-label={`Группа ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3D Live Tile Stage — Constant Fixed Width identical to CTA buttons */}
            <div
              className="relative h-12 sm:h-[50px] w-full rounded-[8px] bg-white border border-divider/35 shadow-[0_12px_32px_-8px_rgba(19,18,16,0.08),0_4px_12px_-2px_rgba(19,18,16,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(19,18,16,0.12),0_6px_16px_-2px_rgba(19,18,16,0.04)] transition-shadow flex items-center justify-between pl-4 sm:pl-5 pr-2 select-none overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Left Area: 3D Flip Brands Stage (drag & click enabled, fixed flex-1 boundary) */}
              <div
                className="relative flex-1 h-full min-w-0 mr-2 sm:mr-3 flex items-center overflow-hidden cursor-pointer"
                style={{ perspective: 1200 }}
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
                    className="relative w-full h-full flex items-center bg-white"
                  >
                    {/* Dynamic Specular Sheen (Lighting reflection during flip) */}
                    <motion.div
                      initial={{ opacity: 0.35 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-graphite/5 pointer-events-none z-20"
                    />

                    {/* Brands row that scrolls to the edge before next slide flips */}
                    <ScrollableBrandRow
                      brands={currentSlide.brands}
                      slideKey={currentSlide.id}
                      isPaused={isHovered}
                      onFinished={nextSlide}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Area: Up / Down Arrow Buttons in neat rectangular rounded outline */}
              <div className="flex items-center gap-1.5 shrink-0 z-30">
                {/* Prev Slide Button (Arrow Up) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Предыдущие бренды"
                  title="Предыдущие бренды"
                  className="group/up-btn w-7.5 h-7.5 sm:w-8 sm:h-8 flex items-center justify-center rounded-[6px] border border-divider/40 bg-surface/70 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                >
                  <ArrowUp strokeWidth={1.5} className="w-3.5 h-3.5 transition-transform duration-200 group-hover/up-btn:-translate-y-0.5" />
                </button>

                {/* Next Slide Button (Arrow Down) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Следующие бренды"
                  title="Следующие бренды"
                  className="group/down-btn w-7.5 h-7.5 sm:w-8 sm:h-8 flex items-center justify-center rounded-[6px] border border-divider/40 bg-surface/70 hover:bg-graphite hover:text-white hover:border-graphite text-graphite/70 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                >
                  <ArrowDown strokeWidth={1.5} className="w-3.5 h-3.5 transition-transform duration-200 group-hover/down-btn:translate-y-0.5" />
                </button>
              </div>
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
              Котельные · ИТП{"\u00A0"}/ ЦТП · ВЗУ · Очистные сооружения · Технологические линии
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[12px]">
              <span className="text-graphite font-medium">
                Сборочный участок: Москва · ПНР по{"\u00A0"}всей{"\u00A0"}России
              </span>
            </div>
          </div>
        </div>

        {/* Infinite Looping Collage Marquee of Pavel's Real Portfolio Photos — Seamless & Flush */}
        <div className="overflow-hidden relative">
          <div ref={marqueeTrackRef} className="animate-marquee flex gap-1.5">
            {portfolioMarquee.concat(portfolioMarquee).map((item, idx) => {
              const isItemActive = centerMarqueeIndex === idx;

              return (
                <MarqueePhotoItem
                  key={idx}
                  item={item}
                  isItemActive={isItemActive}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
