'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/libs/utils';
import { Button } from '@/components/ui/button';

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? 'test';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const total = useMemo(() => getTotalPrice(), [getTotalPrice, items]);

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-20">
      <div className="luxury-container max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="relative w-20 h-20 bg-platinum/5 rounded-lg overflow-hidden">
                  <Image src={item.product.images.main.url} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-platinum/60">Qty: {item.quantity}</p>
                  <p className="text-champagne font-semibold">{formatPrice(item.product.price)}</p>
                </div>
              </div>
            ))}
            <div className="luxury-divider" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-champagne">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <p className="text-platinum/60">Completa tu compra con PayPal o realiza una orden manual.</p>
            <PayPalScriptProvider options={{ clientId: paypalClientId }}>
              <PayPalButtons
                style={{ layout: 'vertical', color: 'gold' }}
                createOrder={(_, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: Math.max(total, 1).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(_, actions) =>
                  actions?.order?.capture().then(() => {
                    toast.success('Pago completado con PayPal');
                    clearCart();
                  })
                }
                onError={(error) => {
                  console.error(error);
                  toast.error('No pudimos procesar el pago');
                }}
              />
            </PayPalScriptProvider>
            <Button size="lg" className="w-full">Completar compra manual</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
