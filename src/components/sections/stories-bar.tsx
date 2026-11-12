"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface StoryItem {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  gradient: string;
}

const storiesData: StoryItem[] = [
  {
    id: 1,
    category: "КОМАНДА",
    title: "Команда",
    subtitle: "видео будет здесь",
    gradient: "from-[#E66826] via-[#F97316] to-[#F59E0B]",
  },
  {
    id: 2,
    category: "ПРОИЗВОДСТВО",
    title: "Производство",
    subtitle: "видео будет здесь",
    gradient: "from-[#F59E0B] via-[#EAB308] to-[#D97706]",
  },
  {
    id: 3,
    category: "ПТК И РСУ",
    title: "Отечественные ПТК",
    subtitle: "видео будет здесь",
    gradient: "from-[#0284C7] via-[#0EA5E9] to-[#38BDF8]",
  },
  {
    id: 4,
    category: "КЕЙСЫ",
    title: "Кейсы",
    subtitle: "видео будет здесь",
    gradient: "from-[#EA580C] via-[#E66826] to-[#DC2626]",
  },
  {
    id: 5,
    category: "БЕЗОПАСНОСТЬ",
    title: "Защита КИИ",
    subtitle: "видео будет здесь",
    gradient: "from-[#10B981] via-[#059669] to-[#047857]",
  },
  {
    id: 6,
    category: "СОТРУДНИЧЕСТВО",
    title: "Генподряд",
    subtitle: "видео будет здесь",
    gradient: "from-[#C2410C] via-[#E66826] to-[#F59E0B]",
  },
];

const STORY_DURATION_MS = 6000;

