"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
      { src: "/portfolio/vzu/vzu_4.webp", caption: "ЦТП-2-20: Напорный коллектор с частотными приводами" },
    ],
  },
  {
    id: "cabinets",
    title: "Шкафы автоматики серии ША-К",
    type: "Серийное производство ШУ",
    hardware: "Корпуса DKC RAM block · КЭАЗ OptiMat",
    details: "Сборка шкафов управления котельными установками с защитой по ГОСТ 21.408 и ПУЭ на элементной базе РФ",
    location: "Сборочный цех (Москва)",
    result: "Стендовый тест 48 часов",
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
      return "col-span-2 row-span-2";
    case "wide":
      return "col-span-2 row-span-1";
    default:
      return "col-span-1 row-span-1";
  }
}

interface LiveTileProps {
  project: ProjectItem;
  tileIndex: number;
  onOpenLightbox: (project: ProjectItem, photoIndex: number) => void;
}

function LiveTile({ project, tileIndex, onOpenLightbox }: LiveTileProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"up" | "down">("down");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const images = project.images;
  const currentPhoto = images[photoIndex];

  // Windows Phone Live Tile staggered asynchronous cycle
  useEffect(() => {
    if (images.length <= 1) return;

    // Stagger initial activation across tiles (Tile 0 starts at ~1.8s, Tile 3 at ~4.2s, etc.)
    const initialDelay = 1600 + (tileIndex * 1100) % 5000 + Math.random() * 1200;

    const scheduleNextFlip = (delayMs: number) => {
      timerRef.current = setTimeout(() => {
        if (!isHovered) {
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
  }, [images.length, tileIndex, isHovered]);

  // Turnstile 3D rotation parameters
  const isUp = flipDirection === "up";
  const initialRotate = isUp ? -90 : 90;
  const exitRotate = isUp ? 90 : -90;

  return (
    <motion.div
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
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              className="w-full h-full object-cover object-center filter brightness-100 transition-all duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Industrial Dark Vignette Overlay - Only on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon/95 via-carbon/65 to-carbon/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

      {/* Foreground Content - Only on Hover */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-white z-20 pointer-events-none opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
        <div>
          <h3 className="text-white text-lg md:text-xl font-bold tracking-tight leading-tight drop-shadow-md">
            {project.title}
          </h3>

          <div className="mt-1.5 text-[11px] font-mono text-white/70">
            {project.hardware}
          </div>

          <p className="mt-2 text-[12px] text-white/90 leading-snug line-clamp-2">
            {project.details}
          </p>

          {project.location && (
            <div className="mt-3 text-[11px] font-mono text-white/60">
              {project.location}
            </div>
          )}
        </div>
      </div>

      {/* Hover lighting sheen */}
      <div className="absolute inset-0 bg-white/0 transition-colors duration-200 group-hover:bg-white/[0.04] z-20 pointer-events-none" />
    </motion.div>
  );
}

export function Projects() {
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

  return (
    <section id="projects" className="py-20 md:py-28 bg-surface">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl pb-10">
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1.12] tracking-tight">
            Реализованные конфигурации и технологические узлы
          </h2>
        </div>

        {/* Windows Phone Metro Live Grid */}
        <div className="rounded-[14px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(19,18,16,0.10),0_4px_12px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2px] bg-divider/40">
          {projects.map((project, i) => (
            <LiveTile
              key={project.id}
              project={project}
              tileIndex={i}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Brutalist Engineer Lightbox Modal */}
      <AnimatePresence>
        {lightboxState.isOpen && lightboxState.project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-carbon/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-surface-raised border border-white/10 rounded-[10px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-carbon">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                      {lightboxState.project.type}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-[11px] font-mono text-white/60">
                      {lightboxState.project.location}
                    </span>
                  </div>
                  <h3 className="text-white text-lg font-bold">
                    {lightboxState.project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/60">
                    {lightboxState.photoIndex + 1} / {lightboxState.project.images.length}
                  </span>
                  <button
                    onClick={closeLightbox}
                    className="p-1.5 rounded-[4px] bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                  >
                    <X strokeWidth={1.5} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Viewport with Nav Arrows */}
              <div className="relative flex-1 min-h-[380px] md:min-h-[500px] bg-black/40 flex items-center justify-center p-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxState.photoIndex}
                    src={lightboxState.project.images[lightboxState.photoIndex].src}
                    alt={lightboxState.project.images[lightboxState.photoIndex].caption}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="max-h-[65vh] w-auto max-w-full object-contain rounded-[4px] shadow-lg"
                  />
                </AnimatePresence>

                {/* Lightbox Nav Buttons */}
                <button
                  onClick={prevLightboxPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-[4px] bg-carbon/80 backdrop-blur-md border border-white/20 text-white hover:bg-carbon hover:border-white/40 transition-all active:scale-95"
                >
                  <ChevronLeft strokeWidth={1.5} className="w-5 h-5" />
                </button>
                <button
                  onClick={nextLightboxPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-[4px] bg-carbon/80 backdrop-blur-md border border-white/20 text-white hover:bg-carbon hover:border-white/40 transition-all active:scale-95"
                >
                  <ChevronRight strokeWidth={1.5} className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Footer / Info & Thumbnails */}
              <div className="px-6 py-4 bg-carbon border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-white/90 font-mono">
                    {lightboxState.project.images[lightboxState.photoIndex].caption}
                  </div>
                  <div className="text-[11px] text-white/50 mt-1">
                    Оборудование: {lightboxState.project.hardware}
                  </div>
                </div>

                {/* Thumbnails row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                  {lightboxState.project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setLightboxState((prev) => ({ ...prev, photoIndex: idx }))
                      }
                      className={`relative w-12 h-12 rounded-[4px] overflow-hidden border transition-all shrink-0 ${
                        idx === lightboxState.photoIndex
                          ? "border-emerald-400 ring-2 ring-emerald-400/30"
                          : "border-white/20 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
