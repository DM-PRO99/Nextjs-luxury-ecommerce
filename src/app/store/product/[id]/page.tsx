'use client';

import { useState } from 'react';
import { mockProducts } from '@/libs/mock-data';
import { formatPrice } from '@/libs/utils';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  if (!product) notFound();

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-20">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-platinum/5 rounded-lg overflow-hidden">
              <Image
                src={product.images.gallery[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-champagne' : ''
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-champagne font-medium mb-2">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-champagne text-champagne" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-platinum/60">({product.reviewCount} reviews)</span>
              </div>
              <p className="text-3xl font-bold text-champagne">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="luxury-divider" />

            <p className="text-platinum/80 leading-relaxed">{product.description}</p>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-platinum/80">
                    <Check className="w-5 h-5 text-champagne flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => addItem(product)}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <div className="luxury-divider" />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Specifications</h3>
              <dl className="space-y-2 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="text-platinum/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}