import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Product from "@/models/product";

export async function GET() {
  try {
    await connectDB();
    
    // Check connection
    const dbStatus = "Connected";
    
    // Count products
    const totalProducts = await Product.countDocuments();
    
    // Get sample products
    const sampleProducts = await Product.find().limit(3);
    
    return NextResponse.json({
      status: "success",
      dbStatus,
      totalProducts,
      sampleProducts: sampleProducts.map(p => ({
        _id: p._id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        images: p.images,
        inStock: p.inStock
      }))
    });
    
  } catch (error) {
    console.error("Debug API error:", error);
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
