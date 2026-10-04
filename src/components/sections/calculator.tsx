"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Subsystem {
  id: string;
  label: string;
  price: number;
  default: boolean;
}

interface ObjectTypeConfig {
  id: string;
  label: string;
  unitName: string;
  defaultQty: number;
  minQty: number;
  maxQty: number;
  basePricePerUnit: number;
  subsystems: Subsystem[];
  icon: string;
}

const objectTypes: ObjectTypeConfig[] = [
  {
    id: "pumps",
    label: "Насосная станция",
    unitName: "Насосных агрегатов",
    defaultQty: 2,
    minQty: 1,
    maxQty: 8,
    basePricePerUnit: 210000,
    icon: "/icons/objects/03_vzu.webp",
    subsystems: [
      { id: "cascade_fc", label: "Каскад с\u00A01\u00A0ПЧ на\u00A0группу (переключение сеть\u00A0/\u00A0ПЧ, переменный мастер)", price: 65000, default: true },
      { id: "multi_fc", label: "Индивидуальный ПЧ на\u00A0каждый насос (мультичастотная схема)", price: 95000, default: false },
      { id: "tank_levels", label: "Контроль уровней в\u00A0резервуарах (РЧВ\u00A0/\u00A0КНС) и\u00A0защита от\u00A0перелива", price: 40000, default: true },
      { id: "avr_power", label: "Автоматический ввод резерва питания (АВР на\u00A02\u00A0ввода)", price: 70000, default: false },
      { id: "filter_backwash", label: "Автопромывка песчаных\u00A0/\u00A0дисковых фильтров по\u00A0перепаду давления", price: 55000, default: false },
    ],
  },
  {
    id: "itp",
    label: "ИТП / ЦТП",
    unitName: "Регулируемых контуров",
    defaultQty: 2,
    minQty: 1,
    maxQty: 8,
    basePricePerUnit: 220000,
    icon: "/icons/objects/02_itp.webp",
    subsystems: [
      { id: "weather_comp", label: "Погодозависимое регулирование отопления", price: 50000, default: true },
      { id: "gvs_circ", label: "Контур ГВС с\u00A0рециркуляцией и\u00A0клапаном", price: 45000, default: true },
      { id: "pumps_mixing", label: "Насосы смешения с\u00A0преобразователями частоты (ПЧ)", price: 60000, default: true },
      { id: "substation_press", label: "Поддержание перепада давления и\u00A0подпитка", price: 45000, default: true },
      { id: "heat_meter", label: "Интеграция с\u00A0тепловычислителем (учёт тепла)", price: 35000, default: false },
    ],
  },
  {
    id: "ventilation",
    label: "Вентиляция",
    unitName: "Приточных / вытяжных систем",
    defaultQty: 2,
    minQty: 1,
    maxQty: 8,
    basePricePerUnit: 200000,
    icon: "/icons/objects/04_kns_blower.webp",
    subsystems: [
      { id: "fans_fc", label: "Управление вентиляторами с\u00A0преобразователями частоты", price: 60000, default: true },
      { id: "freeze_protect", label: "Защита калорифера от\u00A0замерзания (водяной нагрев)", price: 50000, default: true },
      { id: "filters_diff", label: "Контроль засорения фильтров по\u00A0дифманометрам", price: 35000, default: true },
      { id: "fire_damper", label: "Интеграция с\u00A0ОЗК (противопожарные клапаны) и\u00A0ПАЗ", price: 45000, default: true },
      { id: "recuperator", label: "Управление рекуператором (роторный\u00A0/\u00A0пластинчатый)", price: 55000, default: false },
    ],
  },
  {
    id: "boiler",
    label: "Котельная",
    unitName: "Котлов / контуров",
    defaultQty: 2,
    minQty: 1,
    maxQty: 6,
    basePricePerUnit: 250000,
    icon: "/icons/objects/01_boiler.webp",
    subsystems: [
      { id: "cascade", label: "Каскадное регулирование котлов и\u00A0горелок", price: 75000, default: true },
      { id: "pumps_fc", label: "Насосные группы с\u00A0преобразователями частоты (ПЧ)", price: 90000, default: true },
      { id: "weather_comp", label: "Погодозависимые контуры отопления и\u00A0ГВС", price: 65000, default: true },
      { id: "gas_safety", label: "Газовая безопасность (СО/CH4) и\u00A0клапан отсечки", price: 70000, default: true },
      { id: "hvo_refill", label: "ХВО водоподготовка и\u00A0автоматическая подпитка", price: 55000, default: false },
    ],
  },
  {
    id: "custom",
    label: "Нестандартный проект",
    unitName: "Управляемых узлов / агрегатов",
    defaultQty: 2,
    minQty: 1,
    maxQty: 10,
    basePricePerUnit: 230000,
    icon: "/icons/objects/05_production.webp",
    subsystems: [
      { id: "spec_tz", label: "Составление детального ТЗ и\u00A0циклограмм процессов", price: 70000, default: true },
      { id: "speed_sync", label: "Синхронизация приводов с\u00A0преобразователями частоты", price: 85000, default: true },
      { id: "spec_sensors", label: "Нестандартные датчики и\u00A0регуляторы спецпроцесса", price: 65000, default: true },
      { id: "safety_interlock", label: "Многоуровневые блокировки безопасности и\u00A0аварийный стоп", price: 60000, default: true },
      { id: "recipe_mgmt", label: "Рецептурное управление и\u00A0дозирование по\u00A0циклам", price: 70000, default: false },
    ],
  },
];

