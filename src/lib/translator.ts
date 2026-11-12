"use client";

import { useEffect, useState } from "react";

export type Language = "ru" | "en";

// 1. Specialized Industrial Glossary (Preserves exact engineering acronyms & terminology)
export const GLOSSARY: [RegExp, string][] = [
  [/\bАСУ\s*ТП\b/gi, "Industrial Automation (IACS / DCS)"],
  [/\bАСУТП\b/gi, "Industrial Automation (IACS / DCS)"],
  [/\bКИИ\b/g, "Critical Information Infrastructure (CII)"],
  [/\bФСТЭК\b/g, "FSTEC"],
  [/\bПриказа ФСТЭК № 239\b/gi, "FSTEC Order No. 239"],
  [/\bПНР\b/g, "Commissioning & Startup"],
  [/\bРСУ\b/g, "DCS"],
  [/\bПАЗ\b/g, "ESD / SIS"],
  [/\bПТК\b/g, "Hardware-Software Complex"],
  [/\bШУ\b/g, "Control Cabinets"],
  [/\bшкафы управления\b/gi, "control cabinets"],
  [/\bшкафов управления\b/gi, "control cabinets"],
  [/\bшкафа управления\b/gi, "control cabinet"],
  [/\bБДРВ\b/g, "Real-Time DB (RTDB)"],
  [/\bОИК\b/g, "Telemetry & Dispatching"],
  [/\bНДВ\b/g, "Undocumented Features"],
  [/\bМинцифры\b/g, "Ministry of Digital Development"],
  [/\bМинпромторга\b/g, "Ministry of Industry and Trade"],
  [/\bГенподрядчик\b/gi, "General Contractor"],
  [/\bГенподряда\b/gi, "General Contracting"],
  [/\bгенподрядчика\b/gi, "general contractor"],
  [/\bгенподрядчиков\b/gi, "general contractors"],
  [/\bшеф-монтаж\b/gi, "supervision of installation"],
  [/\bшеф-монтажа\b/gi, "supervision of installation"],
  [/\bдиспетчеризация\b/gi, "dispatching & SCADA"],
  [/\bдиспетчеризации\b/gi, "dispatching & SCADA"],
  [/\bимпортозамещение\b/gi, "import substitution"],
  [/\bимпортозамещения\b/gi, "import substitution"],
  [/\bпротивоаварийной защиты\b/gi, "emergency shutdown & safety"],
  [/\bотечественные\s+ПТК\b/gi, "domestic control systems"],
  [/\bотечественных\s+ПТК\b/gi, "domestic control systems"],
  [/\bотечественного\s+стека\b/gi, "domestic tech stack"],
  [/\bотечественный\s+стек\b/gi, "domestic tech stack"],
  [/\bплатформы\b/gi, "platforms"],
  [/\bплатформа\b/gi, "platform"],
  [/\bТ3 Автоматизация\b/g, "T3 Automation"],
];

