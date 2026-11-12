"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, BookOpen, Loader2 } from "lucide-react";
import { openCasesModal } from "@/components/modals/header-modals";

export interface ProjectItem {
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

export const projects: ProjectItem[] = [
  {
    id: "sheremetyevo",
    title: "Аэропорт Шереметьево",
    type: "Инфраструктура / КИИ",
    hardware: "Замена Schneider Electric · ПТК РФ · ЧРП",
    details: "Полная замена автоматики Schneider Electric: новое ПО и шкафы управления для систем жизнеобеспечения. Котельная, КНС, водозаборные сооружения (5 скважин с ЧП, 12 насосов, УФ-обеззараживание).",
    location: "Москва (МАШ Шереметьево)",
    result: "100% замена Schneider Electric",
    size: "large", // 2x2
    color: "bg-graphite",
    images: [
      { src: "/portfolio/boiler/boiler_1.webp", caption: "Шереметьево: Главный шкаф автоматики котельной жизнеобеспечения" },
      { src: "/portfolio/boiler/boiler_2.webp", caption: "Шереметьево: Шкаф управления сетевой насосной станцией с ЧРП" },
      { src: "/portfolio/boiler/boiler_3.webp", caption: "Шереметьево: Обвязка тепломеханических узлов и насосных групп" },
      { src: "/portfolio/boiler/boiler_4.webp", caption: "Шереметьево: Коллекторы водозаборных сооружений и датчики давления" },
    ],
  },
  {
    id: "tolyatti_block15",
    title: "ООО «Тольяттикаучук» (ГК «Татнефть»)",
    type: "Нефтехимия / РСУ и ПАЗ",
    hardware: "Распределённая РСУ · Система ПАЗ · Газовый контроль",
    details: "Техперевооружение блока №15 «Приём, хранение и отпуск изобутановой фракции» отделения Д-1а ТСЦ и модернизация систем контроля загазованности Д-1-И-1 ТСЦ.",
    location: "Самарская обл. (Тольятти)",
    result: "Децентрализованный I/O · ПАЗ SIL3",
    size: "medium", // 1x1
    color: "bg-gunmetal",
    images: [
      { src: "/portfolio/itp/itp_1.webp", caption: "Тольяттикаучук: Насосная группа блока №15 изобутановой фракции" },
      { src: "/portfolio/itp/itp_2.webp", caption: "Тольяттикаучук: Мнемосхема АРМ — Контур контроля загазованности" },
      { src: "/portfolio/itp/itp_3.webp", caption: "Тольяттикаучук: Мнемосхема АРМ — Параметры отделения Д-1а ТСЦ" },
      { src: "/portfolio/itp/itp_4.webp", caption: "Тольяттикаучук: Системы противоаварийной защиты (ПАЗ)" },
    ],
  },
  {
    id: "tolyatti_acid",
    title: "Производство щавелевой кислоты",
    type: "Химия / ПТК «БАЗИС-100»",
    hardware: "ПТК «БАЗИС-100» · 4 панели HMI · Резервирование",
    details: "АСУТП установки производства щавелевой кислоты: 900 каналов, 12 мнемосхем на 4 панелях HMI. РСУ и ПАЗ, каждая на двух резервированных контроллерах.",
    location: "Самарская обл. (Тольятти)",
    result: "900 каналов · 12 мнемосхем HMI",
    size: "medium",
    color: "bg-iron",
    images: [
      { src: "/portfolio/scada/scada_1.webp", caption: "Щавелевая кислота: Главная мнемосхема установки на панели HMI" },
      { src: "/portfolio/scada/scada_2.webp", caption: "Щавелевая кислота: Графики трендов давления, расхода и температур" },
      { src: "/portfolio/scada/scada_3.webp", caption: "Щавелевая кислота: HMI мнемосхема контуров дозирования и смешения" },
      { src: "/portfolio/scada/scada_4.webp", caption: "Щавелевая кислота: Экран контуров противоаварийной защиты ПАЗ" },
      { src: "/portfolio/scada/scada_5.webp", caption: "Щавелевая кислота: Панель оператора на базе контроллера БАЗИС-100" },
    ],
  },
  {
    id: "svgk_shgrp",
    title: "ООО «СВГК» / Группа «Межрегионгаз»",
    type: "Газораспределение / ЗОКИИ",
    hardware: "Astra Linux · ШГРП · OPC UA · ПП № 1912",
    details: "Пилотный шкаф телемеханики ШГРП: сбор данных с датчиков ГРП, приводная арматура, корректор Elster, передача по GSM/OPC UA, АРМ на Astra Linux. Опытная эксплуатация без замечаний.",
    location: "Самарская обл.",
    result: "ПП РФ №1912 (ЗОКИИ) · Опытная серия",
    size: "wide", // 2x1
    color: "bg-gunmetal",
    images: [
      { src: "/portfolio/vzu/vzu_1.webp", caption: "СВГК: Шкаф телемеханики ШГРП в сборе перед испытаниями" },
      { src: "/portfolio/vzu/vzu_2.webp", caption: "СВГК: Компоновка контроллера телемеханики и модема GSM" },
      { src: "/portfolio/vzu/vzu_3.webp", caption: "СВГК: Интерфейс АРМ диспетчера на базе ОС Astra Linux" },
      { src: "/portfolio/vzu/vzu_4.webp", caption: "СВГК: Опрос корректора газа Elster по протоколу OPC UA" },
    ],
  },
  {
    id: "ural_trucks",
    title: "Автомобильный завод «УРАЛ»",
    type: "Машиностроение / КИП",
    hardware: "АСУ стендом КИП · Главный конвейер · АРМ ОТК",
    details: "Модернизация системы контроля процесса испытаний автомобилей в цехе Главный конвейер. Контроль испытаний и устранения несоответствий от схода до сдачи ОТК.",
    location: "Челябинская обл. (Миасс)",
    result: "Надёжный контроль сдачи ОТК",
    size: "medium",
    color: "bg-carbon",
    images: [
      { src: "/portfolio/cabinets/cabinets_1.webp", caption: "АЗ УРАЛ: Шкаф управления стендом контрольно-измерительного пункта" },
      { src: "/portfolio/cabinets/cabinets_2.webp", caption: "АЗ УРАЛ: Контроллерная панель управления узлами обкатки" },
      { src: "/portfolio/cabinets/cabinets_3.webp", caption: "АЗ УРАЛ: Главный конвейер — интеграция стенда с АСУ завода" },
      { src: "/portfolio/cabinets/cabinets_4.webp", caption: "АЗ УРАЛ: Маркировка сигнальных линий датчиков испытаний" },
    ],
  },
  {
    id: "rmk_safety",
    title: "АО «Русская медная компания»",
    type: "Металлургия / Промбезопасность",
    hardware: "Единый диспетчерский центр · 1000 параметров",
    details: "Единый диспетчерский центр промышленной безопасности: регламенты, люди на объекте, реакция на ЧС. 1000 параметров АСУТП, 256 сигналов подстанций, оповещение Telegram/SIP/SMS.",
    location: "Уральский ФО",
    result: "1000 параметров · Оповещение ЧС",
    size: "medium",
    color: "bg-iron",
    images: [
      { src: "/portfolio/cooling/cooling_1.webp", caption: "РМК: Диспетчерский видеостенд центра промышленной безопасности" },
      { src: "/portfolio/cooling/cooling_2.webp", caption: "РМК: Интеграция телеметрии 256 дискретных сигналов подстанций" },
      { src: "/portfolio/cooling/cooling_3.webp", caption: "РМК: Шкаф сбора данных технологических параметров цехов" },
      { src: "/portfolio/cooling/cooling_4.webp", caption: "РМК: Модуль аварийного оповещения персонала через SIP и Telegram" },
    ],
  },
  {
    id: "kizlyar_brandy",
    title: "АО «Кизлярский коньячный завод»",
    type: "Пищепром / Ректификация",
    hardware: "АСУТП ректификации · ПЛК · Датчики КИП",
    details: "Автоматизация перегонки вина на коньячный спирт в цехе ректификации: рост производительности непрерывных установок и снижение общих потерь продукции.",
    location: "Республика Дагестан",
    result: "Рост выхода · Снижение потерь",
    size: "medium",
    color: "bg-gunmetal",
    images: [
      { src: "/portfolio/agro/agro_1.webp", caption: "Кизляр: Колонны ректификации спирта и датчики давления/температуры" },
      { src: "/portfolio/agro/agro_2.webp", caption: "Кизляр: Управление клапанами подачи пара и флегмового числа" },
      { src: "/portfolio/agro/agro_3.webp", caption: "Кизляр: Шкаф управления контурами дистилляции и охлаждения" },
      { src: "/portfolio/agro/agro_4.webp", caption: "Кизляр: Панель оператора с мнемосхемой ректификационной установки" },
    ],
  },
  {
    id: "auto_cv",
    title: "Система компьютерного зрения (СТЗ)",
    type: "Компьютерное зрение / Робототехника",
    hardware: "Камеры СТЗ · Нейросетевой блок · Интеграция с РТК",
    details: "Контроль форм на конвейере сидений автозавода: бесконтактный поиск дефектов и недостающих элементов до захода оператора в зону действия робота.",
    location: "Приволжский ФО",
    result: "> 90% точность · Без участия человека",
    size: "wide",
    color: "bg-carbon",
    images: [
      { src: "/portfolio/retrofit/retrofit_1.webp", caption: "СТЗ: Камера машинного зрения над конвейерной линией сборки" },
      { src: "/portfolio/retrofit/retrofit_2.webp", caption: "СТЗ: Распознавание положения элементов каркаса сидений" },
      { src: "/portfolio/retrofit/retrofit_3.webp", caption: "СТЗ: Шкаф обработки нейросетевых моделей промышленного зрения" },
      { src: "/portfolio/retrofit/retrofit_4.webp", caption: "СТЗ: Сигнальный интерфейс с контроллером сварочного робота" },
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

  const openLightbox = (project: ProjectItem, photoIndex: number) => {
    openCasesModal(project.id, photoIndex);
  };

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
        className="py-20 md:py-28 bg-surface rounded-t-[16px] md:rounded-t-[20px]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto pb-10 text-center">
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-[1.12] tracking-tight">
            Опыт внедрения на{"\u00A0"}критических и{"\u00A0"}промышленных объектах
          </h2>
          <p className="mt-3 text-iron text-[14.5px] leading-relaxed">
            Проекты для федеральной инфраструктуры, нефтехимии, машиностроения, металлургии и газораспределения.
          </p>
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
    </section>
  </div>
  );
}
