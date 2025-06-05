import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                HOKAGE
              </span>
              <span className="font-semibold">Shop</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Your premier destination for high-quality anime merchandise, collectibles, and apparel.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Instagram className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#" aria-label="Youtube">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Youtube className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Shop</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/categories/figures" className="hover:text-primary transition-colors">Figures & Collectibles</Link></li>
              <li><Link href="/categories/clothing" className="hover:text-primary transition-colors">Clothing & Apparel</Link></li>
              <li><Link href="/categories/manga" className="hover:text-primary transition-colors">Manga & Books</Link></li>
              <li><Link href="/categories/posters" className="hover:text-primary transition-colors">Posters & Artwork</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Support</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for exclusive deals and anime updates.
            </p>
            <div className="flex gap-2 mt-2">
              <Input type="email" placeholder="Your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hokage Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}