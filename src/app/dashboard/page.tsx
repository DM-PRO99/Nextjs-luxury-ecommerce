import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Plus, TrendingUp, Users } from "lucide-react";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-obsidian p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-platinum mb-2">
            Panel de Administración
          </h1>
          <p className="text-platinum/60">
            Gestiona tu ecommerce de relojes de lujo
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/dashboard/products">
            <div className="bg-obsidian/50 border border-platinum/10 rounded-xl p-6 hover:border-champagne/50 transition-colors cursor-pointer">
              <Package className="w-8 h-8 text-champagne mb-4" />
              <h3 className="text-lg font-semibold text-platinum mb-2">
                Ver Productos
              </h3>
              <p className="text-platinum/60 text-sm">
                Gestiona tu catálogo completo
              </p>
            </div>
          </Link>

          <Link href="/dashboard/products/new">
            <div className="bg-obsidian/50 border border-platinum/10 rounded-xl p-6 hover:border-champagne/50 transition-colors cursor-pointer">
              <Plus className="w-8 h-8 text-champagne mb-4" />
              <h3 className="text-lg font-semibold text-platinum mb-2">
                Nuevo Producto
              </h3>
              <p className="text-platinum/60 text-sm">
                Agrega un nuevo reloj
              </p>
            </div>
          </Link>

          <div className="bg-obsidian/50 border border-platinum/10 rounded-xl p-6">
            <TrendingUp className="w-8 h-8 text-champagne mb-4" />
            <h3 className="text-lg font-semibold text-platinum mb-2">
              Ventas
            </h3>
            <p className="text-platinum/60 text-sm">
              Próximamente
            </p>
          </div>

          <div className="bg-obsidian/50 border border-platinum/10 rounded-xl p-6">
            <Users className="w-8 h-8 text-champagne mb-4" />
            <h3 className="text-lg font-semibold text-platinum mb-2">
              Clientes
            </h3>
            <p className="text-platinum/60 text-sm">
              Próximamente
            </p>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-obsidian/50 border border-platinum/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-platinum mb-4">
            Acceso Rápido
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/products">
              <Button className="bg-champagne text-obsidian hover:bg-champagne/90">
                <Package className="w-4 h-4 mr-2" />
                Ver Todos los Productos
              </Button>
            </Link>
            <Link href="/dashboard/products/new">
              <Button variant="outline" className="border-platinum/20 text-platinum hover:bg-platinum/10">
                <Plus className="w-4 h-4 mr-2" />
                Crear Producto
              </Button>
            </Link>
            <Link href="/store" target="_blank">
              <Button variant="outline" className="border-platinum/20 text-platinum hover:bg-platinum/10">
                Ver Tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
