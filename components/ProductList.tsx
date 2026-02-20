'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from '@/components/productCard';
import { getProducts, getCategories, Product } from '@/lib/api';
import { useFilterStore } from '@/lib/store';
import Filters from './Filters'; // Import the new Filters component

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { minPrice, maxPrice, category, setMinPrice, setMaxPrice, setCategory } = useFilterStore();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
      setCategories(uniqueCategories);
    }
  }, [allProducts]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const newProducts = await getProducts(100);
      setAllProducts(newProducts);
      setProducts(newProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = allProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    const paginated = filtered.slice(0, page * 20);
    setProducts(paginated);
  }, [minPrice, maxPrice, category, page, allProducts]);

  const handlePriceChange = (value: [number, number]) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-8 lg:p-12">
        <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6 lg:max-w-sm">
            <Filters
              categories={categories}
              selectedCategory={category === 'all' ? null : category}
              onCategoryChange={(cat) => setCategory(cat === null ? 'all' : cat)}
              priceRange={[minPrice, maxPrice]}
              maxPrice={500} // This could be dynamic in a real app
              onPriceChange={handlePriceChange}
            />

            <Button 
              onClick={() => { 
                setMinPrice(0); 
                setMaxPrice(500); 
                setCategory('all'); 
              }} 
              variant="outline" 
              className="w-full"
            >
              Clear All Filters
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Showing {products.length} of {allProducts.length} products
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-2xl font-medium text-muted-foreground mb-2">No products found</p>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              ) : (
                products.map((product) => <ProductCard key={product.id} product={product} />)
              )}
            </div>
            
            {products.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-12 p-4">
                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="font-semibold px-4 py-2 bg-muted rounded-md">
                  Page {page} ({products.length}/20)
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => p + 1)}
                  disabled={products.length < 20}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
 //  helloo this is abir 