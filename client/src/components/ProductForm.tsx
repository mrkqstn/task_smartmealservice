import { useEffect, useState, type FormEvent } from 'react';
import { Product } from '../types';
import { validateProduct, ValidationErrors } from '../utils/validators';

type ProductInput = {
  name: string;
  article: string;
  price: string;
  quantity: string;
};

type Props = {
  initial?: Product;
  onSubmit: (data: {
    name: string;
    article: string;
    price: number;
    quantity: number;
  }) => void;
  submitting?: boolean;
  serverError?: string;
};

function parseServerError(serverError?: string) {
  if (!serverError) return { text: undefined, isArticle: false };

  let text = serverError;
  try {
    const parsed = JSON.parse(serverError);
    if (parsed?.message) {
      text = Array.isArray(parsed.message) ? parsed.message.join(', ') : String(parsed.message);
    }
  } catch {
    // ignore parse errors, use raw text
  }

  const lowered = text.toLowerCase();
  const isArticle =
    lowered.includes('article') ||
    lowered.includes('артикул') ||
    (lowered.includes('unique') && lowered.includes('art'));

  return { text: text.trim(), isArticle };
}

export function ProductForm({ initial, onSubmit, submitting, serverError }: Props) {
  const [values, setValues] = useState<ProductInput>({
    name: initial?.name || '',
    article: initial?.article || '',
    price: initial ? String(initial.price) : '',
    quantity: initial ? String(initial.quantity) : '',
  });
  const [errors, setErrors] = useState<ValidationErrors<ProductInput>>({});

  const { text: parsedServerError, isArticle } = parseServerError(serverError);
  const articleServerError = isArticle ? 'Артикул должен быть уникальным' : undefined;

  useEffect(() => {
    if (initial) {
      setValues({
        name: initial.name,
        article: initial.article,
        price: String(initial.price),
        quantity: String(initial.quantity),
      });
    }
  }, [initial]);

  const handleChange = (field: keyof ProductInput, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProduct({
      name: values.name,
      article: values.article,
      price: values.price,
      quantity: values.quantity,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    onSubmit({
      name: values.name.trim(),
      article: values.article.trim(),
      price: Number(values.price),
      quantity: Number(values.quantity),
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-800">Название</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-800">Артикул</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={values.article}
          onChange={(e) => handleChange('article', e.target.value)}
        />
        {(errors.article || articleServerError) && (
          <p className="text-sm text-red-600 mt-1">{errors.article || articleServerError}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-800">Цена</label>
        <input
          type="number"
          step="0.01"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={values.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
        {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-800">Количество</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={values.quantity}
          onChange={(e) => handleChange('quantity', e.target.value)}
        />
        {errors.quantity && (
          <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 shadow-sm transition"
      >
        {submitting ? 'Сохранение...' : 'Сохранить'}
      </button>
      {parsedServerError && !articleServerError && (
        <p className="text-sm text-red-600">{parsedServerError}</p>
      )}
    </form>
  );
}
