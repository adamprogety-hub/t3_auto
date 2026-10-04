"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, BookOpen, Loader2 } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  type: string;
  hardware: string;
  details: string;
  location: string;
  result: string;
  size: "large" | "wide" | "medium";
  color: string;
  images: {
    src: string;
    caption: string;
  }[];
}

const projects: ProjectItem[] = [
  {
    id: "boiler",
    title: "Котельная 15 МВт",
    type: "Котельная + SCADA",
    hardware: "ОВЕН ПЛК210 · Weintek 15″ · MasterSCADA 4D",
    details: "Каскадное управление 3 котлами Viessmann · Насосные группы с ПЧ Veda MC · Горелки Weishaupt",
    location: "Московская обл.",
    result: "Каскад 1:10 · Архивация 1 год",
    size: "large", // 2x2
    color: "bg-graphite",
    images: [
      { src: "/portfolio/boiler/boiler_1.webp", caption: "Тверь: Главный шкаф автоматики котловой группы" },
      { src: "/portfolio/boiler/boiler_2.webp", caption: "Тверь: Шкаф управления сетевой насосной станцией" },
      { src: "/portfolio/boiler/boiler_3.webp", caption: "Балашиха: Обвязка тепломеханических узлов и насосов" },
      { src: "/portfolio/boiler/boiler_4.webp", caption: "Балашиха: Коллекторы и датчики давления ОВЕН ПД100" },
    ],
  },
  {
    id: "itp",
    title: "ИТП ЖК на 1200 квартир",
    type: "Тепловой пункт (ИТП)",
    hardware: "Segnetics Matrix · Клапаны Ридан (Ridan)",
    details: "Погодозависимая компенсация · Рециркуляция ГВС · Контроль перепада давления датчиками ОВЕН",
    location: "Санкт-Петербург",
    result: "Точность t° ±0.5 °C",
    size: "medium", // 1x1
    color: "bg-gunmetal",
    images: [
      { src: "/portfolio/itp/itp_1.webp", caption: "Балашиха: Насосная группа и смесительные клапаны ИТП" },
      { src: "/portfolio/itp/itp_2.webp", caption: "Лобня: Мнемосхема АРМ — Контур отопления" },
      { src: "/portfolio/itp/itp_3.webp", caption: "Лобня: Мнемосхема АРМ — Контур ГВС" },
      { src: "/portfolio/itp/itp_4.webp", caption: "Лобня: Мнемосхема АРМ — Приточная вентиляция" },
    ],
  },
  {
    id: "scada",
    title: "Единый диспетчерский пункт",
    type: "SCADA-диспетчеризация",
    hardware: "MasterSCADA 4D · ОВЕН ПЛК210 · GSM iRZ",
    details: "8 распределённых объектов тепло- и водоснабжения на едином экране АРМ диспетчера с резервом каналов связи",
    location: "Центральный ФО",
    result: "Telegram-бот · 480 тегов",
    size: "medium",
    color: "bg-iron",
    images: [
      { src: "/portfolio/scada/scada_1.webp", caption: "Калининград: Главная мнемосхема диспетчеризации SCADA" },
      { src: "/portfolio/scada/scada_2.webp", caption: "Калининград: Графики трендов давления и температур" },
      { src: "/portfolio/scada/scada_3.webp", caption: "Бунятино: HMI мнемосхема сортировочного комплекса" },
      { src: "/portfolio/scada/scada_4.webp", caption: "Бунятино: Экран управления накопительными бункерами" },
      { src: "/portfolio/scada/scada_5.webp", caption: "Бунятино: Сенсорный пульт управления линии мойки" },
    ],
  },
  {
    id: "vzu",
    title: "ВЗУ посёлка и станция 2-го подъёма",
    type: "Водоснабжение (ВЗУ)",
    hardware: "ОВЕН СПК110 · ПЧ Veda MC / Innovert",
    details: "4 артезианские скважины · Автоматическая ротация по моточасам · Промывка песчаных фильтров",
    location: "Тюменская обл.",
    result: "Давление 4.2 ±0.1 бар",
    size: "wide", // 2x1
    color: "bg-gunmetal",
    images: [
      { src: "/portfolio/vzu/vzu_1.webp", caption: "Завод пластика: Каскадная повысительная насосная станция" },
      { src: "/portfolio/vzu/vzu_2.webp", caption: "Завод пластика: Щит управления и реле давления" },
      { src: "/portfolio/vzu/vzu_3.webp", caption: "ЦТП-2-20: Насосная группа станции второго подъёма" },
      { src: "/portfolio/vzu/vzu_4.webp", caption: "ЦТП-2-20: Напорный коллектор с преобразователями частоты" },
    ],
  },
  {
    id: "cabinets",
    title: "Шкафы автоматики серии ША-К",
    type: "Серийное производство ШУ",
    hardware: "Корпуса DKC RAM block · КЭАЗ OptiMat",
    details: "Сборка шкафов управления котельными установками по ПУЭ и ТЗ заказчика на проверенной компонентной базе",
    location: "Сборочный цех (Москва)",
    result: "Заводская проверка цепей и логики",
    size: "medium",
    color: "bg-carbon",
    images: [
      { src: "/portfolio/cabinets/cabinets_1.webp", caption: "Силовой шкаф ША-К: Силовые шины и автоматические выключатели" },
      { src: "/portfolio/cabinets/cabinets_2.webp", caption: "Компоновка контроллерного отсека и блоков питания" },
      { src: "/portfolio/cabinets/cabinets_3.webp", caption: "СПБ: Сборка и тестирование шкафа автоматики" },
      { src: "/portfolio/cabinets/cabinets_4.webp", caption: "Тверь: Лазерная маркировка клемм и жгутование проводки" },
    ],
  },
  {
    id: "cooling",
    title: "Холодоснабжение предприятия",
    type: "Промышленный холод",
    hardware: "ПЛК Carel / ОВЕН · ПЧ Danfoss VLT",
    details: "Управление винтовыми компрессорами, сухими градирнями и гликолевыми насосными контурами с плавным пуском",
    location: "Смоленская обл.",
    result: "Энергосбережение -24%",
    size: "medium",
    color: "bg-iron",
    images: [
      { src: "/portfolio/cooling/cooling_1.webp", caption: "Ярцево: Компрессорная станция промышленного холода" },
      { src: "/portfolio/cooling/cooling_2.webp", caption: "Ярцево: Трубная обвязка чиллеров и датчики потока" },
      { src: "/portfolio/cooling/cooling_3.webp", caption: "СПБ: Сухая градирня (фрикулер) и вентиляторные группы" },
      { src: "/portfolio/cooling/cooling_4.webp", caption: "СПБ: Щит управления насосами промежуточного контура" },
    ],
  },
  {
    id: "agro",
    title: "Агрокомплекс: Линия сортировки",
    type: "Технологическая линия",
    hardware: "ПЛК Delta DVP · Панели Weintek · ПЧ Innovert",
    details: "Синхронизация конвейеров, оптических датчиков и дозаторов с рецептурным заданием параметров на HMI",
    location: "Московская обл. (Дмитров)",
    result: "Синхронизация 6 приводов",
    size: "medium",
    color: "bg-gunmetal",
    images: [
      { src: "/portfolio/agro/agro_1.webp", caption: "Агрофирма Бунятино: Автоматизированная линия мойки и сортировки" },
      { src: "/portfolio/agro/agro_2.webp", caption: "Бунятино: Распределительный конвейер с частотным приводом" },
      { src: "/portfolio/agro/agro_3.webp", caption: "Бунятино: Шкаф управления технологической линией нарезки" },
      { src: "/portfolio/agro/agro_4.webp", caption: "Бунятино: Моечный барабан с контролем уровня воды" },
    ],
  },
  {
    id: "retrofit",
    title: "Ретрофит и модернизация насосных групп",
    type: "Модернизация автоматики",
    hardware: "Segnetics SMH4 · ПЧ Veda MC · Датчики ОВЕН",
    details: "Замена морально устаревшей релейной автоматики на современные ПЛК с частотным регулированием без останова",
    location: "Центральный ФО",
    result: "Переврезка за 48 часов",
    size: "wide",
    color: "bg-carbon",
    images: [
      { src: "/portfolio/retrofit/retrofit_1.webp", caption: "ЦТП 2-14: Монтаж новой циркуляционной насосной группы" },
      { src: "/portfolio/retrofit/retrofit_2.webp", caption: "ЦТП 2-14: Обвязка регулирующих клапанов и реле сухого хода" },
      { src: "/portfolio/retrofit/retrofit_3.webp", caption: "Тверь: Модернизированный шкаф автоматики фрикулера" },
      { src: "/portfolio/retrofit/retrofit_4.webp", caption: "Ярцево: Переподключение кабельных линий к новому шкафу" },
    ],
  },
];

