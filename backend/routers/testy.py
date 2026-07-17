from fastapi import APIRouter
from pydantic import BaseModel
from database import supabase

router = APIRouter(prefix="/test", tags=["test"])


class Odpowiedz(BaseModel):
    pytanie_id: int
    odpowiedz: str


class WynikTestu(BaseModel):
    uczen_id: int
    odpowiedzi: list[Odpowiedz]


@router.post("/wynik")
def zapisz_wynik(dane: WynikTestu):
    poprawne = 0
    wszystkie = len(dane.odpowiedzi)

    for odp in dane.odpowiedzi:
        pytanie = supabase.table("pytania") \
            .select("poprawna") \
            .eq("id", odp.pytanie_id) \
            .single() \
            .execute().data

        czy_poprawna = (odp.odpowiedz == pytanie["poprawna"])
        if czy_poprawna:
            poprawne += 1

        supabase.table("wyniki_odpowiedzi").insert({
            "uczen_id": dane.uczen_id,
            "pytanie_id": odp.pytanie_id,
            "odpowiedz": odp.odpowiedz,
            "czy_poprawna": czy_poprawna
        }).execute()

    return {
        "poprawne": poprawne,
        "wszystkie": wszystkie,
        "procent": round(poprawne / wszystkie * 100, 1) if wszystkie else 0
    }