const scopeOptions = [
  { id: "pnr", label: "Шефмонтаж и\u00A0пусконаладочные работы (ПНР) с\u00A0выездом инженера по\u00A0РФ", price: 75000, default: false },
  { id: "tz_audit", label: "Предпроектный аудит объекта и\u00A0составление технического задания (ТЗ)", price: 45000, default: false },
  { id: "zip_kit", label: "Комплект ЗИП (резервные автоматы, промежуточные реле, блок питания)", price: 35000, default: false },
  { id: "training", label: "Индивидуальный инструктаж и\u00A0обучение дежурной службы заказчика", price: 25000, default: false },
];

const dispatchLevels = [
  {
    id: "none",
    title: "Локальный контроль",
    desc: "Сенсорная панель оператора (Weintek cMT\u00A0/\u00A0ОВЕН) на\u00A0двери шкафа без\u00A0выхода во\u00A0внешнюю сеть",
    price: 0,
    badge: "HMI Weintek 7-10″",
  },
  {
    id: "alerts",
    title: "Диспетчеризация и\u00A0мониторинг",
    desc: "ПЛК + промышленный GSM/4G-модем. Передача рабочих параметров, аварийные оповещения дежурному персоналу по\u00A0SMS и\u00A0каналам связи",
    price: 65000,
    badge: "GSM / 4G / Оповещения",
  },
  {
    id: "scada",
    title: "Web-SCADA система",
    desc: "Мнемосхемы в\u00A0MasterSCADA 4D\u00A0/\u00A0Simple-Scada, архивация трендов, удаленное управление с\u00A0ПК и\u00A0смартфона",
    price: 145000,
    badge: "MasterSCADA / Web",
  },
];

