export interface Product {
  id: string;
  name: string;
  brand: string;
  collection: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  specifications: {
    movement: string;
    caseMaterial: string;
    caseDiameter: string;
    waterResistance: string;
    crystal: string;
    strap: string;
  };
  images: {
    main: string;
    gallery: string[];
    detail?: string[];
  };
  variants?: {
    id: string;
    name: string;
    type: 'strap' | 'dial' | 'finish';
    options: string[];
  }[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  category: 'dress' | 'sport' | 'diving' | 'aviation' | 'complications';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}