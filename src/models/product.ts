import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    collectionName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
      movement: String,
      caseMaterial: String,
      caseDiameter: String,
      waterResistance: String,
      crystal: String,
      strap: String,
    },
    images: {
      main: {
        type: ImageSchema,
        required: true,
      },
      gallery: {
        type: [ImageSchema],
        default: [],
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      enum: ["dress", "sport", "diving", "aviation", "complications"],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;