export function Calculator() {
  const [selectedType, setSelectedType] = useState<string>("pumps");
  const currentObject = objectTypes.find((t) => t.id === selectedType) || objectTypes[0];

  const [unitsQty, setUnitsQty] = useState<number>(currentObject.defaultQty);
  const [selectedSubsystems, setSelectedSubsystems] = useState<string[]>(
    currentObject.subsystems.filter((s) => s.default).map((s) => s.id)
  );
  const [selectedScope, setSelectedScope] = useState<string[]>(
    scopeOptions.filter((o) => o.default).map((o) => o.id)
  );
  const [selectedDispatch, setSelectedDispatch] = useState<string>("scada");

  const handleTypeChange = (typeId: string) => {
    const newObj = objectTypes.find((t) => t.id === typeId);
    if (!newObj) return;
    setSelectedType(typeId);
    setUnitsQty(newObj.defaultQty);
    setSelectedSubsystems(newObj.subsystems.filter((s) => s.default).map((s) => s.id));
  };

  const toggleSubsystem = (id: string) => {
    setSelectedSubsystems((prev) => {
      if (id === "cascade_fc") {
        return prev.includes("cascade_fc")
          ? prev.filter((s) => s !== id)
          : [...prev.filter((s) => s !== "multi_fc"), "cascade_fc"];
      }
      if (id === "multi_fc") {
        return prev.includes("multi_fc")
          ? prev.filter((s) => s !== id)
          : [...prev.filter((s) => s !== "cascade_fc"), "multi_fc"];
      }
      return prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
    });
  };

  const toggleScope = (id: string) => {
    setSelectedScope((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Calculations
  const baseCost = currentObject.basePricePerUnit * unitsQty;
  const subsystemsCost = selectedSubsystems.reduce((sum, subId) => {
    const item = currentObject.subsystems.find((s) => s.id === subId);
    return sum + (item?.price || 0);
  }, 0);
  const scopeCost = selectedScope.reduce((sum, scId) => {
    const item = scopeOptions.find((o) => o.id === scId);
    return sum + (item?.price || 0);
  }, 0);
  const dispatchItem = dispatchLevels.find((d) => d.id === selectedDispatch);
  const dispatchCost = dispatchItem?.price || 0;

  const total = baseCost + subsystemsCost + scopeCost + dispatchCost;

  return (
    <section id="calculator" className="py-20 md:py-28 bg-surface-warm">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-graphite text-[clamp(1.75rem,2.8vw,2.6rem)] font-extrabold leading-[1.12] tracking-tight">
            Конфигуратор проекта автоматизации
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
          {/* Main Controls Form */}
          <div className="space-y-10">
            {/* Step 1: Object Type */}
            <div>
              <div>
                <span className="text-pewter text-[12px] font-medium">
                  1. Тип объекта
                </span>
              </div>
              <div className="mt-4 rounded-[14px] overflow-hidden isolate bg-divider/30 shadow-[0_4px_24px_-4px_rgba(19,18,16,0.05),0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-5 gap-[1px] segmented-control">
                {objectTypes.map((type, idx) => {
                  const active = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTypeChange(type.id)}
                      className={`!rounded-none p-3.5 sm:p-4 text-center sm:text-left text-[13px] font-medium tracking-tight transition-all duration-150 ${
                        idx === 4 ? "col-span-2 sm:col-span-1" : ""
                      } ${
                        active
                          ? "bg-graphite text-white font-semibold"
                          : "bg-white text-iron hover:bg-surface-warm/80 hover:text-graphite"
                      }`}
                    >
                      <span className="block">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedType === "custom" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Hero Banner for Custom Projects */}
                <div className="p-6 md:p-8 rounded-[14px] bg-white shadow-[0_4px_24px_-4px_rgba(19,18,16,0.05),0_1px_3px_rgba(0,0,0,0.02)] border border-divider/40">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-accent-light text-accent text-[12px] font-semibold tracking-tight border border-accent/20 mb-3.5">
                    Индивидуальный инжиниринг
                  </div>
                  <h3 className="text-graphite text-[20px] md:text-[22px] font-extrabold tracking-tight leading-snug">
                    Нестандартные задачи и спецпроцессы рассчитываются индивидуально
                  </h3>
                  <p className="mt-3 text-iron text-[14px] md:text-[14.5px] leading-relaxed max-w-2xl">
                    Нестандартные и{"\u00A0"}производственные задачи (сервоприводы, сварка, пневматика, технологические линии, УЗВ) требуют индивидуального подхода: здесь нет готовых шаблонов, разработка начинается с{"\u00A0"}составления ТЗ и{"\u00A0"}циклограммы.
                  </p>

                  {/* Example Domains Chips */}
                  <div className="mt-5 pt-5 border-t border-divider/50">
                    <span className="text-pewter text-[11px] font-medium uppercase tracking-wider block mb-2.5">
                      Специфика реализованных объектов:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Пневматические линии и острова",
                        "Сервоприводы и синхронизация осей",
                        "Сварочные комплексы и столы",
                        "УЗВ (рыборазводные фермы и бассейны)",
                        "Многокомпонентное дозирование и рецепты",
                        "Сушильные и термические камеры",
                        "Модернизация нестандартных станков",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-[6px] bg-surface-warm text-graphite text-[12px] font-medium border border-divider/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3 Step Engineering Workflow Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-[12px] bg-white border border-divider/40 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-pewter font-mono text-[11px] font-bold">01 / АУДИТ</span>
                      <h4 className="mt-2 text-graphite text-[14px] font-bold leading-snug">
                        Анализ механики и процесса
                      </h4>
                      <p className="mt-2 text-iron text-[12.5px] leading-relaxed">
                        Изучаем циклограмму, механику станка или технологическую схему. Обсуждаем требования с вашим технологом.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-[12px] bg-white border border-divider/40 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-pewter font-mono text-[11px] font-bold">02 / ТЗ И АЛГОРИТМЫ</span>
                      <h4 className="mt-2 text-graphite text-[14px] font-bold leading-snug">
                        Разработка ТЗ под задачу
                      </h4>
                      <p className="mt-2 text-iron text-[12.5px] leading-relaxed">
                        Если готового ТЗ нет, составляем его сами. Подбираем ПЛК, сервоприводы, контроллеры и датчики под бюджет.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-[12px] bg-white border border-divider/40 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-pewter font-mono text-[11px] font-bold">03 / РЕЗУЛЬТАТ</span>
                      <h4 className="mt-2 text-graphite text-[14px] font-bold leading-snug">
                        Сборка, код и запуск
                      </h4>
                      <p className="mt-2 text-iron text-[12.5px] leading-relaxed">
                        Проектируем схемы Э3, собираем шкаф, пишем софт под ваш спецпроцесс и выезжаем на пусконаладку.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fast Input / CTA Banner */}
                <div className="p-5 rounded-[12px] bg-white border border-divider/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-graphite text-[14px] font-bold">
                      Есть чертёж, циклограмма или краткое описание задачи?
                    </h4>
                    <p className="text-iron text-[12.5px] mt-0.5">
                      Пришлите схему или описание задачи — инженер изучит проект и подготовит предварительную спецификацию
                    </p>
                  </div>
                  <a
                    href="#contacts"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-[8px] bg-graphite hover:bg-graphite/90 text-white text-[13px] font-semibold whitespace-nowrap transition-colors shrink-0"
                  >
                    Отправить данные на расчёт
                  </a>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Step 2: Units Quantity */}
                <div className="p-6 bg-white rounded-[14px] shadow-[0_4px_24px_-4px_rgba(19,18,16,0.05),0_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-pewter text-[12px] font-medium">
                        Масштаб объекта
                      </span>
                      <div className="mt-1 text-graphite text-[15px] font-bold">
                        {currentObject.unitName}
                      </div>
                    </div>

                    <div className="w-full sm:w-48 flex items-center rounded-[8px] overflow-hidden divide-x divide-divider/40 bg-surface shadow-xs">
                      <button
                        type="button"
                        onClick={() => setUnitsQty(Math.max(currentObject.minQty, unitsQty - 1))}
                        disabled={unitsQty <= currentObject.minQty}
                        aria-label="Уменьшить количество"
                        className="!rounded-none w-14 sm:w-12 h-11 shrink-0 flex items-center justify-center text-xl font-bold text-iron hover:bg-surface-warm hover:text-graphite active:bg-divider/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        −
                      </button>
                      <div className="flex-1 h-11 flex items-center justify-center bg-white select-none">
                        <span className="text-graphite text-xl font-extrabold font-heading">
                          {unitsQty}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUnitsQty(Math.min(currentObject.maxQty, unitsQty + 1))}
                        disabled={unitsQty >= currentObject.maxQty}
                        aria-label="Увеличить количество"
                        className="!rounded-none w-14 sm:w-12 h-11 shrink-0 flex items-center justify-center text-xl font-bold text-iron hover:bg-surface-warm hover:text-graphite active:bg-divider/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3: Automated Subsystems (Dynamic per object) */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-pewter text-[12px] font-medium">
                      2. Автоматизируемые подсистемы ({currentObject.label})
                    </span>
                    {selectedType === "pumps" && (
                      <span className="text-pewter text-[11px] font-normal">
                        ПИД-регулятор давления/уровня, ротация моточасов и сухоход включены в базовый алгоритм
                      </span>
                    )}
                  </div>

                  <div className="mt-4 rounded-[14px] overflow-hidden isolate bg-white shadow-[0_4px_24px_-4px_rgba(19,18,16,0.05),0_1px_3px_rgba(0,0,0,0.02)] segmented-control">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedType}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="divide-y divide-divider/60"
                      >
                        {currentObject.subsystems.map((sub) => {
                          const isChecked = selectedSubsystems.includes(sub.id);
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => toggleSubsystem(sub.id)}
                              className={`!rounded-none w-full flex items-center justify-between p-4 transition-colors duration-150 text-left ${
                                isChecked
                                  ? "bg-white hover:bg-surface-card"
                                  : "bg-surface-card/30 hover:bg-surface-card text-iron"
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <div
                                  className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-all shrink-0 ${
                                    isChecked
                                      ? "bg-accent border-accent text-white"
                                      : "border-divider bg-white"
                                  }`}
                                >
                                  {isChecked && (
                                    <svg width="10" height="8" viewBox="0 0 12 9" fill="none">
                                      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
                                    </svg>
                                  )}
                                </div>
                                <span className={`text-[13px] leading-tight ${isChecked ? "text-graphite font-semibold" : "text-iron font-normal"}`}>
                                  {sub.label}
                                </span>
                              </div>
                              <span className={`text-[12px] shrink-0 ml-4 font-medium ${isChecked ? "text-graphite" : "text-pewter"}`}>
                                от {(sub.price / 1000).toFixed(0)}&nbsp;тыс.&nbsp;₽
                              </span>
                            </button>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Step 4: Dispatching Level */}
                <div>
                  <div>
                    <span className="text-pewter text-[12px] font-medium">
                      3. Диспетчеризация и удалённый контроль
                    </span>
                  </div>

                  <div className="mt-4 rounded-[14px] overflow-hidden isolate bg-divider/30 shadow-[0_4px_24px_-4px_rgba(19,18,16,0.05),0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-1 sm:grid-cols-3 gap-[1px] segmented-control">
                    {dispatchLevels.map((lvl) => {
                      const active = selectedDispatch === lvl.id;
                      return (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setSelectedDispatch(lvl.id)}
                          className={`!rounded-none p-5 text-left transition-all duration-150 flex flex-col justify-between ${
                            active
                              ? "bg-graphite text-white"
                              : "bg-white text-iron hover:bg-surface-warm/70"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[11px] px-2 py-0.5 font-semibold rounded-[4px] ${
                                  active
                                    ? "bg-accent-light text-accent border border-accent/20"
                                    : "bg-divider/50 text-pewter"
                                }`}
                              >
                                {lvl.badge}
                              </span>
                              <span className={`text-[12px] ${active ? "text-white/80" : "text-pewter"}`}>
                                {lvl.price === 0 ? "включено" : `от ${(lvl.price / 1000).toFixed(0)} тыс. ₽`}
                              </span>
                            </div>
                            <h4 className={`mt-3 text-[14px] font-bold leading-snug ${active ? "text-white" : "text-graphite"}`}>
                              {lvl.title}
                            </h4>
                            <p className={`mt-2 text-[12px] leading-relaxed ${active ? "text-white/70" : "text-iron"}`}>
                              {lvl.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 5: Scope of Supply / Works */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                    <span className="text-pewter text-[12px] font-medium">
                      4. Дополнительные услуги и опции
                    </span>
                    <span className="text-emerald-600 text-[11.5px] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Схемы Э3, сборка в DKC, прошивка ПЛК и паспорт уже включены в шкаф
                    </span>
                  </div>

                  <div className="mt-4 rounded-[14px] overflow-hidden isolate bg-divider/30 shadow-[0_4px_24px_-4px_rgba(19,18,16,0.05),0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-1 sm:grid-cols-2 gap-[1px] segmented-control">
                    {scopeOptions.map((opt) => {
                      const isChecked = selectedScope.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleScope(opt.id)}
                          className={`!rounded-none flex items-center justify-between p-4 transition-colors duration-150 text-left ${
                            isChecked
                              ? "bg-white hover:bg-surface-card"
                              : "bg-surface-card/30 hover:bg-surface-card text-iron"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-all shrink-0 ${
                                isChecked
                                  ? "bg-accent border-accent text-white"
                                  : "border-divider bg-white"
                              }`}
                            >
                              {isChecked && (
                                <svg width="10" height="8" viewBox="0 0 12 9" fill="none">
                                  <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-[13px] leading-tight ${isChecked ? "text-graphite font-semibold" : "text-iron font-normal"}`}>
                              {opt.label}
                            </span>
                          </div>
                          <span className={`text-[12px] shrink-0 ml-2 font-medium ${isChecked ? "text-graphite" : "text-pewter"}`}>
                            от {(opt.price / 1000).toFixed(0)} тыс. ₽
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Result Sticky Specification Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="p-8 bg-white text-graphite rounded-[14px] shadow-[0_16px_44px_-6px_rgba(19,18,16,0.07),0_2px_8px_rgba(0,0,0,0.03)] min-h-[520px] md:min-h-[580px] flex flex-col justify-between">
              {/* Upper half: 3D Object Render */}
              <div className="relative w-full flex-1 min-h-[200px] md:min-h-[230px] flex items-center justify-center select-none pb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentObject.id}
                    src={currentObject.icon}
                    alt={currentObject.label}
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="max-h-[200px] md:max-h-[230px] w-auto max-w-full object-contain pointer-events-none drop-shadow-[0_12px_28px_rgba(33,37,41,0.08)]"
                  />
                </AnimatePresence>
              </div>

              {/* Lower half: remaining content */}
              <div className="flex flex-col justify-end">
                <span className="text-pewter text-[12px] font-medium">
                  Ориентировочная стоимость проекта
                </span>

                {selectedType === "custom" ? (
                  <>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-[15px] font-semibold text-pewter">от</span>
                      <span className="text-5xl font-black tracking-[-0.03em] text-graphite">350</span>
                      <span className="text-xl font-bold text-pewter">тыс. ₽</span>
                    </div>
                    <div className="mt-1 text-pewter text-[12px]">
                      Точный расчёт после изучения ТЗ и циклограммы
                    </div>

                    <a
                      href="#contacts"
                      className="mt-7 w-full inline-flex items-center justify-center h-14 bg-accent text-white text-[13px] font-semibold tracking-normal transition-all duration-200 hover:bg-accent-hover active:scale-[0.99] rounded-[8px] shadow-xs"
                    >
                      Обсудить нестандартный проект
                    </a>

                    <p className="mt-3 text-pewter text-[11px] leading-normal text-center">
                      Поможем составить ТЗ и алгоритмы работы оборудования
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-[15px] font-semibold text-pewter">от</span>
                      <span className="text-5xl font-black tracking-[-0.03em] text-graphite">{(total / 1000).toFixed(0)}</span>
                      <span className="text-xl font-bold text-pewter">тыс. ₽</span>
                    </div>
                    <div className="mt-1 text-pewter text-[12px]">
                      Нижняя граница · точная смета после{"\u00A0"}изучения{"\u00A0"}ТЗ
                    </div>

                    <a
                      href="#contacts"
                      className="mt-7 w-full inline-flex items-center justify-center h-14 bg-accent text-white text-[13px] font-semibold tracking-normal transition-all duration-200 hover:bg-accent-hover active:scale-[0.99] rounded-[8px] shadow-xs"
                    >
                      Получить точную спецификацию
                    </a>

                    <p className="mt-3 text-pewter text-[11px] leading-normal text-center">
                      Точный расчёт после изучения технологической схемы и{"\u00A0"}ТЗ
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
