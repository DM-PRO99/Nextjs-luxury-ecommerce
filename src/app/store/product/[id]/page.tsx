import { notFound } from "next/navigation";

import { connectDB } from "@/libs/mongodb";
import ProductModel from "@/models/product";
import { serializeProduct } from "@/libs/products/serializers";
import { ProductDetail } from "./product-detail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;
  const product = await ProductModel.findById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={serializeProduct(product)} />;
}
