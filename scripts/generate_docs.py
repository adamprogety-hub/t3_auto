#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ACEngine — Генератор инженерных материалов (Excel, Word, PDF, ZIP)
Скрипт автоматизированного создания и обновления:
1. public/docs/oprosnyj-list-shu-acengine.xlsx — Опросный лист подбора ШУ/ША
2. public/docs/chek-list-audit-skhem-e3-acengine.docx — Чек-лист аудита схем Э3
3. public/docs/chek-list-audit-skhem-e3-acengine.pdf — Векторный печатный PDF
4. public/docs/materialy-acengine-oprosnik-i-chek-list.zip — Единый ZIP-комплект

Использование:
    python3 scripts/generate_docs.py          # Сгенерировать всё
    python3 scripts/generate_docs.py --excel   # Только Excel
    python3 scripts/generate_docs.py --docx    # Только Word
    python3 scripts/generate_docs.py --pdf     # Только PDF
    python3 scripts/generate_docs.py --zip     # Только перепаковать ZIP
"""

import sys
import os
import shutil
import subprocess
import zipfile
import argparse

# Определение путей относительно корня проекта
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(BASE_DIR, "public", "docs")
SCRATCH_DIR = os.path.join(BASE_DIR, "scratch")

os.makedirs(DOCS_DIR, exist_ok=True)
os.makedirs(SCRATCH_DIR, exist_ok=True)

XLSX_PATH = os.path.join(DOCS_DIR, "oprosnyj-list-shu-acengine.xlsx")
DOCX_PATH = os.path.join(DOCS_DIR, "chek-list-audit-skhem-e3-acengine.docx")
PDF_PATH = os.path.join(DOCS_DIR, "chek-list-audit-skhem-e3-acengine.pdf")
ZIP_PATH = os.path.join(DOCS_DIR, "materialy-acengine-oprosnik-i-chek-list.zip")
HTML_TEMP_PATH = os.path.join(SCRATCH_DIR, "checklist_temp.html")

# ==============================================================================
# КОНФИГУРАЦИЯ БРЕНДА И КОНТАКТОВ
# ==============================================================================
COMPANY_NAME = "ACEngine"
COMPANY_SUBTITLE = "Инжиниринговый центр АСУ ТП • Производство шкафов управления в Москве"
COMPANY_CONTACTS = "info@acengine.ru • +7 (900) 123-45-67 • Москва, ул. Промышленная, д. 12"
TELEGRAM_CONTACT = "@acengine"

# Фирменная палитра ACEngine
COLOR_CARBON = "212529"     # Основной темно-графитовый цвет
COLOR_GUNMETAL = "343A40"   # Цвет подзаголовков и плашек
COLOR_STEEL = "495057"      # Вторичный текст и рамки
COLOR_LIGHT_BG = "F8F9FA"   # Чередование строк (зебра)
COLOR_WARM_BG = "E9ECEF"    # Заголовки таблиц
COLOR_BORDER = "ADB5BD"     # Тонкие границы ячеек

# ==============================================================================
# ДАННЫЕ ДЛЯ ОПРОСНОГО ЛИСТА (EXCEL)
# ==============================================================================
EXCEL_PASSPORT = [
    ("Организация Заказчика:", "ООО «ТехноПромТепло»", "Дата заполнения:", "18.09.2026"),
    ("Наименование объекта:", "Котельная 8.5 МВт, технологическая линия ВЗУ", "Город / Регион:", "г. Казань / РФ"),
    ("Контактное лицо (ГИП/КИПиА):", "Смирнов Алексей Викторович", "Телефон / E-mail:", "+7 (917) 000-00-00 / a.smirnov@mail.ru"),
    ("Категория надежности питания:", "I категория (АВР на 2 ввода)", "Напряжение питания:", "380В / 50 Гц (3L + N + PE)"),
    ("Степень защиты шкафа:", "IP54 (DKC RAM block, порошковая окраска)", "Среда эксплуатации:", "Отапливаемое помещение (+5...+40 °C)"),
]

EXCEL_IO_SIGNALS = [
    (1, "Давление прямой сетевой воды на выходе котельной", "AI", "4-20 мА (ОВЕН ПД100)", 2, True),
    (2, "Давление обратной сетевой воды на входе в котельную", "AI", "4-20 мА (ОВЕН ПД100)", 2, False),
    (3, "Температура прямой / обратной воды котловых контуров", "AI", "Pt100 (термосопротивление)", 6, False),
    (4, "Температура уходящих дымовых газов за котлами", "AI", "ДТС термопара ХА(К)", 3, True),
    (5, "Уровень воды в баке-аккумуляторе ХВО / подпитки", "AI", "4-20 мА гидростатический", 2, False),
    (6, "Сигнал аварийной загазованности CO / Метан CH4", "DI", "Сухой контакт (Н.О. / Н.З.)", 4, True),
    (7, "Состояние сетевых насосов: Работа / Авария ПЧ", "DI", "Сухой контакт ПЧ Veda MC", 6, False),
    (8, "Перепад давления на сетевых фильтрах (засор)", "DI", "Реле перепада давления", 2, False),
    (9, "Аварийный сброс / Закрытие отсечного клапана ПАЗ", "DO", "Катушка 230В / релейный вых.", 2, True),
    (10, "Каскадное включение котлов и ступеней горелок", "DO", "Сухой контакт (пром. реле)", 6, False),
    (11, "Управление насосами подпитки (Пуск / Стоп)", "DO", "Пускатель КЭАЗ / реле", 4, False),
    (12, "Задание частоты сетевых насосов (0-50 Гц)", "AO", "0-10В / 4-20 мА (на ПЧ)", 3, False),
    (13, "Управление трехходовым смесительным клапаном ГВС", "AO", "4-20 мА аналоговый привод", 2, False),
]

EXCEL_HW_SPECS = [
    ("Базовый контроллер (ПЛК):", "ОВЕН (ПЛК210 / ПР205)", "Языки программирования:", "IEC 61131-3 (ST, CFC, FBD) в CoDeSys v3.5"),
    ("Панель оператора (HMI):", "Weintek cMT3072XH (7\", сенсорная)", "Права на исходный код:", "100% открытые исходники без сервисных паролей"),
    ("Частотные приводы (ПЧ):", "Veda MC (VedaDrive / VF-51)", "Диспетчеризация (SCADA):", "MasterSCADA 4D / Web-интерфейс / OPC UA"),
    ("Корпус и коммутация:", "DKC RAM block (IP54), клеммы Push-In", "Силовые автоматы:", "КЭАЗ OptiMat / DEKraft с термомагнитным расцепителем"),
]

# ==============================================================================
# ДАННЫЕ ДЛЯ ЧЕК-ЛИСТА АУДИТА Э3 (WORD И PDF)
# ==============================================================================
CHECKLIST_SECTIONS = [
    {
        "title": "1. СИЛОВАЯ ЧАСТЬ И ЭЛЕКТРОСНАБЖЕНИЕ 0.4 кВ / 230 В",
        "items": [
            ("1.1", "Селективность защитных автоматов ввода и отходящих линий (времятоковые характеристики B/C/D).", "КЭАЗ OptiMat / DKC"),
            ("1.2", "Расчет токов короткого замыкания (КЗ) и проверка отключающей способности (не менее 6-10 кА).", "ГОСТ Р 50345"),
            ("1.3", "Наличие защиты от импульсных коммутационных перенапряжений (УЗИП класс I+II на силовом вводе).", "ПУЭ п. 7.1.22"),
            ("1.4", "Проверка сечений силовых шин и фазных кабелей по длительно допустимому току и падению напряжения (< 3%).", "ПУЭ табл. 1.3.4"),
            ("1.5", "Разделение шин N (нейтраль) и PE (земля) согласно системе TN-C-S / TN-S. Сечение главной шины PE.", "ПУЭ гл. 1.7"),
        ]
    },
    {
        "title": "2. ЦЕПИ УПРАВЛЕНИЯ, ПЛК И ВТОРИЧНАЯ КОММУТАЦИЯ 24 В DC",
        "items": [
            ("2.1", "Гальваническая развязка питания контроллера ПЛК и цепей полевых аналоговых/дискретных датчиков.", "ОВЕН / Segnetics"),
            ("2.2", "Физическое пространственное разделение трасс 400В и слаботочных сигналов 4-20мА/RS-485 (защита от помех).", "ГОСТ 30804 (ЭМС)"),
            ("2.3", "Защита дискретных выходов ПЛК промежуточными реле с защитными диодными RC-модулями от индуктивных выбросов.", "WAGO / Меандр"),
            ("2.4", "Резерв мощности импульсных блоков питания 24В DC не менее 30% от максимального пикового потребления шкафа.", "ПТЭЭП"),
            ("2.5", "Наличие терминальных согласующих резисторов 120 Ом на оконечных устройствах шины RS-485 Modbus.", "Стандарт EIA-485"),
        ]
    },
    {
        "title": "3. КОНТУРЫ БЕЗОПАСНОСТИ, ПРОТИВОАВАРИЙНАЯ ЗАЩИТА (ПАЗ) И ГАЗОАНАЛИЗ",
        "items": [
            ("3.1", "Аппаратная независимость кнопки аварийного останова (E-Stop): прямое обесточивание катушек без зависания софта ПЛК.", "ГОСТ Р МЭК 60204"),
            ("3.2", "Система газоанализа (CO, CH4): прямое размыкание цепи электромагнитного клапана-отсекателя газа при превышении ПДК.", "ФНП Ростехнадзор"),
            ("3.3", "Защита насосного оборудования от сухого хода по механическому реле давления прямого действия.", "СП 89.13330"),
            ("3.4", "Контроль питающих фаз и защита электродвигателей от перекоса фаз, асимметрии и перегрева (РКФ + термореле).", "ПУЭ"),
        ]
    },
    {
        "title": "4. КАБЕЛЬНЫЙ ЖУРНАЛ, МАРКИРОВКА И КЛЕММНОЕ ХОЗЯЙСТВО",
        "items": [
            ("4.1", "Сквозная однозначная маркировка всех проводников и клемм по ГОСТ 2.709 и EPLAN (термотрансферная печать).", "ГОСТ 2.709"),
            ("4.2", "Спецификация клеммников с четким разделением уровней потенциалов, изолирующими перегородками и торцевыми крышками.", "DKC / WAGO"),
            ("4.3", "Наличие резервных клемм и жил в контрольных и межшкафных кабелях (не менее 15-20% технологического запаса).", "ГОСТ 21.408"),
        ]
    }
]


# ==============================================================================
# 1. ГЕНЕРАЦИЯ EXCEL (.xlsx)
# ==============================================================================
def generate_excel():
    try:
        from openpyxl import Workbook
        from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    except ImportError:
        print("Ошибка: openpyxl не установлен. Выполните: pip install openpyxl")
        sys.exit(1)

    wb = Workbook()
    ws = wb.active
    ws.title = "Опросный лист ШУ"
    ws.views.sheetView[0].showGridLines = True

    font_title = Font(name="Arial", size=15, bold=True, color="FFFFFF")
    font_subtitle = Font(name="Arial", size=10, italic=True, color="CED4DA")
    font_sec_hdr = Font(name="Arial", size=11, bold=True, color="FFFFFF")
    font_tbl_hdr = Font(name="Arial", size=10, bold=True, color=COLOR_CARBON)
    font_data = Font(name="Arial", size=10, color=COLOR_CARBON)
    font_data_bold = Font(name="Arial", size=10, bold=True, color=COLOR_CARBON)
    font_total = Font(name="Arial", size=11, bold=True, color="FFFFFF")

    fill_brand_dark = PatternFill(start_color=COLOR_CARBON, end_color=COLOR_CARBON, fill_type="solid")
    fill_sec_hdr = PatternFill(start_color=COLOR_GUNMETAL, end_color=COLOR_GUNMETAL, fill_type="solid")
    fill_tbl_hdr = PatternFill(start_color=COLOR_WARM_BG, end_color=COLOR_WARM_BG, fill_type="solid")
    fill_zebra = PatternFill(start_color=COLOR_LIGHT_BG, end_color=COLOR_LIGHT_BG, fill_type="solid")
    fill_total = PatternFill(start_color=COLOR_CARBON, end_color=COLOR_CARBON, fill_type="solid")
    fill_input = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

    thin_border = Border(
        left=Side(style="thin", color=COLOR_BORDER),
        right=Side(style="thin", color=COLOR_BORDER),
        top=Side(style="thin", color=COLOR_BORDER),
        bottom=Side(style="thin", color=COLOR_BORDER),
    )
    thick_bottom = Border(
        left=Side(style="thin", color=COLOR_BORDER),
        right=Side(style="thin", color=COLOR_BORDER),
        top=Side(style="thin", color=COLOR_BORDER),
        bottom=Side(style="medium", color=COLOR_CARBON),
    )
    double_bottom = Border(
        left=Side(style="thin", color=COLOR_BORDER),
        right=Side(style="thin", color=COLOR_BORDER),
        top=Side(style="thin", color=COLOR_BORDER),
        bottom=Side(style="double", color="FFFFFF"),
    )

    # 1. Шапка бренда
    ws.merge_cells("A1:H1")
    ws["A1"] = f"{COMPANY_NAME} — ОПРОСНЫЙ ЛИСТ ПОДБОРА ШКАФА УПРАВЛЕНИЯ (ШУ / ША)"
    ws["A1"].font = font_title
    ws["A1"].fill = fill_brand_dark
    ws["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 36

    ws.merge_cells("A2:H2")
    ws["A2"] = f"{COMPANY_SUBTITLE} • {COMPANY_CONTACTS}"
    ws["A2"].font = font_subtitle
    ws["A2"].fill = fill_brand_dark
    ws["A2"].alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[2].height = 22

    ws.row_dimensions[3].height = 10  # Разделитель

    # 2. Раздел 1: Паспортные данные
    ws.merge_cells("A4:H4")
    ws["A4"] = "1. ОБЩИЕ СВЕДЕНИЯ ОБ ОБЪЕКТЕ И ЗАКАЗЧИКЕ"
    ws["A4"].font = font_sec_hdr
    ws["A4"].fill = fill_sec_hdr
    ws["A4"].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws.row_dimensions[4].height = 24

    curr_row = 5
    for row_data in EXCEL_PASSPORT:
        ws.row_dimensions[curr_row].height = 20
        # Метка 1
        ws.merge_cells(start_row=curr_row, start_column=1, end_row=curr_row, end_column=2)
        c1 = ws.cell(row=curr_row, column=1, value=row_data[0])
        c1.font = font_data_bold
        c1.alignment = Alignment(vertical="center", indent=1)

        # Значение 1
        ws.merge_cells(start_row=curr_row, start_column=3, end_row=curr_row, end_column=5)
        c2 = ws.cell(row=curr_row, column=3, value=row_data[1])
        c2.font = font_data
        c2.alignment = Alignment(vertical="center", indent=1)

        # Метка 2
        c3 = ws.cell(row=curr_row, column=6, value=row_data[2])
        c3.font = font_data_bold
        c3.alignment = Alignment(vertical="center", indent=1)

        # Значение 2
        ws.merge_cells(start_row=curr_row, start_column=7, end_row=curr_row, end_column=8)
        c4 = ws.cell(row=curr_row, column=7, value=row_data[3])
        c4.font = font_data
        c4.alignment = Alignment(vertical="center", indent=1)

        for col in range(1, 9):
            ws.cell(row=curr_row, column=col).border = thin_border

        curr_row += 1

    curr_row += 1
    ws.row_dimensions[curr_row].height = 10

    # 3. Раздел 2: Таблица I/O
    curr_row += 1
    ws.merge_cells(start_row=curr_row, start_column=1, end_row=curr_row, end_column=8)
    ws.cell(row=curr_row, column=1, value="2. СПЕЦИФИКАЦИЯ СИГНАЛОВ ВВОДА / ВЫВОДА (ТАБЛИЦА I/O)").font = font_sec_hdr
    ws.cell(row=curr_row, column=1).fill = fill_sec_hdr
    ws.cell(row=curr_row, column=1).alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws.row_dimensions[curr_row].height = 24

    curr_row += 1
    table_headers = [
        "№", "Технологический параметр / контур", "Тип сигнала", "Физический датчик / уровень",
        "Кол-во точек", "Резерв 20%", "Итого точек", "Контур безопасности (ПАЗ)"
    ]
    ws.row_dimensions[curr_row].height = 26
    for col_idx, text in enumerate(table_headers, start=1):
        cell = ws.cell(row=curr_row, column=col_idx, value=text)
        cell.font = font_tbl_hdr
        cell.fill = fill_tbl_hdr
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = thick_bottom

    start_io_row = curr_row + 1
    for item in EXCEL_IO_SIGNALS:
        curr_row += 1
        num, name, sig_type, sensor, qty, is_paz = item
        ws.row_dimensions[curr_row].height = 20
        is_even = (num % 2 == 0)
        row_fill = fill_zebra if is_even else fill_input

        c_num = ws.cell(row=curr_row, column=1, value=num)
        c_num.alignment = Alignment(horizontal="center", vertical="center")
        
        c_name = ws.cell(row=curr_row, column=2, value=name)
        c_name.alignment = Alignment(horizontal="left", vertical="center", indent=1)
        
        c_type = ws.cell(row=curr_row, column=3, value=sig_type)
        c_type.alignment = Alignment(horizontal="center", vertical="center")
        c_type.font = font_data_bold
        
        c_sensor = ws.cell(row=curr_row, column=4, value=sensor)
        c_sensor.alignment = Alignment(horizontal="left", vertical="center", indent=1)
        
        c_qty = ws.cell(row=curr_row, column=5, value=qty)
        c_qty.alignment = Alignment(horizontal="center", vertical="center")
        
        # Динамические формулы Excel
        c_res = ws.cell(row=curr_row, column=6, value=f"=ROUNDUP(E{curr_row}*0.2, 0)")
        c_res.alignment = Alignment(horizontal="center", vertical="center")
        
        c_tot = ws.cell(row=curr_row, column=7, value=f"=E{curr_row}+F{curr_row}")
        c_tot.alignment = Alignment(horizontal="center", vertical="center")
        c_tot.font = font_data_bold

        c_paz = ws.cell(row=curr_row, column=8, value="ДА (Контур ПАЗ)" if is_paz else "Нет")
        c_paz.alignment = Alignment(horizontal="center", vertical="center")
        if is_paz:
            c_paz.font = Font(name="Arial", size=10, bold=True, color="C92A2A")

        for col in range(1, 9):
            cell = ws.cell(row=curr_row, column=col)
            cell.border = thin_border
            if not is_paz or col != 8:
                cell.fill = row_fill
            if col == 3 or col == 7:
                cell.font = font_data_bold
            elif col == 8 and is_paz:
                pass
            else:
                cell.font = font_data

    end_io_row = curr_row

    # Итоговая строка с SUM()
    curr_row += 1
    ws.row_dimensions[curr_row].height = 24
    ws.merge_cells(start_row=curr_row, start_column=1, end_row=curr_row, end_column=4)
    tot_label = ws.cell(row=curr_row, column=1, value="ИТОГО СИГНАЛОВ ПО ОБЪЕКТУ:")
    tot_label.font = font_total
    tot_label.fill = fill_total
    tot_label.alignment = Alignment(horizontal="right", vertical="center", indent=1)

    tot_qty = ws.cell(row=curr_row, column=5, value=f"=SUM(E{start_io_row}:E{end_io_row})")
    tot_qty.font = font_total
    tot_qty.fill = fill_total
    tot_qty.alignment = Alignment(horizontal="center", vertical="center")

    tot_res = ws.cell(row=curr_row, column=6, value=f"=SUM(F{start_io_row}:F{end_io_row})")
    tot_res.font = font_total
    tot_res.fill = fill_total
    tot_res.alignment = Alignment(horizontal="center", vertical="center")

    tot_all = ws.cell(row=curr_row, column=7, value=f"=SUM(G{start_io_row}:G{end_io_row})")
    tot_all.font = font_total
    tot_all.fill = fill_total
    tot_all.alignment = Alignment(horizontal="center", vertical="center")

    tot_empty = ws.cell(row=curr_row, column=8, value="")
    tot_empty.fill = fill_total

    for col in range(1, 9):
        ws.cell(row=curr_row, column=col).border = double_bottom

    curr_row += 1
    ws.row_dimensions[curr_row].height = 10

    # 4. Раздел 3: Требования к оборудованию
    curr_row += 1
    ws.merge_cells(start_row=curr_row, start_column=1, end_row=curr_row, end_column=8)
    ws.cell(row=curr_row, column=1, value="3. ТРЕБОВАНИЯ К АППАРАТНОЙ ПЛАТФОРМЕ И SCADA").font = font_sec_hdr
    ws.cell(row=curr_row, column=1).fill = fill_sec_hdr
    ws.cell(row=curr_row, column=1).alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws.row_dimensions[curr_row].height = 24

    for item in EXCEL_HW_SPECS:
        curr_row += 1
        ws.row_dimensions[curr_row].height = 20
        ws.merge_cells(start_row=curr_row, start_column=1, end_row=curr_row, end_column=2)
        c1 = ws.cell(row=curr_row, column=1, value=item[0])
        c1.font = font_data_bold
        c1.alignment = Alignment(vertical="center", indent=1)

        ws.merge_cells(start_row=curr_row, start_column=3, end_row=curr_row, end_column=4)
        c2 = ws.cell(row=curr_row, column=3, value=item[1])
        c2.font = font_data
        c2.alignment = Alignment(vertical="center", indent=1)

        ws.merge_cells(start_row=curr_row, start_column=5, end_row=curr_row, end_column=6)
        c3 = ws.cell(row=curr_row, column=5, value=item[2])
        c3.font = font_data_bold
        c3.alignment = Alignment(vertical="center", indent=1)

        ws.merge_cells(start_row=curr_row, start_column=7, end_row=curr_row, end_column=8)
        c4 = ws.cell(row=curr_row, column=7, value=item[3])
        c4.font = font_data
        c4.alignment = Alignment(vertical="center", indent=1)

        for col in range(1, 9):
            ws.cell(row=curr_row, column=col).border = thin_border

    curr_row += 1
    ws.row_dimensions[curr_row].height = 10

    # 5. Раздел 4: Контакты и подвал
    curr_row += 1
    ws.merge_cells(start_row=curr_row, start_column=1, end_row=curr_row, end_column=8)
    footer_text = (
        f"Заполненный опросный лист отправьте на info@acengine.ru или в Telegram {TELEGRAM_CONTACT}.\n"
        "Инженерный отдел ACEngine подготовит принципиальную схему Э3 и точный расчет стоимости ШУ в течение 24 часов."
    )
    f_cell = ws.cell(row=curr_row, column=1, value=footer_text)
    f_cell.font = font_data_bold
    f_cell.fill = fill_tbl_hdr
    f_cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws.row_dimensions[curr_row].height = 40
    for col in range(1, 9):
        ws.cell(row=curr_row, column=col).border = thin_border

    # Ширина колонок
    col_widths = {"A": 6, "B": 44, "C": 14, "D": 32, "E": 14, "F": 14, "G": 14, "H": 26}
    for col_letter, width in col_widths.items():
        ws.column_dimensions[col_letter].width = width

    wb.save(XLSX_PATH)
    print(f"[OK] Excel создан: {XLSX_PATH} ({os.path.getsize(XLSX_PATH)} байт)")


# ==============================================================================
# 2. ГЕНЕРАЦИЯ WORD (.docx)
# ==============================================================================
def generate_docx():
    try:
        from docx import Document
        from docx.shared import Inches, Pt, RGBColor
        from docx.enum.text import WD_ALIGN_PARAGRAPH
        from docx.enum.table import WD_TABLE_ALIGNMENT
        from docx.oxml import parse_xml
        from docx.oxml.ns import nsdecls
    except ImportError:
        print("Ошибка: python-docx не установлен. Выполните: pip install python-docx")
        sys.exit(1)

    def set_cell_background(cell, fill_hex):
        tcPr = cell._tc.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        tcPr.append(shd)

    def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = parse_xml(
            f'<w:tcMar {nsdecls("w")}>'
            f'<w:top w:w="{top}" w:type="dxa"/>'
            f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
            f'<w:left w:w="{left}" w:type="dxa"/>'
            f'<w:right w:w="{right}" w:type="dxa"/>'
            f'</w:tcMar>'
        )
        tcPr.append(tcMar)

    doc = Document()

    # Поля страницы А4: 0.6 дюйма (~15 мм)
    for section in doc.sections:
        section.top_margin = Inches(0.6)
        section.bottom_margin = Inches(0.6)
        section.left_margin = Inches(0.65)
        section.right_margin = Inches(0.65)

    HEX_CARBON = RGBColor(33, 37, 41)
    HEX_STEEL = RGBColor(73, 80, 87)
    HEX_MUTED = RGBColor(108, 117, 125)

    # Верхний заголовок бренда
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_before = Pt(0)
    title_p.paragraph_format.space_after = Pt(2)
    run_brand = title_p.add_run(f"{COMPANY_NAME} ")
    run_brand.bold = True
    run_brand.font.name = "Arial"
    run_brand.font.size = Pt(16)
    run_brand.font.color.rgb = HEX_CARBON

    run_sub = title_p.add_run("— ИНЖЕНЕРНЫЙ ЦЕНТР АВТОМАТИЗАЦИИ И СБОРКИ ШКАФОВ")
    run_sub.font.name = "Arial"
    run_sub.font.size = Pt(10)
    run_sub.font.color.rgb = HEX_STEEL

    # Заголовок документа
    h1_p = doc.add_paragraph()
    h1_p.paragraph_format.space_before = Pt(8)
    h1_p.paragraph_format.space_after = Pt(2)
    run_h1 = h1_p.add_run("ЧЕК-ЛИСТ АУДИТА ПРИНЦИПИАЛЬНЫХ СХЕМ Э3")
    run_h1.bold = True
    run_h1.font.name = "Arial"
    run_h1.font.size = Pt(14)
    run_h1.font.color.rgb = HEX_CARBON

    desc_p = doc.add_paragraph()
    desc_p.paragraph_format.space_before = Pt(0)
    desc_p.paragraph_format.space_after = Pt(10)
    run_desc = desc_p.add_run("Нормативная база: ГОСТ 21.408-2013, ГОСТ 2.701, ГОСТ 2.709, ПУЭ 7 изд. Требования Ростехнадзора.")
    run_desc.font.name = "Arial"
    run_desc.font.size = Pt(9.5)
    run_desc.font.color.rgb = HEX_MUTED

    # Метаданные аудита
    p_table = doc.add_table(rows=3, cols=4)
    p_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    p_table.autofit = False

    passport_data = [
        [("Объект:", True), ("Котельная 8.5 МВт / ВЗУ / ИТП", False), ("Дата проверки:", True), ("18.09.2026", False)],
        [("Проектировщик (Э3):", True), ("Проектный институт «ПромЭнерго»", False), ("Ревизия схем:", True), ("Ревизия 2.1 (стадия Р)", False)],
        [("Аудитор ACEngine:", True), ("Петров П.С. (Ведущий инженер АСУ)", False), ("Статус аудита:", True), ("НА РАССМОТРЕНИИ", True)],
    ]

    for r_idx, row in enumerate(p_table.rows):
        for c_idx, cell in enumerate(row.cells):
            text, is_bold = passport_data[r_idx][c_idx]
            cell.text = text
            set_cell_background(cell, "F8F9FA" if c_idx in [0, 2] else "FFFFFF")
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            p.runs[0].font.name = "Arial"
            p.runs[0].font.size = Pt(9)
            p.runs[0].bold = is_bold
            p.runs[0].font.color.rgb = HEX_CARBON

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # Разделы чек-листа
    for sec in CHECKLIST_SECTIONS:
        sec_p = doc.add_paragraph()
        sec_p.paragraph_format.space_before = Pt(10)
        sec_p.paragraph_format.space_after = Pt(3)
        run_s = sec_p.add_run(sec["title"])
        run_s.bold = True
        run_s.font.name = "Arial"
        run_s.font.size = Pt(10.5)
        run_s.font.color.rgb = HEX_CARBON

        tbl = doc.add_table(rows=len(sec["items"]) + 1, cols=4)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl.autofit = False

        headers = ["№", "Критерий аудита и контрольная операция", "Норматив / База", "Отметка"]
        col_widths = [Inches(0.4), Inches(4.3), Inches(1.5), Inches(0.9)]

        for c_idx, h_text in enumerate(headers):
            cell = tbl.cell(0, c_idx)
            cell.width = col_widths[c_idx]
            cell.text = h_text
            set_cell_background(cell, "E9ECEF")
            set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
            p = cell.paragraphs[0]
            p.runs[0].font.name = "Arial"
            p.runs[0].font.size = Pt(9)
            p.runs[0].bold = True
            p.runs[0].font.color.rgb = HEX_CARBON
            if c_idx in [0, 3]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER

        for r_idx, item in enumerate(sec["items"], start=1):
            num_code, desc, norm = item
            row_cells = tbl.rows[r_idx].cells
            row_cells[0].width = col_widths[0]
            row_cells[1].width = col_widths[1]
            row_cells[2].width = col_widths[2]
            row_cells[3].width = col_widths[3]

            row_cells[0].text = num_code
            row_cells[1].text = desc
            row_cells[2].text = norm
            row_cells[3].text = "[  ] Норма"

            for c_idx, c in enumerate(row_cells):
                set_cell_background(c, "F8F9FA" if r_idx % 2 == 0 else "FFFFFF")
                set_cell_margins(c, top=70, bottom=70, left=80, right=80)
                p = c.paragraphs[0]
                p.runs[0].font.name = "Arial"
                p.runs[0].font.size = Pt(8.5)
                p.runs[0].font.color.rgb = HEX_CARBON
                if c_idx in [0, 3]:
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Блок итогового заключения
    doc.add_paragraph().paragraph_format.space_before = Pt(12)
    v_table = doc.add_table(rows=2, cols=2)
    v_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    v_table.rows[0].cells[0].text = "ИТОГОВОЕ ЗАКЛЮЧЕНИЕ АУДИТА ACEngine:"
    v_table.rows[0].cells[0].paragraphs[0].runs[0].bold = True
    v_table.rows[0].cells[0].paragraphs[0].runs[0].font.size = Pt(9.5)
    set_cell_background(v_table.rows[0].cells[0], "212529")
    v_table.rows[0].cells[0].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)

    v_table.rows[0].cells[1].text = "[ X ] СХЕМА Э3 ПРИНЯТА К СБОРКЕ В ЦЕХЕ"
    v_table.rows[0].cells[1].paragraphs[0].runs[0].bold = True
    v_table.rows[0].cells[1].paragraphs[0].runs[0].font.size = Pt(9.5)
    set_cell_background(v_table.rows[0].cells[1], "212529")
    v_table.rows[0].cells[1].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)

    v_table.rows[1].cells[0].text = "Подпись эксперта ACEngine: __________________ / Петров П.С. /\nДата: 18.09.2026"
    v_table.rows[1].cells[0].paragraphs[0].runs[0].font.size = Pt(9)

    v_table.rows[1].cells[1].text = "Подпись ГИП Заказчика: __________________ / Смирнов А.В. /\nМ.П."
    v_table.rows[1].cells[1].paragraphs[0].runs[0].font.size = Pt(9)

    for row in v_table.rows:
        for cell in row.cells:
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)

    doc.save(DOCX_PATH)
    print(f"[OK] Word (.docx) создан: {DOCX_PATH} ({os.path.getsize(DOCX_PATH)} байт)")


# ==============================================================================
# 3. ГЕНЕРАЦИЯ ВЕКТОРНОГО PDF (HTML + CHROME HEADLESS)
# ==============================================================================
def generate_pdf():
    # Формируем разделы таблицы на базе CHECKLIST_SECTIONS
    sections_html = ""
    for sec in CHECKLIST_SECTIONS:
        rows_html = ""
        for item in sec["items"]:
            num_code, desc, norm = item
            rows_html += f"""  <tr>
    <td class="col-num">{num_code}</td>
    <td>{desc}</td>
    <td class="col-ref">{norm}</td>
    <td class="col-mark">✓ Норма</td>
  </tr>
