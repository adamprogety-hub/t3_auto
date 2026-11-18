"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { PhoneFilledIcon, MailFilledIcon, TelegramIcon } from "@/components/ui/brand-icons";

interface HeroSlide {
  id: string;
  title: React.ReactNode;
  description: string;
  image?: string | null;
  imageAlt?: string;
  imageClassName?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "engineering",
    title: (
      <>
        Инжиниринговый центр
        <br />
        АСУТП: промышленная
        <br />
        автоматика
      </>
    ),
    description:
      "Проектирование разделов АТХ/АСУТП, разработка РСУ и\u00A0систем ПАЗ, пусконаладка на\u00A0объектах любой категории сложности по\u00A0всей России.",
    image: "/images/hero/team-engineers.png",
    imageAlt: "Команда инженеров Т3 Автоматизация",
  },
  {
    id: "manufacturing",
    title: (
      <>
        Собственное производство
        <br />
        шкафов управления
      </>
    ),
    description:
      "Сборочная база в\u00A0Самаре (19 км). QR-код с\u00A0историей сборки на\u00A0каждом шкафу, фотофиксация узлов и\u00A0испытания в\u00A0собственной ЭТЛ.",
    image: "/images/hero/cabinet-production.png",
    imageAlt: "Собственное производство шкафов управления АСУТП",
  },
  {
    id: "retrofit",
    title: (
      <>
        Бесшовная замена
        <br />
        зарубежных РСУ и{"\u00A0"}ПАЗ
      </>
    ),
    description:
      "Перевод с\u00A0Siemens, Schneider, Yokogawa и\u00A0Honeywell на\u00A0отечественные ПТК («БАЗИС», «СУРА», TREI) с\u00A0защитой КИИ 2 и\u00A03 категорий.",
    image: "/images/hero/dcs-sil3-retrofit.png",
    imageAlt: "Бесшовная замена зарубежных РСУ и систем ПАЗ",
  },
  {
    id: "scada",
    title: (
      <>
        Диспетчеризация
        <br />
        на{"\u00A0"}платформе «КАСКАД Цифра»
      </>
    ),
    description:
      "Построение ситуационных центров холдингов, БДРВ, независимый аудит безопасности ФСТЭК (Приказ №\u00A0239) и\u00A0интеграция с\u00A0MES/ERP.",
    image: "/images/hero/scada-dispatch.png",
    imageAlt: "Диспетчеризация на платформе КАСКАД Цифра",
    imageClassName: "-rotate-[6deg] origin-center",
  },
];

const QUICK_CONTACTS = [
  {
    href: "tel:+79608218170",
    ariaLabel: "Позвонить +7 (960) 821-81-70",
    mobileLabel: "Звонок",
    tooltip: "+7 (960) 821-81-70",
    tooltipClass: "left-1/2 -translate-x-1/2 font-mono",
    noTranslate: false,
    external: false,
    Icon: PhoneFilledIcon,
    iconClass: "w-[15px] h-[15px] shrink-0",
  },
  {
    href: "mailto:aleksey.ivanov@t3-auto.com",
    ariaLabel: "Написать на почту aleksey.ivanov@t3-auto.com",
    mobileLabel: "Почта",
    tooltip: "aleksey.ivanov@t3-auto.com",
    tooltipClass: "left-1/2 -translate-x-1/2 font-mono",
    noTranslate: false,
    external: false,
    Icon: MailFilledIcon,
    iconClass: "w-[16px] h-[16px] shrink-0",
  },
  {
    href: "https://t.me/t3_auto",
    ariaLabel: "Написать в Telegram",
    mobileLabel: "Telegram",
    tooltip: "Telegram",
    tooltipClass: "right-0",
    noTranslate: true,
    external: true,
    Icon: TelegramIcon,
    iconClass: "w-[15px] h-[15px] shrink-0",
  },
] as const;

const contentVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 36 : -36,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 30 },
      opacity: { duration: 0.35, ease: "easeOut" },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -36 : 36,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 30 },
      opacity: { duration: 0.25, ease: "easeIn" },
    },
  }),
};

const imageVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 44 : -44,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.4, ease: "easeOut" },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -44 : 44,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.25, ease: "easeIn" },
    },
  }),
};

