"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-28 sm:pt-36 lg:pt-40 pb-0 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20 relative">
        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-graphite text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.12] tracking-tight max-w-4xl mx-auto text-center font-heading"
          >
            Инжиниринговый центр АСУТП:
            <br />
            промышленная автоматика,
            <br />
            отечественные ПТК и{"\u00A0"}платформы
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-2xl mx-auto text-center"
          >
            <p className="text-iron text-[15px] sm:text-[17px] leading-[1.7]">
              Проектирование АСУТП, разработка РСУ и{"\u00A0"}систем ПАЗ, собственное цифровое
              производство шкафов управления в{"\u00A0"}Самаре (19 км) и{"\u00A0"}диспетчеризация
              «КАСКАД Цифра». 50 ведущих инженеров, 3 филиала и{"\u00A0"}полное соответствие требованиям ФСТЭК по{"\u00A0"}защите КИИ.
            </p>
          </motion.div>

          {/* Two CTA Buttons: Рассчитать объект & Предложить сотрудничество */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3.5 w-full max-w-[480px] mx-auto justify-center"
          >
            <a
              href="#contacts"
              className="w-full sm:flex-1 inline-flex items-center justify-center h-12 sm:h-[50px] min-h-[48px] px-5 sm:px-6 py-3.5 bg-graphite text-white text-[13px] sm:text-[14px] font-semibold tracking-normal transition-all duration-200 hover:bg-carbon active:scale-[0.98] shadow-sm text-center whitespace-nowrap rounded-[8px]"
            >
              Рассчитать объект
            </a>
            <a
              href="#cooperation"
              className="w-full sm:flex-1 inline-flex items-center justify-center h-12 sm:h-[50px] min-h-[48px] px-5 sm:px-6 py-3.5 border border-divider bg-white text-graphite text-[13px] sm:text-[14px] font-semibold tracking-normal transition-all duration-200 hover:bg-surface hover:border-graphite active:scale-[0.98] text-center whitespace-nowrap rounded-[8px]"
            >
              Предложить сотрудничество
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
