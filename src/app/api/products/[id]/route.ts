import { NextResponse } from "next/server";

import { connectDB } from "@/libs/mongodb";
import Product from "@/models/product";
import { serializeProduct } from "@/libs/products/serializers";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: serializeProduct(product) });
  } catch (error) {
    console.error("GET /api/products/[id]", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}

