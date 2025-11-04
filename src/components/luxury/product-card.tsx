'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/products';
import { formatPrice, calculateDiscount } from '@/libs/utils';
import { fadeUp } from '@/libs/motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square bg-platinum/5 rounded-lg overflow-hidden mb-4">
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-champagne text-obsidian text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </div>
          )}
          
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{discount}%
            </div>
          )}

          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="absolute bottom-4 left-4 right-4 bg-champagne text-obsidian py-3 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-champagne-dark"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </Link>

      <div className="space-y-2">
        <p className="text-xs text-champagne font-medium">{product.brand}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif font-semibold text-lg hover:text-champagne transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-champagne text-champagne" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-platinum/60">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-champagne">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-platinum/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}