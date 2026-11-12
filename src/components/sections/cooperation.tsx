"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Cpu, Factory, Users } from "lucide-react";
import { openPrivacyModal } from "@/components/ui/privacy-modal";

const COOPERATION_TYPES = [
  "Генподряд / Субподряд",
  "Поставка шкафов",
  "Проектирование АТХ",
  "Вендор / Поставщик",
];

const ADVANTAGES = [
  {
    icon: Factory,
    title: "Собственное производство в Самаре (19 км)",
    desc: "Серийная и заказная сборка шкафов с электронным паспортом",
  },
  {
    icon: ShieldCheck,
    title: "Соответствие ФСТЭК № 239",
    desc: "Аттестация для объектов КИИ 2 и 3 категорий",
  },
  {
    icon: Cpu,
    title: "Отечественный стек ПТК",
    desc: "«КАСКАД Цифра», ПТК «СУРА», ПТК «БАЗИС», TREI-5B",
  },
  {
    icon: Users,
    title: "50 ведущих инженеров",
    desc: "Филиалы в Москве, Самаре и Челябинске, ПНР по всей России",
  },
];

export function Cooperation() {
  const [selectedType, setSelectedType] = useState(COOPERATION_TYPES[0]);
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
            className="bg-graphite text-white rounded-[14px] md:rounded-[18px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(19,18,16,0.30)] border border-white/10 p-5 sm:p-7 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-8 items-center relative"
          >
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          {/* 3D Cabinet Render in Background (matching Screenshot 2 style) */}
          <div className="absolute right-[240px] xl:right-[290px] 2xl:right-[340px] top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 hidden lg:block opacity-45 xl:opacity-65">
            <img
              src="/asu_cabinet_transparent.webp"
              alt="Шкаф АСУТП"
              className="w-[520px] xl:w-[600px] h-auto object-contain -scale-x-100 drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
              draggable={false}
            />
          </div>

          {/* Left Column: Heading, description & key benefits */}
          <div className="relative z-20 flex flex-col justify-between max-w-xl">
            <div>
              <h2 className="text-white text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-tight">
                Предложить
                <br />
                сотрудничество
              </h2>
              <p className="mt-4 text-white/70 text-[14px] sm:text-[15px] leading-relaxed max-w-lg">
                Инжиниринговый центр «Т3 Автоматизация» открыт к партнёрству с{"\u00A0"}генподрядчиками,
                проектными институтами, системными интеграторами и{"\u00A0"}поставщиками технологического оборудования.
              </p>
            </div>

            {/* Benefit Points */}
            <div className="mt-8 space-y-3.5">
              {ADVANTAGES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5 text-white/90">
                      <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-white text-[13.5px] font-semibold leading-snug">
                        {item.title}
                      </div>
                      <div className="text-white/50 text-[12px] leading-snug mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 text-[12px] text-white/40 flex items-center gap-4">
              <span>Прямой диалог с руководством</span>
              <span>•</span>
              <span>Подписание NDA за 1 рабочий день</span>
            </div>
          </div>

          {/* Right Column: Elevated Feedback Form (matching Screenshot 2 card style) */}
          <div className="relative z-20 p-5 sm:p-7 md:p-8 bg-[#EAEEF2] rounded-[14px] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.30)] flex flex-col justify-center border border-white/60 text-graphite">
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
                      Выберите формат и оставьте контактные данные
                    </p>
                  </div>

                  {/* Cooperation Type Selector Chips */}
                  <div>
                    <label className="text-graphite text-[11px] font-medium uppercase tracking-wider block mb-1.5 font-mono">
                      Формат сотрудничества:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {COOPERATION_TYPES.map((type) => {
                        const isSelected = selectedType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedType(type)}
                            className={`px-2.5 py-2 rounded-[8px] text-[11.5px] font-semibold text-center transition-all cursor-pointer border ${
                              isSelected
                                ? "bg-graphite text-white border-graphite shadow-2xs"
                                : "bg-white/80 hover:bg-white text-graphite/80 border-divider/60"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
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
        </motion.div>
        </div>
      </section>
    </div>
  );
}

