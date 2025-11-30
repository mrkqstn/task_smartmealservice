import 'dotenv/config';
import { Client } from 'pg';

async function main() {
  const targetDb = process.env.DB_NAME || 'products_db';
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_BASE || 'postgres',
  });

  await client.connect();

  const exists = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [
    targetDb,
  ]);

  if (exists.rowCount === 0) {
    await client.query(`CREATE DATABASE "${targetDb}"`);
    console.log(`Database ${targetDb} created`);
  } else {
    console.log(`Database ${targetDb} already exists`);
  }

  await client.end();
}

main().catch((err) => {
  console.error('Failed to create database', err);
  process.exit(1);
});
