"use client";

import { motion } from "framer-motion";

interface VendorItem {
  name: string;
  location: string;
  image?: string;
  specs: string[];
}

const VENDORS: VendorItem[] = [
  {
    name: "ООО «Сибком Цифра»",
    location: "Уфа, Самара",
    specs: [
      "3 сертифицированных программиста в штате Т3",
      "В реестре российского ПО Минцифры № 678216",
      "Независимый аудит ФСТЭК (КИИ 2 и 3 категорий)",
      "Опыт внедрения: АВТОВАЗ, ТМК, Северсталь, ММК, Норникель",
    ],
  },
  {
    name: "АО «ЭЛАРА»",
    location: "Чебоксары",
    specs: [
      "3 обученных программиста",
      "Отказоустойчивые распределённые системы управления",
      "Оборудование из реестра Минпромторга РФ",
      "Прямой доступ к инженерной поддержке завода",
    ],
  },
  {
    name: "АО «Экоресурс»",
    location: "Воронеж",
    specs: [
      "2 обученных программиста в штате",
      "Линейка: БАЗИС-100, 21, 35, 14, РИТМ, БАРС, ПВ",
      "Специализация: АСУТП для опасных химических производств",
      "SIL2 / SIL3 сертификация противоаварийной защиты",
    ],
  },
  {
    name: "IEK Group",
    location: "Санкт-Петербург",
    specs: [
      "3 сертифицированных программиста",
      "Комплексная диспетчеризация инженерных систем",
      "Высокая доступность складских запасов в РФ",
      "Широкая линейка приводов и модулей ввода-вывода",
    ],
  },
  {
    name: "АО «ТРЕИ»",
    location: "Пенза",
    specs: [
      "Референс-лист сложных РСУ и ПАЗ",
      "Модульная отказоустойчивая архитектура",
      "Применение на объектах добычи и переработки нефти и газа",
      "Соответствие требованиям промышленной безопасности",
    ],
  },
  {
    name: "НПЦ «ИНКОМСИСТЕМ»",
    location: "Казань",
    specs: [
      "ПТК АБАК для критических технологических процессов",
      "Интеграция с системами пожаротушения АСПСиПТ",
      "Решения для объектов трубопроводного транспорта",
      "Высокая надёжность в тяжёлых условиях эксплуатации",
    ],
  },
  {
    name: "SEDMAX",
    location: "Вологда",
    specs: [
      "ОИК «Диспетчер», интеграция с оборудованием EKF",
      "Комплексный учёт и телемеханика энергохозяйств",
      "Полный цикл: ПО, шефмонтаж, пусконаладка",
      "Аналитика энергоэффективности предприятий",
    ],
  },
  {
    name: "НПП «ТИК»",
    location: "Пермь",
    specs: [
      "Прямое импортозамещение систем Bently Nevada 3500",
      "Мониторинг турбоагрегатов, компрессоров и насосов",
      "Импортозамещение серии К15 и вибромониторинг",
      "Защита критического вращающегося оборудования",
    ],
  },
];

export function Vendors() {
  return (
    <section id="vendors" className="py-20 md:py-28 bg-surface-warm">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="text-graphite text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-[1.15] tracking-tight">
            Доверенные отечественные ПТК
            <br />
            и{"\u00A0"}программные платформы
          </h2>
          <p className="mt-4 text-iron text-[15px] leading-relaxed max-w-2xl">
            Работаем напрямую с{"\u00A0"}производителями и{"\u00A0"}разработчиками. Оборудование и{"\u00A0"}ПО включены в{"\u00A0"}реестры Минпромторга и{"\u00A0"}Минцифры, сертифицированы ФСТЭК для{"\u00A0"}применения на{"\u00A0"}объектах КИИ 2 и{"\u00A0"}3 категорий.
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {VENDORS.map((v, idx) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="rounded-xl md:rounded-[14px] bg-white border border-divider/60 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col hover:-translate-y-0.5"
            >
              {/* Upper Half: Empty space reserved for image (images later) without color separation */}
              <div className="relative w-full h-44 sm:h-48 flex items-center justify-center overflow-hidden">
                {v.image && (
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Lower Half: Vendor Info & Specs */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-graphite text-[15px] font-bold tracking-tight font-heading leading-snug">
                    {v.name}
                  </h3>
                  <span className="text-pewter text-[11px] font-mono block mt-0.5 mb-4">
                    {v.location}
                  </span>

                  {/* Specs list */}
                  <ul className="space-y-2">
                    {v.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2 text-[12px] text-iron leading-snug"
                      >
                        <span className="text-graphite select-none shrink-0 font-bold leading-snug">—</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Enterprise Banner: КАСКАД Цифра & ФСТЭК КИИ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-8 p-6 sm:p-8 md:p-10 rounded-[18px] bg-graphite text-white border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.2)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                Платформа «КАСКАД Цифра»: для систем с{"\u00A0"}миллионами сигналов
              </h3>
              <p className="mt-3 text-white/70 text-[14px] leading-relaxed">
                От локальных HMI и SCADA до корпоративных MES и ERP. Единые диспетчерские, ситуационно-аналитические центры, базы данных реального времени (БДРВ). Соответствует требованиям Приказа ФСТЭК № 239, испытания пройдены без уязвимостей и недекларированных возможностей (НДВ). Работает на микро-ПК с Linux.
              </p>
            </div>

            {/* Empty space reserved for future image */}
            <div className="lg:col-span-5 min-h-[160px] sm:min-h-[200px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

