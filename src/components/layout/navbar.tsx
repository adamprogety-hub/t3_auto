"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { HeaderModals } from "@/components/modals/header-modals";
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleModal = (modal: "certificates" | "cases" | "requisites") => {
    setIsMobileMenuOpen(false);
    setActiveModal((prev) => (prev === modal ? null : modal));
  };

  const isFloating = isScrolled || Boolean(activeModal);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 z-[70] transition-all duration-500 ease-out pointer-events-none ${
          isScrolled || activeModal
            ? "top-3 sm:top-4 px-3 sm:px-6"
            : "top-0 px-4 sm:px-6 md:px-12 lg:px-20"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-out pointer-events-auto rounded-xl md:rounded-2xl border ${
            isScrolled || activeModal
              ? "max-w-[1240px] bg-white/95 backdrop-blur-md border-divider/60 shadow-[0_12px_40px_rgba(0,0,0,0.1)] pl-3 sm:pl-5 md:pl-7 pr-2.5 sm:pr-4"
              : "max-w-[1440px] bg-transparent border-transparent shadow-none"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled || activeModal ? "h-14" : "h-16 sm:h-20"
            }`}
          >
            {/* Logo — dark on light hero and on scroll */}
            <Logo
              className="shrink-0 whitespace-nowrap"
              iconSize={isFloating ? 22 : 24}
              theme="dark"
              onClick={() => {
                setActiveModal(null);
                setIsMobileMenuOpen(false);
              }}
            />

            {/* Desktop: Unified navigation group */}
            <div
              className={`hidden md:flex items-center transition-all duration-500 ease-out rounded-[12px] ${
                isFloating
                  ? "gap-1.5 sm:gap-2 p-0 bg-transparent shadow-none"
                  : "gap-1 p-1.5 bg-graphite/95 backdrop-blur-sm shadow-lg"
              }`}
            >
              <ThemeToggle variant={isFloating ? "default" : "capsule"} />
              <LanguageToggle variant={isFloating ? "default" : "capsule"} />
              {NAV_ITEMS.map((item) => {
                const isActive = activeModal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleModal(item.id)}
                    className={`px-3.5 py-1.5 rounded-[8px] text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer active:scale-95 border whitespace-nowrap ${
                      !isFloating
                        ? "border-transparent bg-transparent text-white/90 hover:text-white hover:bg-white/15 shadow-none"
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
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMobileMenuOpen}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-[10px] transition-all duration-300 cursor-pointer active:scale-95 border ${
                  !isFloating
                    ? "bg-graphite/95 text-white border-transparent shadow-md"
                    : isMobileMenuOpen
                    ? "bg-graphite text-white border-graphite shadow-xs"
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

          {/* Mobile dropdown menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-3 pt-2 border-t border-divider/40">
              <div className="flex flex-col gap-1.5 p-2 rounded-[12px] bg-white/98 border border-divider/60 shadow-lg">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeModal === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleModal(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-[8px] text-[14px] font-medium transition-all cursor-pointer active:scale-[0.99] ${
                        isActive
                          ? "bg-graphite text-white"
                          : "text-graphite hover:bg-surface-warm"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <div className="mt-1 pt-2 border-t border-divider/40 flex items-center justify-between px-1">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals with equal margins from browser window edges and from header bottom */}
      <HeaderModals
        headerRef={headerRef}
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSelectModal={(m) => setActiveModal(m)}
      />
    </>
  );
}