// 2. Comprehensive UI and Section Dictionary for 100% precision
export const UI_DICTIONARY: Record<string, string> = {
  // Header buttons & Navigation
  "Сертификаты": "Certificates",
  "Кейсы": "Case Studies",
  "Реквизиты": "Company Details",
  "Т3 Автоматизация": "T3 Automation",
  "Автоматизация": "Automation",
  "Посмотрите короткие видео": "Watch short videos",
  "Мы в работе": "In Progress",

  // Action buttons
  "Рассчитать объект": "Calculate Project",
  "Предложить сотрудничество": "Propose Partnership",
  "Оставить заявку": "Submit Request",
  "Отправить заявку": "Send Request",
  "Отправить": "Send",
  "Скачать": "Download",
  "Закрыть": "Close",
  "Подробнее": "Learn More",
  "Смотреть все": "View All",
  "Все кейсы": "All Cases",
  "Назад": "Back",
  "Далее": "Next",
  "Копировать": "Copy",
  "Скопировано": "Copied",
  "Принять": "Accept",
  "Только обязательные": "Essential only",
  "Звонок": "Call",
  "Почта": "Email",

  // Hero Section
  "Инжиниринговый центр АСУТП: команда и ресурсы": "Industrial Automation Engineering Center: Team & Capabilities",
  "Инжиниринговый центр АСУТП:": "Industrial Automation Engineering Center:",
  "промышленная автоматика,": "industrial automation,",
  "промышленная автоматика": "industrial automation",
  "отечественные ПТК и": "domestic control systems &",
  "платформы": "platforms",
  "отечественные ПТК и платформы": "domestic control systems & platforms",
  "отечественные ПТК и\u00A0платформы": "domestic control systems & platforms",
  "3 года": "3 years",
  "слаженная работа команды": "coordinated team experience",
  "50": "50",
  "ведущих инженеров": "lead engineers",
  "50+": "50+",
  "сданных объектов": "completed facilities",
  "Команда объединяет ведущих специалистов из ключевых проектных институтов и системных интеграторов страны.": "Our team brings together leading specialists from key design institutes and top system integrators across the country.",
  "Москва:": "Moscow:",
  "управление проектами, проектирование по РФ": "project management & design across Russia",
  "Москва: управление проектами, проектирование по РФ": "Moscow: Project management & design nationwide",
  "Самара (Волга):": "Samara (Volga):",
  "Нефтегаз, АПК, производство 19 км": "Oil & Gas, Agro, 19 km production",
  "Самара (Волга): Нефтегаз, АПК, производство 19 км": "Samara: Oil & Gas, Agro, 19 km manufacturing hub",
  "Челябинск (Урал):": "Chelyabinsk (Urals):",
  "Добыча, ТЭК, металлургия": "Mining, Energy, Metallurgy",
  "Челябинск (Урал): Добыча, ТЭК, металлургия": "Chelyabinsk (Urals): Mining, Energy & Metallurgy",
  "Проектирование ПО и разработка SCADA-систем на базе собственного цифрового производства шкафов управления в Самаре (19 км) и диспетчеризация «КАСКАД Цифра». 50 ведущих инженеров, 3 филиала и полное соответствие требованиям ФСТЭК по защите КИИ.":
    "Software design and SCADA development based on our own digital control cabinet manufacturing facility in Samara (19 km) and KASKAD Tsifra dispatching. 50 lead engineers, 3 branch offices, and full compliance with FSTEC requirements for Critical Information Infrastructure protection.",
  "Проектирование АСУТП, разработка РСУ и систем ПАЗ, собственное цифровое производство шкафов управления в Самаре (19 км) и диспетчеризация «КАСКАД Цифра». 50 ведущих инженеров, 3 филиала и полное соответствие требованиям ФСТЭК по защите КИИ.":
    "Design of IACS, development of DCS and ESD systems, proprietary digital control cabinet manufacturing in Samara (19 km), and KASKAD Tsifra dispatching. 50 lead engineers, 3 branches, and full compliance with FSTEC requirements for Critical Information Infrastructure protection.",

  // Problems Section
  "Ключевые вызовы генподряда и промышленной автоматизации": "Key Challenges in EPC Contracting & Industrial Automation",
  "Срыв сроков ввода в эксплуатацию": "Commissioning Schedule Delays",
  "Несогласованность проектных решений": "Discrepancies in Engineering Design",
  "Уход зарубежных вендоров": "Foreign Vendor Withdrawals",
  "Сложности с сертификацией КИИ и ФСТЭК": "Challenges with CII & FSTEC Certification",

  // Services Section
  "Полный цикл инжиниринга АСУ ТП": "Full-Cycle Industrial Automation Engineering",
  "Комплексные решения для промышленных предприятий и генподрядчиков": "End-to-End Solutions for Industrial Enterprises and General Contractors",
  "Проектирование и аудит": "Design & Engineering Audit",
  "Сборка шкафов управления": "Control Cabinet Assembly",
  "Разработка ПО и SCADA": "Software & SCADA Development",
  "ПНР и шеф-монтаж": "Commissioning & Supervision",
  "Аудит информационной безопасности КИИ": "CII Cybersecurity Audit",

  // Why Us Section
  "Собственная производственная база и инфраструктура": "Proprietary Production Facilities & Infrastructure",
  "Производство шкафов управления 19 км (Самара)": "Control Cabinet Manufacturing 19 km (Samara)",
  "Сертифицированные ЭТЛ и лаборатории": "Certified Electrical Testing Labs",
  "Свой сервер и доверенный контур": "Dedicated Secure Server & Trusted Perimeter",
  "Пожизненный архив выполненных проектов": "Lifetime Archive of Executed Projects",

  // Vendors Section
  "Отечественный стек и технологические партнёры": "Domestic Technology Stack & Certified Partners",
  "Платформа «КАСКАД Цифра»: для систем с миллионами сигналов": "KASKAD Tsifra Platform: for systems with millions of signals",
  "От локальных HMI и SCADA до корпоративных MES и ERP. Единые диспетчерские, ситуационно-аналитические центры, базы данных реального времени (БДРВ). Соответствует требованиям Приказа ФСТЭК № 239, испытания пройдены без уязвимостей и недекларированных возможностей (НДВ). Работает на микро-ПК с Linux.":
    "From local HMI and SCADA to corporate MES and ERP. Unified control rooms, situational analytical centers, real-time databases (RTDB). Fully compliant with FSTEC Order No. 239, tested free of vulnerabilities and undocumented features. Runs reliably on Linux micro-PCs.",

  // Cooperation Section
  "Форматы сотрудничества для генподрядчиков и заказчиков": "Cooperation Formats for EPC Contractors and Clients",
  "Под ключ": "Turnkey EPC",
  "Субподряд на разделы АСУ ТП": "Subcontract for IACS / Automation Sections",
  "Шеф-монтаж и ПНР": "Supervision & Commissioning",
  "Сервисное обслуживание": "Maintenance & 24/7 SLA Support",

  // Process Section
  "Этапы реализации проектов: от ТЗ до сдачи в эксплуатацию": "Project Implementation Stages: From Specs to Handover",
  "Обследование и разработка ТЗ": "Site Survey & Specs Development",
  "Проектирование (стадии П и РД)": "Engineering Design (Concept & Working Docs)",
  "Производство шкафов и комплектация": "Cabinet Manufacturing & Procurement",
  "Разработка прикладного ПО": "Application Software Engineering",
  "Комплексные ПНР и сдача объекта": "Comprehensive Commissioning & Final Handover",

  // Lead Magnet Section
  "Скачайте типовой проект АСУ ТП": "Download Standard Automation Project Blueprint",
  "Чек-лист проверки готовности объекта к автоматизации и шаблон ТЗ": "Site automation readiness checklist & engineering spec template",

  // FAQ Section
  "Часто задаваемые вопросы": "Frequently Asked Questions",
  "Ответы на ключевые вопросы генподрядчиков и технических директоров": "Answers to key questions from EPC contractors and technical executives",

  // Contacts Section
  "Контакты и филиалы": "Contacts & Office Locations",
  "Свяжитесь с нами для консультации или отправьте ТЗ на предварительный расчет": "Contact our engineering team for consultation or submit project specs for initial estimate",
  "Имя": "Name",
  "Ваше имя": "Your Name",
  "Телефон": "Phone",
  "Ваш телефон": "Your Phone",
  "Комментарий к проекту": "Project notes",
  "Опишите задачу или прикрепите ТЗ": "Describe requirements or attach technical specs",

  // Modals
  "Сертификаты и лицензии": "Certificates & Licenses",
  "Кейсы и внедрения": "Case Studies & Implementations",
  "Реквизиты компании": "Company Requisites",
  "Выписка СРО на проектирование": "SRO Design & Engineering License",
  "Выписка СРО на строительство и ПНР": "SRO Construction & Commissioning License",
  "Сертификат соответствия шкафов управления": "Control Cabinet Compliance Certificate",
  "Аттестат электролаборатории (ЭТЛ)": "Electrical Testing Lab (ETL) Accreditation",
  "Лицензия ФСТЭК России": "FSTEC Russia Official License",
  "Партнёрский сертификат «Сибком Цифра» (КАСКАД)": "Sibkom Tsifra Partner Certificate (KASKAD)",
  "Партнёрский сертификат АО «ЭЛАРА»": "JSC ELARA Certified Partner Certificate",
  "Партнёрский сертификат АО «Экоресурс» (БАЗИС)": "JSC Ecoresource Partner Certificate (BASIS)",
  "Категория:": "Category:",
  "Орган:": "Issued by:",
  "Рег. номер:": "Reg. No.:",
  "Срок действия:": "Validity:",
  "Уровень:": "Authorization level:",
  "Лимит возмещения:": "Indemnity coverage:",
  "Описание:": "Description:",
  "Теги:": "Tags:",
  "Скачать выписку": "Download Certificate",
  "Копировать реквизиты": "Copy Requisites",
  "Полное наименование": "Full Legal Name",
  "Сокращенное наименование": "Short Name",
  "ИНН / КПП": "Tax ID / Registration Reason Code",
  "ОГРН": "Primary State Reg. Number",
  "Юридический адрес": "Legal Address",
  "Почтовый адрес": "Mailing Address",
  "Банк": "Bank",
  "Расчетный счет": "Settlement Account",
  "Корреспондентский счет": "Correspondent Account",
  "БИК": "BIC",
  "Генеральный директор": "General Director",

  // Cookie
  "Файлы cookie": "Cookie Notice",
  "Мы используем файлы cookie для корректной работы калькулятора, сохранения параметров конфигуратора и аналитики. Подробнее в": "We use cookies for calculator functionality, configurator settings, and analytics. Read more in",
  "Политике конфиденциальности": "Privacy Policy",
};

