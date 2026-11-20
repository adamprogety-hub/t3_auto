"use client";

import { motion } from "framer-motion";

interface VendorItem {
  name: string;
  location: string;
  image: string;
  specs: string[];
}

const VENDORS: VendorItem[] = [
  {
    name: "ООО «Сибком Цифра»",
    location: "Уфа, Самара",
    image: "/images/vendors/01_sibkom_scada_team.jpg",
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
    image: "/images/vendors/02_elara_plc_testing.jpg",
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
    image: "/images/vendors/03_ecoresource_safety_paz.jpg",
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
    image: "/images/vendors/04_iek_switchgear_collab.jpg",
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
    image: "/images/vendors/05_trei_oil_gas_field.jpg",
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
    image: "/images/vendors/06_incomsystem_metering.jpg",
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
    image: "/images/vendors/07_sedmax_energy_substation.jpg",
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
    image: "/images/vendors/08_tik_vibration_turbine.jpg",
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
              className="rounded-[18px] bg-white border border-divider/60 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-0.5 group"
            >
              {/* Photo Inset with Concentric Radius: card R=18, inset P=8 -> photo R=10 */}
              <div className="p-2 pb-0">
                <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden bg-surface border border-black/[0.04]">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Lower Half: Vendor Info & Specs */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-graphite text-[15px] font-bold tracking-tight font-heading leading-snug">
                    {v.name}
                  </h3>
                  <span className="text-pewter text-[11px] font-mono block mt-0.5 mb-3.5">
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
          id="kaskad-featured-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-8 p-2 sm:p-2.5 md:p-2.5 rounded-[22px] bg-white border border-divider/60 shadow-2xs hover:shadow-md transition-all duration-300 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Left: Text content + Key metrics with uniform 4-sided padding */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between p-5 sm:p-6 lg:p-7 xl:p-8 lg:pr-4 xl:pr-5">
              <div>
                <h3 className="text-graphite text-[19px] sm:text-[21px] lg:text-[23px] xl:text-[25px] font-bold tracking-tight font-heading leading-[1.2]">
                  Платформа «КАСКАД Цифра»
                </h3>
                <p className="mt-3 text-iron text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.6] max-w-xl">
                  От локальных HMI и SCADA до корпоративных ситуационно-аналитических центров и баз данных реального времени (БДРВ). Испытания ФСТЭК пройдены без уязвимостей и недекларированных возможностей (НДВ). Работает на микро-ПК с Linux.
                </p>
              </div>

              {/* 2 Key Metric Cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-5">
                <div className="p-2.5 sm:p-3 rounded-[10px] bg-surface/70 border border-divider/40 flex items-center justify-center text-center">
                  <div className="text-graphite font-bold font-heading text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-tight">
                    ФСТЭК № 239
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-[10px] bg-surface/70 border border-divider/40 flex items-center justify-center text-center">
                  <div className="text-graphite font-bold font-heading text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-tight">
                    Linux / Эльбрус
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Enlarged Photo with concentric radius (R=22, P=10 -> R=12) */}
            <div className="lg:col-span-7 xl:col-span-7">
              <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-surface border border-black/[0.04]">
                <img
                  src="/images/vendors/09_kaskad_enterprise_center.jpg"
                  alt="Ситуационный центр платформы КАСКАД Цифра"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

