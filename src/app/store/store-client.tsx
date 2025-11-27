'use client';

import { useEffect, useMemo, useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Loader2, Search } from "lucide-react";

import "@/libs/i18n/config";
import { mockCollections } from "@/libs/mock-data";
import { Product, ProductCategory } from "@/types/products";
import { ProductCard } from "@/components/luxury/product-card";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type FilterState = {
  page: number;
  category: ProductCategory | "all";
  search?: string;
  sort?: "createdAt" | "priceAsc" | "priceDesc";
  minPrice?: string;
  maxPrice?: string;
};

interface StoreClientProps {
  initialProducts: Product[];
  pagination: Pagination;
  initialFilters: FilterState;
}

const categoryFilters: FilterState["category"][] = [
  "all",
  "dress",
  "sport",
  "diving",
  "aviation",
  "complications",
];

export function StoreClient({
  initialProducts,
  pagination,
  initialFilters,
}: StoreClientProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(initialFilters.search ?? "");
  const { t } = useTranslation();

  useEffect(() => {
    setFilters(initialFilters);
    setSearchInput(initialFilters.search ?? "");
  }, [initialFilters]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        applyFilters({ search: searchInput });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, filters.search, applyFilters]);

  const applyFilters = useCallback((partial: Partial<FilterState>) => {
    const nextFilters: FilterState = {
      ...filters,
      ...partial,
      page: partial.page ?? filters.page,
    };

    // Reset page when filters change (except when page is explicitly provided)
    if (
      partial.category !== undefined ||
      partial.search !== undefined ||
      partial.sort !== undefined ||
      partial.minPrice !== undefined ||
      partial.maxPrice !== undefined
    ) {
      nextFilters.page = 1;
    }

    setFilters(nextFilters);

    // NO actualizamos la URL - solo actualizamos el estado interno
    // Los filtros se aplicarán internamente sin cambiar la URL
  }, [filters]);

  const featuredProducts = useMemo(() => {
    if (initialProducts.length === 0) return [];
    return initialProducts.filter((product) => product.isFeatured).slice(0, 3);
  }, [initialProducts]);

  // Filtrar productos localmente basados en los filtros actuales
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Filtrar por categoría
    if (filters.category !== "all") {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filtrar por búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por precio
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(filters.maxPrice));
    }

    // Ordenar
    switch (filters.sort) {
      case "priceAsc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "createdAt":
      default:
        // Mantener orden original (asumimos que es por fecha de creación)
        break;
    }

    return filtered;
  }, [initialProducts, filters]);

  // Calcular paginación localmente
  const paginatedProducts = useMemo(() => {
    const startIndex = (filters.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, filters.page, pagination.limit]);

  const localPagination = useMemo(() => ({
    page: filters.page,
    limit: pagination.limit,
    total: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / pagination.limit) || 1,
  }), [filteredProducts.length, filters.page, pagination.limit]);

  const handlePagination = (direction: "prev" | "next") => {
    if (direction === "prev" && filters.page > 1) {
      applyFilters({ page: filters.page - 1 });
    }
    if (direction === "next" && filters.page < localPagination.totalPages) {
      applyFilters({ page: filters.page + 1 });
    }
  };

  return (
    <div className="bg-obsidian">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80"
            alt="Luxury Watch"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
        </div>
        <div className="relative z-10 luxury-container text-center space-y-6">
          <p className="text-champagne text-sm tracking-[0.3em] uppercase">
            Swiss Craftsmanship Since 1875
          </p>
          <h1 className="font-serif font-bold text-6xl md:text-7xl text-platinum">
            {t("hero.title")}
          </h1>
          <p className="text-platinum/80 text-lg max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#catalog">
              <Button size="lg">{t("hero.explore")}</Button>
            </Link>
            <Link href="/dashboard/products/new">
              <Button size="lg" variant="outline">
                {t("hero.create")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="catalog" className="luxury-section border-t border-platinum/10">
        <div className="luxury-container space-y-10">
          <div className="grid gap-6 bg-platinum/5 rounded-3xl border border-platinum/10 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-lg font-medium text-platinum/70">{t("filters.category")}</p>
              <LanguageSwitcher />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum/40" />
                <input
                  type="text"
                  placeholder={t("filters.searchPlaceholder")}
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  className="w-full bg-platinum/10 border border-platinum/10 rounded-2xl py-3 pl-12 pr-4 text-platinum focus:border-champagne transition-colors"
                />
              </div>
              <select
                name="category"
                className="bg-platinum/10 border border-platinum/10 rounded-2xl px-4 py-3 text-platinum focus:border-champagne transition-colors"
                value={filters.category}
                onChange={(event) =>
                  applyFilters({ category: event.target.value as FilterState["category"] })
                }
              >
                {categoryFilters.map((category) => (
                  <option key={category} value={category}>
                    {t(`filters.categories.${category}`)}
                  </option>
                ))}
              </select>
              <select
                className="bg-platinum/10 border border-platinum/10 rounded-2xl px-4 py-3 text-platinum focus:border-champagne transition-colors"
                value={filters.sort ?? "createdAt"}
                onChange={(event) =>
                  applyFilters({ sort: event.target.value as FilterState["sort"] })
                }
              >
                <option value="createdAt">{t("filters.sortRecent")}</option>
                <option value="priceAsc">{t("filters.sortPriceAsc")}</option>
                <option value="priceDesc">{t("filters.sortPriceDesc")}</option>
              </select>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t("filters.min")}
                  className="w-1/2 bg-platinum/10 border border-platinum/10 rounded-2xl px-3 py-3 text-platinum"
                  value={filters.minPrice ?? ""}
                  onChange={(event) => applyFilters({ minPrice: event.target.value })}
                />
                <input
                  type="number"
                  placeholder={t("filters.max")}
                  className="w-1/2 bg-platinum/10 border border-platinum/10 rounded-2xl px-3 py-3 text-platinum"
                  value={filters.maxPrice ?? ""}
                  onChange={(event) => applyFilters({ maxPrice: event.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-platinum/60">
              <span>
                {t("filters.results", {
                  page: localPagination.page,
                  pages: localPagination.totalPages,
                  total: localPagination.total,
                })}
              </span>
              {isPending && (
                <span className="inline-flex items-center gap-2 text-champagne">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Actualizando
                </span>
              )}
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-serif text-platinum mb-4">
                {t("filters.emptyTitle")}
              </p>
              <p className="text-platinum/60 mb-8">{t("filters.emptySubtitle")}</p>
              <Link href="/dashboard/products/new">
                <Button>{t("filters.create")}</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border border-platinum/10 rounded-2xl p-4">
            <Button
              variant="outline"
              onClick={() => handlePagination("prev")}
              disabled={localPagination.page === 1 || isPending}
            >
              {t("filters.prev")}
            </Button>
            <span className="text-platinum/60 text-sm">
              {t("filters.results", {
                page: localPagination.page,
                pages: localPagination.totalPages,
                total: localPagination.total,
              })}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePagination("next")}
              disabled={localPagination.page === localPagination.totalPages || isPending}
            >
              {t("filters.next")}
            </Button>
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
                href={`/store?category=${collection.id === "heritage" ? "dress" : "diving"}`}
                className="group relative h-96 overflow-hidden rounded-lg"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    {collection.name}
                  </h3>
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

