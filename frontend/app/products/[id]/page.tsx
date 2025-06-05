import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart, Heart, Share2, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, getRelatedProducts } from '@/lib/data';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>
      
      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-md border cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({Math.floor(product.rating * 10)} reviews)
              </span>
            </div>
          </div>
          
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Availability:</span>
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Category:</span>
              <Link
                href={`/categories/${product.category}`}
                className="text-primary hover:underline"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center">
              <div className="flex items-center border rounded-md">
                <button className="px-3 py-1 text-lg">-</button>
                <span className="px-4 py-1 border-x">1</span>
                <button className="px-3 py-1 text-lg">+</button>
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {product.stock} available
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button size="lg" className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share product</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none gap-4">
          <TabsTrigger value="description" className="rounded-none">Description</TabsTrigger>
          <TabsTrigger value="specifications" className="rounded-none">Specifications</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-4">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed
              non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
              ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa,
              varius a, semper congue, euismod non, mi.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Category</span>
                <span>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Brand</span>
                <span>Hokage Official</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Material</span>
                <span>Premium PVC</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Dimensions</span>
                <span>25cm x 15cm x 10cm</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Weight</span>
                <span>0.5 kg</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Release Date</span>
                <span>2023</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                </div>
                <p>
                  Amazing quality and detail! The figure looks exactly like in the pictures,
                  and the packaging was secure. Would definitely recommend!
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 week ago</div>
                </div>
                <p>
                  Great product! Shipping was fast and the quality is excellent. The only
                  minor issue was a small paint defect, but it's barely noticeable.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}