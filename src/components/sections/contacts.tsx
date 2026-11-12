"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Paperclip, X, Check } from "lucide-react";
import { TelegramIcon, MailFilledIcon, PhoneFilledIcon } from "@/components/ui/brand-icons";
import { openPrivacyModal } from "@/components/ui/privacy-modal";

export function Contacts() {
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isAgreed, setIsAgreed] = useState(true);

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
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-[1.12] tracking-tight">
            Обсудить проект или{"\u00A0"}отправить ТЗ
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 lg:gap-12 items-stretch">
          {/* Left — company info card (aligned with form) */}
          <div className="flex flex-col h-full">
            <div className="rounded-[14px] bg-white p-6 md:p-8 shadow-[0_12px_36px_-6px_rgba(19,18,16,0.06),0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="text-pewter text-[11px] font-mono uppercase tracking-wider block">
                  Дирекция филиала Волга
                </span>
                <div className="text-graphite text-base font-bold mt-1">
                  Иванов Алексей Николаевич
                </div>
                <div className="mt-3 space-y-1">
                  <a
                    href="tel:+79608218170"
                    className="text-graphite text-lg font-bold hover:text-[#E66826] transition-colors block"
                  >
                    +7 (960) 821-81-70
                  </a>
                  <a
                    href="tel:+79951317090"
                    className="text-iron text-sm font-semibold hover:text-[#E66826] transition-colors block"
                  >
                    +7 (995) 131-70-90
                  </a>
                </div>
                <span className="text-pewter text-[12px] block mt-1">
                  Пн–Пт, 9:00–18:00 МСК
                </span>

                <div className="mt-4 pt-4 border-t border-divider flex items-center gap-3">
                  <a
                    href="https://t.me/t3_auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface text-graphite text-[12px] font-medium rounded-[6px] hover:bg-graphite hover:text-white transition-colors group"
                  >
                    <TelegramIcon className="w-3.5 h-3.5 text-graphite group-hover:text-white transition-colors" />
                    <span>Telegram-диалог</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-divider">
                <span className="text-pewter text-[11px] font-mono uppercase tracking-wider block">
                  Почта для проектной документации
                </span>
                <a
                  href="mailto:aleksey.ivanov@t3-auto.com"
                  className="mt-2 text-graphite text-base font-bold hover:text-iron transition-colors block font-mono"
                >
                  aleksey.ivanov@t3-auto.com
                </a>
                <span className="text-pewter text-[12px] block mt-0.5">
                  Для ТЗ, P&ID схем, опросных листов и смет
                </span>
              </div>

              <div className="pt-6 border-t border-divider space-y-3">
                <span className="text-pewter text-[11px] font-mono uppercase tracking-wider block">
                  География и филиалы Т3
                </span>
                <div className="text-[13px] space-y-1.5 text-graphite font-medium">
                  <div>— <strong className="text-graphite font-bold">Центральный офис:</strong> г. Москва, ул. Берзарина, д. 28А, к. 2</div>
                  <div>— <strong className="text-graphite font-bold">Филиал Волга и производство:</strong> г. Самара, 19 км</div>
                  <div>— <strong className="text-graphite font-bold">Филиал Урал:</strong> г. Челябинск</div>
                </div>
                <div className="text-iron text-[12px] mt-2 font-mono">
                  ООО «Т3 - Автоматизация» · ИНН 9734028824 · ОГРН 1267700304178
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form with File Upload */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-white rounded-[14px] shadow-[0_16px_44px_-6px_rgba(19,18,16,0.06),0_2px_8px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between"
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
                    <option value="">Выберите отрасль / объект</option>
                    <option>Нефтехимия и нефтегаз (РСУ / ПАЗ)</option>
                    <option>Металлургия и добыча полезных ископаемых</option>
                    <option>Инфраструктура и КИИ (аэропорты, энергетика)</option>
                    <option>Машиностроение и автопром (СТЗ, РТК)</option>
                    <option>Газораспределение и телемеханика (ШГРП, ЗОКИИ)</option>
                    <option>Пищевая промышленность (ректификация, линии)</option>
                    <option>Другой промышленный объект</option>
                  </select>
                </div>
                <div>
                  <label className="text-pewter text-[12px] font-medium block">
                    Текущая стадия
                  </label>
                  <select className="mt-2 w-full h-12 px-4 bg-surface-card border border-divider text-graphite text-[13px] focus:outline-none focus:border-graphite transition-colors appearance-none">
                    <option>Стадия тендера / предварительный расчёт сметы</option>
                    <option>Проектирование (разделы АТХ, АСУТП, ПАЗ)</option>
                    <option>Сборка шкафов управления по готовому проекту</option>
                    <option>Срочное импортозамещение / ретрофит</option>
                    <option>Пусконаладочные работы (ПНР) и шефмонтаж</option>
                    <option>Внедрение SCADA / MES («КАСКАД Цифра»)</option>
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
                  Прикрепить ТЗ, схему или{"\u00A0"}опросный лист
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
                          Нажмите для{"\u00A0"}выбора файла или{"\u00A0"}перетащите сюда
                        </span>
                        <span className="text-[11px] text-pewter block">
                          PDF, DWG, XLSX, DOCX, ZIP до{"\u00A0"}25{"\u00A0"}МБ
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

              {/* Privacy Consent Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1 group">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded-[4px] border border-divider peer-checked:bg-graphite peer-checked:border-graphite peer-focus-visible:ring-2 peer-focus-visible:ring-graphite/30 flex items-center justify-center shrink-0 mt-0.5 transition-all bg-white group-hover:border-graphite/60">
                  <Check
                    className={`w-3 h-3 text-white transition-opacity ${
                      isAgreed ? "opacity-100" : "opacity-0"
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[12px] text-iron leading-[1.45]">
                  Согласен на{"\u00A0"}обработку персональных данных в{"\u00A0"}соответствии с{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      openPrivacyModal();
                    }}
                    className="text-graphite font-semibold underline underline-offset-2 hover:text-accent transition-colors cursor-pointer"
                  >
                    Политикой конфиденциальности
                  </button>
                </span>
              </label>

              <button
                type="submit"
                disabled={!isAgreed}
                className={`mt-2 w-full h-14 inline-flex items-center justify-center gap-3 text-white text-[13px] font-semibold tracking-normal transition-all duration-200 rounded-[8px] ${
                  isAgreed
                    ? "bg-accent hover:bg-accent-hover active:scale-[0.99] cursor-pointer shadow-xs"
                    : "bg-pewter/40 cursor-not-allowed opacity-60"
                }`}
              >
                Отправить на расчёт
              </button>

              <div className="text-[11px] text-pewter text-center">
                <span>Ответим с{"\u00A0"}предварительной сметой и{"\u00A0"}вопросами по{"\u00A0"}алгоритмам в{"\u00A0"}течение 1{"\u00A0"}рабочего дня</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
