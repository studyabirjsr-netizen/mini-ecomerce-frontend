'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image';
import { Product } from '@/lib/api';

export default function HeroSlider({ products }: { products: Product[] }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % 5), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="overflow-hidden mb-8">
      <CardContent className="p-0 relative h-[400px] md:h-[500px]">
        {products.slice(0, 5).map((product, idx) => (
          <div key={product.id} className={`absolute inset-0 transition-all duration-1000 ${idx === current ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-end p-8 md:p-16">
              <div className="text-white max-w-lg">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 line-clamp-2">{product.title}</h2>
                <p className="text-lg mb-6 opacity-90 line-clamp-3">{product.description}</p>
                <div className="text-3xl font-bold">${product.price}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/50'}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
