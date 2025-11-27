'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2, Eye } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data || []);
      } else {
        throw new Error("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    setDeleting(productId);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter(p => p._id !== productId));
        toast.success("Producto eliminado correctamente");
      } else {
        throw new Error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error al eliminar producto");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-champagne" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-platinum mb-2">
              Gestión de Productos
            </h1>
            <p className="text-platinum/60">
              {products.length} productos en total
            </p>
          </div>
          
          <Link href="/dashboard/products/new">
            <Button className="bg-champagne text-obsidian hover:bg-champagne/90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-platinum/40 mb-4">
              <div className="w-24 h-24 mx-auto bg-platinum/10 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-12 h-12" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-platinum mb-2">
              No hay productos
            </h3>
            <p className="text-platinum/60 mb-6">
              Crea tu primer producto para empezar
            </p>
            <Link href="/dashboard/products/new">
              <Button className="bg-champagne text-obsidian hover:bg-champagne/90">
                <Plus className="w-4 h-4 mr-2" />
                Crear Producto
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-obsidian/50 border border-platinum/10 rounded-xl overflow-hidden hover:border-champagne/50 transition-colors"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-platinum/5">
                  {product.images?.main?.url ? (
                    <Image
                      src={product.images.main.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-platinum/20">
                        <div className="w-16 h-16 bg-platinum/10 rounded-full flex items-center justify-center">
                          <Plus className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.isNew && (
                      <span className="bg-champagne text-obsidian text-xs px-2 py-1 rounded-full font-semibold">
                        Nuevo
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="bg-obsidian/80 text-platinum text-xs px-2 py-1 rounded-full font-semibold backdrop-blur-sm">
                        Destacado
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-platinum text-sm mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-platinum/60 text-xs">{product.brand}</p>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-champagne font-bold">
                        ${product.price?.toLocaleString()}
                      </p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-platinum/40 line-through text-xs">
                          ${product.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.inStock ? 'Stock' : 'Agotado'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/store/product/${product._id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-platinum/20 text-platinum hover:bg-platinum/10"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    
                    <Link
                      href={`/dashboard/products/edit/${product._id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-platinum/20 text-platinum hover:bg-platinum/10"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                    </Link>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product._id!)}
                      disabled={deleting === product._id}
                      className="border-red-500/20 text-red-400 hover:bg-red-500/10 px-3"
                    >
                      {deleting === product._id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
