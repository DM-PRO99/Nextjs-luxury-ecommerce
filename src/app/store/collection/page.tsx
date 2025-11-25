import { headers } from "next/headers";

import { ProductCard } from "@/components/luxury/product-card";
import { Product } from "@/types/products";
import { staggerContainer } from "@/libs/motion";
import { motion } from "framer-motion";

const buildBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  const host = headers().get("host");
  return host ? `http://${host}` : "";
};

async function fetchAllProducts(): Promise<Product[]> {
  const baseUrl = buildBaseUrl();
  const endpoint = baseUrl
    ? `${baseUrl}/api/products?limit=50`
    : `/api/products?limit=50`;

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  const payload = await res.json();
  return payload.data ?? [];
}

export default async function CollectionPage() {
  const products = await fetchAllProducts();

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-20">
      <div className="luxury-container">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
          Our <span className="text-gradient-gold">Collection</span>
        </h1>
        <p className="text-platinum/60 text-lg mb-16">
          {products.length} Exceptional Timepieces
        </p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
