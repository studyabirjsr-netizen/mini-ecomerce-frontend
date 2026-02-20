'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search, Menu } from "lucide-react" // npx shadcn-ui@latest add button; npm i lucide-react
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from 'react';
import { useFilterStore } from '@/lib/store';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const cartCount = 0; // Integrate your cart store
  const { setCategory } = useFilterStore();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          আমার শপ
        </Link>
        
        <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl bg-muted/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cart"> {/* Add cart page */} 
              <ShoppingCart className="h-5 w-5 mr-1" />
              Cart ({cartCount})
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg">Home</Link>
                <Link href="/products" className="text-lg">Products</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