// Internal state
const originalTextMap = new WeakMap<Node, string>();
let currentLanguage: Language = "ru";
let observer: MutationObserver | null = null;
let googleTranslateInitialized = false;

// Helper: Translate single string
function translateText(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  const normalized = trimmed.replace(/\u00A0/g, " ");

  // 1. Direct match in dictionary
  if (UI_DICTIONARY[trimmed]) {
    return text.replace(trimmed, UI_DICTIONARY[trimmed]);
  }

  // 2. Normalized match
  for (const [key, value] of Object.entries(UI_DICTIONARY)) {
    if (key.replace(/\u00A0/g, " ") === normalized) {
      return text.replace(trimmed, value);
    }
  }

  // 3. Case-insensitive match
  const lowerNorm = normalized.toLowerCase();
  for (const [key, value] of Object.entries(UI_DICTIONARY)) {
    if (key.replace(/\u00A0/g, " ").toLowerCase() === lowerNorm) {
      return text.replace(trimmed, value);
    }
  }

  // 4. Try matching without trailing colon/dots/dashes
  const trailingPunctMatch = normalized.match(/^(.*?)([:\.\,\-\—\s]+)$/);
  if (trailingPunctMatch) {
    const base = trailingPunctMatch[1].trim();
    const punct = trailingPunctMatch[2];
    for (const [key, value] of Object.entries(UI_DICTIONARY)) {
      if (key.replace(/\u00A0/g, " ").toLowerCase() === base.toLowerCase()) {
        return text.replace(trimmed, value + punct);
      }
    }
  }

  // 5. Apply glossary replacements for remaining terms
  let result = text;
  for (const [regex, replacement] of GLOSSARY) {
    result = result.replace(regex, replacement);
  }

  return result;
}

