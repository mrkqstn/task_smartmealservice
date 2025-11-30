import { useNavigate } from 'react-router-dom';
import { useCreateProduct } from '../api/products';
import { ProductForm } from '../components/ProductForm';

export function CreateProductPage() {
  const navigate = useNavigate();
  const mutation = useCreateProduct();
  const mutationError =
    mutation.error && mutation.error instanceof Error
      ? mutation.error.message
      : mutation.error
      ? 'Не удалось отправить запрос'
      : undefined;

  const handleSubmit = (data: {
    name: string;
    article: string;
    price: number;
    quantity: number;
  }) => {
    mutation.mutate(data, {
      onSuccess: () => navigate('/'),
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Добавить товар</h1>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          onClick={() => navigate(-1)}
          type="button"
        >
          ← Назад
        </button>
      </div>
      <ProductForm
        onSubmit={handleSubmit}
        submitting={mutation.isPending}
        serverError={mutationError}
      />
      {mutationError &&
        !mutationError.toLowerCase().includes('article') && (
          <p className="mt-3 text-sm text-red-600">Ошибка: {mutationError}</p>
        )}
    </div>
  );
}
