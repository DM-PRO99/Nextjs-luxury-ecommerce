import { Product, Collection, Review } from "@/types/products";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Perpetual Chronograph",
    brand: "CHRONOS",
    collection: "Heritage Collection",
    price: 45000,
    originalPrice: 52000,
    description: "A masterpiece of horological engineering, combining timeless elegance with cutting-edge precision.",
    features: [
      "In-house automatic movement",
      "72-hour power reserve",
      "Water-resistant to 100m",
      "Anti-reflective sapphire crystal",
      "Hand-stitched alligator leather strap"
    ],
    specifications: {
      movement: "Automatic Caliber CH-2892",
      caseMaterial: "18k Rose Gold",
      caseDiameter: "42mm",
      waterResistance: "100m / 330ft",
      crystal: "Sapphire with AR coating",
      strap: "Hand-stitched Alligator Leather"
    },
    images: {
      main: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
        "https://images.unsplash.com/photo-1611858518888-f7a0c2c5c4b0?w=800&q=80",
      ],
    },
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 127,
    category: "dress"
  },
  {
    id: "2",
    name: "Diver Professional",
    brand: "AQUATICA",
    collection: "Ocean Series",
    price: 12500,
    description: "Professional diving instrument engineered for the depths.",
    features: [
      "Swiss automatic movement",
      "Unidirectional rotating bezel",
      "Helium escape valve",
      "Super-LumiNova markers",
    ],
    specifications: {
      movement: "Swiss ETA 2824-2",
      caseMaterial: "Stainless Steel 316L",
      caseDiameter: "44mm",
      waterResistance: "300m / 1000ft",
      crystal: "Sapphire with AR coating",
      strap: "Stainless Steel Bracelet"
    },
    images: {
      main: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
        "https://images.unsplash.com/photo-1611858518888-f7a0c2c5c4b0?w=800&q=80",
      ],
    },
    inStock: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 89,
    category: "diving"
  },
  {
    id: "3",
    name: "Aviator GMT",
    brand: "SKYMASTER",
    collection: "Flight Collection",
    price: 28000,
    description: "Inspired by aviation heritage, this GMT timepiece allows you to track multiple time zones.",
    features: ["GMT complication", "Date display", "Luminescent hands"],
    specifications: {
      movement: "Automatic GMT Caliber",
      caseMaterial: "Titanium Grade 5",
      caseDiameter: "43mm",
      waterResistance: "150m / 500ft",
      crystal: "Sapphire",
      strap: "Leather NATO"
    },
    images: {
      main: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"],
    },
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 64,
    category: "aviation"
  },
  {
    id: "4",
    name: "Moonphase Elegance",
    brand: "CHRONOS",
    collection: "Heritage Collection",
    price: 38500,
    originalPrice: 42000,
    description: "Sophisticated moonphase complication in a classic dress watch design.",
    features: [
      "Moonphase display",
      "Date and day indicators",
      "48-hour power reserve",
      "Scratch-resistant sapphire",
      "Crocodile leather strap"
    ],
    specifications: {
      movement: "Automatic Caliber CH-3001",
      caseMaterial: "18k White Gold",
      caseDiameter: "40mm",
      waterResistance: "50m / 165ft",
      crystal: "Sapphire with AR coating",
      strap: "Genuine Crocodile Leather"
    },
    images: {
      main: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80",
      ],
    },
    inStock: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 156,
    category: "complications"
  },
  {
    id: "5",
    name: "Sport Chronometer",
    brand: "VELOCE",
    collection: "Racing Series",
    price: 18900,
    description: "High-performance chronograph inspired by motorsport excellence.",
    features: [
      "Tachymeter scale",
      "Chronograph function",
      "Carbon fiber dial",
      "Ceramic bezel",
      "Rubber racing strap"
    ],
    specifications: {
      movement: "Automatic Chronograph",
      caseMaterial: "Stainless Steel with DLC",
      caseDiameter: "44mm",
      waterResistance: "100m / 330ft",
      crystal: "Sapphire",
      strap: "Rubber with deployment clasp"
    },
    images: {
      main: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80"],
    },
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 92,
    category: "sport"
  },
  {
    id: "6",
    name: "Deep Sea Explorer",
    brand: "AQUATICA",
    collection: "Ocean Series",
    price: 15800,
    description: "Professional dive watch rated for extreme depths.",
    features: [
      "Helium escape valve",
      "Unidirectional bezel",
      "Super-LumiNova hands",
      "Screw-down crown",
      "Extension clasp"
    ],
    specifications: {
      movement: "Swiss Automatic",
      caseMaterial: "Titanium",
      caseDiameter: "45mm",
      waterResistance: "500m / 1650ft",
      crystal: "Sapphire with AR coating",
      strap: "Titanium Bracelet"
    },
    images: {
      main: "https://images.unsplash.com/photo-1611858518888-f7a0c2c5c4b0?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1611858518888-f7a0c2c5c4b0?w=800&q=80"],
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 143,
    category: "diving"
  },
  {
    id: "7",
    name: "Classic Dress Watch",
    brand: "ELEGANTE",
    collection: "Timeless Series",
    price: 8500,
    description: "Understated elegance for the discerning gentleman.",
    features: [
      "Ultra-thin profile",
      "Manual winding",
      "Small seconds subdial",
      "Polished case",
      "Italian leather strap"
    ],
    specifications: {
      movement: "Manual Caliber EL-100",
      caseMaterial: "Stainless Steel",
      caseDiameter: "38mm",
      waterResistance: "30m / 100ft",
      crystal: "Sapphire",
      strap: "Italian Calfskin Leather"
    },
    images: {
      main: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80"],
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 78,
    category: "dress"
  },
  {
    id: "8",
    name: "Pilot's Chronograph",
    brand: "SKYMASTER",
    collection: "Flight Collection",
    price: 32000,
    originalPrice: 35500,
    description: "Military-inspired pilot watch with chronograph functionality.",
    features: [
      "Flyback chronograph",
      "Day-date display",
      "Anti-magnetic case",
      "Large crown for gloves",
      "NATO strap included"
    ],
    specifications: {
      movement: "Automatic Chronograph",
      caseMaterial: "Stainless Steel",
      caseDiameter: "46mm",
      waterResistance: "100m / 330ft",
      crystal: "Sapphire",
      strap: "Leather with NATO option"
    },
    images: {
      main: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80"],
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 201,
    category: "aviation"
  },
  {
    id: "9",
    name: "Skeleton Masterpiece",
    brand: "CHRONOS",
    collection: "Heritage Collection",
    price: 68000,
    description: "Exquisite skeleton movement showcasing the art of watchmaking.",
    features: [
      "Hand-engraved bridges",
      "Tourbillon escapement",
      "80-hour power reserve",
      "Exhibition caseback",
      "Limited edition"
    ],
    specifications: {
      movement: "Manual Tourbillon CH-5000",
      caseMaterial: "18k Rose Gold",
      caseDiameter: "42mm",
      waterResistance: "30m / 100ft",
      crystal: "Sapphire front and back",
      strap: "Alligator Leather"
    },
    images: {
      main: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80"],
    },
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 45,
    category: "complications"
  },
];

export const mockCollections: Collection[] = [
  {
    id: "heritage",
    name: "Heritage Collection",
    description: "Timeless designs inspired by our founding principles",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80",
    productCount: 12
  },
  {
    id: "ocean",
    name: "Ocean Series",
    description: "Professional diving instruments for the depths",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80",
    productCount: 8
  },
];

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "James Mitchell",
    rating: 5,
    date: "2024-10-15",
    title: "Absolutely Stunning",
    content: "The craftsmanship is impeccable. Every detail has been carefully considered.",
    verified: true
  },
];