"""
        sections_html += f"""
<div class="sec-title">{sec["title"]}</div>
<table>
  <tr>
    <th class="col-num">№</th>
    <th>Критерий аудита и контрольная операция</th>
    <th class="col-ref">Норматив</th>
    <th class="col-mark">Отметка</th>
  </tr>
{rows_html}</table>
"""

    html_content = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  @page {{
    size: A4;
    margin: 12mm 15mm 12mm 15mm;
  }}
  * {{ box-sizing: border-box; }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #{COLOR_CARBON};
    background: #FFFFFF;
    margin: 0;
    padding: 0;
    font-size: 8.5pt;
    line-height: 1.35;
  }}
  .header-tbl {{
    width: 100%;
    border-bottom: 2px solid #{COLOR_CARBON};
    padding-bottom: 8px;
    margin-bottom: 12px;
  }}
  .brand-logo {{
    font-size: 18pt;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #{COLOR_CARBON};
    text-transform: uppercase;
  }}
  .brand-sub {{
    font-size: 8pt;
    color: #6C757D;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }}
  .doc-title {{
    font-size: 13pt;
    font-weight: 700;
    color: #{COLOR_CARBON};
    margin: 8px 0 3px 0;
    letter-spacing: -0.2px;
  }}
  .doc-subtitle {{
    font-size: 8pt;
    color: #495057;
    margin-bottom: 10px;
  }}
  .meta-grid {{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
  }}
  .meta-grid td {{
    border: 1px solid #{COLOR_BORDER};
    padding: 4px 8px;
    font-size: 8pt;
  }}
  .meta-label {{
    background: #{COLOR_LIGHT_BG};
    font-weight: 600;
    width: 18%;
    color: #495057;
  }}
  .meta-val {{
    width: 32%;
  }}
  .sec-title {{
    background: #{COLOR_GUNMETAL};
    color: #FFFFFF;
    font-weight: 700;
    font-size: 8.5pt;
    padding: 4px 8px;
    margin-top: 10px;
    margin-bottom: 0px;
    letter-spacing: 0.2px;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 4px;
  }}
  th {{
    background: #{COLOR_WARM_BG};
    color: #{COLOR_CARBON};
    font-weight: 700;
    font-size: 8pt;
    border: 1px solid #{COLOR_BORDER};
    padding: 5px 6px;
    text-align: left;
  }}
  td {{
    border: 1px solid #{COLOR_BORDER};
    padding: 4px 6px;
    font-size: 8pt;
    vertical-align: middle;
  }}
  tr:nth-child(even) td {{
    background: #{COLOR_LIGHT_BG};
  }}
  .col-num {{
    width: 35px;
    text-align: center;
    font-weight: 600;
  }}
  .col-ref {{
    width: 140px;
    color: #495057;
    font-size: 7.5pt;
  }}
  .col-mark {{
    width: 75px;
    text-align: center;
    font-weight: 700;
    color: #2B8A3E;
    font-size: 8pt;
  }}
  .verdict-box {{
    margin-top: 12px;
    border: 1.5px solid #{COLOR_CARBON};
    page-break-inside: avoid;
  }}
  .verdict-header {{
    background: #{COLOR_CARBON};
    color: #FFFFFF;
    padding: 6px 10px;
    font-size: 8.5pt;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }}
  .verdict-body {{
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    line-height: 1.5;
  }}
</style>
</head>
<body>

<div class="header-tbl">
  <table style="width: 100%; border: none; margin: 0;">
    <tr style="background: none;">
      <td style="border: none; padding: 0; vertical-align: top;">
        <div class="brand-logo">{COMPANY_NAME}</div>
        <div class="brand-sub">Инжиниринговый центр автоматизации и сборки шкафов управления</div>
      </td>
      <td style="border: none; padding: 0; text-align: right; vertical-align: top; font-size: 7.5pt; color: #6C757D;">
        <div>Стендовое тестирование 48 ч • Сертификат ТР ТС 004/020</div>
        <div>Тел: +7 (900) 123-45-67 • info@acengine.ru • acengine.ru</div>
      </td>
    </tr>
  </table>
</div>

<div class="doc-title">ЧЕК-ЛИСТ АУДИТА ПРИНЦИПИАЛЬНЫХ СХЕМ Э3 (ШУ / ША)</div>
<div class="doc-subtitle">Нормативная база: ГОСТ 21.408-2013, ГОСТ 2.701, ГОСТ 2.709, ПУЭ 7 изд. Требования Ростехнадзора к ПАЗ.</div>

<table class="meta-grid">
  <tr>
    <td class="meta-label">Объект:</td>
    <td class="meta-val">Котельная 8.5 МВт / ВЗУ / ИТП</td>
    <td class="meta-label">Дата проверки:</td>
    <td class="meta-val">18.09.2026</td>
  </tr>
  <tr>
    <td class="meta-label">Проектировщик (Э3):</td>
    <td class="meta-val">Проектный институт «ПромЭнерго»</td>
    <td class="meta-label">Ревизия схем:</td>
    <td class="meta-val">Ревизия 2.1 (стадия Р)</td>
  </tr>
  <tr>
    <td class="meta-label">Аудитор ACEngine:</td>
    <td class="meta-val">Петров П.С. (Ведущий инженер АСУ)</td>
    <td class="meta-label">Статус аудита:</td>
    <td class="meta-val" style="color: #2B8A3E; font-weight: 700;">✓ СОГЛАСОВАНО БЕЗ ЗАМЕЧАНИЙ</td>
  </tr>
</table>

{sections_html}

<div class="verdict-box">
  <div class="verdict-header">
    <span>ИТОГОВОЕ ЗАКЛЮЧЕНИЕ АУДИТА ACEngine</span>
    <span>РЕЗУЛЬТАТ: [ ✓ ] СХЕМА Э3 РЕКОМЕНДОВАНА К ПРОИЗВОДСТВУ</span>
  </div>
  <div class="verdict-body">
    <div>
      <strong>Ведущий инженер АСУ ТП ACEngine:</strong><br>
      Петров П. С. &nbsp;&nbsp; ________________ / Подпись /
    </div>
    <div style="text-align: right;">
      <strong>Главный инженер проекта (ГИП Заказчика):</strong><br>
      Смирнов А. В. &nbsp;&nbsp; ________________ / Подпись / &nbsp;&nbsp; М.П.
    </div>
  </div>
</div>

</body>
</html>
"""
    with open(HTML_TEMP_PATH, "w", encoding="utf-8") as f:
        f.write(html_content)

    # Поиск исполняемого файла Chrome / Chromium
    chrome_candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "google-chrome",
        "google-chrome-stable",
        "chromium",
        "chromium-browser",
    ]
    chrome_bin = None
    for cand in chrome_candidates:
        if os.path.exists(cand) or shutil.which(cand):
            chrome_bin = cand
            break

    if not chrome_bin:
        print("[ВНИМАНИЕ] Google Chrome / Chromium не найден. Генерация PDF пропущена.")
        print("Для генерации установите Google Chrome.")
        return

    cmd = [
        chrome_bin,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={PDF_PATH}",
        HTML_TEMP_PATH
    ]
    subprocess.run(cmd, check=True)
    print(f"[OK] Векторный PDF создан: {PDF_PATH} ({os.path.getsize(PDF_PATH)} байт)")


