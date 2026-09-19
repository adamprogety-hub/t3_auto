"use client";

import { motion } from "framer-motion";

interface ServiceSpecItem {
  label: string;
  value: string;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  colSpan: string;
  specs: ServiceSpecItem[];
  renderSrc?: string; // Будущий реалистичный 3D рендер (например, "/renders/cabinet_3d.png")
}

const services: ServiceCard[] = [
  {
    id: "cabinet",
    title: "Сборка шкафов управления (ШУ\u00A0/\u00A0ША\u00A0/\u00A0ВРУ)",
    description: "Проектируем и\u00A0собираем силовые распределительные щиты и\u00A0шкафы автоматизации на\u00A0собственном производстве. Лазерная гравировка, термотрансферная маркировка проводников по\u00A0ПУЭ\u00A07 и\u00A0комплексный стендовый прогон под\u00A0нагрузкой перед отгрузкой по\u00A0РФ.",
    colSpan: "lg:col-span-7",
    specs: [
      { label: "Корпуса шкафов", value: "DKC RAM block, Провенто (IP54 / IP65, порошковая окраска)" },
      { label: "Силовая часть", value: "КЭАЗ OptiMat, CHINT, DEKraft, реле Меандр (до 630А)" },
      { label: "Стендовый тест", value: "48\u00A0часов непрерывной симуляции сигналов и\u00A0защит ПАЗ" },
      { label: "Логистика", value: "Жесткий защитный каркас, доставка ТК по\u00A0РФ со\u00A0100% страховкой" },
    ],
  },
  {
    id: "plc_hmi",
    title: "Программирование ПЛК и\u00A0разработка HMI",
    description: "Разрабатываем отказоустойчивые прикладные алгоритмы: каскадное регулирование котлов и\u00A0горелок, адаптивные ПИД-контуры, рецептурные циклограммы и\u00A0защита от\u00A0сухого хода. Передаем заказчику открытые исходники без\u00A0сервисных паролей.",
    colSpan: "lg:col-span-5",
    specs: [
      { label: "ПЛК-контроллеры", value: "ОВЕН (ПЛК210/ПР205), Segnetics (SMH4/Matrix), Inovance" },
      { label: "Сенсорные HMI", value: "Weintek (cMT / MT8000), ОВЕН СП3xx, Kinco" },
      { label: "Среды разработки", value: "CoDeSys v3.5, SMLogix, EasyBuilder Pro" },
      { label: "Права на софт", value: "100% открытый код без\u00A0закрытых функциональных блоков" },
    ],
  },
  {
    id: "pnr_vfd",
    title: "Шефмонтаж и\u00A0горячая ПНР по\u00A0всей\u00A0России",
    description: "Выезд инженеров в\u00A0любой субъект РФ. Расключение внешних связей, калибровка датчиков КИПиА 4-20мА/Pt100, параметрирование частотных приводов и\u00A0сдача объекта инспекциям Ростехнадзора.",
    colSpan: "lg:col-span-4",
    specs: [
      { label: "Частотники", value: "Veda MC (наследник Danfoss VLT), Innovert, ОВЕН ПЧВ" },
      { label: "Датчики КИПиА", value: "ОВЕН (ПД100/ДТС), Ридан (Ridan), Росма" },
      { label: "Документация", value: "Протоколы комплексного опробования под Ростехнадзор" },
    ],
  },
  {
    id: "scada",
    title: "SCADA и\u00A0удалённая диспетчеризация",
    description: "Разработка мнемосхем диспетчерского контроля с\u00A0доступом через защищенный Web-интерфейс и\u00A0смартфон. Автоматическое резервирование каналов GSM и\u00A0буферизация логов при\u00A0обрыве связи.",
    colSpan: "lg:col-span-4",
    specs: [
      { label: "Платформы", value: "MasterSCADA 4D, Simple-Scada, Web-SCADA (браузер)" },
      { label: "Надежность связи", value: "2\u00A0SIM-карты разных операторов, буфер в\u00A0ПЛК на\u00A090\u00A0дней" },
      { label: "Оповещения", value: "Молниеносные аварийные алерты дежурному инженеру в\u00A0Telegram" },
    ],
  },
  {
    id: "retrofit",
    title: "Ретрофит и\u00A0импортозамещение систем",
    description: "Бесшовный перевод устаревших релейных шкафов и\u00A0санкционных контроллеров на\u00A0доступную российскую базу. Технология переврезки без\u00A0остановки объекта в\u00A0отопительный сезон.",
    colSpan: "lg:col-span-4",
    specs: [
      { label: "Что заменяем", value: "Danfoss ECL/VLT, Siemens S7-300/1200, Schneider Electric" },
      { label: "На что переводим", value: "Контроллеры Segnetics/ОВЕН, клапаны Ридан, ПЧ Veda MC" },
      { label: "Срок переврезки", value: "Поэтапная модернизация за\u00A072\u00A0часа без\u00A0заморозки здания" },
    ],
  },
];

