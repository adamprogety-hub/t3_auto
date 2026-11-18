"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import {
  HeaderModals,
  openCertificatesModal,
  openCasesModal,
  openRequisitesModal,
  closeHeaderModal,
} from "@/components/modals/header-modals";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV_ITEMS = [
  { id: "certificates", label: "Сертификаты" },
  { id: "cases", label: "Кейсы" },
  { id: "requisites", label: "Реквизиты" },
] as const;

export function Navbar() {
  const [activeModal, setActiveModal] = useState<
    "certificates" | "cases" | "requisites" | null
  >(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dockBottomMargin, setDockBottomMargin] = useState(76);
  const headerRef = useRef<HTMLElement>(null);
  const openedFromBurgerRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeModal) {
          handleModalClose();
        } else if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          openedFromBurgerRef.current = false;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, isMobileMenuOpen]);

  // Dynamically calculate dock bottom margin on mobile so menu stops right above bottom dock
  useEffect(() => {
    const updateDockMargin = () => {
      const dockEl = document.getElementById("mobile-bottom-dock-container");
      if (dockEl && window.innerWidth < 768) {
        const rect = dockEl.getBoundingClientRect();
        const calculated = window.innerHeight - rect.top + 12;
        setDockBottomMargin(Math.max(calculated, 74));
      }
    };
    updateDockMargin();
    window.addEventListener("resize", updateDockMargin);
    window.addEventListener("scroll", updateDockMargin, { passive: true });
    const timer = setTimeout(updateDockMargin, 60);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDockMargin);
      window.removeEventListener("scroll", updateDockMargin);
    };
  }, [isMobileMenuOpen, activeModal]);

  // Sync active modal state across Navbar and FloatingActions
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{
        modal?: "certificates" | "cases" | "requisites";
      }>;
      if (customEvent.detail?.modal) {
        setActiveModal(customEvent.detail.modal);
      }
    };

    const handleClose = () => {
      setActiveModal(null);
      // Return user one step back to the burger menu if opened from it
      if (openedFromBurgerRef.current) {
        openedFromBurgerRef.current = false;
        setIsMobileMenuOpen(true);
      }
    };

    window.addEventListener("open-header-modal", handleOpen);
    window.addEventListener("close-header-modal", handleClose);
    return () => {
      window.removeEventListener("open-header-modal", handleOpen);
      window.removeEventListener("close-header-modal", handleClose);
    };
  }, []);

  // Broadcast mobile menu state so floating dock knows to hide scroll arrows
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("mobile-menu-toggle", { detail: { isOpen: isMobileMenuOpen } })
    );
  }, [isMobileMenuOpen]);

  const toggleModal = (modal: "certificates" | "cases" | "requisites") => {
    if (isMobileMenuOpen) {
      openedFromBurgerRef.current = true;
      setIsMobileMenuOpen(false);
    }
    if (activeModal === modal) {
      handleModalClose();
    } else {
      if (modal === "certificates") openCertificatesModal();
      else if (modal === "cases") openCasesModal();
      else if (modal === "requisites") openRequisitesModal();
    }
  };

  const handleModalClose = () => {
    setActiveModal(null);
    closeHeaderModal();
    if (openedFromBurgerRef.current) {
      openedFromBurgerRef.current = false;
      setIsMobileMenuOpen(true);
    }
  };

  const isFloating = isScrolled || Boolean(activeModal) || isMobileMenuOpen;

  return (
    <>
      {/* ═══════════════════════════════════════════════
          MOBILE LIGHT BURGER MENU
          - Backdrop blur covers entire page
          - Light panel drops from top down to bottom margin above dock
          - Bottom edge has rounded corners on left and right (rounded-b-[28px])
          - Clean titles only (no descriptions)
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark backdrop blur behind light menu card */}
            <motion.div
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                openedFromBurgerRef.current = false;
              }}
              className="md:hidden fixed inset-0 z-[64] bg-graphite/40 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Light Burger Menu Card */}
            <motion.div
              key="mobile-menu-card"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ bottom: `${dockBottomMargin}px` }}
              className="md:hidden fixed top-0 left-0 right-0 z-[65] bg-white/95 backdrop-blur-2xl rounded-b-[28px] border-b border-divider/60 shadow-[0_16px_40px_rgba(0,0,0,0.14)] flex flex-col justify-between pt-24 pb-4 px-6 pointer-events-auto overflow-hidden"
            >
              {/* Top Navigation Items: Titles only */}
              <div className="flex flex-col gap-3 mt-1">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeModal === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * idx, duration: 0.22 }}
                      type="button"
                      onClick={() => toggleModal(item.id)}
                      className="w-full text-left py-3 px-1 transition-all flex items-center justify-between group active:opacity-70 cursor-pointer border-0 bg-transparent shadow-none"
                    >
                      <div
                        className={`text-[26px] sm:text-[28px] font-bold tracking-tight transition-colors ${
                          isActive
                            ? "text-primary"
                            : "text-graphite group-hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </div>
                      <ChevronRight className="w-5 h-5 shrink-0 text-pewter/60 group-hover:text-graphite group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom Controls inside the Light Card: Theme + Language switcher */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.22 }}
                className="py-3 px-1 flex items-center justify-between border-0 bg-transparent shadow-none"
              >
                <span className="text-[13px] font-medium text-iron">
                  Оформление и язык
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle variant="default" />
                  <LanguageToggle variant="default" />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[70] pointer-events-none transition-all duration-300 ease-out"
      >
        <div
          className={`w-full transition-all duration-300 ease-out pointer-events-auto ${
            isMobileMenuOpen
              ? "bg-transparent border-transparent shadow-none"
              : isFloating
              ? "bg-white/95 backdrop-blur-md border-b border-divider/60 shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-b-[20px] md:rounded-b-[24px]"
              : "bg-transparent border-b border-transparent shadow-none rounded-none"
          }`}
        >
          <div
            className={`mx-auto flex items-center justify-between h-14 sm:h-16 transition-all duration-500 ease-out ${
              isFloating
                ? "max-w-none w-full px-4 sm:px-6 md:px-8 lg:px-10"
                : "max-w-[1440px] w-full px-4 sm:px-6 md:px-12 lg:px-20"
            }`}
          >
            {/* Logo — dark on light hero and on scroll */}
            <Logo
              className="shrink-0 whitespace-nowrap"
              isFloating={isFloating}
              theme="dark"
              onClick={() => {
                setActiveModal(null);
                setIsMobileMenuOpen(false);
                openedFromBurgerRef.current = false;
              }}
            />

            {/* Desktop: Unified navigation group */}
            <div className="hidden md:flex items-center gap-1.5 sm:gap-2 p-0 bg-transparent shadow-none">
              <ThemeToggle variant={isFloating ? "default" : "ghost"} />
              <LanguageToggle variant={isFloating ? "default" : "ghost"} />
              {NAV_ITEMS.map((item) => {
                const isActive = activeModal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleModal(item.id)}
                    className={`px-3 py-1.5 rounded-[8px] text-[13px] sm:text-[13.5px] font-medium transition-all duration-200 ease-out cursor-pointer active:scale-95 border whitespace-nowrap ${
                      !isFloating
                        ? isActive
                          ? "bg-graphite text-white shadow-xs border-graphite"
                          : "border-transparent bg-transparent text-graphite/80 hover:text-graphite hover:bg-black/[0.04] shadow-none"
                        : isActive
                        ? "bg-graphite text-white shadow-xs border-graphite"
                        : "border-divider/70 bg-white/90 text-graphite hover:border-graphite hover:bg-white shadow-2xs"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile: Burger trigger */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen((prev) => {
                    const next = !prev;
                    if (!next) openedFromBurgerRef.current = false;
                    return next;
                  });
                }}
                aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMobileMenuOpen}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-[12px] transition-all duration-300 cursor-pointer active:scale-95 border ${
                  isMobileMenuOpen
                    ? "bg-graphite text-white border-graphite shadow-sm"
                    : !isFloating
                    ? "bg-transparent text-graphite border-transparent hover:bg-black/[0.04] shadow-none"
                    : "bg-white/90 text-graphite border-divider/70 shadow-2xs"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals with equal margins from browser window edges and from header bottom */}
      <HeaderModals
        headerRef={headerRef}
        activeModal={activeModal}
        onClose={handleModalClose}
        onSelectModal={(m) => setActiveModal(m)}
      />
    </>
  );
}
