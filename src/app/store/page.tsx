'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts, mockCollections } from '@/libs/mock-data';
import { ProductCard } from '@/components/luxury/product-card';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/libs/motion';
import { ArrowRight, Award, Shield, Truck } from 'lucide-react';

export default function StorePage() {
  const featuredProducts = mockProducts.filter((p) => p.isFeatured);

  return (
    <div className="bg-obsidian">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80"
            alt="Luxury Watch"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/30 to-obsidian" />
        </div>

        <div className="relative z-10 luxury-container text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-champagne text-sm tracking-[0.3em] uppercase"
            >
              Swiss Craftsmanship Since 1875
            </motion.p>
            
            <motion.h1
              variants={fadeUp}
              className="font-serif font-bold text-6xl md:text-8xl lg:text-9xl text-platinum"
            >
              Timeless
              <br />
              <span className="text-gradient-gold">Elegance</span>
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="text-platinum/80 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Discover our curated collection of luxury Swiss timepieces,
              where heritage meets innovation
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex gap-4 justify-center pt-8">
              <Link href="/store">
                <Button size="lg" className="group">
                  Explore Collection
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/store">
                <Button size="lg" variant="outline">
                  New Arrivals
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-champagne/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-champagne rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="luxury-section border-y border-platinum/10">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Award, title: 'Swiss Made', desc: 'Certified Swiss craftsmanship' },
              { icon: Shield, title: '5-Year Warranty', desc: 'Comprehensive coverage' },
              { icon: Truck, title: 'Free Shipping', desc: 'On all orders worldwide' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-champagne" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-platinum/60">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="luxury-section">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured <span className="text-gradient-gold">Timepieces</span>
            </h2>
            <p className="text-platinum/60 text-lg max-w-2xl mx-auto">
              Handpicked selections from our most prestigious collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/store">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="luxury-section bg-platinum/5">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Explore Our <span className="text-gradient-gold">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/store`}
                className="group relative h-96 overflow-hidden rounded-lg"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-serif font-bold mb-2">{collection.name}</h3>
                  <p className="text-platinum/80 mb-4">{collection.description}</p>
                  <span className="text-champagne text-sm font-medium">
                    {collection.productCount} Timepieces →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}