// Walk through DOM nodes and apply translation
function walkAndTranslate(root: Node, lang: Language) {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = root.parentElement;
    if (
      !parent ||
      parent.tagName === "SCRIPT" ||
      parent.tagName === "STYLE" ||
      parent.tagName === "CODE" ||
      parent.closest(".notranslate")
    ) {
      return;
    }

    if (lang === "en") {
      if (!originalTextMap.has(root)) {
        originalTextMap.set(root, root.textContent || "");
      }
      const orig = originalTextMap.get(root) || "";
      if (orig.trim().length > 0) {
        root.textContent = translateText(orig);
      }
    } else {
      if (originalTextMap.has(root)) {
        root.textContent = originalTextMap.get(root) || "";
      }
    }
    return;
  }

  // Handle placeholders and titles
  if (root instanceof HTMLElement) {
    if (root.hasAttribute("placeholder")) {
      const origPh = root.getAttribute("data-orig-ph") || root.getAttribute("placeholder") || "";
      if (lang === "en") {
        if (!root.hasAttribute("data-orig-ph")) {
          root.setAttribute("data-orig-ph", origPh);
        }
        root.setAttribute("placeholder", translateText(origPh));
      } else if (root.hasAttribute("data-orig-ph")) {
        root.setAttribute("placeholder", root.getAttribute("data-orig-ph") || "");
      }
    }

    if (root.hasAttribute("title")) {
      const origTitle = root.getAttribute("data-orig-title") || root.getAttribute("title") || "";
      if (lang === "en") {
        if (!root.hasAttribute("data-orig-title")) {
          root.setAttribute("data-orig-title", origTitle);
        }
        root.setAttribute("title", translateText(origTitle));
      } else if (root.hasAttribute("data-orig-title")) {
        root.setAttribute("title", root.getAttribute("data-orig-title") || "");
      }
    }
  }

  // Recurse children
  for (let i = 0; i < root.childNodes.length; i++) {
    walkAndTranslate(root.childNodes[i], lang);
  }
}

