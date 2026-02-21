import { getProducts } from '@/lib/api';
import ProductList from '@/components/ProductList';

export default async function ProductsPage() {
  const initialProducts = await getProducts();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
