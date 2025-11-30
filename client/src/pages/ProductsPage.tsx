import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteProduct, useProducts } from '../api/products';
import { ConfirmModal } from '../components/ConfirmModal';
import { Pagination } from '../components/Pagination';
import { ProductTable } from '../components/ProductTable';
import { Product } from '../types';

const PAGE_SIZE = 10;

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { data, isLoading, error } = useProducts(page, PAGE_SIZE);
  const deleteMutation = useDeleteProduct();

  const handleDeleteRequest = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    deleteMutation.mutate(productToDelete.id, {
      onSettled: () => setProductToDelete(null),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Товары</h1>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition"
          onClick={() => navigate('/create')}
        >
          <span aria-hidden>+</span>
          <span>Добавить товар</span>
        </button>
      </div>

      <ProductTable
        products={data?.data || []}
        loading={isLoading}
        error={error}
        onEdit={(product) => navigate(`/edit/${product.id}`)}
        onDelete={handleDeleteRequest}
      />

      {data && (
        <Pagination
          page={page}
          total={data.total}
          limit={PAGE_SIZE}
          onChange={(nextPage) => {
            if (nextPage < 1) return;
            setPage(nextPage);
          }}
        />
      )}

      <ConfirmModal
        open={Boolean(productToDelete)}
        title="Удалить товар?"
        description={
          productToDelete ? `Вы точно хотите удалить "${productToDelete.name}"?` : undefined
        }
        confirmText={deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
        cancelText="Отмена"
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
