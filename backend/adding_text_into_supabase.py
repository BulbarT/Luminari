import fitz  # PyMuPDF
import os
import re
from dotenv import load_dotenv
from supabase import create_client, Client


# =========================
# Настройки
# =========================

PDF_PATH = "C:/Users/VarDokc/Downloads/M_R_W01_M3_Rownania_liniowe.pdf"

PODTEMAT_ID = 1   # <-- меняешь под нужный раздел

SOURCE_NAME = "M_R_W01_M3_Rownania_liniowe.pdf"

WORDS_PER_CHUNK = 2300


# =========================
# Supabase
# =========================

load_dotenv()

SUPABASE_URL = "https://mahobllmjilwmhpgckys.supabase.co"
#SUPABASE_KEY = None

supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

# =========================
# Извлечение текста PDF
# =========================

def extract_text(pdf_path):

    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        page_text = page.get_text()

        text += page_text + "\n"

    return text



# =========================
# Очистка текста
# =========================

def clean_text(text):

    # убираем переносы внутри слов:
    # przykła-
    # dowy -> przykładowy

    text = re.sub(
        r"-\n",
        "",
        text
    )


    # переносы строк заменяем пробелами

    text = re.sub(
        r"\n+",
        " ",
        text
    )


    # двойные пробелы

    text = re.sub(
        r"\s+",
        " ",
        text
    )


    return text.strip()



# =========================
# Разбиение на куски
# =========================

def split_into_chunks(
        text,
        words_limit=400
):

    words = text.split()

    chunks = []

    current = []

    for word in words:

        current.append(word)

        if len(current) >= words_limit:

            chunks.append(
                " ".join(current)
            )

            current = []


    # остаток

    if current:

        chunks.append(
            " ".join(current)
        )


    return chunks



# =========================
# Загрузка в Supabase
# =========================

def upload_chunks(chunks):

    rows = []


    for chunk in chunks:

        rows.append({

            "podtemat_id": PODTEMAT_ID,

            "tresc": chunk,

            "zrodlo": SOURCE_NAME,

            "status": "szkic"

        })


    response = (
        supabase
        .table("materialy")
        .insert(rows)
        .execute()
    )


    return response



# =========================
# Запуск
# =========================

if __name__ == "__main__":

    print("Читаю PDF...")

    text = extract_text(
        PDF_PATH
    )


    print("Очищаю текст...")

    text = clean_text(
        text
    )


    print(
        f"Всего слов: {len(text.split())}"
    )


    print("Делю на части...")

    chunks = split_into_chunks(
        text,
        WORDS_PER_CHUNK
    )


    print(
        f"Получено частей: {len(chunks)}"
    )


    print("Загружаю в Supabase...")

    result = upload_chunks(
        chunks
    )


    print("Готово!")
    print(result)