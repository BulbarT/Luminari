from fastapi import APIRouter
from pydantic import BaseModel
from database import supabase
from openai import OpenAI
import os

router = APIRouter(prefix="/ai", tags=["ai"])

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


class ProsbaWyjasnienia(BaseModel):
    uczen_id: int


@router.post("/wyjasnij")
def wyjasnij_bledy(dane: ProsbaWyjasnienia):
    uczen = supabase.table("uczniowie") \
        .select("*") \
        .eq("id", dane.uczen_id) \
        .single() \
        .execute().data

    bledy = supabase.table("wyniki_odpowiedzi") \
        .select("pytanie_id, odpowiedz") \
        .eq("uczen_id", dane.uczen_id) \
        .eq("czy_poprawna", False) \
        .execute().data

    if not bledy:
        return {"wyjasnienie": "Brak błędów do wyjaśnienia — wszystkie odpowiedzi poprawne!"}

    szczegoly = []
    for b in bledy:
        pytanie = supabase.table("pytania") \
            .select("tresc, poprawna") \
            .eq("id", b["pytanie_id"]) \
            .single() \
            .execute().data
        szczegoly.append({
            "pytanie": pytanie["tresc"],
            "odpowiedz_ucznia": b["odpowiedz"],
            "poprawna_odpowiedz": pytanie["poprawna"]
        })

    jezyk = uczen.get("jezyk_ojczysty") or "polski"

    prompt = f"""
Rola: Jesteś cierpliwym korepetytorem dla ucznia szkoły średniej w Polsce.

Kontekst: Uczeń mówi głównie po {jezyk}, ale uczy się w polskiej szkole.
Poniżej lista pytań, w których uczeń popełnił błąd:

{szczegoly}

Zadanie: Wyjaśnij uczniowi, dlaczego jego odpowiedź była błędna i jak
dojść do poprawnej odpowiedzi, krok po kroku.

Format: Dla każdego pytania osobny akapit, prosty język, bez żargonu.
Możesz używać pojedynczych słów po {jezyk}, jeśli to pomoże zrozumieć
trudny termin, ale główny wyjaśnienie pisz po polsku.

Granice: Nie oceniaj ucznia, nie mów "źle", tylko wyjaśniaj. Nie pisz nic
poza matematyką/tematem pytania.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"wyjasnienie": response.choices[0].message.content}