# Products (NestJS + React, Docker)

Минимальный бэкенд/фронтенд с PostgreSQL. Запуск одной командой.

## Запуск
1) Скопируйте `.env.example` → `.env` при необходимости заменив знаения переменных.
2) Запустите: `docker-compose up`

## Порты
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:${DB_PORT:-5434}

## Переменные (корневой `.env`)
- `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` — creds и публикация Postgres (по умолчанию postgres/postgres/products_db, порт 5434).
- `VITE_API_URL` — URL API для фронта (дефолт http://localhost:3001).
- `CORS_ORIGIN` — origin для CORS (дефолт http://localhost:3000).

## Структура
```
server/   # NestJS + TypeORM + миграции + сиды, Dockerfile
client/   # Vite + React + Tailwind, Dockerfile + nginx.conf
docker-compose.yml
```

## Примеры API
```bash
curl "http://localhost:3001/products?page=1&limit=10"
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"article":"ART-123","name":"Новый товар","price":12.5,"quantity":3}'
```
