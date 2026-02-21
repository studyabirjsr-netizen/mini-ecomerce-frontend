import { getProduct } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';

export default async function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  let product;
  try {
    product = await getProduct(params.id);
  } catch (error) {
    return <div className="container mx-auto py-12 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-6xl">
      <Card>
        <CardContent className="p-0 grid md:grid-cols-2 gap-12 pt-12 pb-12">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
  src={product.images?.[0] ?? product.thumbnail}
  alt={product.title}
  fill
  className="object-cover"
/>
          </div>
          <div className="space-y-6 p-8 md:p-12">
            <div>
              <CardTitle className="text-4xl md:text-5xl font-bold">{product.title}</CardTitle>
              <Badge className="mt-4 text-xl px-4 py-2">${product.price}</Badge>
            </div>
            <CardDescription className="text-lg leading-relaxed">{product.description}</CardDescription>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
  ⭐ {product.rating} rating
</Badge>
<Badge>{product.category}</Badge>
            </div>
            <Button size="lg" className="w-full text-lg">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
