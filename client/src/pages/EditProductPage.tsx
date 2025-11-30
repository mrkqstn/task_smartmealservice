import { useParams, useNavigate } from 'react-router-dom';
import { useProduct, useUpdateProduct } from '../api/products';
import { ProductForm } from '../components/ProductForm';

export function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id ? Number(params.id) : undefined;
  const navigate = useNavigate();
  const { data, isLoading, error } = useProduct(productId);
  const mutation = useUpdateProduct(productId);
  const mutationError =
    mutation.error && mutation.error instanceof Error
      ? mutation.error.message
      : mutation.error
      ? 'Не удалось отправить запрос'
      : undefined;

  const handleSubmit = (input: {
    name: string;
    article: string;
    price: number;
    quantity: number;
  }) => {
    if (!productId) return;
    mutation.mutate(input, {
      onSuccess: () => navigate('/'),
    });
  };

  if (!productId) return <div className="p-6">Некорректный ID</div>;
  if (isLoading) return <div className="p-6">Загрузка...</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">
        Ошибка: {error instanceof Error ? error.message : 'Не удалось загрузить товар'}
      </div>
    );
  if (!data) return <div className="p-6">Товар не найден</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Редактировать товар</h1>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          onClick={() => navigate(-1)}
          type="button"
        >
          ← Назад
        </button>
      </div>
      <ProductForm
        initial={data}
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
