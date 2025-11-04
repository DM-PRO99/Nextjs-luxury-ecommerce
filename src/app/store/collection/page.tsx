'use client';

import { mockProducts } from '@/libs/mock-data';
import { ProductCard } from '@/components/luxury/product-card';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/libs/motion';

export default function CollectionPage() {
  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-20">
      <div className="luxury-container">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
          Our <span className="text-gradient-gold">Collection</span>
        </h1>
        <p className="text-platinum/60 text-lg mb-16">
          {mockProducts.length} Exceptional Timepieces
        </p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}