from fastapi import APIRouter
from pydantic import BaseModel
from database import supabase
from openai import OpenAI
import os

router = APIRouter(prefix="/ai", tags=["ai"])

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


class BladOdpowiedzi(BaseModel):
    pytanie_id: int
    odpowiedz_ucznia: str


class ProsbaWyjasnienia(BaseModel):
    uczen_id: int
    bledy: list[BladOdpowiedzi]


@router.post("/wyjasnij")
def wyjasnij_bledy(dane: ProsbaWyjasnienia):
    if not dane.bledy:
        return {"wyjasnienie": "Brak błędów do wyjaśnienia — wszystkie odpowiedzi poprawne!"}

    uczen = supabase.table("uczniowie") \
        .select("*") \
        .eq("id", dane.uczen_id) \
        .single() \
        .execute().data

    szczegoly = []
    for b in dane.bledy:
        pytanie = supabase.table("pytania") \
            .select("tresc, poprawna") \
            .eq("id", b.pytanie_id) \
            .single() \
            .execute().data
        szczegoly.append({
            "pytanie": pytanie["tresc"],
            "odpowiedz_ucznia": b.odpowiedz_ucznia,
            "poprawna_odpowiedz": pytanie["poprawna"]
        })

    jezyk = uczen.get("jezyk_ojczysty") or "polski"

    prompt = f"""
Rola: Jesteś cierpliwym korepetytorem dla ucznia szkoły średniej w Polsce.

Kontekst: Uczeń mówi głównie po {jezyk}, ale uczy się w polskiej szkole.
Poniżej lista pytań, w których uczeń popełnił błąd w TYM konkretnym teście:

{szczegoly}

Zadanie: Dla KAŻDEGO pytania z listy wygeneruj blok tekstu DOKŁADNIE w tym
formacie, nic więcej i nic mniej:

Pytanie: [tu wklej dokładną treść pytania]
Twoja odpowiedź: [litera odpowiedzi ucznia]
Poprawna odpowiedź: [litera poprawnej odpowiedzi]
Wyjaśnienie: [2-3 zdania prostym językiem, dlaczego poprawna odpowiedź jest
poprawna, bez żargonu, bez oceniania ucznia]

Oddziel każdy blok pytania od następnego jedną pustą linią. Nie dodawaj
żadnego wstępu, podsumowania na końcu, ani zdań typu "Mam nadzieję, że to
pomoże" — tylko same bloki pytań, jeden po drugim.

Format: Zwykły tekst, BEZ Markdown (bez #, bez **, bez gwiazdek, bez
numerowania listy typu "1.", "2.").

Granice: Nie pisz nic poza matematyką/tematem pytania.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"wyjasnienie": response.choices[0].message.content}