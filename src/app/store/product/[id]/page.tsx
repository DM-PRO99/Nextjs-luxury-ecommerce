import { notFound } from "next/navigation";

import { connectDB } from "@/libs/mongodb";
import ProductModel from "@/models/product";
import { serializeProduct } from "@/libs/products/serializers";
import { ProductDetail } from "./product-detail";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const product = await ProductModel.findById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={serializeProduct(product)} />;
}