/**
 * Изометрические чертёжные витрины (Blueprint Stage Viewports)
 * Разработаны как архитектурный подиум для будущей вставки крупных 3D рендеров
 */
function RenderStage({ service }: { service: ServiceCard }) {
  return (
    <div className="relative w-full h-[150px] lg:h-[160px] rounded-[6px] border border-white/10 bg-white/[0.015] flex items-center justify-center p-3 overflow-hidden">
      {/* Corner calibration ticks */}
      <div className="absolute top-2 left-2 text-white/20 text-[9px] font-mono leading-none select-none">⌜</div>
      <div className="absolute top-2 right-2 text-white/20 text-[9px] font-mono leading-none select-none">⌝</div>
      <div className="absolute bottom-2 left-2 text-white/20 text-[9px] font-mono leading-none select-none">⌞</div>
      <div className="absolute bottom-2 right-2 text-white/20 text-[9px] font-mono leading-none select-none">⌟</div>

      {/* Blueprint Drawing */}
      <div className="w-full h-full flex items-center justify-center">
        {service.id === "cabinet" && <CabinetIsometricBlueprint />}
        {service.id === "plc_hmi" && <PlcHmiIsometricBlueprint />}
        {service.id === "pnr_vfd" && <PnrVfdIsometricBlueprint />}
        {service.id === "scada" && <ScadaIsometricBlueprint />}
        {service.id === "retrofit" && <RetrofitIsometricBlueprint />}
      </div>

      {/* Slot for future realistic 3D model render */}
      {service.renderSrc && (
        <img
          src={service.renderSrc}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-contain p-3 z-20 pointer-events-none"
        />
      )}
    </div>
  );
}