// Background Google Translate Trigger (Fallback / deep translation)
function triggerGoogleTranslate(lang: Language) {
  if (typeof window === "undefined") return;

  try {
    if (lang === "ru") {
      // Clear Google Translate cookies so Russian original DOM is restored cleanly
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return;
    }

    // Set google translate cookie for English
    document.cookie = `googtrans=/ru/en; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/ru/en; path=/;`;

    // Try interacting with the Google Translate combo box if injected
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = "en";
      select.dispatchEvent(new Event("change"));
    }
  } catch {
    // Ignore silent fallback error
  }
}

// Initialize Google Translate Script in background once
function initGoogleTranslateScript() {
  if (typeof window === "undefined" || googleTranslateInitialized) return;
  googleTranslateInitialized = true;

  // Add hidden element if not present
  if (!document.getElementById("google_translate_element")) {
    const div = document.createElement("div");
    div.id = "google_translate_element";
    div.style.display = "none";
    document.body.appendChild(div);
  }

  // Define global init callback
  (window as unknown as { googleTranslateElementInit: () => void }).googleTranslateElementInit = () => {
    try {
      const gTranslate = (window as unknown as { google?: { translate?: { TranslateElement: new (opts: unknown, id: string) => void } } }).google?.translate;
      if (gTranslate?.TranslateElement) {
        new gTranslate.TranslateElement(
          {
            pageLanguage: "ru",
            includedLanguages: "en,ru",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    } catch {
      // safe fallback
    }
  };

  // Inject script
  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.head.appendChild(script);
}

// Public API
export function setLanguage(lang: Language) {
  if (typeof window === "undefined") return;
  const prevLang = currentLanguage;
  currentLanguage = lang;
  localStorage.setItem("preferred-lang", lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // When returning from English to Russian, Google Translate has mutated DOM nodes
  // (wrapping text in <font> tags). Clear cookies and reload to restore exact original Russian text.
  if (lang === "ru") {
    const wasTranslated =
      prevLang === "en" ||
      document.documentElement.classList.contains("translated-ltr") ||
      document.documentElement.classList.contains("translated-rtl") ||
      document.cookie.includes("googtrans=/ru/en");

    triggerGoogleTranslate("ru");

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (wasTranslated) {
      window.location.reload();
      return;
    }
  }

  // Apply dictionary & glossary to DOM
  walkAndTranslate(document.body, lang);

  // Also trigger Google Translate for remaining deep text
  triggerGoogleTranslate(lang);

  // Setup / dismantle observer for dynamic content (modals, tabs, etc.)
  if (lang === "en") {
    if (!observer) {
      observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          m.addedNodes.forEach((node) => {
            walkAndTranslate(node, "en");
          });
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  } else {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // Dispatch event for reactive UI
  window.dispatchEvent(
    new CustomEvent("language-changed", { detail: { lang } })
  );
}

export function toggleLanguage(): Language {
  const nextLang: Language = currentLanguage === "ru" ? "en" : "ru";
  setLanguage(nextLang);
  return nextLang;
}

export function getLanguage(): Language {
  return currentLanguage;
}

// React Hook
export function useLanguage() {
  const [lang, setLang] = useState<Language>("ru");

  useEffect(() => {
    // Check saved preference on mount
    const saved = (localStorage.getItem("preferred-lang") as Language) || "ru";
    setLang(saved);
    currentLanguage = saved;

    if (saved === "en") {
      setLanguage("en");
    }

    // Lazy load background Google Translate script
    initGoogleTranslateScript();

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: Language }>;
      if (customEvent.detail?.lang) {
        setLang(customEvent.detail.lang);
      }
    };

    window.addEventListener("language-changed", handleLangChange);
    return () => {
      window.removeEventListener("language-changed", handleLangChange);
    };
  }, []);

  return {
    lang,
    isEnglish: lang === "en",
    setLanguage,
    toggleLanguage,
  };
}
