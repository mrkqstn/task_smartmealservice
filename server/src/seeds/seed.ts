import AppDataSource from '../../ormconfig';
import { Product } from '../products/product.entity';

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Product);

  const count = await repo.count();
  if (count === 0) {
    const products = Array.from({ length: 150 }).map((_, idx) => {
      const n = idx + 1;
      return {
        article: `ART-${String(n).padStart(3, '0')}`,
        name: `Демо товар ${n}`,
        price: Number((5 + (n % 50) * 0.8).toFixed(2)),
        quantity: (n * 3) % 40,
      };
    });

    await repo.save(products);
    console.log('Seeded 150 products');
  } else {
    console.log('Products already seeded, skipping');
  }

  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
