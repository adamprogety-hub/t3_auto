# Документы и Инженерные материалы ACEngine

В этой папке хранятся файлы для скачивания с сайта:

- `oprosnyj-list-shu-acengine.xlsx` — Опросный лист подбора шкафов управления (ШУ/ША) с динамическими формулами расчёта каналов ввода-вывода (AI/AO/DI/DO/ПАЗ).
- `chek-list-audit-skhem-e3-acengine.docx` — Редактируемый регламент инженерного аудита схем Э3 (Word) по ГОСТ 21.408-2013 и ПУЭ 7.
- `chek-list-audit-skhem-e3-acengine.pdf` — Векторная печатная версия чек-листа в фирменном стиле.
- `materialy-acengine-oprosnik-i-chek-list.zip` — Полный архив со всеми материалами.

## Как вносить изменения и пересобирать документы

Полная инструкция по внесению правок, структуре данных и скриптам описана в файле:
👉 [DOCS_GENERATION_GUIDE.md](../../DOCS_GENERATION_GUIDE.md)

Для быстрой перегенерации всех документов:
```bash
npm run generate-docs
```
или:
```bash
python3 scripts/generate_docs.py
```
