 import HeroSlider from '@/components/HeroSlider';
import ProductList from '@/components/ProductList';
import { getProducts } from '@/lib/api';

export default async function Home() {
  const featured = await getProducts(5);

  return (
    <main className="min-h-screen container mx-auto py-12 px-4 md:px-6 space-y-12">
      <HeroSlider products={featured} />
      <ProductList initialProducts={featured} />
    </main>
  );
}
