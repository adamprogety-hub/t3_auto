"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { openPrivacyModal } from "@/components/ui/privacy-modal";

export function Cooperation() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [isAgreed, setIsAgreed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (!digits) return "";
    let formatted = "+7";
    const rest = digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
    if (rest.length > 0) formatted += ` (${rest.slice(0, 3)}`;
    if (rest.length >= 3) formatted += `) ${rest.slice(3, 6)}`;
    if (rest.length >= 6) formatted += `-${rest.slice(6, 8)}`;
    if (rest.length >= 8) formatted += `-${rest.slice(8, 10)}`;
    return formatted;
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.startsWith("@") || val.includes("t.me")) {
      setContact(val);
    } else {
      setContact(formatPhone(val));
    }
  };

  const isValidContact = contact.trim().length >= 5;
  const isFormValid = name.trim().length >= 2 && isValidContact && isAgreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitted(true);
  };

  return (
    <div className="bg-surface-warm">
      <section
        id="cooperation"
        className="py-20 md:py-28 bg-surface rounded-t-[16px] md:rounded-t-[20px]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-graphite text-white rounded-[14px] md:rounded-[18px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(19,18,16,0.30)] border border-white/10 p-5 sm:p-7 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[440px_1fr] xl:grid-cols-[480px_1fr] gap-8 items-stretch relative"
          >
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          {/* 3D Folder Render Peeking out from behind the left form (Desktop) */}
          <div className="absolute left-[300px] xl:left-[350px] 2xl:left-[400px] top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 hidden lg:block opacity-75 xl:opacity-90">
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              src="/cooperation_folder.webp"
              alt="Документация АСУТП"
              className="w-[460px] xl:w-[530px] 2xl:w-[580px] h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
              draggable={false}
            />
          </div>

          {/* Left Column: Elevated Feedback Form (order-2 on mobile, order-1 on desktop) */}
          <div className="relative z-20 p-5 sm:p-7 md:p-8 bg-[#EAEEF2] rounded-[14px] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.30)] flex flex-col justify-center border border-white/60 text-graphite order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success View */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-8 px-2 text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-graphite text-white flex items-center justify-center mb-4 shadow-sm">
                    <Check className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-graphite text-lg font-bold">
                    Предложение отправлено
                  </h3>
                  <p className="mt-2 text-iron text-[13px] leading-relaxed max-w-xs">
                    Спасибо! Главный инженер или руководитель дирекции свяжется с{"\u00A0"}вами в{"\u00A0"}течение 30 минут в{"\u00A0"}рабочее время.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName("");
                      setContact("");
                      setComment("");
                    }}
                    className="mt-6 text-[12px] font-medium text-graphite/70 hover:text-graphite underline underline-offset-4 cursor-pointer"
                  >
                    Отправить ещё одно предложение
                  </button>
                </motion.div>
              ) : (
                /* Form View */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-graphite text-[17px] font-bold tracking-tight">
                      Обсудить партнёрство
                    </h3>
                    <p className="text-iron text-[12px] mt-0.5">
                      Оставьте контактные данные для связи
                    </p>
                  </div>

                  {/* Name / Company */}
                  <div>
                    <label className="text-graphite text-[11px] font-medium uppercase tracking-wider block mb-1 font-mono">
                      Ваше имя и компания:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Петров, ООО «Инжиниринг»"
                      className="w-full px-3.5 py-2.5 bg-white rounded-[8px] border border-divider/70 text-[13px] text-graphite placeholder:text-pewter/60 focus:outline-none focus:border-graphite focus:ring-1 focus:ring-graphite transition-all shadow-2xs"
                    />
                  </div>

                  {/* Phone / Telegram */}
                  <div>
                    <label className="text-graphite text-[11px] font-medium uppercase tracking-wider block mb-1 font-mono">
                      Телефон или Telegram:
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={handleContactChange}
                      placeholder="+7 (999) 000-00-00 или @username"
                      className="w-full px-3.5 py-2.5 bg-white rounded-[8px] border border-divider/70 text-[13px] text-graphite placeholder:text-pewter/60 focus:outline-none focus:border-graphite focus:ring-1 focus:ring-graphite transition-all shadow-2xs"
                    />
                  </div>

                  {/* Comment (Optional) */}
                  <div>
                    <label className="text-graphite text-[11px] font-medium uppercase tracking-wider block mb-1 font-mono">
                      Суть предложения / объект (опционально):
                    </label>
                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Объект, стадия проекта, объём шкафов или запрос на дистрибуцию..."
                      className="w-full px-3.5 py-2 bg-white rounded-[8px] border border-divider/70 text-[12.5px] text-graphite placeholder:text-pewter/60 focus:outline-none focus:border-graphite focus:ring-1 focus:ring-graphite transition-all resize-none shadow-2xs"
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-2 pt-0.5">
                    <input
                      type="checkbox"
                      id="cooperation-agree"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-divider text-graphite focus:ring-graphite cursor-pointer"
                    />
                    <label
                      htmlFor="cooperation-agree"
                      className="text-[10.5px] text-pewter leading-snug cursor-pointer select-none"
                    >
                      Согласен на{"\u00A0"}обработку персональных данных в{"\u00A0"}соответствии с{"\u00A0"}
                      <button
                        type="button"
                        onClick={openPrivacyModal}
                        className="underline hover:text-graphite transition-colors inline"
                      >
                        политикой конфиденциальности
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full h-11 rounded-[8px] text-[13px] font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm ${
                      isFormValid
                        ? "bg-graphite text-white hover:bg-carbon active:scale-[0.98]"
                        : "bg-graphite/40 text-white/70 cursor-not-allowed"
                    }`}
                  >
                    Отправить предложение
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Heading top right, Description bottom right (order-1 on mobile, order-2 on desktop) */}
          <div className="relative z-20 flex flex-col justify-between py-2 sm:py-4 lg:py-6 pl-0 lg:pl-6 xl:pl-10 order-1 lg:order-2 min-h-[200px] lg:min-h-[460px]">
            {/* Top Right: Heading */}
            <div className="max-w-xl">
              <h2 className="text-white text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-tight">
                Предложить
                <br />
                сотрудничество
              </h2>
            </div>

            {/* Mobile 3D Folder Overlap Render */}
            <div className="lg:hidden relative w-full flex justify-center my-4 z-10 pointer-events-none select-none">
              <motion.img
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                src="/cooperation_folder.webp"
                alt="Документация АСУТП"
                className="w-56 sm:w-68 h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
                draggable={false}
              />
            </div>

            {/* Bottom Right: Description */}
            <div className="mt-4 lg:mt-auto pt-2 lg:pt-8 max-w-xl">
              <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed">
                Инжиниринговый центр «Т3 Автоматизация» открыт к партнёрству с{"\u00A0"}генподрядчиками,
                проектными институтами, системными интеграторами и{"\u00A0"}поставщиками технологического оборудования.
              </p>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  );
}

