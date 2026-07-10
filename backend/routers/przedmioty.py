from fastapi import APIRouter
from database import supabase

router = APIRouter(prefix="/przedmioty", tags=["przedmioty"])

@router.get("/")
def get_all():
    data = supabase.table("przedmioty").select("*").execute()
    return data.data