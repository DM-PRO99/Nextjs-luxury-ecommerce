export const PRODUCT_CATEGORIES = [
  "dress",
  "sport",
  "diving",
  "aviation",
  "complications",
] as const;

export interface ProductSpecifications {
  movement?: string;
  caseMaterial?: string;
  caseDiameter?: string;
  waterResistance?: string;
  crystal?: string;
  strap?: string;
}

export interface ProductBase {
  name: string;
  brand: string;
  collection?: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  category: typeof PRODUCT_CATEGORIES[number];
  currency?: string;
  features: string[];
  specifications: ProductSpecifications;
  inStock: boolean;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
}

export interface ProductPayload extends Omit<ProductBase, 'mainImageFile' | 'galleryImageFiles'> {
  mainImage: string;
  galleryImages: string[];
}

export interface ProductFormValues extends Omit<ProductBase, 'mainImage' | 'galleryImages'> {
  mainImageFile?: FileList | null;
  galleryImageFiles?: FileList | null;
}

