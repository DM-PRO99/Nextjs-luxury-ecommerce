import { Header } from '@/components/store/header';
import { CartDrawer } from '@/components/cart/cart-drawer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <CartDrawer />
    </>
  );
}