"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Сколько стоит автоматизация объекта (котельной, ИТП, ВЗУ)?",
    a: "Стоимость складывается из схемотехники, комплектующих шкафа, разработки ПО ПЛК, пусконаладки и уровня диспетчеризации. Базовый шкаф автоматики начинается от 250 000 ₽. Воспользуйтесь нашим интерактивным конфигуратором выше или прикрепите ТЗ — сформируем точную смету за 1 рабочий день.",
  },
  {
    q: "Как устроена работа с регионами России? Производство ведь находится в Москве?",
    a: "Все шкафы проектируются, собираются и проходят 48-часовой стендовый прогон на нашем сборочном участке в Москве. Перед отправкой заказчик получает детальный видеоотчет тестирования цепей и симуляции работы ПЛК. Шкаф отправляется транспортной компанией (Деловые Линии, ПЭК) в жестком защитном каркасе со 100% страховкой груза. На объект в назначенную дату выезжает инженерная группа ACEngine для шефмонтажа, расключения и горячей пусконаладки (также доступна дистанционная наладка через защищенный GSM/VPN-канал).",
  },
  {
    q: "Какое оборудование вы используете в текущих условиях санкций? Не останется ли объект без запчастей?",
    a: "Мы принципиально проектируем новые системы на оборудовании со 100% складским запасом у дистрибьюторов в РФ: контроллеры ОВЕН (ПЛК210/ПР205), Segnetics (SMH4/Matrix), Inovance; сенсорные панели Weintek (cMT); частотные приводы Veda MC (созданы российской инженерной командой Danfoss), Innovert и ОВЕН ПЧВ; клапаны и датчики Ридан (Ridan) и Росма; коммутационная аппаратура КЭАЗ OptiMat, CHINT, DEKraft и корпуса DKC RAM block. Любой компонент приобретается за 2–4 дня. При этом мы также проводим бесшовный ретрофит европейских линеек (Siemens S7, Schneider Electric, Danfoss ECL/VLT).",
  },
  {
    q: "Как устроена удалённая SCADA-диспетчеризация при слабой связи в удаленных районах?",
    a: "В шкаф устанавливается промышленный модем с двумя SIM-картами разных операторов (автоматическое переключение на резервный канал). При полном обрыве GSM-связи контроллер буферизирует все тренды и аварии в локальную энергонезависимую память (до 90 дней архива) и автоматически синхронизирует данные с сервером при появлении сети. Тревожные алерты дублируются в Telegram и SMS.",
  },
  {
    q: "Какие реальные сроки реализации проекта от ТЗ до сдачи инспекциям?",
    a: "Типовой проект занимает от 3 до 6 недель: 1 неделя — разработка принципиальных схем (Э3) и ТЗ, 2–3 недели — сборка шкафа на участке в Москве и программирование контроллера с панелью, 3–4 дня — комплексные стендовые испытания под нагрузкой, 3–7 дней — доставка и горячая пусконаладка на объекте.",
  },
  {
    q: "Что входит в пусконаладочные работы и сдачу инспекциям Ростехнадзора?",
    a: "Шефмонтаж, расключение внешних кабельных связей, юстировка и калибровка датчиков КИПиА 4-20мА/Pt100, проверка контуров противоаварийной защиты (ПАЗ), вывод оборудования на технологический режим, оформление протоколов опробования для Ростехнадзора и инструктаж дежурного персонала.",
  },
  {
    q: "Предоставляются ли открытые исходные коды прошивок ПЛК?",
    a: "Да, это наш принципиальный стандарт. Мы передаем заказчику полный комплект исполнительной документации (схемы Э3 в EPLAN по ГОСТ 21.408, кабельный журнал) и открытые исходные проекты для ПЛК (CoDeSys v3.5 / SMLogix / Owen Logic), экранов Weintek (EasyBuilder Pro) и диспетчеризации MasterSCADA 4D / Simple-Scada без сервисных паролей и закрытых библиотек.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-surface-warm">
      <div className="mx-auto w-full max-w-[900px] px-6 py-20 md:py-28">
        <div className="pb-8">
          <h2 className="text-graphite text-xl md:text-2xl font-extrabold tracking-tight">
            Инженерные вопросы и ответы
          </h2>
        </div>

        <div className="divide-y divide-divider">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="py-2">
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left py-4 flex items-center justify-between gap-4 group focus:outline-none"
                >
                  <span
                    className={`text-[15px] font-bold tracking-tight transition-colors duration-200 ${
                      isOpen ? "text-graphite" : "text-iron group-hover:text-graphite"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                    className="shrink-0 mt-0.5"
                  >
                    <Plus
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isOpen ? "text-graphite" : "text-pewter group-hover:text-graphite"
                      }`}
                      strokeWidth={1.25}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-iron text-[13px] leading-relaxed pb-5 pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