export function Services() {
  return (
    <div className="bg-surface">
      <section
        id="services"
        className="py-20 md:py-28 bg-graphite text-white rounded-t-[28px] md:rounded-t-[36px] lg:rounded-t-[44px]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="pb-10 max-w-3xl">
          <h2 className="text-white text-[clamp(1.75rem,2.8vw,2.6rem)] font-extrabold leading-[1.12] tracking-tight">
            Полный цикл автоматизации технологических процессов
          </h2>
          <p className="mt-4 text-white/60 text-[14px] leading-relaxed max-w-2xl">
            От{"\u00A0"}разработки принципиальных схем{"\u00A0"}Э3 до{"\u00A0"}программирования ПЛК, сборки шкафов и{"\u00A0"}интеграции в{"\u00A0"}распределённую SCADA.
          </p>
        </div>

        {/* Swiss Industrial Table — Full Width Architectural Register */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {services.map((service, idx) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="py-8 lg:py-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  {/* Col 1-5: Title & Engineering Description */}
                  <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-4">
                    <h3 className="text-white text-lg lg:text-xl font-bold tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-white/60 text-[13.5px] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Col 6-9: Technical Spec Sheet (ТТХ) */}
                  <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2.5">
                      Регламент и спецификация:
                    </div>
                    <div className="space-y-2">
                      {service.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="grid grid-cols-[115px_1fr] gap-2 text-[12px] items-baseline"
                        >
                          <span className="text-white/40 font-mono text-[11px] truncate">
                            {spec.label}
                          </span>
                          <span className="text-white/85 font-medium leading-snug">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col 10-12: CAD Technical Viewport */}
                  <div className="lg:col-span-3">
                    <RenderStage service={service} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  </div>
  );
}

/**
 * 1. Изометрический чертёж шкафа автоматизации (Cabinet Blueprint)
 */
function CabinetIsometricBlueprint() {
  return (
    <svg
      viewBox="0 0 200 240"
      className="w-full h-full max-h-[220px] text-white/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Внешний контур шкафа (изометрия) */}
      <path d="M70 25 L160 55 L160 195 L70 165 Z" className="opacity-20 fill-white/[0.02]" />
      <path d="M70 25 L35 45 L35 185 L70 165 Z" />
      <path d="M70 25 L160 55" />
      <path d="M160 55 L160 195" />
      <path d="M160 195 L70 165" />
      <path d="M70 165 L35 185" />
      <path d="M35 185 L35 45" />
      <path d="M35 45 L70 25" />

      {/* Открытая дверца шкафа под углом */}
      <path d="M35 45 L5 65 L5 205 L35 185" strokeDasharray="3 3" className="opacity-40" />
      <path d="M15 125 L15 145" strokeWidth="2" className="text-bronze" />

      {/* Внутренние DIN-рейки */}
      <path d="M78 65 L145 88" className="opacity-60" />
      <path d="M78 100 L145 123" className="opacity-60" />
      <path d="M78 135 L145 158" className="opacity-60" />

      {/* Автоматы и модули на рейках */}
      <rect x="88" y="55" width="12" height="18" transform="skewY(18)" className="fill-white/10" />
      <rect x="105" y="61" width="16" height="18" transform="skewY(18)" className="fill-white/10" />
      <rect x="126" y="68" width="12" height="18" transform="skewY(18)" className="fill-white/10" />

      <rect x="88" y="90" width="22" height="18" transform="skewY(18)" className="fill-white/15 text-bronze" />
      <rect x="115" y="99" width="14" height="18" transform="skewY(18)" className="fill-white/10" />

      {/* Перфорированный кабель-канал */}
      <path d="M150 65 L150 180" strokeDasharray="2 2" className="opacity-30" />

      {/* Габаритные стрелки CAD */}
      <path d="M172 65 L172 185" strokeWidth="0.8" className="opacity-30" />
      <path d="M168 68 L172 64 L176 68" strokeWidth="0.8" className="opacity-30" />
      <path d="M168 181 L172 185 L176 181" strokeWidth="0.8" className="opacity-30" />
    </svg>
  );
}

/**
 * 2. Изометрический чертёж ПЛК и сенсорной HMI панели (PLC & HMI Blueprint)
 */
function PlcHmiIsometricBlueprint() {
  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full h-full max-h-[140px] text-white/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Сенсорная панель оператора Weintek (справа) */}
      <g transform="translate(115, 20)">
        {/* Рамка экрана */}
        <path d="M20 15 L95 15 L95 75 L20 75 Z" className="fill-white/[0.02]" />
        {/* Внутреннее стекло дисплея */}
        <path d="M26 21 L89 21 L89 69 L26 69 Z" className="opacity-50" />
        {/* График тренда / мнемосхема на экране */}
        <path d="M32 55 L45 42 L58 48 L72 32 L83 38" strokeWidth="1.4" className="text-bronze opacity-80" />
        {/* Линейка сетки SCADA */}
        <line x1="32" y1="62" x2="83" y2="62" strokeDasharray="2 2" className="opacity-30" />
      </g>

      {/* Контроллер ПЛК на DIN-рейке (слева в изометрии) */}
      <g transform="translate(25, 25)">
        <path d="M35 15 L70 30 L70 80 L35 65 Z" className="fill-white/[0.03]" />
        <path d="M10 25 L35 15 L35 65 L10 75 Z" />
        <path d="M35 15 L70 30" />
        <path d="M70 30 L70 80" />
        <path d="M10 75 L35 65" />
        <path d="M35 65 L70 80" />
        <path d="M10 25 L10 75" />

        {/* Клеммные колодки ПЛК */}
        <line x1="16" y1="33" x2="30" y2="27" className="opacity-60" />
        <line x1="16" y1="40" x2="30" y2="34" className="opacity-60" />
        <line x1="16" y1="47" x2="30" y2="41" className="opacity-60" />

        {/* Светодиоды статуса RUN/ERR */}
        <circle cx="45" cy="42" r="1.5" className="fill-bronze text-bronze" />
        <circle cx="53" cy="45" r="1.5" className="fill-white/40" />
        <circle cx="61" cy="48" r="1.5" className="fill-white/40" />

        {/* Кабель шины данных между ПЛК и HMI */}
        <path d="M70 55 C90 62, 95 40, 115 45" strokeDasharray="3 3" className="text-bronze opacity-50" />
      </g>
    </svg>
  );
}

/**
 * 3. Изометрический чертёж Частотного привода (ПЧВ) и Датчика давления (VFD & Sensor Blueprint)
 */
function PnrVfdIsometricBlueprint() {
  return (
    <svg
      viewBox="0 0 200 130"
      className="w-full h-full max-h-[130px] text-white/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Частотный преобразователь (VFD Drive) */}
      <g transform="translate(30, 15)">
        <path d="M25 10 L65 25 L65 85 L25 70 Z" className="fill-white/[0.03]" />
        <path d="M5 18 L25 10 L25 70 L5 78 Z" />
        {/* Ребра охлаждения радиатора */}
        <line x1="9" y1="26" x2="9" y2="70" className="opacity-30" />
        <line x1="14" y1="24" x2="14" y2="68" className="opacity-30" />
        <line x1="19" y1="22" x2="19" y2="66" className="opacity-30" />

        {/* Панель оператора ПЧВ с потенциометром */}
        <rect x="33" y="24" width="22" height="16" transform="skewY(20)" className="fill-white/10" />
        <circle cx="44" cy="52" r="4" className="opacity-60" />
      </g>

      {/* Промышленный датчик давления 4-20мА КИПиА (справа) */}
      <g transform="translate(125, 25)">
        {/* Цилиндрический корпус датчика */}
        <rect x="15" y="20" width="18" height="35" rx="3" className="fill-white/[0.04]" />
        {/* Резьбовой штуцер G 1/2 */}
        <path d="M18 55 L30 55 L28 70 L20 70 Z" className="opacity-50" />
        <line x1="18" y1="60" x2="30" y2="60" className="opacity-40" />
        <line x1="19" y1="65" x2="29" y2="65" className="opacity-40" />

        {/* Разъем DIN 43650 с кабелем */}
        <rect x="12" y="10" width="24" height="10" rx="1" className="fill-white/10" />
        <path d="M24 10 C24 0, 45 5, 50 18" strokeDasharray="2 2" className="text-bronze opacity-60" />
      </g>
    </svg>
  );
}

/**
 * 4. Изометрический чертёж SCADA-шлюза с антеннами (IoT Telemetry Gateway Blueprint)
 */
function ScadaIsometricBlueprint() {
  return (
    <svg
      viewBox="0 0 200 130"
      className="w-full h-full max-h-[130px] text-white/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(50, 30)">
        {/* Корпус DIN-реечного модема / шлюза */}
        <path d="M35 15 L75 30 L75 75 L35 60 Z" className="fill-white/[0.03]" />
        <path d="M10 24 L35 15 L35 60 L10 69 Z" />
        <path d="M35 15 L75 30" />
        <path d="M75 30 L75 75" />
        <path d="M10 69 L35 60" />
        <path d="M35 60 L75 75" />
        <path d="M10 24 L10 69" />

        {/* Антенна 1 (LTE / GSM) */}
        <line x1="22" y1="19" x2="10" y2="-12" strokeWidth="1.8" className="text-white/70" />
        <circle cx="10" cy="-12" r="2" className="fill-bronze text-bronze" />

        {/* Антенна 2 (GPS / Резерв) */}
        <line x1="60" y1="24" x2="72" y2="-8" strokeWidth="1.8" className="text-white/70" />
        <circle cx="72" cy="-8" r="2" className="fill-bronze text-bronze" />

        {/* Светодиодные индикаторы пакетов данных NET / TX / RX */}
        <line x1="44" y1="36" x2="65" y2="44" strokeDasharray="3 3" className="text-bronze opacity-80" />
        <line x1="44" y1="44" x2="65" y2="52" strokeDasharray="3 3" className="opacity-50" />
        <line x1="44" y1="52" x2="65" y2="60" strokeDasharray="3 3" className="opacity-30" />

        {/* Концентрические волны телеметрии */}
        <path d="M-5 -8 A 15 15 0 0 1 -5 -25" strokeDasharray="2 2" className="opacity-40 text-bronze" />
        <path d="M-12 -5 A 25 25 0 0 1 -12 -32" strokeDasharray="2 2" className="opacity-20 text-bronze" />
      </g>
    </svg>
  );
}

/**
 * 5. Изометрический чертёж Ретрофита и быстрой замены модуля (Retrofit Blueprint)
 */
function RetrofitIsometricBlueprint() {
  return (
    <svg
      viewBox="0 0 200 130"
      className="w-full h-full max-h-[130px] text-white/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(50, 25)">
        {/* Нижний старый посадочный сокет (Legacy socket) */}
        <path d="M35 45 L75 60 L75 75 L35 60 Z" strokeDasharray="3 3" className="opacity-30" />
        <path d="M10 54 L35 45 L35 60 L10 69 Z" strokeDasharray="3 3" className="opacity-30" />

        {/* Направляющие стрелки быстрого монтажа */}
        <path d="M22 45 L22 30" strokeDasharray="2 2" className="text-bronze opacity-60" />
        <path d="M55 52 L55 37" strokeDasharray="2 2" className="text-bronze opacity-60" />

        {/* Новый высокоскоростной микропроцессорный модуль (Modern Module) */}
        <path d="M35 10 L75 25 L75 50 L35 35 Z" className="fill-white/[0.04]" />
        <path d="M10 19 L35 10 L35 35 L10 44 Z" />
        <path d="M35 10 L75 25" />
        <path d="M75 25 L75 50" />
        <path d="M10 44 L35 35" />
        <path d="M35 35 L75 50" />
        <path d="M10 19 L10 44" />

        {/* Разъемные клеммники Push-in */}
        <rect x="42" y="24" width="24" height="8" transform="skewY(20)" className="fill-bronze/30 text-bronze" />

        {/* Значок быстрого цикла обновления */}
        <path d="M85 30 C95 30, 100 40, 95 48" strokeWidth="1" className="text-bronze opacity-80" />
        <path d="M92 48 L96 48 L96 44" strokeWidth="1" className="text-bronze opacity-80" />
      </g>
    </svg>
  );
}

