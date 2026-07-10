from fastapi import FastAPI
from routers import przedmioty

app = FastAPI(title="Luminari API")

app.include_router(przedmioty.router)

@app.get("/")
def root():
    return {"status": "ok"}