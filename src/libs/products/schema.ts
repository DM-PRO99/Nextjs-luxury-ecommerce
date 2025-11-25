import * as yup from "yup";

export const PRODUCT_CATEGORIES = [
  "dress",
  "sport",
  "diving",
  "aviation",
  "complications",
] as const;

const productBaseSchema = yup.object({
  name: yup.string().trim().min(3).max(120).required("El nombre es obligatorio"),
  brand: yup
    .string()
    .trim()
    .min(2)
    .max(80)
    .required("La marca es obligatoria"),
  collection: yup.string().trim().max(120).optional(),
  description: yup
    .string()
    .trim()
    .min(20, "Describe el producto con al menos 20 caracteres")
    .required("La descripción es obligatoria"),
  shortDescription: yup.string().trim().max(240).optional(),
  price: yup
    .number()
    .typeError("El precio debe ser un número")
    .min(0)
    .required("El precio es obligatorio"),
  originalPrice: yup
    .number()
    .typeError("El precio original debe ser un número")
    .min(0)
    .optional(),
  category: yup
    .string()
    .oneOf(PRODUCT_CATEGORIES, "Categoría inválida")
    .required("Selecciona una categoría"),
  currency: yup.string().default("USD"),
  features: yup.array(yup.string().trim()).default([]),
  specifications: yup
    .object({
      movement: yup.string().optional(),
      caseMaterial: yup.string().optional(),
      caseDiameter: yup.string().optional(),
      waterResistance: yup.string().optional(),
      crystal: yup.string().optional(),
      strap: yup.string().optional(),
    })
    .default({}),
  inStock: yup.boolean().default(true),
  stock: yup
    .number()
    .typeError("El inventario debe ser un número")
    .min(0)
    .default(0),
  isNew: yup.boolean().default(false),
  isFeatured: yup.boolean().default(false),
  tags: yup.array(yup.string().trim()).default([]),
});

export const productPayloadSchema = productBaseSchema.shape({
  mainImage: yup.string().required("La imagen principal es obligatoria"),
  galleryImages: yup.array(yup.string()).max(4).default([]),
});

export const productFormSchema = productBaseSchema.shape({
  mainImageFile: yup
    .mixed<FileList>()
    .test("required", "Selecciona una imagen principal", (value) => {
      return value instanceof FileList ? value.length > 0 : !!value;
    })
    .nullable()
    .required("La imagen principal es obligatoria"),
  galleryImageFiles: yup
    .mixed<FileList>()
    .test("maxFiles", "Máximo 4 imágenes adicionales", (value) => {
      if (!value) return true;
      return value instanceof FileList ? value.length <= 4 : true;
    })
    .nullable()
    .optional(),
});

export type ProductPayload = yup.InferType<typeof productPayloadSchema>;
export type ProductFormValues = yup.InferType<typeof productFormSchema>;

