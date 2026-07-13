from fastapi import APIRouter
from database import supabase

router = APIRouter(prefix="/sciezka", tags=["sciezka"])

@router.get("/{przedmiot_id}")
def get_sciezka(przedmiot_id: int):
    # 1. Берём все темы этого предмета
    tematy = supabase.table("tematy") \
        .select("*") \
        .eq("przedmiot_id", przedmiot_id) \
        .order("kolejnosc") \
        .execute().data

    wynik = []

    for temat in tematy:
        # 2. Для каждой темы берём подтемы
        podtematy = supabase.table("podtematy") \
            .select("*") \
            .eq("temat_id", temat["id"]) \
            .execute().data

        for podtemat in podtematy:
            # 3. Для каждой подтемы берём вопросы
            pytania = supabase.table("pytania") \
                .select("*") \
                .eq("podtemat_id", podtemat["id"]) \
                .execute().data

            podtemat["pytania"] = pytania

        temat["podtematy"] = podtematy
        wynik.append(temat)

    return wynik