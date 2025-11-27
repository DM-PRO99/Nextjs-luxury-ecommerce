import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ValidationError } from "yup";

import { authOptions } from "@/libs/auth/options";
import { connectDB } from "@/libs/mongodb";
import Product from "@/models/product";
import { uploadImage } from "@/libs/cloudinary";
import { serializeProduct } from "@/libs/products/serializers";
import { productPayloadSchema } from "@/libs/products/schema";


export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 9);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort") ?? "createdAt";

    const filters: Record<string, any> = {};

    if (category && category !== "all") {
      filters.category = category;
    }

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { collection: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const skip = (Math.max(page, 1) - 1) * Math.max(limit, 1);
    const sortOptions: Record<string, 1 | -1> = {
      createdAt: -1,
      priceAsc: 1,
      priceDesc: -1,
    };

    const [products, total] = await Promise.all([
      Product.find(filters)
        .sort(
          sort === "priceAsc"
            ? { price: sortOptions.priceAsc }
            : sort === "priceDesc"
            ? { price: sortOptions.priceDesc }
            : { createdAt: sortOptions.createdAt }
        )
        .skip(skip)
        .limit(Math.max(limit, 1)),
      Product.countDocuments(filters),
    ]);

    return NextResponse.json({
      data: products.map(serializeProduct),
      pagination: {
        page: Math.max(page, 1),
        limit: Math.max(limit, 1),
        total,
        totalPages: Math.ceil(total / Math.max(limit, 1)) || 1,
      },
    });
  } catch (error) {
    console.error("GET /api/products", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const payload = await productPayloadSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const mainImage = await uploadImage(payload.mainImage);
    const galleryUploads = await Promise.all(
      (payload.galleryImages || []).filter((image): image is string => !!image).map((image) => uploadImage(image))
    );

    const product = await Product.create({
      name: payload.name,
      brand: payload.brand,
      collectionName: payload.collection,
      description: payload.description,
      shortDescription: payload.shortDescription,
      price: payload.price,
      originalPrice: payload.originalPrice,
      category: payload.category,
      currency: payload.currency,
      features: payload.features,
      specifications: payload.specifications,
      inStock: payload.inStock,
      stock: payload.stock,
      isNewProduct: payload.isNew,
      isFeatured: payload.isFeatured,
      tags: payload.tags,
      images: {
        main: { ...mainImage, alt: payload.name },
        gallery: galleryUploads.map((image, index) => ({
          ...image,
          alt: `${payload.name}-${index + 1}`,
        })),
      },
    });

    return NextResponse.json(
      { data: serializeProduct(product) },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.inner.map((issue) => ({
            path: issue.path,
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("POST /api/products", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}

