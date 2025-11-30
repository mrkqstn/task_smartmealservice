import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CreateProductsTable1710000000000 } from './src/migrations/1710000000000-CreateProductsTable';
import { Product } from './src/products/product.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'products_db',
  entities: [Product],
  migrations: [CreateProductsTable1710000000000],
  synchronize: false,
  logging: false,
});

export default dataSource;