export function Hero() {
  const [[activeIndex, direction], setSlide] = useState([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const calcBtnRef = useRef<HTMLAnchorElement>(null);
  const coopBtnRef = useRef<HTMLAnchorElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ marginLeft: number; width: number } | null>(null);

  useEffect(() => {
    const update = () => {
      if (!cardRef.current) return;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // На мобиле выравниваем точно по текстовой области контента УТП (внутренний текст без паддингов карточки)
        if (textContentRef.current) {
          const cardRect = cardRef.current.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(textContentRef.current);
          const paddingLeft = parseFloat(computedStyle.paddingLeft) || 20;
          const paddingRight = parseFloat(computedStyle.paddingRight) || 20;
          
          const textWidth = Math.max(80, textContentRef.current.clientWidth - paddingLeft - paddingRight);
          setIndicatorStyle({ marginLeft: paddingLeft, width: textWidth });
        }
      } else {
        // На десктопе выравниваем по ширине выступающей плашки с кнопками СТА
        if (calcBtnRef.current && coopBtnRef.current) {
          const cardRect = cardRef.current.getBoundingClientRect();
          const calcRect = calcBtnRef.current.getBoundingClientRect();
          const coopRect = coopBtnRef.current.getBoundingClientRect();

          const left = Math.max(0, calcRect.left - cardRect.left);
          const width = Math.max(80, coopRect.right - calcRect.left);
          setIndicatorStyle({ marginLeft: left, width });
        }
      }
    };

    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (cardRef.current) ro.observe(cardRef.current);
    if (textContentRef.current) ro.observe(textContentRef.current);
    if (calcBtnRef.current) ro.observe(calcBtnRef.current);
    if (coopBtnRef.current) ro.observe(coopBtnRef.current);

    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  const paginate = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    const newDirection = newIndex > activeIndex ? 1 : -1;
    setSlide([newIndex, newDirection]);
  };

  // Auto-rotation every 7 seconds; paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlide(([prev]) => [(prev + 1) % HERO_SLIDES.length, 1]);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="relative bg-[var(--surface)] pt-24 sm:pt-28 lg:pt-40 xl:pt-48 pb-12 sm:pb-14 lg:pb-10 xl:pb-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Dynamic Stepper Indicator matching the span of the action buttons */}
        <div
          style={
            indicatorStyle
              ? {
                  marginLeft: `${indicatorStyle.marginLeft}px`,
                  width: `${indicatorStyle.width}px`,
                }
              : undefined
          }
          className="flex items-center gap-2 mb-3.5 sm:mb-4"
        >
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => paginate(idx)}
              aria-label={`Перейти к УТП ${idx + 1}`}
              className="py-2.5 -my-2.5 cursor-pointer flex items-center group transition-all duration-300"
              style={{ flex: idx === activeIndex ? 1 : "none" }}
            >
              <span
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-full bg-graphite"
                    : "w-2.5 bg-divider group-hover:bg-pewter"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Wide dark-graphite banner card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-[16px] md:rounded-bl-none lg:rounded-[20px] lg:rounded-bl-none bg-graphite theme-card-ambient-tr"
        >
          {/* Inner subtle top ambient sheen, cleanly transparent at bottom edge */}
          <div className="absolute inset-0 rounded-[16px] md:rounded-bl-none lg:rounded-[20px] lg:rounded-bl-none overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />
          </div>

          <div className="relative flex flex-col lg:grid lg:grid-cols-12 items-stretch h-[510px] sm:h-[550px] lg:h-auto min-h-0 lg:min-h-[400px] xl:min-h-[440px]">
            {/* Left side: Animated UTP content with horizontal slide */}
            <div
              ref={textContentRef}
              className="lg:col-span-7 relative z-10 p-5 sm:p-7 lg:px-10 lg:py-8 xl:px-14 xl:py-9 flex flex-col justify-start lg:justify-between h-[210px] sm:h-[220px] lg:h-full min-h-0 lg:min-h-[400px] overflow-hidden shrink-0"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col lg:justify-between h-full"
                >
                  <h1 className="text-white text-[clamp(1.4rem,2.8vw,3.25rem)] font-bold leading-[1.12] tracking-tight font-heading">
                    {currentSlide.title}
                  </h1>

                  <p className="mt-2.5 sm:mt-3 lg:mt-0 text-white/75 text-[13.5px] sm:text-[15px] lg:text-[17px] leading-[1.48] sm:leading-[1.6] max-w-lg xl:max-w-xl">
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right side (Desktop): Team heads protrude above top edge; equipment fits fully in showcase perspective */}
            <div className="hidden lg:block lg:col-span-5 relative pointer-events-none select-none">
              <AnimatePresence mode="wait" custom={direction}>
                {currentSlide.image ? (
                  currentSlide.id === "engineering" ? (
                    <div
                      key={currentSlide.id + "-desktop-img"}
                      className="absolute -top-12 xl:-top-14 bottom-0 -left-14 xl:-left-20 right-0 overflow-hidden rounded-br-[20px] flex justify-end pr-4 xl:pr-6 2xl:pr-8"
                    >
                      <motion.img
                        src={currentSlide.image}
                        alt={currentSlide.imageAlt || ""}
                        custom={direction}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="h-[560px] xl:h-[660px] 2xl:h-[730px] w-auto max-w-none object-contain object-top"
                      />
                    </div>
                  ) : (
                    <div
                      key={currentSlide.id + "-desktop-img"}
                      className="absolute -top-8 xl:-top-12 bottom-[-12px] xl:bottom-[-20px] -right-6 lg:-right-8 xl:-right-10 -left-10 xl:-left-16 flex items-center justify-end pointer-events-none"
                    >
                      <motion.img
                        src={currentSlide.image}
                        alt={currentSlide.imageAlt || ""}
                        custom={direction}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={`h-[390px] lg:h-[430px] xl:h-[480px] 2xl:h-[520px] w-auto max-w-none object-contain filter drop-shadow-[0_24px_45px_rgba(0,0,0,0.55)] ${
                          currentSlide.imageClassName || ""
                        }`}
                      />
                    </div>
                  )
                ) : null}
              </AnimatePresence>
            </div>

            {/* Mobile & Tablet (< lg): Fixed flex-1 container so total card height is fixed across all slides */}
            {currentSlide.image ? (
              currentSlide.id === "engineering" ? (
                <div className="lg:hidden relative flex-1 w-full overflow-hidden rounded-b-[16px] flex justify-center items-start pointer-events-none select-none">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={currentSlide.id + "-mobile-img"}
                      src={currentSlide.image}
                      alt={currentSlide.imageAlt || ""}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="h-[460px] sm:h-[540px] w-auto max-w-none object-contain object-top"
                    />
                  </AnimatePresence>
                </div>
              ) : (
                <div className="lg:hidden relative flex-1 w-full flex items-center justify-center px-2 pb-4 pt-0 rounded-b-[16px] pointer-events-none select-none">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={currentSlide.id + "-mobile-img"}
                      src={currentSlide.image}
                      alt={currentSlide.imageAlt || ""}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className={`w-auto object-contain filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.5)] ${
                        currentSlide.id === "scada"
                          ? "max-h-[250px] sm:max-h-[280px] max-w-[98%] scale-110 sm:scale-105"
                          : "max-h-[220px] sm:max-h-[260px] max-w-[90%] sm:max-w-[85%]"
                      } ${currentSlide.imageClassName || ""}`}
                    />
                  </AnimatePresence>
                </div>
              )
            ) : null}
          </div>
        </motion.div>

        {/* Bottom Action Row: Integrated Protrusion Tab on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 sm:mt-5 md:-mt-px flex flex-col md:flex-row md:items-start md:justify-between gap-3 relative z-20"
        >
          {/* Left: Protruding Monolithic Tab from Hero Card (Desktop) / CTA block (Mobile) */}
          <div
            className="relative md:bg-graphite md:pl-5 lg:pl-7 md:pr-5 lg:pr-6 md:py-3.5 md:rounded-b-[18px] lg:rounded-b-[20px] flex flex-col sm:flex-row gap-3"
          >
            <a
              ref={calcBtnRef}
              href="#contacts"
              className="w-full sm:flex-1 md:w-auto md:flex-initial inline-flex items-center justify-center h-12 sm:h-[50px] px-7 md:px-6 lg:px-8 bg-graphite md:bg-white text-white md:text-graphite text-[13px] sm:text-[14px] font-bold tracking-normal transition-all duration-200 hover:bg-graphite/90 md:hover:bg-neutral-100 active:scale-[0.98] shadow-sm text-center whitespace-nowrap rounded-[8px]"
            >
              Рассчитать объект
            </a>
            <a
              ref={coopBtnRef}
              href="#cooperation"
              className="w-full sm:flex-1 md:w-auto md:flex-initial inline-flex items-center justify-center h-12 sm:h-[50px] px-7 md:px-6 lg:px-8 border border-divider md:border-white/20 bg-white md:bg-white/10 text-graphite md:text-white md:hover:text-white text-[13px] sm:text-[14px] font-semibold tracking-normal transition-all duration-200 hover:border-graphite md:hover:bg-white/15 md:hover:border-white/30 active:scale-[0.98] text-center whitespace-nowrap rounded-[8px] md:backdrop-blur-xs"
            >
              Предложить сотрудничество
            </a>

            {/* Inverted Concave Fillet on the right side of the tab (seamless transition to card bottom edge) */}
            <svg
              className="hidden md:block absolute top-0 -right-5 w-5 h-5 pointer-events-none select-none text-graphite"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path d="M 0,0 L 0,20 C 0,8.954 8.954,0 20,0 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Right: Quick contact buttons (Call, Email, Telegram) floating on canvas */}
          <div className="pt-1 md:pt-3.5 pr-0 md:pr-5 lg:pr-7 grid grid-cols-3 md:flex md:items-center gap-2.5">
            {QUICK_CONTACTS.map(
              ({ href, ariaLabel, mobileLabel, tooltip, tooltipClass, noTranslate, external, Icon, iconClass }) => (
                <div key={href} className="relative group">
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={ariaLabel}
                    className="w-full md:w-[50px] h-12 md:h-[50px] inline-flex items-center justify-center gap-1.5 rounded-[8px] border border-divider bg-white text-graphite hover:border-graphite hover:bg-graphite hover:text-white active:scale-[0.98] transition-all duration-200 shadow-2xs hover:shadow-xs"
                  >
                    <Icon className={iconClass} />
                    <span className={`md:hidden text-[12px] font-medium${noTranslate ? " notranslate" : ""}`}>
                      {mobileLabel}
                    </span>
                  </a>
                  <span
                    className={`hidden md:block pointer-events-none absolute top-[calc(100%+8px)] ${tooltipClass} whitespace-nowrap rounded-[6px] bg-graphite px-2.5 py-1 text-[11px] font-medium text-white shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200${noTranslate ? " notranslate" : ""}`}
                  >
                    {tooltip}
                  </span>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
