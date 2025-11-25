import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/auth/options";
import { ProductForm } from "@/components/products/product-form";

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard/products/new");
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-16 px-4">
      <div className="luxury-container max-w-5xl">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-platinum/50">
            Admin • Productos
          </p>
          <h1 className="text-4xl font-serif font-bold text-platinum">
            Crear nuevo producto
          </h1>
          <p className="text-platinum/60 max-w-2xl">
            Completa el formulario para publicar un nuevo reloj en tu catálogo.
            Las imágenes se almacenarán automáticamente en Cloudinary.
          </p>
        </div>

        <ProductForm />
      </div>
    </div>
  );
}

