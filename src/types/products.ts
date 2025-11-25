export type ProductCategory =
  | "dress"
  | "sport"
  | "diving"
  | "aviation"
  | "complications";

export interface ProductImage {
  url: string;
  publicId: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  collection?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  shortDescription?: string;
  features: string[];
  specifications: {
    movement?: string;
    caseMaterial?: string;
    caseDiameter?: string;
    waterResistance?: string;
    crystal?: string;
    strap?: string;
  };
  images: {
    main: ProductImage;
    gallery: ProductImage[];
  };
  inStock: boolean;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  category: ProductCategory;
  tags: string[];
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