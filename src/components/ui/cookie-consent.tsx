"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { openPrivacyModal } from "@/components/ui/privacy-modal";

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
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-full max-w-[480px] rounded-[14px] bg-white/95 backdrop-blur-md border border-divider/70 p-5 sm:p-6 shadow-[0_20px_50px_-10px_rgba(19,18,16,0.14),0_6px_20px_-4px_rgba(19,18,16,0.06)]"
            role="dialog"
            aria-live="polite"
            aria-label="Уведомление об использовании файлов cookie"
          >
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-graphite text-[14px] font-bold leading-snug">
                Файлы cookie
              </h4>
              <button
                type="button"
                onClick={handleDecline}
                className="text-pewter hover:text-graphite p-1 -mr-1 -mt-1 rounded-[6px] transition-colors"
                aria-label="Закрыть уведомление"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <p className="mt-2 text-iron text-[12.5px] leading-relaxed">
              Мы используем файлы cookie для корректной работы калькулятора, сохранения параметров конфигуратора и аналитики. Подробнее в{" "}
              <button
                type="button"
                onClick={openPrivacyModal}
                className="text-graphite font-semibold underline underline-offset-2 hover:text-accent transition-colors cursor-pointer"
              >
                Политике конфиденциальности
              </button>
              .
            </p>

            <div className="mt-4 flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleAccept}
                className="px-4 py-2 bg-graphite text-white text-[12.5px] font-semibold rounded-[8px] hover:bg-graphite/90 active:scale-[0.98] transition-all shadow-xs"
              >
                Принять
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="px-3.5 py-2 text-pewter hover:text-graphite text-[12.5px] font-medium transition-colors"
              >
                Только обязательные
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

