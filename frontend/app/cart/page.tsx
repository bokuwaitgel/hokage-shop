"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/layout/page-hero';
import { products } from '@/lib/data';
import { CartItem } from '@/lib/types';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 1 },
    { product: products[2], quantity: 2 },
  ]);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== id));
  };
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const shipping = 4.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <>
        <PageHero title="Your Cart" />
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="bg-muted p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title="Your Cart" />
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="hidden sm:grid grid-cols-4 gap-4 p-4 bg-muted text-sm font-medium">
                <div className="col-span-2">Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:items-center">
                    <div className="flex items-center gap-4 col-span-2">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-medium hover:underline line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1">
                          ${item.product.price.toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 mt-1 sm:hidden"
                        >
                          <Trash2 className="h-3 w-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 sm:mt-0 sm:justify-center">
                      <div className="sm:hidden text-sm">Quantity:</div>
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-sm"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 sm:mt-0 sm:justify-end">
                      <div className="sm:hidden text-sm">Total:</div>
                      <div className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="hidden sm:flex items-center justify-center text-muted-foreground hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button variant="outline" onClick={() => setCartItems([])}>
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 space-y-4 sticky top-20">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                <p>We accept:</p>
                <div className="flex justify-center gap-2 mt-2">
                  <div className="h-6 w-10 bg-muted rounded"></div>
                  <div className="h-6 w-10 bg-muted rounded"></div>
                  <div className="h-6 w-10 bg-muted rounded"></div>
                  <div className="h-6 w-10 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}