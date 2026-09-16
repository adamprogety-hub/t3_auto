"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

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
        <motion.aside
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-[420px] rounded-[14px] bg-white/95 backdrop-blur-md border border-divider/70 p-4 sm:p-5 shadow-[0_20px_50px_-10px_rgba(19,18,16,0.14),0_6px_20px_-4px_rgba(19,18,16,0.06)]"
          role="dialog"
          aria-live="polite"
          aria-label="Уведомление об использовании файлов cookie"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-[8px] bg-surface-warm flex items-center justify-center text-graphite shrink-0 mt-0.5">
              <Cookie className="w-4 h-4 text-graphite" strokeWidth={1.5} />
            </div>

            <div className="flex-1 pr-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-graphite text-[13px] font-bold leading-snug">
                  Файлы cookie
                </h4>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="text-pewter hover:text-graphite p-1 -mr-2 -mt-1 rounded-[6px] transition-colors"
                  aria-label="Закрыть уведомление"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>

              <p className="mt-1 text-iron text-[12px] leading-relaxed">
                Мы используем файлы cookie для корректной работы калькулятора, сохранения параметров конфигуратора и сбора аналитики.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="px-4 py-2 bg-graphite text-white text-[12px] font-semibold rounded-[8px] hover:bg-graphite/90 active:scale-[0.98] transition-all shadow-xs"
                >
                  Принять
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="px-3.5 py-2 text-pewter hover:text-graphite text-[12px] font-medium transition-colors"
                >
                  Только обязательные
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
