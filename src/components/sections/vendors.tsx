"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Award, ExternalLink, CheckCircle2 } from "lucide-react";

interface VendorItem {
  name: string;
  location: string;
  status: string;
  product: string;
  specs: string[];
  highlight?: boolean;
}

const VENDORS: VendorItem[] = [
  {
    name: "ООО «Сибком Цифра»",
    location: "Уфа, Самара",
    status: "Ключевой партнёр",
    product: "SCADA, MES «КАСКАД»",
    specs: [
      "3 сертифицированных программиста в штате Т3",
      "В реестре российского ПО Минцифры № 678216",
      "Независимый аудит ФСТЭК (КИИ 2 и 3 категорий)",
      "Опыт внедрения: АВТОВАЗ, ТМК, Северсталь, ММК, Норникель",
    ],
    highlight: true,
  },
  {
    name: "АО «ЭЛАРА»",
    location: "Чебоксары",
    status: "Партнёрский договор",
    product: "ПТК РСУ и ПАЗ «СУРА»",
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
    status: "Партнёрская программа",
    product: "ПТК РСУ и ПАЗ «БАЗИС»",
    specs: [
      "2 обученных программиста в штате",
      "Линейка: БАЗИС-100, 21, 35, 14, РИТМ, БАРС, ПВ",
      "Специализация: АСУТП для опасных химических производств",
      "SIL2 / SIL3 сертификация противоаварийной защиты",
    ],
    highlight: true,
  },
  {
    name: "IEK Group",
    location: "Санкт-Петербург",
    status: "Официальный интегратор",
    product: "ПЛК, ЧРП ONI, MasterSCADA 4.0",
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
    status: "Партнёрская программа",
    product: "ПТК РСУ и ПАЗ TREI-5B",
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
    status: "Интеграция ПТК",
    product: "ПТК АБАК / ИСБ Рубеж R3",
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
    status: "Инженерный партнёр",
    product: "АСУЭ, АСТУЭ, АСУ ЭР",
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
    status: "Кастом-инжиниринг",
    product: "Системы вибродиагностики",
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
              className={`p-6 rounded-[14px] bg-white border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
                v.highlight
                  ? "border-divider/90 shadow-[0_12px_32px_-8px_rgba(19,18,16,0.08),0_2px_8px_rgba(0,0,0,0.02)] ring-1 ring-[#E66826]/10"
                  : "border-divider/50 shadow-[0_4px_20px_-4px_rgba(19,18,16,0.03)] hover:border-divider"
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-graphite text-[15px] font-bold tracking-tight">
                      {v.name}
                    </h3>
                    <span className="text-pewter text-[11px] font-mono block mt-0.5">
                      {v.location}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-surface border border-divider/60 text-graphite/80 whitespace-nowrap">
                    {v.status}
                  </span>
                </div>

                {/* Main Product */}
                <div className="py-2.5 px-3 rounded-[8px] bg-surface-card border border-divider/40 mb-4">
                  <div className="text-[10px] font-mono uppercase text-pewter tracking-wider">
                    ПТК / Платформа
                  </div>
                  <div className="text-[13px] font-bold text-graphite mt-0.5 leading-snug">
                    {v.product}
                  </div>
                </div>

                {/* Specs list */}
                <ul className="space-y-2 mb-4">
                  {v.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2 text-[12px] text-iron leading-snug"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E66826] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom footer badge */}
              <div className="pt-3 border-t border-divider/40 flex items-center justify-between text-[11px] font-mono text-pewter">
                <span>Отечественный стек</span>
                <span className="text-[#E66826] font-semibold">Т3 Сертификация</span>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white/90 text-[11px] font-mono mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E66826]" />
                <span>Реестр ПО Минцифры № 678216 · Независимый аудит ФСТЭК</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                Платформа «КАСКАД Цифра»: для систем с{"\u00A0"}миллионами сигналов
              </h3>
              <p className="mt-3 text-white/70 text-[14px] leading-relaxed">
                От локальных HMI и SCADA до корпоративных MES и ERP. Единые диспетчерские, ситуационно-аналитические центры, базы данных реального времени (БДРВ). Соответствует требованиям Приказа ФСТЭК № 239, испытания пройдены без уязвимостей и недекларированных возможностей (НДВ). Работает на микро-ПК с Linux.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[12px] font-mono">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                  АВТОВАЗ
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                  ТМК
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                  Северсталь
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                  ММК
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                  Норникель
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                  Нестле (9 заводов)
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 rounded-[14px] p-6 border border-white/10">
              <div className="text-[12px] font-mono text-white/50 uppercase tracking-wider mb-3">
                Преимущества для генподрядчика
              </div>
              <ul className="space-y-3 text-[13px] text-white/80">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E66826] mt-2 shrink-0" />
                  <span>Полное соответствие требованиям КИИ 2 и 3 категорий</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E66826] mt-2 shrink-0" />
                  <span>Бесшовная замена зарубежных систем без остановки производства</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E66826] mt-2 shrink-0" />
                  <span>Поддержка отечественных ОС: Astra Linux, РЕД ОС, Альт</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E66826] mt-2 shrink-0" />
                  <span>Готовые сертифицированные специалисты Т3 на этапе ПНР</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