export function StoriesBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeStory = storiesData[currentIndex];

  const openStory = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setIsPaused(false);
    setIsOpen(true);
  };

  const closeStory = useCallback(() => {
    setIsOpen(false);
    setProgress(0);
    setIsPaused(false);
  }, []);

  const goToPrevStory = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  }, [currentIndex]);

  const goToNextStory = useCallback(() => {
    if (currentIndex < storiesData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  }, [currentIndex, closeStory]);

  // Handle timer & progress
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const intervalStepMs = 40;
    const progressStep = (intervalStepMs / STORY_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextStory();
          return 0;
        }
        return prev + progressStep;
      });
    }, intervalStepMs);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, goToNextStory]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeStory();
      } else if (e.key === "ArrowLeft") {
        goToPrevStory();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNextStory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeStory, goToNextStory, goToPrevStory]);

  return (
    <>
      {/* ─── Stories Bar with Strictly Symmetrical Spacing ─── */}
      <section id="stories" className="relative z-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-32 sm:pb-40 md:pb-48 lg:pb-56">
        {/* Desktop Container */}
        <div className="hidden md:flex items-center justify-between h-[68px] lg:h-[72px] px-4 lg:px-5 rounded-[12px] bg-graphite border border-divider/25 shadow-[0_8px_30px_rgba(33,37,41,0.12)] max-w-[1120px] mx-auto">
          {/* Left: Stories tiles with sleek rectangular/squircle corners */}
          <div className="flex items-center gap-2.5 lg:gap-3">
            {storiesData.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                onClick={() => openStory(idx)}
                title={`${story.category}: ${story.title}`}
                className="group relative flex items-center justify-center p-[2px] rounded-[10px] transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
              >
                {/* Visible vibrant hardware tile with theme gradient ring */}
                <div
                  className={`w-10 h-10 lg:w-11 lg:h-11 rounded-[10px] p-[2px] bg-gradient-to-tr ${story.gradient} shadow-sm group-hover:brightness-125 transition-all`}
                >
                  {/* Dark inner tile */}
                  <div className="w-full h-full rounded-[8px] bg-armor flex items-center justify-center transition-colors group-hover:bg-[#25292D]">
                    {/* Centered crisp white play triangle */}
                    <svg
                      className="w-3.5 h-3.5 text-white fill-white translate-x-[1px] transition-transform duration-200 group-hover:scale-110 drop-shadow-xs"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Prompt + interactive badge "Мы в работе" */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => openStory(0)}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-[12px] lg:text-[13px] font-medium tracking-tight whitespace-nowrap transition-colors cursor-pointer"
            >
              <span aria-hidden="true" className="text-white/55">←</span>
              <span>Посмотрите короткие видео</span>
            </button>
            <button
              type="button"
              onClick={() => openStory(0)}
              className="inline-flex items-center px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-[8px] bg-white/10 hover:bg-white/15 border border-white/15 text-white text-[13px] font-medium tracking-tight select-none shadow-xs transition-colors cursor-pointer"
            >
              Мы в работе
            </button>
          </div>
        </div>

        {/* Mobile Container */}
        <div className="md:hidden rounded-[12px] bg-graphite border border-divider/25 p-3.5 space-y-3 shadow-[0_8px_24px_rgba(33,37,41,0.12)]">
          {/* Top: Prompt + interactive badge "Мы в работе" */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => openStory(0)}
              className="inline-flex items-center gap-1 text-white/70 active:text-white text-[11.5px] sm:text-[12px] font-medium tracking-tight whitespace-nowrap transition-colors"
            >
              <span>Посмотрите короткие видео</span>
              <span aria-hidden="true" className="text-white/55">↓</span>
            </button>
            <button
              type="button"
              onClick={() => openStory(0)}
              className="shrink-0 inline-flex items-center px-3 py-1.5 rounded-[8px] bg-white/10 active:bg-white/15 border border-white/15 text-white text-[12px] font-medium tracking-tight select-none transition-colors"
            >
              Мы в работе
            </button>
          </div>

          {/* Bottom: Horizontal scroll of tiles */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            {storiesData.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                onClick={() => openStory(idx)}
                className="shrink-0 flex items-center justify-center p-[2px] rounded-[10px] active:scale-95 focus:outline-none"
              >
                <div
                  className={`w-11 h-11 rounded-[10px] p-[2px] bg-gradient-to-tr ${story.gradient} shadow-sm`}
                >
                  <div className="w-full h-full rounded-[8px] bg-armor flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-white fill-white translate-x-[1px] drop-shadow-xs"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Fullscreen Stories Viewer Modal ─── */}
      <AnimatePresence>
        {isOpen && activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
            onClick={closeStory}
          >
            {/* Stories Vertical Card (Sleek brutalist corners matching website) */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="relative w-full max-w-[380px] h-[600px] max-h-[84vh] rounded-[14px] overflow-hidden bg-gradient-to-b from-graphite via-armor to-[#16181B] border border-divider/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between select-none"
            >
              {/* Subtle Ambient Radial Lighting in T3 Brand Terracotta */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 30%, #E66826, transparent 70%)`,
                }}
              />

              {/* Top Bar: Progress Bars + Header */}
              <div className="relative z-20 pt-3.5 px-3.5 pb-2 space-y-3">
                {/* Segmented Progress Bars */}
                <div className="flex items-center gap-1.5 w-full">
                  {storiesData.map((item, idx) => {
                    const isPassed = idx < currentIndex;
                    const isCurrent = idx === currentIndex;
                    const fillPercent = isPassed ? 100 : isCurrent ? progress : 0;

                    return (
                      <div
                        key={item.id}
                        className="h-[2.5px] flex-1 bg-white/25 rounded-[2px] overflow-hidden"
                      >
                        <div
                          className="h-full bg-white transition-all ease-linear"
                          style={{
                            width: `${fillPercent}%`,
                            transitionDuration: isCurrent ? "40ms" : "0ms",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Author Info + Close Button */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2.5">
                    {/* Brand avatar */}
                    <div className="w-7 h-7 rounded-[6px] bg-[#E66826] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                      Т3
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-[13px] font-semibold leading-tight tracking-tight">
                        Т3 Автоматизация
                      </span>
                      <span className="text-white/50 text-[10px] uppercase font-mono tracking-wider">
                        {activeStory.category}
                      </span>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={closeStory}
                    className="w-8 h-8 rounded-[6px] bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors focus:outline-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Content: Strictly Title & "видео будет здесь" (no extra cards/boxes) */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="space-y-1.5">
                  <h3 className="text-white text-2xl sm:text-[28px] font-bold tracking-tight">
                    {activeStory.title}
                  </h3>
                  <p className="text-white/40 text-[13px] sm:text-[14px] font-light">
                    {activeStory.subtitle}
                  </p>
                </div>
              </div>

              {/* Tap Zones for Touch / Click Navigation (Left 35% prev, Right 65% next) */}
              <div
                className="absolute inset-y-16 left-0 w-1/3 z-10 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevStory();
                }}
                title="Назад"
              />
              <div
                className="absolute inset-y-16 right-0 w-2/3 z-10 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextStory();
                }}
                title="Вперёд"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
