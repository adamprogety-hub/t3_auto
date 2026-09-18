"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TelegramIcon, PhoneFilledIcon } from "@/components/ui/brand-icons";

import { Logo } from "@/components/ui/logo";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Процесс", href: "#process" },
  { label: "Контакты", href: "#contacts" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body & document scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.dataset.mobileMenu = "open";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.dataset.mobileMenu = "closed";
    }

    window.dispatchEvent(
      new CustomEvent("mobile-menu-toggle", { detail: { isOpen } })
    );

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.dataset.mobileMenu = "closed";
      window.dispatchEvent(
        new CustomEvent("mobile-menu-toggle", { detail: { isOpen: false } })
      );
    };
  }, [isOpen]);

  // Close on Escape or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <>
      {/* Blurred Backdrop when Mobile Menu is Open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 z-40 bg-graphite/30 backdrop-blur-md md:hidden pointer-events-auto"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-out pointer-events-none ${
          isScrolled || isOpen
            ? "top-3 sm:top-4 px-3 sm:px-6"
            : "top-0 px-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 ease-out pointer-events-auto ${
            isScrolled || isOpen
              ? "max-w-[1240px] bg-white/95 backdrop-blur-md border border-divider/60 shadow-[0_12px_40px_rgba(0,0,0,0.1)] rounded-xl md:rounded-2xl pl-5 md:pl-7 pr-3"
              : "max-w-[1440px] px-6 md:px-12 lg:px-20 bg-surface/90 md:bg-transparent border-b border-transparent"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-14" : "h-16"
            }`}
          >
            {/* Logo */}
            <Logo
              iconSize={isScrolled ? 22 : 24}
              onClick={() => setIsOpen(false)}
            />

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 text-iron text-[13px] font-medium rounded-[6px] transition-colors duration-200 hover:text-graphite hover:bg-graphite/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions: Telegram + Phone */}
            <div className="hidden md:flex items-center gap-2.5">
              <a
                href="https://t.me/acengine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 border border-divider bg-white text-graphite text-[13px] font-medium rounded-[8px] hover:border-graphite hover:bg-white/80 transition-all shadow-2xs"
              >
                <TelegramIcon className="w-3.5 h-3.5 text-graphite" />
                <span>Telegram</span>
              </a>

              <a
                href="tel:+79001234567"
                className="flex items-center gap-2 px-4 py-1.5 bg-graphite text-white text-[13px] font-medium rounded-[8px] hover:bg-graphite/90 transition-all shadow-2xs"
              >
                <PhoneFilledIcon className="w-3.5 h-3.5 text-white" />
                <span>+7 (900) 123-45-67</span>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-graphite"
              aria-label="Меню"
            >
              {isOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Mobile menu inside the cloud */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-2 pb-4 pr-2 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="py-2.5 px-1 text-graphite text-[15px] font-medium transition-colors hover:text-black active:opacity-70"
                    >
                      {link.label}
                    </a>
                  ))}

                  <div className="mt-3.5 flex flex-col gap-2.5">
                    <a
                      href="https://t.me/acengine"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 h-10 border border-divider bg-white text-graphite text-[13px] font-medium rounded-[8px] hover:bg-surface transition-colors"
                    >
                      <TelegramIcon className="w-3.5 h-3.5 text-graphite" />
                      <span>Написать в Telegram</span>
                    </a>
                    <a
                      href="tel:+79001234567"
                      className="flex items-center justify-center gap-2 h-10 bg-graphite text-white text-[13px] font-medium rounded-[8px] hover:bg-graphite/90 transition-colors"
                    >
                      <PhoneFilledIcon className="w-3.5 h-3.5 text-white" />
                      <span>+7 (900) 123-45-67</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
