'use client';

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/libs/utils';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-obsidian shadow-luxury z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-platinum/10">
          <h2 className="text-xl font-serif font-semibold">Shopping Bag</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-platinum/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-platinum/20 mb-4" />
              <p className="text-platinum/60">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-24 h-24 bg-platinum/5 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images.main}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-platinum/60 mb-2">
                      {item.product.brand}
                    </p>
                    <p className="text-sm font-semibold text-champagne">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-platinum/20 rounded hover:bg-platinum/10 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-platinum/20 rounded hover:bg-platinum/10 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-xs text-platinum/60 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-platinum/10 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-champagne">{formatPrice(getTotalPrice())}</span>
            </div>
            <Link href="/store/checkout" onClick={closeCart}>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}