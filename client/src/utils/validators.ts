export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export function validateProduct(input: {
  name?: string;
  article?: string;
  price?: number | string;
  quantity?: number | string;
}) {
  const errors: ValidationErrors<typeof input> = {};

  if (!input.name?.trim()) errors.name = 'Название обязательно';
  if (!input.article?.trim()) errors.article = 'Артикул обязателен';

  const price = typeof input.price === 'string' ? Number(input.price) : input.price;
  if (price === undefined || Number.isNaN(price) || price <= 0) {
    errors.price = 'Цена должна быть больше 0';
  }

  const quantity =
    typeof input.quantity === 'string' ? Number(input.quantity) : input.quantity;
  if (quantity === undefined || Number.isNaN(quantity) || quantity < 0) {
    errors.quantity = 'Количество должно быть не меньше 0';
  }

  return errors;
}