function getTileClass(size: string) {
  switch (size) {
    case "large":
      return "col-span-1 sm:col-span-2 sm:row-span-2";
    case "wide":
      return "col-span-1 sm:col-span-2 sm:row-span-1";
    default:
      return "col-span-1 row-span-1";
  }
}

const graphiteShadesMedium = [
  "bg-[#212529]",
  "bg-[#2B3036]",
  "bg-[#1A1D20]",
  "bg-[#343A40]",
  "bg-[#25292E]",
  "bg-[#3D434A]",
];

const graphiteShadesWide = [
  "bg-[#2B3036]",
  "bg-[#1E2226]",
  "bg-[#343A40]",
  "bg-[#212529]",
  "bg-[#282C32]",
  "bg-[#1A1D20]",
];

interface GraphiteLiveTileProps {
  id: string;
  size: "medium" | "wide";
  tileIndex: number;
}

function GraphiteLiveTile({ id, size, tileIndex }: GraphiteLiveTileProps) {
  const shades = size === "wide" ? graphiteShadesWide : graphiteShadesMedium;
  const [shadeIndex, setShadeIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"up" | "down">("down");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Stagger initial delay so tiles flip asynchronously
    const initialDelay = 1800 + (tileIndex * 1150) % 4800 + Math.random() * 1200;

    const scheduleNextFlip = (delayMs: number) => {
      timerRef.current = setTimeout(() => {
        setFlipDirection(Math.random() > 0.5 ? "down" : "up");
        setShadeIndex((prev) => (prev + 1) % shades.length);

        const nextInterval = 4800 + (tileIndex % 4) * 1100 + Math.random() * 1800;
        scheduleNextFlip(nextInterval);
      }, delayMs);
    };

    scheduleNextFlip(initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tileIndex, shades.length]);

  const isUp = flipDirection === "up";
  const initialRotate = isUp ? -90 : 90;
  const exitRotate = isUp ? 90 : -90;

  const tileClass =
    size === "wide"
      ? "hidden sm:block col-span-1 sm:col-span-2 sm:row-span-1"
      : "hidden sm:block col-span-1 row-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: tileIndex * 0.04 }}
      className={`${tileClass} relative overflow-hidden min-h-[220px] md:min-h-[250px] select-none`}
      style={{ perspective: 1200 }}
    >
      {/* 3D Flipping Graphite Rectangle (Windows Phone Metro Turnstile Animation) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ perspective: 1200 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${id}-${shadeIndex}`}
            initial={{ rotateX: initialRotate, opacity: 0.25, scale: 1.02 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: exitRotate, opacity: 0.2, scale: 0.98 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1], // Signature Metro deceleration curve
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className={`absolute inset-0 w-full h-full ${shades[shadeIndex]}`}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ProjectCardImage({
  src,
  caption,
  isCardActive,
}: {
  src: string;
  caption: string;
  isCardActive: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div className="relative w-full h-full bg-surface-warm overflow-hidden">
      {/* Round circular preloader on light background */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-warm/95 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white shadow-2xs border border-divider/25 flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-graphite/70 animate-spin" strokeWidth={1.5} />
          </div>
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={caption}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover object-center filter transition-all duration-300 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${
          isCardActive
            ? "scale-105 brightness-110"
            : "brightness-100 group-hover:scale-105 group-hover:brightness-110"
        }`}
        loading="lazy"
      />
    </div>
  );
}

function LightboxPhoto({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white shadow-md border border-divider/30 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-graphite/70 animate-spin" strokeWidth={1.5} />
          </div>
        </div>
      )}

      <motion.img
        ref={imgRef}
        src={src}
        alt={caption}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.22 }}
        className="max-h-[58vh] md:max-h-[62vh] w-auto max-w-full object-contain rounded-xl shadow-md"
      />
    </div>
  );
}

interface LiveTileProps {
  project: ProjectItem;
  tileIndex: number;
  activeMobileId: string | null;
  onOpenLightbox: (project: ProjectItem, photoIndex: number) => void;
}

function LiveTile({ project, tileIndex, activeMobileId, onOpenLightbox }: LiveTileProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"up" | "down">("down");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const images = project.images;
  const currentPhoto = images[photoIndex];
  const isCentered = activeMobileId === project.id;
  const isCardActive = isHovered || isCentered;

  // Windows Phone Live Tile staggered asynchronous cycle
  useEffect(() => {
    if (images.length <= 1) return;

    // Stagger initial activation across tiles (Tile 0 starts at ~1.8s, Tile 3 at ~4.2s, etc.)
    const initialDelay = 1600 + (tileIndex * 1100) % 5000 + Math.random() * 1200;

    const scheduleNextFlip = (delayMs: number) => {
      timerRef.current = setTimeout(() => {
        if (!isHovered && !isCentered) {
          setFlipDirection(Math.random() > 0.5 ? "down" : "up");
          setPhotoIndex((prev) => (prev + 1) % images.length);
        }
        // Recurring random interval: 4.8s to 8.2s per tile
        const nextInterval = 4800 + (tileIndex % 4) * 1100 + Math.random() * 1800;
        scheduleNextFlip(nextInterval);
      }, delayMs);
    };

    scheduleNextFlip(initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [images.length, tileIndex, isHovered, isCentered]);

  // Turnstile 3D rotation parameters
  const isUp = flipDirection === "up";
  const initialRotate = isUp ? -90 : 90;
  const exitRotate = isUp ? 90 : -90;

  return (
    <motion.div
      data-tile-id={project.id}
      initial={{ opacity: 0, scale: 0.99 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: tileIndex * 0.04 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${getTileClass(project.size)} ${project.color} relative overflow-hidden group min-h-[220px] md:min-h-[250px] select-none cursor-pointer`}
      style={{ perspective: 1200 }}
      onClick={() => onOpenLightbox(project, photoIndex)}
    >
      {/* 3D Flipping Photo Layer (Windows Phone Metro Turnstile Animation) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ perspective: 1200 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${project.id}-${photoIndex}`}
            initial={{ rotateX: initialRotate, opacity: 0.25, scale: 1.02 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: exitRotate, opacity: 0.2, scale: 0.98 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1], // Signature Metro deceleration curve
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <ProjectCardImage
              src={currentPhoto.src}
              caption={currentPhoto.caption}
              isCardActive={isCardActive}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightened Frosted Overlay with Centered Book Badge on Hover & Mobile Center Scroll */}
      <div
        className={`absolute inset-0 bg-white/55 backdrop-blur-[2px] transition-opacity duration-200 ease-out flex flex-col items-center justify-center p-3 pointer-events-none z-20 ${
          isCardActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div
          className={`flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-graphite text-white shadow-xl border border-white/20 transition-transform duration-200 ease-out ${
            isCardActive
              ? "translate-y-0"
              : "transform translate-y-1 group-hover:translate-y-0"
          }`}
        >
          <BookOpen strokeWidth={1.5} className="w-4 h-4 text-white shrink-0" />
          <span className="text-[12px] font-medium tracking-tight whitespace-nowrap">
            Подробнее
          </span>
        </div>

        {/* Subtle technical caption at bottom */}
        <div className="absolute bottom-2.5 left-3 right-3 text-center truncate">
          <span className="text-[11px] font-mono text-graphite/85 font-medium">
            {project.title}
          </span>
          {project.type && (
            <span className="hidden sm:inline text-[10px] font-mono text-pewter ml-2">
              · {project.type}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    project: ProjectItem | null;
    photoIndex: number;
  }>({
    isOpen: false,
    project: null,
    photoIndex: 0,
  });

  const openLightbox = (project: ProjectItem, photoIndex: number) => {
    setLightboxState({
      isOpen: true,
      project,
      photoIndex,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextLightboxPhoto = () => {
    if (!lightboxState.project) return;
    const count = lightboxState.project.images.length;
    setLightboxState((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex + 1) % count,
    }));
  };

  const prevLightboxPhoto = () => {
    if (!lightboxState.project) return;
    const count = lightboxState.project.images.length;
    setLightboxState((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex - 1 + count) % count,
    }));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxState.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxPhoto();
      if (e.key === "ArrowLeft") prevLightboxPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxState.isOpen, lightboxState.project]);

  // Single-card mobile auto-hover coordinator
  // Strictly guarantees that AT MOST ONE card can have the hover effect at any moment
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767px), (hover: none)");
    if (!media.matches) return;

    // Laser-narrow 10% vertical band at the exact center (top 45% to bottom 45%)
    const observer = new IntersectionObserver(
      (entries) => {
        // First, drop active state for any card that exited the center line
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const id = entry.target.getAttribute("data-tile-id");
            if (id) {
              setActiveMobileId((prev) => (prev === id ? null : prev));
            }
          }
        });

        // Whichever single card intersects the center line claims active state
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-tile-id");
            if (id) {
              setActiveMobileId(id);
            }
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    const tiles = document.querySelectorAll("[data-tile-id]");
    tiles.forEach((t) => observer.observe(t));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-surface-warm">
      <section
        id="projects"
        className="py-20 md:py-28 bg-surface rounded-t-[28px] md:rounded-t-[36px] lg:rounded-t-[44px]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto pb-10 text-center">
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1.12] tracking-tight">
            Реализованные конфигурации и технологические узлы
          </h2>
        </div>

        {/* Windows Phone Metro Live Grid */}
        <div className="rounded-[14px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(19,18,16,0.10),0_4px_12px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2px] bg-divider/40">
          {projects.slice(0, 7).map((project, i) => (
            <LiveTile
              key={project.id}
              project={project}
              tileIndex={i}
              activeMobileId={activeMobileId}
              onOpenLightbox={openLightbox}
            />
          ))}

          {/* Graphite Live Tile 1 — Fills Row 3, Col 4 */}
          <GraphiteLiveTile
            id="graphite-tile-1"
            size="medium"
            tileIndex={7}
          />

          {/* Project 7: retrofit (wide 2x1) — Fills Row 4, Cols 1-2 */}
          {projects[7] && (
            <LiveTile
              project={projects[7]}
              tileIndex={8}
              activeMobileId={activeMobileId}
              onOpenLightbox={openLightbox}
            />
          )}

          {/* Graphite Live Tile 2 — Fills Row 4, Cols 3-4 */}
          <GraphiteLiveTile
            id="graphite-tile-2"
            size="wide"
            tileIndex={9}
          />
        </div>
      </div>

      {/* Light Theme Engineer Lightbox Modal */}
      <AnimatePresence>
        {lightboxState.isOpen && lightboxState.project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-graphite/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-surface border border-divider/60 rounded-2xl md:rounded-[20px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] p-3 sm:p-4 md:p-5 gap-3 md:gap-4"
            >
              {/* Main Image Viewport (Clean, no card background) */}
              <div className="relative flex-1 min-h-[340px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <LightboxPhoto
                    key={lightboxState.photoIndex}
                    src={lightboxState.project.images[lightboxState.photoIndex].src}
                    caption={lightboxState.project.images[lightboxState.photoIndex].caption}
                  />
                </AnimatePresence>
              </div>

              {/* Single Unified Bottom Cloud (No border, light site shadow) */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 w-full">
                {/* Left: Title & Description */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-graphite font-heading text-lg md:text-xl font-bold tracking-tight">
                    {lightboxState.project.title}
                  </h3>
                  <p className="text-iron text-[13px] leading-relaxed mt-1">
                    {lightboxState.project.images[lightboxState.photoIndex].caption}
                    {lightboxState.project.hardware && (
                      <span className="text-pewter block sm:inline sm:ml-2 text-[12px]">
                        — Оборудование: {lightboxState.project.hardware}
                      </span>
                    )}
                  </p>
                </div>

                {/* Right: Controls & Thumbnails */}
                <div className="flex flex-col gap-2.5 shrink-0 items-start md:items-end w-full md:w-auto">
                  {/* Segmented Controller + Separate Close */}
                  <div className="flex items-center gap-2">
                    {/* Monolithic Segmented Pill */}
                    <div className="bg-surface rounded-[8px] p-0.5 border border-divider/50 flex items-center shadow-2xs">
                      <button
                        onClick={prevLightboxPhoto}
                        aria-label="Предыдущий слайд"
                        className="w-8 h-8 flex items-center justify-center rounded-[6px] text-graphite hover:bg-white hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                      >
                        <ChevronLeft strokeWidth={1.5} className="w-4 h-4" />
                      </button>

                      <div className="px-2.5 text-xs font-mono font-semibold text-graphite select-none tracking-wider min-w-[42px] text-center">
                        {lightboxState.photoIndex + 1} / {lightboxState.project.images.length}
                      </div>

                      <button
                        onClick={nextLightboxPhoto}
                        aria-label="Следующий слайд"
                        className="w-8 h-8 flex items-center justify-center rounded-[6px] text-graphite hover:bg-white hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                      >
                        <ChevronRight strokeWidth={1.5} className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Independent Close Button */}
                    <button
                      onClick={closeLightbox}
                      aria-label="Закрыть окно"
                      className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-surface hover:bg-graphite hover:text-white text-graphite border border-divider/50 transition-all hover:border-graphite active:scale-95 cursor-pointer shadow-2xs"
                    >
                      <X strokeWidth={1.5} className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnails row */}
                  <div className="flex items-center gap-2 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {lightboxState.project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setLightboxState((prev) => ({ ...prev, photoIndex: idx }))
                        }
                        className={`relative w-11 h-11 md:w-12 md:h-12 rounded-[8px] overflow-hidden border transition-all shrink-0 cursor-pointer ${
                          idx === lightboxState.photoIndex
                            ? "border-graphite ring-2 ring-graphite/25 opacity-100 shadow-xs"
                            : "border-divider/50 opacity-60 hover:opacity-100 hover:border-iron"
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.caption || ""}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  </div>
  );
}
