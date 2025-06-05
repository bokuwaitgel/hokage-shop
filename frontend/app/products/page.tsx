import { PageHero } from '@/components/layout/page-hero';
import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Anime Products"
        description="Browse our collection of high-quality anime merchandise, collectibles, and apparel."
      />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="hidden md:block space-y-4 border-b pb-6">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="figures" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="figures" className="ml-2 text-sm">Figures & Collectibles</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="clothing" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="clothing" className="ml-2 text-sm">Clothing & Apparel</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="manga" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="manga" className="ml-2 text-sm">Manga & Books</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="posters" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="posters" className="ml-2 text-sm">Posters & Artwork</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="dvd" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="dvd" className="ml-2 text-sm">DVDs & Blu-rays</label>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block space-y-4 border-b pb-6">
              <h3 className="font-medium">Price Range</h3>
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="Min" className="h-8" />
                <span>-</span>
                <Input type="number" placeholder="Max" className="h-8" />
              </div>
              <Button size="sm" className="w-full">Apply</Button>
            </div>
            
            <div className="hidden md:block space-y-4">
              <h3 className="font-medium">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input type="checkbox" id={`rating-${rating}`} className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1">& up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filters */}
            <div className="flex md:hidden items-center gap-2 mb-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 h-9" />
              </div>
            </div>
            
            {/* Results Count and Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{products.length}</span> products
              </p>
              <div className="hidden md:flex items-center gap-2">
                <label htmlFor="sort" className="text-sm">Sort by:</label>
                <select
                  id="sort"
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Rating</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-center mt-12">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Previous page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </Button>
                <Button variant="default" size="icon" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Next page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}