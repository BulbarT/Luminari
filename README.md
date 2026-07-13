# Luminari Backend — шпаргалка запуска

## Первый запуск на новом компьютере

cd backend
python -m venv venv
venv\Scripts\Activate.ps1      # Windows
pip install -r requirements.txt

Создать файл `.env` в этой папке (backend/), НЕ коммитить в git:
SUPABASE_URL=https://mahobllmjilwmhpgckys.supabase.co
SUPABASE_SERVICE_KEY=service_role_key_из_Supabase_Project_Settings_API

## Обычный запуск (каждый раз, когда садишься работать)

cd backend
venv\Scripts\Activate.ps1
uvicorn main:app --reload

Проверка в браузере:
- http://127.0.0.1:8000/               → {"status": "ok"}
- http://127.0.0.1:8000/przedmioty/    → данные из Supabase
- http://127.0.0.1:8000/docs           → Swagger, список всех эндпоинтов

## Структура проекта

backend/
├── main.py              — точка входа, подключает все роутеры
├── database.py           — одно подключение к Supabase на всё приложение
├── requirements.txt       — список библиотек (pip install -r requirements.txt)
├── .env                   — секретные ключи, ЛОКАЛЬНО, не в git (создать самому)
├── .gitignore
└── routers/               — по одному файлу на каждую часть приложения
    ├── przedmioty.py       — GET /przedmioty/  (готово)
    ├── sciezka.py          — GET /sciezka       (в разработке)
    └── testy.py            — POST /test/wynik   (позже)

## Частые проблемы

- **ModuleNotFoundError: No module named 'backend'**
  Импорт должен быть `from database import supabase`, БЕЗ `backend.` впереди —
  запускаем uvicorn находясь внутри папки backend, а не в корне репозитория.

- **[Errno 10048] address already in use**
  Порт 8000 уже занят старым процессом. Закрыть все терминалы и открыть заново,
  либо: netstat -ano | findstr :8000  → taskkill /PID номер /F

- **Fatal error in launcher после переноса проекта в другую папку/диск**
  venv "запомнила" старый путь. Пересоздать:
  Remove-Item -Recurse -Force venv
  python -m venv venv
  venv\Scripts\Activate.ps1
  pip install -r requirements.txt

- **Страница не открывается вообще, бесконечная загрузка, без ошибки в консоли**
  Обычно не в коде, а в системе/сети (антивирус, брандмауэр, VPN, OneDrive-синхронизация).
  Проверить: ping 127.0.0.1, netsh winhttp show proxy, файл hosts,
  временно выключить антивирус/брандмауэр для теста.
  Совет: держать проект вне папки OneDrive/Desktop — лучше D:\Projects\... и т.п.
