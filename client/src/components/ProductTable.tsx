import { Product } from '../types';

type Props = {
  products: Product[];
  loading: boolean;
  error?: unknown;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductTable({ products, loading, error, onEdit, onDelete }: Props) {
  if (loading) return <div className="py-4">Загрузка...</div>;
  if (error) {
    const message = error instanceof Error ? error.message : 'Ошибка';
    return <div className="py-4 text-red-600">Ошибка: {message}</div>;
  }
  if (!products.length) return <div className="py-4">Нет данных</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-3 py-2 text-left text-sm font-semibold">ID</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold">Название</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold">Артикул</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold">Цена</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold">Количество</th>
            <th className="border px-3 py-2 text-left text-sm font-semibold">Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition">
              <td className="border px-3 py-2 text-sm">{p.id}</td>
              <td className="border px-3 py-2 text-sm">{p.name}</td>
              <td className="border px-3 py-2 text-sm">{p.article}</td>
              <td className="border px-3 py-2 text-sm">{p.price}</td>
              <td className="border px-3 py-2 text-sm">{p.quantity}</td>
              <td className="border px-3 py-2 text-sm space-x-2">
                <button
                  className="inline-flex items-center justify-center w-9 h-9 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
                  onClick={() => onEdit(p)}
                >
                  <span aria-hidden>✎</span>
                </button>
                <button
                  className="inline-flex items-center justify-center w-9 h-9 border border-red-500 text-red-600 rounded-full hover:bg-red-50 transition"
                  onClick={() => onDelete(p)}
                >
                  <span aria-hidden>🗑️</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
