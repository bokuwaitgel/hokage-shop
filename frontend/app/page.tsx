import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Star, Truck, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { CategoryCard } from '@/components/ui/category-card';
import { categories, getFeaturedProducts } from '@/lib/data';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Anime collectibles background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>
        
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Ultimate <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Anime</span> Destination
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover premium collectibles, apparel, and merchandise from your favorite anime series at Hokage Shop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-accent/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/products" className="group flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
              View all
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Why Choose Hokage Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Authentic, high-quality products from trusted sources.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">Quick and reliable shipping on all orders.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">Multiple secure payment options for your convenience.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Customer support available round the clock.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Join Our Newsletter</h2>
            <p className="text-muted-foreground">
              Subscribe to receive updates on new products, special offers, and anime news.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-6 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}