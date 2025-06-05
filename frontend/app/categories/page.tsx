import Link from 'next/link';
import { PageHero } from '@/components/layout/page-hero';
import { CategoryCard } from '@/components/ui/category-card';
import { categories } from '@/lib/data';

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        title="Shop by Category"
        description="Browse our selection of anime merchandise by category to find exactly what you're looking for."
      />
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}