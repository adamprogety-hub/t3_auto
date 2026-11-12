"use client";

import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/ui/logo";
import { HeaderModals } from "@/components/modals/header-modals";

export function Navbar() {
  const [activeModal, setActiveModal] = useState<
    "certificates" | "cases" | "requisites" | null
  >(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleModal = (modal: "certificates" | "cases" | "requisites") => {
    setActiveModal((prev) => (prev === modal ? null : modal));
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 z-[70] transition-all duration-300 ease-out pointer-events-none ${
          isScrolled || activeModal
            ? "top-3 sm:top-4 px-3 sm:px-6"
            : "top-0 px-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 ease-out pointer-events-auto ${
            isScrolled || activeModal
              ? "max-w-[1240px] bg-white/95 backdrop-blur-md border border-divider/60 shadow-[0_12px_40px_rgba(0,0,0,0.1)] rounded-xl md:rounded-2xl pl-3 sm:pl-5 md:pl-7 pr-2.5 sm:pr-4"
              : "max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-20 bg-surface/90 md:bg-transparent border-b border-transparent"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled || activeModal ? "h-14" : "h-16"
            }`}
          >
            {/* Logo */}
            <Logo
              iconSize={isScrolled || activeModal ? 22 : 24}
              onClick={() => setActiveModal(null)}
            />

            {/* Three Laconic Action Buttons: Сертификаты, Кейсы, Реквизиты */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => toggleModal("certificates")}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-all cursor-pointer shadow-2xs active:scale-95 ${
                  activeModal === "certificates"
                    ? "bg-graphite text-white shadow-xs border border-graphite"
                    : "border border-divider/70 bg-white/90 text-graphite hover:border-graphite hover:bg-white"
                }`}
              >
                Сертификаты
              </button>

              <button
                type="button"
                onClick={() => toggleModal("cases")}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-all cursor-pointer shadow-2xs active:scale-95 ${
                  activeModal === "cases"
                    ? "bg-graphite text-white shadow-xs border border-graphite"
                    : "border border-divider/70 bg-white/90 text-graphite hover:border-graphite hover:bg-white"
                }`}
              >
                Кейсы
              </button>

              <button
                type="button"
                onClick={() => toggleModal("requisites")}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-[8px] text-[12px] sm:text-[13px] font-medium transition-all cursor-pointer shadow-2xs active:scale-95 ${
                  activeModal === "requisites"
                    ? "bg-graphite text-white shadow-xs border border-graphite"
                    : "border border-divider/70 bg-white/90 text-graphite hover:border-graphite hover:bg-white"
                }`}
              >
                Реквизиты
              </button>
            </div>
          </div>
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
