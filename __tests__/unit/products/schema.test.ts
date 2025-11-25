import { productPayloadSchema } from "@/libs/products/schema";

const basePayload = {
  name: "Perpetual Chronograph",
  brand: "Chronos",
  collection: "Heritage",
  description:
    "Legendary Swiss craftsmanship with a chronograph calibre and premium finishing.",
  shortDescription: "Limited edition chronograph.",
  price: 12500,
  originalPrice: 14900,
  category: "dress",
  currency: "USD",
  features: ["In-house calibre", "72h power reserve"],
  specifications: {
    movement: "CH-500",
    caseMaterial: "18k Rose Gold",
    caseDiameter: "42mm",
    waterResistance: "50m",
    crystal: "Sapphire",
    strap: "Alligator leather",
  },
  inStock: true,
  stock: 6,
  isNew: true,
  isFeatured: true,
  tags: ["limited", "chronograph"],
  mainImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
  galleryImages: [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUB",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUC",
  ],
};

describe("productPayloadSchema", () => {
  it("accepts a fully valid payload", async () => {
    await expect(productPayloadSchema.validate(basePayload)).resolves.toMatchObject({
      name: basePayload.name,
      price: basePayload.price,
    });
  });

  it("rejects payloads with invalid category", async () => {
    await expect(
      productPayloadSchema.validate(
        { ...basePayload, category: "invalid-category" },
        { abortEarly: false }
      )
    ).rejects.toThrow("Categoría inválida");
  });

  it("rejects payloads without the base64 main image", async () => {
    await expect(
      productPayloadSchema.validate(
        { ...basePayload, mainImage: undefined },
        { abortEarly: false }
      )
    ).rejects.toThrow("La imagen principal es obligatoria");
  });
});

