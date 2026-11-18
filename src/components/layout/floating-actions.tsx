"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, X } from "lucide-react";
import { TelegramIcon, PhoneFilledIcon, MailFilledIcon } from "@/components/ui/brand-icons";
import { closeHeaderModal } from "@/components/modals/header-modals";

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal floating actions once user has scrolled past the top hero
      setIsVisible(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsMenuOpen(Boolean(customEvent.detail?.isOpen));
    };

    const handleModalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ modal?: string }>;
      setActiveModal(customEvent.detail?.modal || null);
    };

    const handleModalClose = () => {
      setActiveModal(null);
    };

    window.addEventListener("mobile-menu-toggle", handleMenuToggle);
    window.addEventListener("open-header-modal", handleModalOpen);
    window.addEventListener("close-header-modal", handleModalClose);
    return () => {
      window.removeEventListener("mobile-menu-toggle", handleMenuToggle);
      window.removeEventListener("open-header-modal", handleModalOpen);
      window.removeEventListener("close-header-modal", handleModalClose);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const contactsSection = document.getElementById("contacts");
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  // When either mobile menu OR any modal is open, scroll arrows disappear
  const isOverlayActive = isMenuOpen || Boolean(activeModal);
  // Show mobile dock if scrolled OR if menu/modal is active (so bottom bar and close button always exist)
  const showMobileDock = isVisible || isOverlayActive;

  return (
    <>
      {/* ═══════════════════════════════════════════════
          MOBILE / TABLET: Horizontal Floating Island Dock
          z-[75] — always above modal backdrop (z-50) and modal window (z-60)
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {showMobileDock && (
          <div
            id="mobile-bottom-dock-container"
            className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[75] flex items-center gap-2 pointer-events-auto"
          >
            {/* Main Dock */}
            <motion.nav
              key="mobile-dock"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Быстрые действия"
              className="inline-flex items-center gap-1 p-1.5 bg-white/95 backdrop-blur-md border border-divider/60 shadow-[0_8px_24px_rgba(0,0,0,0.14)] rounded-[14px]"
            >
              {/* Scroll Up & Down: Hide seamlessly when menu or modal is active */}
              <AnimatePresence initial={false}>
                {!isOverlayActive && (
                  <motion.div
                    key="scroll-buttons"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1 overflow-hidden"
                  >
                    {/* Scroll Up */}
                    <button
                      type="button"
                      onClick={scrollToTop}
                      aria-label="Прокрутить наверх"
                      className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 active:scale-95 transition-all shrink-0"
                    >
                      <ArrowUp className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </button>

                    {/* Scroll Down */}
                    <button
                      type="button"
                      onClick={scrollToBottom}
                      aria-label="Прокрутить вниз"
                      className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 active:scale-95 transition-all shrink-0"
                    >
                      <ArrowDown className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </button>

                    {/* Subtle Divider */}
                    <div className="w-[1px] h-4 bg-divider/50 mx-0.5 shrink-0" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Call */}
              <a
                href="tel:+79608218170"
                aria-label="Позвонить"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 active:scale-95 transition-all"
              >
                <PhoneFilledIcon className="w-[15px] h-[15px] text-graphite" />
              </a>

              {/* Email */}
              <a
                href="mailto:aleksey.ivanov@t3-auto.com"
                aria-label="Написать на почту"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 active:scale-95 transition-all"
              >
                <MailFilledIcon className="w-[16px] h-[16px] text-graphite" />
              </a>

              {/* Telegram (Matching desktop squircle) */}
              <a
                href="https://t.me/t3_auto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в Telegram"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-graphite text-white shadow-2xs hover:bg-carbon active:scale-95 transition-all"
              >
                <TelegramIcon className="w-3.5 h-3.5 text-white" />
              </a>
            </motion.nav>

            {/* Separate Square Island for Closing Active Modal */}
            <AnimatePresence>
              {Boolean(activeModal) && (
                <motion.button
                  key="modal-close-island"
                  type="button"
                  initial={{ opacity: 0, scale: 0.8, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => closeHeaderModal()}
                  aria-label="Закрыть окно"
                  className="w-12 h-12 flex items-center justify-center rounded-[14px] bg-white text-graphite border border-divider/60 shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-95 hover:bg-graphite hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════
          DESKTOP: Vertical Floating Toolbar with Tooltips
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            key="desktop-toolbar"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Панель быстрых действий"
            className="hidden md:flex fixed bottom-6 right-6 z-30 flex-col items-center bg-white/95 backdrop-blur-md border border-divider/60 shadow-[0_8px_28px_rgba(0,0,0,0.08)] rounded-[12px] p-1.5 gap-1"
          >
            {/* Scroll Up */}
            <div className="relative group flex items-center">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Наверх"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 hover:text-black active:scale-95 transition-all"
              >
                <ArrowUp className="w-[17px] h-[17px]" strokeWidth={1.5} />
              </button>
              <span className="pointer-events-none absolute right-[calc(100%+8px)] whitespace-nowrap rounded-[6px] bg-graphite px-2 py-1 text-[11px] font-medium text-white shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                Наверх
              </span>
            </div>

            {/* Scroll Down */}
            <div className="relative group flex items-center">
              <button
                type="button"
                onClick={scrollToBottom}
                aria-label="Вниз"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 hover:text-black active:scale-95 transition-all"
              >
                <ArrowDown className="w-[17px] h-[17px]" strokeWidth={1.5} />
              </button>
              <span className="pointer-events-none absolute right-[calc(100%+8px)] whitespace-nowrap rounded-[6px] bg-graphite px-2 py-1 text-[11px] font-medium text-white shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                Вниз
              </span>
            </div>

            {/* Subtle Divider */}
            <div className="w-5 h-[1px] bg-divider/60 my-0.5" aria-hidden="true" />

            {/* Call */}
            <div className="relative group flex items-center">
              <a
                href="tel:+79608218170"
                aria-label="Позвонить"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 hover:text-black active:scale-95 transition-all"
              >
                <PhoneFilledIcon className="w-4 h-4 text-graphite" />
              </a>
              <span className="pointer-events-none absolute right-[calc(100%+8px)] whitespace-nowrap rounded-[6px] bg-graphite px-2 py-1 text-[11px] font-medium text-white shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                Позвонить
              </span>
            </div>

            {/* Email */}
            <div className="relative group flex items-center">
              <a
                href="mailto:aleksey.ivanov@t3-auto.com"
                aria-label="Написать на почту"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] text-graphite hover:bg-graphite/5 hover:text-black active:scale-95 transition-all"
              >
                <MailFilledIcon className="w-4 h-4 text-graphite" />
              </a>
              <span className="pointer-events-none absolute right-[calc(100%+8px)] whitespace-nowrap rounded-[6px] bg-graphite px-2 py-1 text-[11px] font-medium text-white shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                Написать на почту
              </span>
            </div>

            {/* Telegram (Matching desktop squircle) */}
            <div className="relative group flex items-center">
              <a
                href="https://t.me/t3_auto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в Telegram"
                className="w-9 h-9 flex items-center justify-center rounded-[8px] bg-graphite text-white shadow-2xs hover:bg-carbon active:scale-95 transition-all"
              >
                <TelegramIcon className="w-3.5 h-3.5 text-white" />
              </a>
              <span className="notranslate pointer-events-none absolute right-[calc(100%+8px)] whitespace-nowrap rounded-[6px] bg-graphite px-2 py-1 text-[11px] font-medium text-white shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                Telegram
              </span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
