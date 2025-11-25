import { headers } from "next/headers";

import { StoreClient, FilterState } from "./store-client";
import { Product } from "@/types/products";

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ProductsResponse = {
  data: Product[];
  pagination: Pagination;
};

const buildBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  const host = headers().get("host");
  return host ? `http://${host}` : "";
};

const sanitizeParam = (value?: string | string[]) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

async function fetchProducts(searchParams: Record<string, string | string[] | undefined>) {
  const baseUrl = buildBaseUrl();
  const params = new URLSearchParams();

  const allowedParams = ["page", "category", "search", "sort", "minPrice", "maxPrice"];
  allowedParams.forEach((param) => {
    const value = sanitizeParam(searchParams[param]);
    if (value) {
      params.set(param, value);
    }
  });

  const endpoint = baseUrl
    ? `${baseUrl}/api/products?${params.toString()}`
    : `/api/products?${params.toString()}`;

  const response = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return (await response.json()) as ProductsResponse;
}

export default async function StorePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let productsResponse: ProductsResponse = {
    data: [],
    pagination: { page: 1, limit: 9, total: 0, totalPages: 1 },
  };

  try {
    productsResponse = await fetchProducts(searchParams);
  } catch (error) {
    console.error("[store/page] Error fetching products", error);
  }

  const initialFilters: FilterState = {
    page: Number(sanitizeParam(searchParams.page)) || 1,
    category: (sanitizeParam(searchParams.category) as FilterState["category"]) || "all",
    search: sanitizeParam(searchParams.search),
    sort: (sanitizeParam(searchParams.sort) as "createdAt" | "priceAsc" | "priceDesc") || "createdAt",
    minPrice: sanitizeParam(searchParams.minPrice),
    maxPrice: sanitizeParam(searchParams.maxPrice),
  };

  return (
    <StoreClient
      initialProducts={productsResponse.data}
      pagination={productsResponse.pagination}
      initialFilters={initialFilters}
    />
  );
}