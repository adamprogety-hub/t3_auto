"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Сколько стоит автоматизация объекта (котельной, ИТП, ВЗУ)?",
    a: "Стоимость складывается из\u00A0схемотехники, комплектующих шкафа, разработки ПО\u00A0ПЛК, пусконаладки и\u00A0уровня диспетчеризации. Базовый шкаф автоматики начинается от\u00A0250\u00A0000\u00A0₽. Воспользуйтесь нашим интерактивным конфигуратором выше или\u00A0прикрепите ТЗ\u00A0— сформируем точную смету за\u00A01\u00A0рабочий день.",
  },
  {
    q: "Как устроена работа с\u00A0регионами России? Производство ведь находится в\u00A0Москве?",
    a: "Все шкафы проектируются, собираются и\u00A0проходят 48-часовой стендовый прогон на\u00A0нашем сборочном участке в\u00A0Москве. Перед отправкой заказчик получает детальный видеоотчет тестирования цепей и\u00A0симуляции работы ПЛК. Шкаф отправляется транспортной компанией (Деловые Линии, ПЭК) в\u00A0жестком защитном каркасе со\u00A0100% страховкой груза. На\u00A0объект в\u00A0назначенную дату выезжает инженерная группа ACEngine для\u00A0шефмонтажа, расключения и\u00A0горячей пусконаладки (также доступна дистанционная наладка через защищенный GSM/VPN-канал).",
  },
  {
    q: "Какое оборудование вы\u00A0используете в\u00A0текущих условиях санкций? Не\u00A0останется\u00A0ли объект без\u00A0запчастей?",
    a: "Мы принципиально проектируем новые системы на\u00A0оборудовании со\u00A0100% складским запасом у\u00A0дистрибьюторов в\u00A0РФ: контроллеры ОВЕН (ПЛК210/ПР205), Segnetics (SMH4/Matrix), Inovance; сенсорные панели Weintek (cMT); частотные приводы Veda MC (созданы российской инженерной командой Danfoss), Innovert и\u00A0ОВЕН ПЧВ; клапаны и\u00A0датчики Ридан (Ridan) и\u00A0Росма; коммутационная аппаратура КЭАЗ OptiMat, CHINT, DEKraft и\u00A0корпуса DKC RAM block. Любой компонент приобретается за\u00A02–4\u00A0дня. При этом мы\u00A0также проводим бесшовный ретрофит европейских линеек (Siemens S7, Schneider Electric, Danfoss ECL/VLT).",
  },
  {
    q: "Как устроена удалённая SCADA-диспетчеризация при слабой связи в\u00A0удаленных районах?",
    a: "В\u00A0шкаф устанавливается промышленный модем с\u00A0двумя SIM-картами разных операторов (автоматическое переключение на\u00A0резервный канал). При полном обрыве GSM-связи контроллер буферизирует все тренды и\u00A0аварии в\u00A0локальную энергонезависимую память (до\u00A090\u00A0дней архива) и\u00A0автоматически синхронизирует данные с\u00A0сервером при появлении сети. Тревожные алерты дублируются в\u00A0Telegram и\u00A0SMS.",
  },
  {
    q: "Какие реальные сроки реализации проекта от\u00A0ТЗ до\u00A0сдачи инспекциям?",
    a: "Типовой проект занимает от\u00A03 до\u00A06\u00A0недель: 1\u00A0неделя\u00A0— разработка принципиальных схем (Э3) и\u00A0ТЗ, 2–3\u00A0недели\u00A0— сборка шкафа на\u00A0участке в\u00A0Москве и\u00A0программирование контроллера с\u00A0панелью, 3–4\u00A0дня\u00A0— комплексные стендовые испытания под\u00A0нагрузкой, 3–7\u00A0дней\u00A0— доставка и\u00A0горячая пусконаладка на\u00A0объекте.",
  },
  {
    q: "Что входит в\u00A0пусконаладочные работы и\u00A0сдачу инспекциям Ростехнадзора?",
    a: "Шефмонтаж, расключение внешних кабельных связей, юстировка и\u00A0калибровка датчиков КИПиА 4-20мА/Pt100, проверка контуров противоаварийной защиты (ПАЗ), вывод оборудования на\u00A0технологический режим, оформление протоколов опробования для\u00A0Ростехнадзора и\u00A0инструктаж дежурного персонала.",
  },
  {
    q: "Предоставляются\u00A0ли открытые исходные коды прошивок ПЛК?",
    a: "Да, это наш принципиальный стандарт. Мы\u00A0передаем заказчику полный комплект исполнительной документации (схемы Э3 в\u00A0EPLAN по\u00A0ГОСТ\u00A021.408, кабельный журнал) и\u00A0открытые исходные проекты для\u00A0ПЛК (CoDeSys v3.5 / SMLogix / Owen Logic), экранов Weintek (EasyBuilder Pro) и\u00A0диспетчеризации MasterSCADA 4D\u00A0/\u00A0Simple-Scada без\u00A0сервисных паролей и\u00A0закрытых библиотек.",
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
            Инженерные вопросы и{"\u00A0"}ответы
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
