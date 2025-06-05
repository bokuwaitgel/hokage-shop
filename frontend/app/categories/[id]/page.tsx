import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { ProductCard } from '@/components/ui/product-card';
import { categories, getProductsByCategory } from '@/lib/data';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.id);
  
  if (!category) {
    notFound();
  }
  
  const products = getProductsByCategory(params.id);

  return (
    <>
      <PageHero
        title={category.name}
        description={category.description}
        backgroundImage={category.image}
      />
      <div className="container py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-muted-foreground">
              We couldn't find any products in this category. Please check back later.
            </p>
          </div>
        )}
      </div>
    </>
  );
}