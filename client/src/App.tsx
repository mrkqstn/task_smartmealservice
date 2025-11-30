import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { CreateProductPage } from './pages/CreateProductPage';
import { EditProductPage } from './pages/EditProductPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/create" element={<CreateProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
