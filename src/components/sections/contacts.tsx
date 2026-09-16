"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Paperclip, X, ShieldCheck, Send } from "lucide-react";

export function Contacts() {
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  return (
    <section id="contacts" className="py-20 md:py-28 bg-surface-warm">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1.12] tracking-tight">
            Обсудить проект или отправить ТЗ
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-12 items-start">
          {/* Left — contacts */}
          <div>
            <div className="rounded-[14px] bg-white p-6 md:p-8 space-y-6 shadow-[0_12px_36px_-6px_rgba(19,18,16,0.06),0_2px_8px_rgba(0,0,0,0.02)]">
              <div>
                <span className="text-pewter text-[11px] font-medium uppercase tracking-wider block">
                  Телефон и мессенджеры
                </span>
                <a
                  href="tel:+79001234567"
                  className="mt-2 text-graphite text-lg font-bold hover:text-accent transition-colors block"
                >
                  +7 (900) 123-45-67
                </a>
                <span className="text-pewter text-[12px] block mt-0.5">
                  Пн–Пт, 9:00–18:00 МСК
                </span>

                <div className="mt-4 pt-4 border-t border-divider flex items-center gap-3">
                  <a
                    href="https://t.me/acengine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface text-graphite text-[12px] font-medium rounded-[6px] hover:bg-graphite hover:text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-graphite" strokeWidth={1.5} />
                    <span>Telegram-диалог</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-divider">
                <span className="text-pewter text-[11px] font-medium uppercase tracking-wider block">
                  Почта для документации
                </span>
                <a
                  href="mailto:info@acengine.ru"
                  className="mt-2 text-graphite text-base font-bold hover:text-iron transition-colors block font-mono"
                >
                  info@acengine.ru
                </a>
                <span className="text-pewter text-[12px] block mt-0.5">
                  Для проектных спецификаций, P&ID схем и ТЗ
                </span>
              </div>

              <div className="pt-6 border-t border-divider">
                <span className="text-pewter text-[11px] font-medium uppercase tracking-wider block">
                  Производство и логистика
                </span>
                <div className="mt-2 text-graphite text-[14px] font-semibold">
                  Сборочный участок и лаборатория: г. Москва
                </div>
                <div className="text-iron text-[13px] mt-1 font-medium">
                  Выезды на шефмонтаж и ПНР — по всей России
                </div>
                <span className="text-pewter text-[12px] block mt-1.5 leading-relaxed">
                  Доставка готовых шкафов по РФ транспортными компаниями (Деловые Линии, ПЭК) в жесткой защитной упаковке со 100% страховкой груза.
                </span>
              </div>
            </div>

            {/* NDA Trust badge */}
            <div className="mt-4 p-4 rounded-[10px] bg-white shadow-[0_4px_20px_-4px_rgba(19,18,16,0.04),0_1px_3px_rgba(0,0,0,0.02)] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-graphite shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-[12px] text-iron leading-relaxed">
                <strong className="text-graphite font-semibold">Соглашение о конфиденциальности (NDA):</strong> подписываем соглашение о неразглашении до передачи технологических схем и чертежей объекта.
              </p>
            </div>
          </div>

          {/* Right — Form with File Upload */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-white rounded-[12px] shadow-[0_16px_44px_-6px_rgba(19,18,16,0.06),0_2px_8px_rgba(0,0,0,0.03)]"
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-pewter text-[12px] font-medium block">
                    Ваше имя или должность
                  </label>
                  <input
                    type="text"
                    placeholder="Павел, гл. энергетик"
                    className="mt-2 w-full h-12 px-4 bg-surface-card border border-divider text-graphite text-[13px] placeholder:text-pewter/50 focus:outline-none focus:border-graphite transition-colors"
                  />
                </div>
                <div>
                  <label className="text-pewter text-[12px] font-medium block">
                    Телефон или Telegram
                  </label>
                  <input
                    type="text"
                    placeholder="+7 (900) ... или @username"
                    className="mt-2 w-full h-12 px-4 bg-surface-card border border-divider text-graphite text-[13px] placeholder:text-pewter/50 focus:outline-none focus:border-graphite transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-pewter text-[12px] font-medium block">
                    Тип объекта
                  </label>
                  <select className="mt-2 w-full h-12 px-4 bg-surface-card border border-divider text-graphite text-[13px] focus:outline-none focus:border-graphite transition-colors appearance-none">
                    <option value="">Выберите объект</option>
                    <option>Котельная (газ / пар / дизель)</option>
                    <option>ИТП / ЦТП (тепловой пункт)</option>
                    <option>ВЗУ / Станция 2-го подъема</option>
                    <option>Очистные сооружения / КНС</option>
                    <option>Производственная линия / Станок</option>
                    <option>Другой технологический объект</option>
                  </select>
                </div>
                <div>
                  <label className="text-pewter text-[12px] font-medium block">
                    Текущая стадия
                  </label>
                  <select className="mt-2 w-full h-12 px-4 bg-surface-card border border-divider text-graphite text-[13px] focus:outline-none focus:border-graphite transition-colors appearance-none">
                    <option>Есть готовое ТЗ и схемы Э3</option>
                    <option>Требуется проектирование с нуля</option>
                    <option>Модернизация (ретрофит) старого шкафа</option>
                    <option>Требуется пусконаладка (ПНР)</option>
                    <option>Нужна только диспетчеризация (SCADA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-pewter text-[12px] font-medium block">
                  Краткое описание задачи
                </label>
                <textarea
                  rows={3}
                  placeholder="Состав оборудования, мощность, количество регулируемых контуров или текущие неисправности..."
                  className="mt-2 w-full px-4 py-3 bg-surface-card border border-divider text-graphite text-[13px] placeholder:text-pewter/50 focus:outline-none focus:border-graphite transition-colors resize-none"
                />
              </div>

              {/* File Attachment Dropzone */}
              <div>
                <label className="text-pewter text-[12px] font-medium block mb-2">
                  Прикрепить ТЗ, схему или опросный лист
                </label>
                {attachedFile ? (
                  <div className="flex items-center justify-between p-3.5 bg-surface-warm border border-divider rounded-[6px]">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Paperclip className="w-4 h-4 text-graphite shrink-0" strokeWidth={1.5} />
                      <span className="text-[13px] font-medium text-graphite truncate">
                        {attachedFile.name}
                      </span>
                      <span className="text-[11px] font-mono text-pewter shrink-0">
                        ({(attachedFile.size / 1024).toFixed(0)} КБ)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="p-1 hover:bg-divider rounded transition-colors text-iron hover:text-graphite"
                      aria-label="Удалить файл"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col sm:flex-row items-center justify-between p-4 border border-dashed border-divider hover:border-graphite rounded-[6px] cursor-pointer bg-surface-card/40 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-divider/40 flex items-center justify-center text-graphite group-hover:bg-graphite group-hover:text-white transition-colors shrink-0">
                        <Paperclip className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="text-[13px] font-semibold text-graphite block">
                          Нажмите для выбора файла или перетащите сюда
                        </span>
                        <span className="text-[11px] text-pewter block">
                          PDF, DWG, XLSX, DOCX, ZIP до 25 МБ
                        </span>
                      </div>
                    </div>
                    <span className="mt-2 sm:mt-0 text-[12px] font-semibold text-graphite hover:underline shrink-0">
                      Выбрать файл
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.dwg,.xlsx,.xls,.doc,.docx,.zip,.rar"
                    />
                  </label>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 w-full h-14 inline-flex items-center justify-center gap-3 bg-accent text-white text-[13px] font-semibold tracking-normal transition-all duration-200 hover:bg-accent-hover active:scale-[0.99] rounded-[8px]"
              >
                Отправить ТЗ на инженерный расчёт
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-pewter text-center">
                <span>Ответим с предварительной сметой и вопросами по алгоритмам в течение 1 рабочего дня</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