# ==============================================================================
# 4. УПАКОВКА В ZIP БАНДЛ
# ==============================================================================
def create_bundle_zip():
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        if os.path.exists(XLSX_PATH):
            zf.write(XLSX_PATH, arcname="Опросный_лист_подбора_ШУ_ACEngine.xlsx")
        if os.path.exists(PDF_PATH):
            zf.write(PDF_PATH, arcname="Чек-лист_аудита_схем_Э3_ACEngine.pdf")
        if os.path.exists(DOCX_PATH):
            zf.write(DOCX_PATH, arcname="Чек-лист_аудита_схем_Э3_ACEngine.docx")
    print(f"[OK] ZIP-бандл упакован: {ZIP_PATH} ({os.path.getsize(ZIP_PATH)} байт)")


# ==============================================================================
# ТОЧКА ВХОДА (CLI)
# ==============================================================================
def main():
    parser = argparse.ArgumentParser(description="ACEngine Document Generator")
    parser.add_argument("--excel", action="store_true", help="Сгенерировать только Excel (.xlsx)")
    parser.add_argument("--docx", action="store_true", help="Сгенерировать только Word (.docx)")
    parser.add_argument("--pdf", action="store_true", help="Сгенерировать только PDF (.pdf)")
    parser.add_argument("--zip", action="store_true", help="Перепаковать только ZIP")
    args = parser.parse_args()

    run_all = not (args.excel or args.docx or args.pdf or args.zip)

    if run_all or args.excel:
        generate_excel()
    if run_all or args.docx:
        generate_docx()
    if run_all or args.pdf:
        generate_pdf()
    if run_all or args.zip or args.excel or args.docx or args.pdf:
        create_bundle_zip()

    print("\n✓ Все запрашиваемые материалы успешно обновлены в public/docs/")

if __name__ == "__main__":
    main()
