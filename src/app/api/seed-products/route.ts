import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Product from "@/models/product";

const sampleProducts = [
  {
    name: "Rolex Submariner Date",
    brand: "Rolex",
    collectionName: "Submariner",
    description: "El icónico reloj de buceo profesional con fecha, fabricado en acero inoxidable Oystersteel con bisel giratorio Cerachrom. Resistente al agua hasta 300 metros, movimiento automático Calibre 3235.",
    shortDescription: "Reloj de buceo profesional con fecha y bisel de cerámica",
    price: 8500,
    originalPrice: 9200,
    category: "diving",
    currency: "USD",
    features: ["Resistente al agua 300m", "Fecha", "Bisel Cerachrom", "Movimiento automático", "42mm"],
    specifications: {
      movement: "Automático Calibre 3235",
      caseMaterial: "Acero Oystersteel",
      caseDiameter: "42 mm",
      waterResistance: "300 metros",
      crystal: "Cristal de zafiro",
      strap: "Bralet de acero Oyster"
    },
    inStock: true,
    stock: 5,
    isNew: true,
    isFeatured: true,
    tags: ["lujo", "buceo", "profesional", "iconico"],
    mainImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    ]
  },
  {
    name: "Omega Speedmaster Moonwatch",
    brand: "Omega",
    collectionName: "Speedmaster",
    description: "El legendario reloj que acompañó a los astronautas en la misión Apollo 11. Movimiento manual Calibre 3861, cronógrafo certificado por METAS, caja de acero con bisel de aluminio.",
    shortDescription: "El cronógrafo espacial legendario",
    price: 6200,
    originalPrice: 6800,
    category: "aviation",
    currency: "USD",
    features: ["Cronógrafo", "Certificado METAS", "Movimiento manual", "42mm", "Histórico"],
    specifications: {
      movement: "Manual Calibre 3861",
      caseMaterial: "Acero inoxidable",
      caseDiameter: "42 mm",
      waterResistance: "50 metros",
      crystal: "Cristal de zafiro antirreflejos",
      strap: "Bralet de acero"
    },
    inStock: true,
    stock: 8,
    isNew: false,
    isFeatured: true,
    tags: ["espacial", "nasa", "cronógrafo", "histórico"],
    mainImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    ]
  },
  {
    name: "Patek Philippe Nautilus",
    brand: "Patek Philippe",
    collectionName: "Nautilus",
    description: "Elegante reloj deportivo de lujo con caja de acero y bisel horizontal. Movimiento automático Calibre 324 S C, fecha en ventana, elegante diseño integrado con corona protectora.",
    shortDescription: "Elegancia deportiva de alta relojería",
    price: 35000,
    originalPrice: 38000,
    category: "dress",
    currency: "USD",
    features: ["Movimiento automático", "Fecha", "Acero inoxidable", "40mm", "Lujo extremo"],
    specifications: {
      movement: "Automático Calibre 324 S C",
      caseMaterial: "Acero inoxidable",
      caseDiameter: "40 mm",
      waterResistance: "60 metros",
      crystal: "Cristal de zafiro",
      strap: "Bralet integrado de acero"
    },
    inStock: true,
    stock: 2,
    isNew: true,
    isFeatured: true,
    tags: ["lujo", "elegante", "inversor", "exclusivo"],
    mainImage: "https://images.unsplash.com/photo-1524592714765-34b70c2a8245?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1524592714765-34b70c2a8245?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524592714765-34b70c2a8245?w=400&h=400&fit=crop"
    ]
  },
  {
    name: "Tag Heuer Carrera Calibre 16",
    brand: "Tag Heuer",
    collectionName: "Carrera",
    description: "Cronógrafo deportivo inspirado en las carreras de automóviles. Movimiento automático Calibre 16, caja de acero de 41mm, esfera negra con subdiales de cronógrafo y fecha.",
    shortDescription: "Cronógrafo inspirado en carreras",
    price: 3200,
    originalPrice: 3500,
    category: "sport",
    currency: "USD",
    features: ["Cronógrafo", "Fecha", "Movimiento automático", "41mm", "Racing"],
    specifications: {
      movement: "Automático Calibre 16",
      caseMaterial: "Acero inoxidable",
      caseDiameter: "41 mm",
      waterResistance: "100 metros",
      crystal: "Cristal de zafiro",
      strap: "Cuero negro con costuras"
    },
    inStock: true,
    stock: 12,
    isNew: false,
    isFeatured: false,
    tags: ["deportivo", "cronógrafo", "automovilismo", "accesible"],
    mainImage: "https://images.unsplash.com/photo-1515377909964-cea7111295a7?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1515377909964-cea7111295a7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515377909964-cea7111295a7?w=400&h=400&fit=crop"
    ]
  },
  {
    name: "Breitling Navitimer 1",
    brand: "Breitling",
    collectionName: "Navitimer",
    description: "Icono de la aviación con regla de cálculo deslizante y cronógrafo. Movimiento automático Calibre B01, caja de acero de 46mm, bisel con regla de cálculo funcional.",
    shortDescription: "El reloj de piloto por excelencia",
    price: 7800,
    originalPrice: 8500,
    category: "aviation",
    currency: "USD",
    features: ["Regla de cálculo", "Cronógrafo", "46mm", "Aviación", "Movimiento B01"],
    specifications: {
      movement: "Automático Calibre B01",
      caseMaterial: "Acero inoxidable",
      caseDiameter: "46 mm",
      waterResistance: "30 metros",
      crystal: "Cristal de zafiro antirreflejos",
      strap: "Bralet de acero o cuero"
    },
    inStock: true,
    stock: 6,
    isNew: false,
    isFeatured: true,
    tags: ["aviación", "cronógrafo", "profesional", "instrumental"],
    mainImage: "https://images.unsplash.com/photo-1598393004018-4db5aba7544c?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1598393004018-4db5aba7544c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598393004018-4db5aba7544c?w=400&h=400&fit=crop"
    ]
  },
  {
    name: "Audemars Piguet Royal Oak",
    brand: "Audemars Piguet",
    collectionName: "Royal Oak",
    description: "Revolucionario diseño de reloj deportivo de lujo con octágono y tapón. Movimiento automático visible a través del fondo de cristal, acabado haute horlogerie.",
    shortDescription: "Diseño icónico de lujo deportivo",
    price: 45000,
    originalPrice: 48000,
    category: "dress",
    currency: "USD",
    features: ["Diseño icónico", "Movimiento visible", "41mm", "Octágono", "Lujo extremo"],
    specifications: {
      movement: "Automático Calibre 2121",
      caseMaterial: "Acero inoxidable",
      caseDiameter: "41 mm",
      waterResistance: "50 metros",
      crystal: "Cristal de zafiro",
      strap: "Bralet integrado de acero"
    },
    inStock: true,
    stock: 1,
    isNew: true,
    isFeatured: true,
    tags: ["lujo", "diseño", "exclusivo", "inversor"],
    mainImage: "https://images.unsplash.com/photo-1549692520-59acee642fe2?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1549692520-59acee642fe2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549692520-59acee642fe2?w=400&h=400&fit=crop"
    ]
  },
  {
    name: "Seiko Prospex Diver",
    brand: "Seiko",
    collectionName: "Prospex",
    description: "Reloj de buceo profesional japonés con movimiento automático. Caja de acero de 45mm, bisel unidireccional, resistencia al agua 200m, excelente relación calidad-precio.",
    shortDescription: "Buceo profesional japonés",
    price: 450,
    originalPrice: 500,
    category: "diving",
    currency: "USD",
    features: ["200m resistencia", "Movimiento automático", "45mm", "Excelente valor", "Japonés"],
    specifications: {
      movement: "Automático 4R36",
      caseMaterial: "Acero inoxidable",
      caseDiameter: "45 mm",
      waterResistance: "200 metros",
      crystal: "Hardlex cristal",
      strap: "Silicona o acero"
    },
    inStock: true,
    stock: 20,
    isNew: false,
    isFeatured: false,
    tags: ["accesible", "buceo", "japones", "valor"],
    mainImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop"
    ]
  },
  {
    name: "Jaeger-LeCoultre Master Ultra Thin",
    brand: "Jaeger-LeCoultre",
    collectionName: "Master Ultra Thin",
    description: "Elegancia suprema con solo 7.45mm de grosor. Movimiento ultra delgado manual, caja de oro rosa 39mm, diseño clásico atemporal para ocasiones formales.",
    shortDescription: "Elegancia ultra delgada",
    price: 12000,
    originalPrice: 13000,
    category: "dress",
    currency: "USD",
    features: ["Ultra delgado 7.45mm", "Oro rosa", "Movimiento manual", "39mm", "Elegante"],
    specifications: {
      movement: "Manual Calibre 849",
      caseMaterial: "Oro rosa 18K",
      caseDiameter: "39 mm",
      waterResistance: "30 metros",
      crystal: "Cristal de zafiro",
      strap: "Cuero de aligátor"
    },
    inStock: true,
    stock: 3,
    isNew: true,
    isFeatured: false,
    tags: ["elegante", "ultra delgado", "formal", "lujo"],
    mainImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
    ]
  }
];

export async function POST(request: Request) {
  try {
    console.log("🌱 Starting product seeding for production database");
    
    await connectDB();
    console.log("🔗 Connected to production database");
    
    // Delete existing products
    await Product.deleteMany({});
    console.log("🧹 Cleared existing products");
    
    // Insert new products
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${result.length} products`);
    
    // Show summary
    const categories: Record<string, number> = {};
    sampleProducts.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });
    
    const prices = sampleProducts.map(p => p.price);
    
    return NextResponse.json({
      success: true,
      message: "Products seeded successfully",
      data: {
        totalProducts: result.length,
        categories,
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        },
        products: sampleProducts.map(p => ({
          name: p.name,
          brand: p.brand,
          price: p.price,
          category: p.category
        }))
      }
    });
    
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    message: "Use POST to seed products",
    usage: "POST /api/seed-products"
  });
}
