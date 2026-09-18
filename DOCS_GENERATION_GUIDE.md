# Инженерные материалы ACEngine: Инструкция по созданию и внесению правок

Данный документ описывает структуру, логику генерации и правила внесения правок в комплект документов ACEngine:
1. **Опросный лист подбора шкафов управления (ШУ/ША)** — формат `.xlsx` (Excel).
2. **Чек-лист инженерного аудита принципиальных электрических схем Э3** — формат `.docx` (Word).
3. **Чек-лист аудита схем Э3 (Печатная / экспертная версия)** — формат `.pdf` (Векторный PDF).
4. **Единый ZIP-комплект материалов** — формат `.zip`.

Все итоговые файлы размещены в директории `public/docs/` и доступны для прямого скачивания пользователями с сайта лендинга.

---

## 1. Расположение исходников и сгенерированных файлов

| Назначение | Путь к файлу | Описание |
|---|---|---|
| **Главный скрипт генерации** | [`scripts/generate_docs.py`](file:///Users/ilahajmin/Documents/acengine/scripts/generate_docs.py) | Единый консолидированный генератор всех 4 материалов |
| **Excel опросник** | [`public/docs/oprosnyj-list-shu-acengine.xlsx`](file:///Users/ilahajmin/Documents/acengine/public/docs/oprosnyj-list-shu-acengine.xlsx) | Таблица параметров, сигналов I/O и вендоров с авторасчетом |
| **Word чек-лист** | [`public/docs/chek-list-audit-skhem-e3-acengine.docx`](file:///Users/ilahajmin/Documents/acengine/public/docs/chek-list-audit-skhem-e3-acengine.docx) | Редактируемый бланк аудита схем Э3 для заполнения инженером |
| **PDF чек-лист** | [`public/docs/chek-list-audit-skhem-e3-acengine.pdf`](file:///Users/ilahajmin/Documents/acengine/public/docs/chek-list-audit-skhem-e3-acengine.pdf) | Векторный брендовый PDF для печати или отправки заказчику |
| **ZIP-бандл** | [`public/docs/materialy-acengine-oprosnik-i-chek-list.zip`](file:///Users/ilahajmin/Documents/acengine/public/docs/materialy-acengine-oprosnik-i-chek-list.zip) | Архив всех трех документов для скачивания «в один клик» |

---

## 2. Как устроена генерация (Стек и Архитектура)

Документы спроектированы в строгом промышленном дизайне ACEngine (темно-графитовая гамма `#212529`, акценты `#343A40`, чистая шрифтовая сетка Arial/Inter, нормативная база ГОСТ 21.408-2013 и ПУЭ 7).

### А. Таблица Excel (`.xlsx`)
- **Библиотека**: `openpyxl` (Python).
- **Особенности**:
  - Полностью программная сборка структуры рабочей книги: шапка бренда, блок паспорта объекта, таблица сигналов, блок требований к оборудованию, гарантийный подвал.
  - **Динамические формулы Excel**:
    - Колонка «Резерв 20%»: `=ROUNDUP(E{row}*0.2, 0)` (округление вверх до целого).
    - Колонка «Итого точек»: `=E{row}+F{row}`.
    - Итоговая строка: `=SUM(E...:E...)`, `=SUM(F...:F...)`, `=SUM(G...:G...)`.
  - Условное цветовое кодирование: контуры ПАЗ подсвечиваются акцентным рубиновым цветом (`#C92A2A`).

### Б. Документ Word (`.docx`)
- **Библиотека**: `python-docx` (Python) с низкоуровневым XML-манипулированием ячеек (`parse_xml`).
- **Особенности**:
  - Точные отступы страниц (0.6" / 15 мм) и ячеек таблиц.
  - Стилевое оформление заголовков и фона ячеек (`#212529`, `#E9ECEF`, `#F8F9FA`).
  - Поля подписей экспертов ACEngine и ГИПа Заказчика с местом для печати (М.П.).

### В. Печатный PDF (`.pdf`)
- **Метод**: Headless Google Chrome (`--print-to-pdf`).
- **Почему не прямая конвертация из Word**:
  - Headless Chrome с кастомным HTML/CSS дает 100% пиксельную точность, идеальные векторные шрифты без размытия, контролируемые разрывы страниц (`page-break-inside: avoid`), идентичное отображение на любых операционных системах и исключает типовые баги офисных PDF-принтеров.

### Г. ZIP-архив (`.zip`)
- **Метод**: Встроенный модуль `zipfile` в Python с компрессией `ZIP_DEFLATED`.
- Файлы внутри архива упаковываются с понятными русскоязычными именами:
  - `Опросный_лист_подбора_ШУ_ACEngine.xlsx`
  - `Чек-лист_аудита_схем_Э3_ACEngine.pdf`
  - `Чек-лист_аудита_схем_Э3_ACEngine.docx`

---

## 3. Быстрый запуск и команды

Все зависимости уже установлены в локальном окружении. Если скрипт запускается на новой машине:
```bash
pip install openpyxl python-docx
```

### Команды перегенерации:

1. **Сгенерировать всё заново (Excel + Word + PDF + ZIP)**:
   ```bash
   npm run generate-docs
   ```
   или напрямую через Python:
   ```bash
   python3 scripts/generate_docs.py
   ```

2. **Обновить только конкретный документ**:
   ```bash
   # Только Excel
   python3 scripts/generate_docs.py --excel

   # Только Word
   python3 scripts/generate_docs.py --docx

   # Только PDF
   python3 scripts/generate_docs.py --pdf

   # Только перепаковать архив ZIP (например, после ручных правок файлов в Office)
   python3 scripts/generate_docs.py --zip
   ```

---

## 4. Пошаговые сценарии правок (How-To)

Все основные данные вынесены в начало файла [`scripts/generate_docs.py`](file:///Users/ilahajmin/Documents/acengine/scripts/generate_docs.py) в виде чистых структур Python. Вносить изменения очень просто даже без глубоких знаний языка.

### Сценарий 1. Изменить сигналы или добавить новые строки в Excel
Откройте [`scripts/generate_docs.py`](file:///Users/ilahajmin/Documents/acengine/scripts/generate_docs.py) и найдите список `EXCEL_IO_SIGNALS`:
```python
EXCEL_IO_SIGNALS = [
    (1, "Давление прямой сетевой воды на выходе котельной", "AI", "4-20 мА (ОВЕН ПД100)", 2, True),
    # Чтобы добавить новый сигнал, просто добавьте строку:
    (14, "Расход сетевой воды на подпитку", "AI", "Электромагнитный расходомер (4-20 мА)", 1, False),
]
```
> **Важно:** Скрипт сам автоматически пересчитает строки таблицы, обновит диапазон формул `=SUM(E...:E...)` и итоговое количество сигналов. Ничего вручную высчитывать не нужно!

После правки выполните:
```bash
python3 scripts/generate_docs.py --excel
```

---

### Сценарий 2. Изменить или добавить критерии аудита в Чек-лист (Word и PDF)
Оба документа (Word и PDF) используют **общую структуру данных** `CHECKLIST_SECTIONS` в [`scripts/generate_docs.py`](file:///Users/ilahajmin/Documents/acengine/scripts/generate_docs.py):

```python
CHECKLIST_SECTIONS = [
    {
        "title": "1. СИЛОВАЯ ЧАСТЬ И ЭЛЕКТРОСНАБЖЕНИЕ 0.4 кВ / 230 В",
        "items": [
            ("1.1", "Селективность защитных автоматов ввода...", "КЭАЗ OptiMat / DKC"),
            # Добавление нового пункта:
            ("1.6", "Проверка фазировки и чередования фаз на вводных клеммах.", "ПУЭ п. 1.5.34"),
        ]
    },
    # Можно добавить целый новый раздел, например по частотникам:
    {
        "title": "5. ЧАСТОТНО-РЕГУЛИРУЕМЫЙ ЭЛЕКТРОПРИВОД (ПЧ)",
        "items": [
            ("5.1", "Установка моторных дросселей при длине кабельной трассы к двигателю > 50 м.", "Мануал Veda MC"),
            ("5.2", "Применение экранированного кабеля для подключения электродвигателя с заземлением экрана на 360°.", "ГОСТ 30804"),
        ]
    }
]
```

Поскольку структура единая, одно изменение в `CHECKLIST_SECTIONS` автоматически обновит **и Word, и PDF** синхронно:
```bash
npm run generate-docs
```

---

### Сценарий 3. Смена контактных данных, адреса, реквизитов или Telegram
В начале [`scripts/generate_docs.py`](file:///Users/ilahajmin/Documents/acengine/scripts/generate_docs.py) отредактируйте переменные:
```python
COMPANY_NAME = "ACEngine"
COMPANY_SUBTITLE = "Инжиниринговый центр АСУ ТП • Производство шкафов управления в Москве"
COMPANY_CONTACTS = "info@acengine.ru • +7 (900) 123-45-67 • Москва, ул. Промышленная, д. 12"
TELEGRAM_CONTACT = "@acengine"
```
Затем запустите:
```bash
npm run generate-docs
```

---

### Сценарий 4. Ручные правки напрямую в Microsoft Office / LibreOffice (без запуска Python)
Если инженер или менеджер предпочитает вносить правки в стандартных офисных программах:
1. Откройте файл напрямую:
   - `public/docs/oprosnyj-list-shu-acengine.xlsx` в Microsoft Excel
   - `public/docs/chek-list-audit-skhem-e3-acengine.docx` в Microsoft Word
2. Внесите необходимые изменения в текст или формулы.
3. Сохраните файл в той же папке `public/docs/`.
4. Если редактировался Word и нужно обновить PDF:
   - Экспортируйте PDF из Word (`Файл -> Сохранить как -> PDF`) и сохраните с именем `chek-list-audit-skhem-e3-acengine.pdf`.
5. Перепакуйте ZIP-архив одной командой:
   ```bash
   python3 scripts/generate_docs.py --zip
   ```

---

## 5. Где эти файлы подключены на сайте

Файлы раздаются как статические ресурсы из папки `public/docs/` Next.js:
- **Модальное окно скачивания комплекта**: [`src/components/MaterialsDownloadModal.tsx`](file:///Users/ilahajmin/Documents/acengine/src/components/MaterialsDownloadModal.tsx)
  - Ссылка на общий архив: `/docs/materialy-acengine-oprosnik-i-chek-list.zip`
- **Секция аудита принципиальных схем Э3**: [`src/components/CircuitAuditSection.tsx`](file:///Users/ilahajmin/Documents/acengine/src/components/CircuitAuditSection.tsx)
  - Ссылка на Word: `/docs/chek-list-audit-skhem-e3-acengine.docx`
  - Ссылка на PDF: `/docs/chek-list-audit-skhem-e3-acengine.pdf`
- **Калькулятор / Подбор оборудования**:
  - Ссылка на Excel: `/docs/oprosnyj-list-shu-acengine.xlsx`

При обновлении файлов в папке `public/docs/` сайт сразу отдает пользователям свежие версии без необходимости пересборки всего Next.js проекта.
