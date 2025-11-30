export type Product = {
  id: number;
  article: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
};

export type PaginatedProducts = {
  data: Product[];
  total: number;
};
