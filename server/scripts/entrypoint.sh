#!/bin/sh
set -e

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-5432}

echo "Waiting for db ${DB_HOST}:${DB_PORT}..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Ensuring database exists..."
npm run db:create

echo "Running migrations..."
npm run migration:run

echo "Seeding data..."
npm run seed

if [ ! -f dist/src/main.js ]; then
  echo "Building app..."
  npm run build
fi

echo "Starting backend..."
npm run start:prod
