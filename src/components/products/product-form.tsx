'use client';

import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
  Chip,
  Box,
  Typography,
  Button as MuiButton,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import Image from "next/image";

import styles from "./product-form.module.scss";
import {
  PRODUCT_CATEGORIES,
  ProductFormValues,
} from "@/libs/products/schema";

const textFieldStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    color: "#f5f5f5",
  },
  "& .MuiInputBase-input": {
    color: "#f5f5f5",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.6)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.2)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(251, 191, 36, 0.5)",
  },
};

const fileInputClasses =
  "mt-2 w-full rounded-xl border border-dashed border-platinum/30 p-6 text-center text-sm text-platinum/60 cursor-pointer hover:border-champagne/60 transition-colors";

const defaultValues: ProductFormValues = {
  name: "",
  brand: "",
  collection: undefined,
  description: "",
  shortDescription: undefined,
  price: 0,
  originalPrice: undefined,
  category: PRODUCT_CATEGORIES[0],
  currency: "USD",
  features: [],
  specifications: {
    movement: "",
    caseMaterial: "",
    caseDiameter: "",
    waterResistance: "",
    crystal: "",
    strap: "",
  },
  inStock: true,
  stock: 0,
  isNew: false,
  isFeatured: false,
  tags: [],
  mainImageFile: null,
  galleryImageFiles: null,
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function ProductForm() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
    watch,
  } = useForm<ProductFormValues>({
    defaultValues,
    mode: 'onChange',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const features = watch("features");
  const tags = watch("tags");

  useEffect(() => {
    return () => {
      if (mainPreview) URL.revokeObjectURL(mainPreview);
      galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mainPreview, galleryPreviews]);

  const canSubmit = useMemo(() => !isSubmitting, [isSubmitting]);

  const addChip = (type: "features" | "tags", value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const current = getValues(type) || [];
    if (current.includes(trimmed)) return;
    setValue(type, [...current, trimmed], {
      shouldDirty: true,
      shouldValidate: true,
    });
    if (type === "features") {
      setFeatureInput("");
    } else {
      setTagInput("");
    }
  };

  const removeChip = (type: "features" | "tags", value: string) => {
    const current = getValues(type) || [];
    setValue(
      type,
      current.filter((item) => item !== value),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      const { mainImageFile, galleryImageFiles, ...rest } = values;
      
      // Manual validation for file inputs
      if (!mainImageFile || !(mainImageFile instanceof FileList) || mainImageFile.length === 0) {
        toast.error("Selecciona una imagen principal");
        return;
      }

      const mainFile = mainImageFile.item(0);
      if (!mainFile) {
        toast.error("Selecciona una imagen principal");
        return;
      }

      // Validate gallery images if provided
      if (galleryImageFiles && galleryImageFiles instanceof FileList && galleryImageFiles.length > 4) {
        toast.error("Máximo 4 imágenes adicionales");
        return;
      }

      const mainImage = await fileToBase64(mainFile);
      const galleryImages = galleryImageFiles && galleryImageFiles instanceof FileList
        ? await Promise.all(
            Array.from(galleryImageFiles).map((file) => fileToBase64(file))
          )
        : [];

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          mainImage,
          galleryImages,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Error al crear el producto");
      }

      toast.success("Producto creado correctamente ✅");
      reset(defaultValues);
      setMainPreview(null);
      setGalleryPreviews([]);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "No pudimos crear el producto"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMainPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    }
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const urls = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setGalleryPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return urls;
    });
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <div>
          <p className={styles.sectionTitle}>Información principal</p>
          <div className={`${styles.grid} ${styles.twoCol}`}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  fullWidth
                  sx={textFieldStyles}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Marca"
                  fullWidth
                  sx={textFieldStyles}
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                />
              )}
            />
            <Controller
              name="collection"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Colección"
                  fullWidth
                  sx={textFieldStyles}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Categoría"
                  fullWidth
                  sx={textFieldStyles}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  {PRODUCT_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              fullWidth
              multiline
              minRows={4}
              sx={textFieldStyles}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <div className={`${styles.grid} ${styles.twoCol}`}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Precio"
                fullWidth
                sx={textFieldStyles}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
          <Controller
            name="originalPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Precio original"
                fullWidth
                sx={textFieldStyles}
                error={!!errors.originalPrice}
                helperText={errors.originalPrice?.message}
              />
            )}
          />
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Inventario"
                fullWidth
                sx={textFieldStyles}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            )}
          />
        </div>

        <div>
          <p className={styles.sectionTitle}>Especificaciones</p>
          <div className={`${styles.grid} ${styles.twoCol}`}>
            {(
              [
                "movement",
                "caseMaterial",
                "caseDiameter",
                "waterResistance",
                "crystal",
                "strap",
              ] as const
            ).map((spec) => (
              <Controller
                key={spec}
                name={`specifications.${spec}`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={spec}
                    fullWidth
                    sx={textFieldStyles}
                  />
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <p className={styles.sectionTitle}>Características</p>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Agregar característica"
              value={featureInput}
              onChange={(event) => setFeatureInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addChip("features", featureInput);
                }
              }}
              fullWidth
              sx={textFieldStyles}
            />
            <MuiButton
              variant="outlined"
              onClick={() => addChip("features", featureInput)}
            >
              Añadir
            </MuiButton>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {features?.map((feature) => (
              <Chip
                key={feature}
                label={feature}
                onDelete={() => removeChip("features", feature)}
                sx={{ color: "#f5f5f5" }}
              />
            ))}
          </Stack>
        </div>

        <div className="grid gap-4">
          <p className={styles.sectionTitle}>Tags</p>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Agregar tag"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addChip("tags", tagInput);
                }
              }}
              fullWidth
              sx={textFieldStyles}
            />
            <MuiButton
              variant="outlined"
              onClick={() => addChip("tags", tagInput)}
            >
              Añadir
            </MuiButton>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => removeChip("tags", tag)}
                sx={{ color: "#f5f5f5" }}
              />
            ))}
          </Stack>
        </div>

        <div className={`${styles.grid} ${styles.twoCol}`}>
          <FormControlLabel
            control={
              <Controller
                name="inStock"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    sx={{ color: "#d1d5db" }}
                  />
                )}
              />
            }
            label="Disponible"
          />
          <FormControlLabel
            control={
              <Controller
                name="isNew"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    sx={{ color: "#d1d5db" }}
                  />
                )}
              />
            }
            label="Nuevo"
          />
          <FormControlLabel
            control={
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    sx={{ color: "#d1d5db" }}
                  />
                )}
              />
            }
            label="Destacado"
          />
        </div>

        <div>
          <p className={styles.sectionTitle}>Imágenes</p>
          <div className={`${styles.grid} ${styles.twoCol}`}>
            <div>
              <Typography variant="subtitle2" color="secondary">
                Imagen principal
              </Typography>
              <label className={fileInputClasses}>
                <Controller
                  name="mainImageFile"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={(event) => {
                        const files = event.target.files ?? undefined;
                        field.onChange(files);
                        handleMainImageChange(event);
                      }}
                    />
                  )}
                />
                <span>Haz clic para subir</span>
              </label>
              {errors.mainImageFile && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.mainImageFile.message?.toString()}
                </p>
              )}
              {mainPreview && (
                <Box mt={2}>
                  <Image
                    src={mainPreview}
                    alt="main preview"
                    width={320}
                    height={320}
                    className="rounded-xl border border-platinum/20 object-cover"
                  />
                </Box>
              )}
            </div>

            <div>
              <Typography variant="subtitle2" color="secondary">
                Galería (hasta 4)
              </Typography>
              <label className={fileInputClasses}>
                <Controller
                  name="galleryImageFiles"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={(event) => {
                        const files = event.target.files ?? undefined;
                        field.onChange(files);
                        handleGalleryChange(event);
                      }}
                    />
                  )}
                />
                <span>Subir imágenes adicionales</span>
              </label>
              {errors.galleryImageFiles && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.galleryImageFiles.message?.toString()}
                </p>
              )}
              {galleryPreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {galleryPreviews.map((preview) => (
                    <Image
                      key={preview}
                      src={preview}
                      alt="gallery preview"
                      width={180}
                      height={180}
                      className="rounded-lg border border-platinum/10 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MuiButton
        type="submit"
        variant="contained"
        size="large"
        sx={{
          mt: 4,
          backgroundColor: "#d1a054",
          color: "#0a0f1e",
          paddingY: "0.9rem",
          borderRadius: "14px",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#f1c27d",
          },
        }}
        disabled={!canSubmit}
      >
        {isSubmitting ? (
          <CircularProgress size={24} sx={{ color: "#0a0f1e" }} />
        ) : (
          "Guardar producto"
        )}
      </MuiButton>
    </form>
  );
}

