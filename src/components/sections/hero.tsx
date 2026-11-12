"use client";

import { motion } from "framer-motion";
import { PhoneFilledIcon, MailFilledIcon, TelegramIcon } from "@/components/ui/brand-icons";

const QUICK_CONTACTS = [
  {
    href: "tel:+79608218170",
    ariaLabel: "Позвонить +7 (960) 821-81-70",
    mobileLabel: "Звонок",
    tooltip: "+7 (960) 821-81-70",
    tooltipClass: "left-1/2 -translate-x-1/2 font-mono",
    noTranslate: false,
    external: false,
    Icon: PhoneFilledIcon,
    iconClass: "w-[15px] h-[15px] shrink-0",
  },
  {
    href: "mailto:aleksey.ivanov@t3-auto.com",
    ariaLabel: "Написать на почту aleksey.ivanov@t3-auto.com",
    mobileLabel: "Почта",
    tooltip: "aleksey.ivanov@t3-auto.com",
    tooltipClass: "left-1/2 -translate-x-1/2 font-mono",
    noTranslate: false,
    external: false,
    Icon: MailFilledIcon,
    iconClass: "w-[16px] h-[16px] shrink-0",
  },
  {
    href: "https://t.me/t3_auto",
    ariaLabel: "Написать в Telegram",
    mobileLabel: "Telegram",
    tooltip: "Telegram",
    tooltipClass: "right-0",
    noTranslate: true,
    external: true,
    Icon: TelegramIcon,
    iconClass: "w-[15px] h-[15px] shrink-0",
  },
] as const;

export function Hero() {
  return (
    <section className="relative bg-[var(--surface)] pt-24 sm:pt-28 lg:pt-44 xl:pt-52 2xl:pt-56 pb-12 sm:pb-14 lg:pb-10 xl:pb-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Wide dark-graphite banner card with gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[16px] lg:rounded-[20px] bg-gradient-to-br from-[#191C20] via-[#252A30] to-[#363D45]"
        >
          {/* Inner subtle sheen clipped cleanly to card corners */}
          <div className="absolute inset-0 rounded-[16px] lg:rounded-[20px] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/[0.06]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-0 lg:min-h-[400px] xl:min-h-[440px]">
            {/* Left side: White UTP near top edge & description near bottom edge on desktop */}
            <div className="lg:col-span-7 relative z-10 p-6 sm:p-9 lg:px-10 lg:py-8 xl:px-14 xl:py-9 flex flex-col lg:justify-between">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-white text-[clamp(1.75rem,3.2vw,3.25rem)] font-bold leading-[1.08] tracking-tight font-heading"
              >
                Инжиниринговый центр
                <br />
                АСУТП: промышленная
                <br />
                автоматика
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-6 lg:mt-0 text-white/75 text-[14px] sm:text-[16px] lg:text-[17px] leading-[1.65] max-w-lg xl:max-w-xl"
              >
                Проектирование АСУТП, разработка РСУ и{"\u00A0"}систем ПАЗ,
                собственное цифровое производство шкафов управления
                и{"\u00A0"}диспетчеризация «КАСКАД Цифра».
              </motion.p>
            </div>

            {/* Right side (Desktop): Heads protrude above top edge; bottom sliced at card bottom edge */}
            <div className="hidden lg:block lg:col-span-5 relative pointer-events-none select-none">
              <div className="absolute -top-12 xl:-top-14 bottom-0 -left-14 xl:-left-20 right-0 overflow-hidden rounded-br-[20px] flex justify-end pr-4 xl:pr-6 2xl:pr-8">
                <motion.img
                  src="/images/hero/team-engineers.png"
                  alt="Команда инженеров Т3 Автоматизация"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[560px] xl:h-[660px] 2xl:h-[730px] w-auto max-w-none object-contain object-top"
                />
              </div>
            </div>

            {/* Mobile & Tablet (< lg): Team cropped cleanly at bottom edge below text */}
            <div className="lg:hidden relative w-full h-[250px] sm:h-[320px] overflow-hidden rounded-b-[16px] flex justify-center pointer-events-none select-none">
              <img
                src="/images/hero/team-engineers.png"
                alt="Команда инженеров Т3 Автоматизация"
                className="h-[430px] sm:h-[540px] w-auto max-w-none object-contain object-top"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Action Row: CTA buttons on the left, quick contacts on the right (Variant 2) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 sm:mt-6 flex flex-col md:flex-row md:items-center md:justify-between md:px-5 lg:px-7 gap-3"
        >
          {/* Left: Primary CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contacts"
              className="w-full sm:flex-1 md:w-auto md:flex-initial inline-flex items-center justify-center h-12 sm:h-[50px] px-7 md:px-6 lg:px-8 bg-graphite text-white text-[13px] sm:text-[14px] font-semibold tracking-normal transition-all duration-200 hover:bg-graphite/90 active:scale-[0.98] shadow-sm text-center whitespace-nowrap rounded-[8px]"
            >
              Рассчитать объект
            </a>
            <a
              href="#cooperation"
              className="w-full sm:flex-1 md:w-auto md:flex-initial inline-flex items-center justify-center h-12 sm:h-[50px] px-7 md:px-6 lg:px-8 border border-divider bg-white text-graphite text-[13px] sm:text-[14px] font-semibold tracking-normal transition-all duration-200 hover:border-graphite active:scale-[0.98] text-center whitespace-nowrap rounded-[8px]"
            >
              Предложить сотрудничество
            </a>
          </div>

          {/* Right: Quick contact buttons (Call, Email, Telegram) */}
          <div className="grid grid-cols-3 md:flex md:items-center gap-2.5">
            {QUICK_CONTACTS.map(
              ({ href, ariaLabel, mobileLabel, tooltip, tooltipClass, noTranslate, external, Icon, iconClass }) => (
                <div key={href} className="relative group">
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={ariaLabel}
                    className="w-full md:w-[50px] h-12 md:h-[50px] inline-flex items-center justify-center gap-1.5 rounded-[8px] border border-divider bg-white text-graphite hover:border-graphite hover:bg-graphite hover:text-white active:scale-[0.98] transition-all duration-200"
                  >
                    <Icon className={iconClass} />
                    <span className={`md:hidden text-[12px] font-medium${noTranslate ? " notranslate" : ""}`}>
                      {mobileLabel}
                    </span>
                  </a>
                  <span
                    className={`hidden md:block pointer-events-none absolute top-[calc(100%+8px)] ${tooltipClass} whitespace-nowrap rounded-[6px] bg-graphite px-2.5 py-1 text-[11px] font-medium text-white shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200${noTranslate ? " notranslate" : ""}`}
                  >
                    {tooltip}
                  </span>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
