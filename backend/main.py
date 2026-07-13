from fastapi import FastAPI
from routers import przedmioty, sciezka

app = FastAPI(title="Luminari API")

app.include_router(przedmioty.router)
app.include_router(sciezka.router)

@app.get("/")
def root():
    return {"status": "ok"}