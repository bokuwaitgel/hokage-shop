import { Product, Category } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Naruto Uzumaki Figure',
    description: 'High-quality PVC figure of Naruto Uzumaki in Sage Mode. This collectible stands 25cm tall and features incredible detail.',
    price: 59.99,
    images: [
      'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'figures',
    tags: ['naruto', 'figure', 'collectible'],
    stock: 15,
    rating: 4.8,
    featured: true,
  },
  {
    id: '2',
    name: 'Attack on Titan Hoodie',
    description: 'Premium quality hoodie featuring the Scout Regiment emblem. Made from soft cotton blend material for comfort and durability.',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'clothing',
    tags: ['attack on titan', 'hoodie', 'apparel'],
    stock: 25,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'One Piece Manga Box Set',
    description: 'Complete collection of One Piece manga volumes 1-23. Follow Luffy and his crew on their adventure to find the One Piece treasure.',
    price: 185.99,
    images: [
      'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'manga',
    tags: ['one piece', 'manga', 'box set'],
    stock: 10,
    rating: 4.9,
    featured: true,
  },
  {
    id: '4',
    name: 'My Hero Academia T-Shirt',
    description: 'Cotton T-shirt featuring the U.A. High School logo. Available in multiple sizes and colors.',
    price: 24.99,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'clothing',
    tags: ['my hero academia', 't-shirt', 'apparel'],
    stock: 30,
    rating: 4.3,
  },
  {
    id: '5',
    name: 'Demon Slayer Poster Set',
    description: 'Set of 5 high-quality posters featuring Tanjiro, Nezuko, Zenitsu, Inosuke, and Giyu. Perfect for decorating your room.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'posters',
    tags: ['demon slayer', 'poster', 'decoration'],
    stock: 20,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Dragon Ball Z Action Figure Set',
    description: 'Set of 6 action figures including Goku, Vegeta, Gohan, Piccolo, Frieza, and Cell. Each figure is approximately 15cm tall.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/8566437/pexels-photo-8566437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8566437/pexels-photo-8566437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'figures',
    tags: ['dragon ball', 'figures', 'collectible'],
    stock: 12,
    rating: 4.6,
    featured: true,
  },
  {
    id: '7',
    name: 'Jujutsu Kaisen Hoodie',
    description: 'Black hoodie featuring Gojo Satoru design. Made from premium materials for comfort and style.',
    price: 54.99,
    images: [
      'https://images.pexels.com/photos/2205839/pexels-photo-2205839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2205839/pexels-photo-2205839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'clothing',
    tags: ['jujutsu kaisen', 'hoodie', 'apparel'],
    stock: 18,
    rating: 4.5,
  },
  {
    id: '8',
    name: 'Hunter x Hunter Complete DVD Set',
    description: 'Complete DVD collection of Hunter x Hunter (2011) series. All episodes with English and Japanese audio options.',
    price: 129.99,
    images: [
      'https://images.pexels.com/photos/2395249/pexels-photo-2395249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2395249/pexels-photo-2395249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'dvd',
    tags: ['hunter x hunter', 'dvd', 'anime'],
    stock: 8,
    rating: 4.9,
  },
];

export const categories: Category[] = [
  {
    id: 'figures',
    name: 'Figures & Collectibles',
    description: 'High-quality anime figures and collectibles',
    image: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'clothing',
    name: 'Clothing & Apparel',
    description: 'Anime-themed clothing and apparel',
    image: 'https://images.pexels.com/photos/2205839/pexels-photo-2205839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'manga',
    name: 'Manga & Books',
    description: 'Manga volumes and light novels',
    image: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'posters',
    name: 'Posters & Artwork',
    description: 'Anime posters and artwork for decoration',
    image: 'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'dvd',
    name: 'DVDs & Blu-rays',
    description: 'Anime series and movies on DVD and Blu-ray',
    image: 'https://images.pexels.com/photos/2395249/pexels-photo-2395249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(tag => product.tags.includes(tag))))
    .slice(0, limit);
};