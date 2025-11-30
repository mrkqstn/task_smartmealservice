type Props = {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, total, limit, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between mt-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
      <div className="space-x-2">
        <button
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          onClick={() => onChange(page - 1)}
          disabled={!canPrev}
        >
          ← Назад
        </button>
        <button
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          onClick={() => onChange(page + 1)}
          disabled={!canNext}
        >
          Вперёд →
        </button>
      </div>
      <div className="text-sm text-gray-700 font-medium">
        Страница {page} из {totalPages}
      </div>
    </div>
  );
}
