"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Send } from "lucide-react";

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm transition-colors duration-200 border-b ${
        isScrolled || isOpen ? "border-divider" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-graphite font-heading text-lg font-black tracking-tight"
          >
            ACEngine
          </a>

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
              className="flex items-center gap-2 px-3.5 py-2 border border-divider bg-white text-graphite text-[13px] font-medium rounded-[8px] hover:border-graphite hover:bg-white/80 transition-all shadow-2xs"
            >
              <Send className="w-3.5 h-3.5 text-graphite" strokeWidth={1.5} />
              <span>Telegram</span>
            </a>

            <a
              href="tel:+79001234567"
              className="flex items-center gap-2 px-4 py-2 bg-graphite text-white text-[13px] font-medium rounded-[8px] hover:bg-graphite/90 transition-all shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-white/80" strokeWidth={1.5} />
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
              <X className="w-5 h-5" strokeWidth={1} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-surface border-b border-divider overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-0">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-graphite text-[14px] font-medium border-b border-divider/50"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://t.me/acengine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-11 border border-divider bg-white text-graphite text-[13px] font-medium rounded-[8px]"
                >
                  <Send className="w-3.5 h-3.5 text-graphite" strokeWidth={1.5} />
                  <span>Написать в Telegram</span>
                </a>
                <a
                  href="tel:+79001234567"
                  className="flex items-center justify-center gap-2 h-11 bg-graphite text-white text-[13px] font-medium rounded-[8px]"
                >
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>+7 (900) 123-45-67</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
