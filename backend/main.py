from fastapi import FastAPI
from routers import przedmioty, sciezka, testy, ai

app = FastAPI(title="Luminari API")

app.include_router(przedmioty.router)
app.include_router(sciezka.router)
app.include_router(testy.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"status": "ok"}