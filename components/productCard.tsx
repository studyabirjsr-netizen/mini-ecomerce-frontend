'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from '@/lib/api';
import { useState } from 'react';
// components/ProductCard.tsx


export default function ProductCard({ product }: { product: Product }) {
  const [slide, setSlide] = useState(0);
  const images = product.images && product.images.length > 0
  ? product.images
  : [product.thumbnail];

 

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 h-full">
      <CardHeader className="p-0 relative h-64">
        <div className="relative h-full overflow-hidden">
          <Image
  src={images[slide]}
  alt={product.title}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-500"
/>

          {images.length > 1 && (
            <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100" onClick={() => setSlide((s) => (s + 1) % images.length)}>
              →
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 pb-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="line-clamp-1 text-lg font-bold">{product.title}</CardTitle>
          <Badge>${product.price}</Badge>
        </div>
        <CardDescription className="line-clamp-3 mb-4">{product.description}</CardDescription>
        <div className="flex gap-2 mb-4">
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
