"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { openPrivacyModal } from "@/components/modals/header-modals";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("acengine_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback for SSR or restricted storage environments
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("acengine_cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("acengine_cookie_consent", "essential_only");
    } catch {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed z-50 pointer-events-none bottom-[84px] left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[430px]">
          <motion.aside
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto rounded-[14px] bg-white/95 backdrop-blur-md border border-divider/70 p-3.5 sm:p-4 shadow-[0_16px_36px_-6px_rgba(19,18,16,0.14),0_4px_12px_rgba(19,18,16,0.04)]"
            role="dialog"
            aria-live="polite"
            aria-label="Уведомление об использовании файлов cookie и рекомендательных технологий"
          >
            <div className="flex items-start justify-between gap-2.5">
              <p className="text-graphite text-[13px] leading-snug font-medium pr-1">
                Используем cookie и рекомендательные технологии для работы сайта.
              </p>
              <button
                type="button"
                onClick={handleDecline}
                className="text-pewter hover:text-graphite p-1 -mr-1 -mt-1 rounded-[6px] transition-colors shrink-0 cursor-pointer"
                aria-label="Закрыть уведомление"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleAccept}
                className="px-3.5 py-1.5 bg-graphite text-white text-[12px] font-semibold rounded-[8px] hover:bg-carbon active:scale-[0.98] transition-all cursor-pointer shadow-2xs whitespace-nowrap"
              >
                Принять
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="px-3 py-1.5 text-[12px] font-medium text-iron hover:text-graphite bg-surface/80 hover:bg-surface border border-divider/50 rounded-[8px] transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                Только базовые
              </button>
              <button
                type="button"
                onClick={openPrivacyModal}
                className="px-2 py-1.5 text-[12px] font-medium text-iron hover:text-graphite underline underline-offset-3 transition-colors cursor-pointer ml-auto whitespace-nowrap"
              >
                Политика
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
