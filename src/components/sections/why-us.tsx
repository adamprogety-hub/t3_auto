"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Стендовый цех в Москве — ПНР по всей России",
    badge: "Логистика и выезды",
    description: "Сборка и 48-часовой стендовый прогон на собственном участке в Москве исключают сюрпризы на объекте в тысячах километров. В регионы отправляем готовый щит в жесткой защитной упаковке со страховкой, а инженерная группа выезжает строго на горячую наладку.",
  },
  {
    title: "Доступная элементная база РФ и ЕАЭС",
    badge: "Складской запас в РФ",
    description: "Проектируем на оборудовании с гарантированным наличием у дистрибьюторов в РФ: ПЛК ОВЕН и Segnetics, HMI Weintek, частотники Veda MC и Innovert, арматура Ридан, силовые автоматы КЭАЗ OptiMat и корпуса DKC. Никаких полугодовых срывов поставок из Европы и риска блокировок зарубежного софта.",
  },
  {
    title: "Открытые исходные коды",
    badge: "CoDeSys / MasterSCADA 4D",
    description: "Передаем заказчику полные исходные проекты в CoDeSys, MasterSCADA 4D или Simple-Scada без сервисных паролей и закрытых функциональных блоков. Служба КИПиА предприятия полностью контролирует логику алгоритмов.",
  },
  {
    title: "Документация по ГОСТ и Ростехнадзор",
    badge: "Э3 + EPLAN + ПАЗ",
    description: "Комплект схем Э3 по ГОСТ 21.408, расчет токов КЗ, кабельный журнал, карта регистров Modbus/OPC UA и протоколы проверки контуров ПАЗ для беспрепятственной сдачи инспекциям.",
  },
  {
    title: "Гарантийный технологический сезон",
    badge: "Сопровождение 12 мес.",
    description: "Не бросаем объект после пуска. Сопровождаем систему в течение первого отопительного или производственного сезона, донастраивая ПИД-контуры под реальные пиковые режимы.",
  },
];

export function WhyUs() {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-0">
        {/* Left — dark column */}
        <div className="bg-graphite p-12 md:p-16 lg:p-20 flex flex-col justify-center text-white">
          <h2 className="text-white text-[clamp(1.4rem,2.2vw,2.15rem)] font-extrabold leading-[1.15] tracking-tight">
            Архитектура
            <br />
            сквозной
            <br />
            ответственности
          </h2>
          <p className="mt-6 text-white/60 text-[14px] leading-relaxed">
            Павел Петров выстроил процесс так, чтобы проектирование схем, сборка шкафов в Москве и пусконаладка в регионах РФ замыкались на одной команде. Это ликвидирует главную причину аварий — конфликт между проектом и наладкой.
          </p>
        </div>

        {/* Right — reasons */}
        <div className="bg-surface-warm divide-y divide-divider">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="px-10 md:px-16 py-8 transition-colors duration-150 hover:bg-surface-card"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-graphite text-[16px] font-bold tracking-tight">
                  {reason.title}
                </h3>
                <span className="text-[11px] font-mono text-pewter shrink-0 px-2 py-0.5 border border-divider/60 rounded-[4px] bg-white">
                  {reason.badge}
                </span>
              </div>
              <p className="mt-2 text-iron text-[13px] leading-relaxed max-w-2xl">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
