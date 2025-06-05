export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  rating: number;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};