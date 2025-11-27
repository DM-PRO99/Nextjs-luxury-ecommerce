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

import * as yup from 'yup';

export const productPayloadSchema = yup.object({
  name: yup.string().required('Name is required'),
  brand: yup.string().required('Brand is required'),
  collection: yup.string().optional(),
  description: yup.string().required('Description is required'),
  shortDescription: yup.string().optional(),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  originalPrice: yup.number().positive('Original price must be positive').optional(),
  category: yup.string().oneOf(PRODUCT_CATEGORIES).required('Category is required'),
  currency: yup.string().optional(),
  features: yup.array().of(yup.string()).required('Features are required'),
  specifications: yup.object({
    movement: yup.string().optional(),
    caseMaterial: yup.string().optional(),
    caseDiameter: yup.string().optional(),
    waterResistance: yup.string().optional(),
    crystal: yup.string().optional(),
    strap: yup.string().optional(),
  }).optional(),
  inStock: yup.boolean().required('In stock status is required'),
  stock: yup.number().integer().min(0).required('Stock is required'),
  isNew: yup.boolean().required('New status is required'),
  isFeatured: yup.boolean().required('Featured status is required'),
  tags: yup.array().of(yup.string()).required('Tags are required'),
  mainImage: yup.string().required('Main image is required'),
  galleryImages: yup.array().of(yup.string()).optional(),
});

