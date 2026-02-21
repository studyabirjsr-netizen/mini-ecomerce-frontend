// lib/api.ts
// Using DummyJSON instead of fakestoreapi.com to avoid DNS / ENOTFOUND issues

// lib/api.ts
// Using DummyJSON instead of fakestoreapi.com to avoid DNS / ENOTFOUND issues

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = 'https://dummyjson.com'; // stable fake API[web:19]

export async function getProducts(limit = 20, skip = 0): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function getProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  const data: Product = await res.json();
  return data;
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data: string[] = await res.json();
  return data;
}
