"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function openPrivacyModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-privacy-modal"));
  }
}

export function PrivacyModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-privacy-modal", handleOpen);
    return () => window.removeEventListener("open-privacy-modal", handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-graphite/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[86vh] bg-white rounded-[16px] shadow-[0_25px_60px_-15px_rgba(19,18,16,0.30)] border border-divider/60 flex flex-col overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
          >
            {/* Header (Sticky) */}
            <div className="px-6 sm:px-8 py-5 border-b border-divider/60 flex items-center justify-between bg-surface/80 backdrop-blur-xs shrink-0">
              <div>
                <h3
                  id="privacy-modal-title"
                  className="text-graphite text-[16px] sm:text-[18px] font-bold tracking-tight leading-tight"
                >
                  Политика конфиденциальности
                </h3>
                <span className="text-pewter text-[11px] block mt-0.5 font-mono">
                  Соответствие ФЗ-152 РФ · Редакция от 2026 г.
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-[6px] text-pewter hover:text-graphite hover:bg-surface-warm transition-colors cursor-pointer"
                aria-label="Закрыть окно"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[13px] leading-[1.7] text-iron scroll-smooth">
              {/* Intro block */}
              <div className="p-4 bg-surface-warm rounded-[10px] border border-divider/50">
                <p className="text-graphite text-[12.5px] font-medium leading-relaxed">
                  Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта <strong>ACEngine</strong> («Оператор»), оставляющих заявки на расчет стоимости, скачивающих инженерные материалы или передающих технические задания.
                </p>
              </div>

              {/* 1. Общие положения */}
              <section className="space-y-2">
                <h4 className="text-graphite text-[14px] font-bold flex items-center gap-2">
                  <span className="text-pewter font-mono text-[12px]">01.</span>
                  Общие положения
                </h4>
                <p>
                  1.1. Оператор ставит важнейшей целью соблюдение прав и свобод человека и гражданина при обработке его персональных данных, включая защиту прав на неприкосновенность частной жизни и коммерческую тайну.
                </p>
                <p>
                  1.2. Настоящая Политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта ACEngine.
                </p>
              </section>

              {/* 2. Собираемые данные */}
              <section className="space-y-2">
                <h4 className="text-graphite text-[14px] font-bold flex items-center gap-2">
                  <span className="text-pewter font-mono text-[12px]">02.</span>
                  Категории обрабатываемых данных
                </h4>
                <p>Оператор обрабатывает следующие персональные данные:</p>
                <ul className="space-y-1.5 pl-3 border-l-2 border-divider text-[12.5px]">
                  <li>• Номер мобильного или рабочего телефона;</li>
                  <li>• Адрес электронной почты (e-mail);</li>
                  <li>• Имя, должность и наименование предприятия / объекта автоматизации;</li>
                  <li>• Исходные технические данные, прикрепляемые к заявке (опросные листы, схемы Э3, спецификации оборудования);</li>
                  <li>• Обезличенные данные о посетителях (в т.ч. файлы «cookie») с помощью сервисов интернет-статистики.</li>
                </ul>
              </section>

              {/* 3. Цели обработки */}
              <section className="space-y-2">
                <h4 className="text-graphite text-[14px] font-bold flex items-center gap-2">
                  <span className="text-pewter font-mono text-[12px]">03.</span>
                  Цели обработки персональных данных
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3.5 bg-surface rounded-[8px] border border-divider/60">
                    <div className="font-semibold text-graphite text-[12.5px] mb-1">
                      Инженерный расчет
                    </div>
                    <span className="text-[11.5px] text-pewter">
                      Подготовка сметной документации, подбор оборудования шкафов управления и расчет стоимости ПНР.
                    </span>
                  </div>
                  <div className="p-3.5 bg-surface rounded-[8px] border border-divider/60">
                    <div className="font-semibold text-graphite text-[12.5px] mb-1">
                      Отправка материалов
                    </div>
                    <span className="text-[11.5px] text-pewter">
                      Передача запрошенных опросных листов, чек-листов аудита рабочей документации и баз данных.
                    </span>
                  </div>
                </div>
              </section>

              {/* 4. Защита проектных данных и NDA */}
              <section className="space-y-2">
                <h4 className="text-graphite text-[14px] font-bold flex items-center gap-2">
                  <span className="text-pewter font-mono text-[12px]">04.</span>
                  Защита информации и режим NDA
                </h4>
                <p>
                  4.1. Все передаваемые технологические схемы, алгоритмы работы оборудования и проектные решения считаются конфиденциальной информацией и защищены от передачи третьим лицам.
                </p>
                <div className="p-3.5 bg-surface border-l-3 border-graphite rounded-r-[8px] text-[12px]">
                  <strong className="text-graphite font-semibold block mb-0.5">
                    Соглашение о неразглашении (NDA):
                  </strong>
                  По запросу заказчика до передачи принципиальных схем и исходных кодов контроллеров оформляется двустороннее соглашение о конфиденциальности.
                </div>
              </section>

              {/* 5. Порядок сбора, хранения и отзыва */}
              <section className="space-y-2">
                <h4 className="text-graphite text-[14px] font-bold flex items-center gap-2">
                  <span className="text-pewter font-mono text-[12px]">05.</span>
                  Хранение данных и отзыв согласия
                </h4>
                <p>
                  5.1. Безопасность персональных данных обеспечивается правовыми, организационными и техническими мерами защиты.
                </p>
                <p>
                  5.2. Срок обработки данных является неограниченным до момента отзыва согласия. Пользователь может в любой момент отозвать свое согласие, направив уведомление на контактный email: <span className="font-mono text-graphite font-medium">info@acengine.ru</span> с пометкой «Отзыв согласия на обработку персональных данных».
                </p>
              </section>
            </div>

            {/* Footer (Sticky) */}
            <div className="px-6 py-4 border-t border-divider/60 bg-surface/90 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 bg-graphite hover:bg-gunmetal text-white text-[12.5px] font-semibold rounded-[8px] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Понятно, закрыть
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
