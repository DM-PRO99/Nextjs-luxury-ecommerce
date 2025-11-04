'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, Search } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/libs/utils';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const scrolled = useScroll(50);
  const { getTotalItems, openCart } = useCart();
  const { data: session } = useSession();
  const totalItems = getTotalItems();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-obsidian/95 backdrop-blur-md border-b border-platinum/10 shadow-luxury'
          : 'bg-transparent'
      )}
    >
      <div className="luxury-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/store" className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-bold text-gradient-gold">
              CHRONOS
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/collection"
              className="text-sm font-medium text-platinum hover:text-champagne transition-colors"
            >
              Collection
            </Link>
            <Link
              href="/collection"
              className="text-sm font-medium text-platinum hover:text-champagne transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/collection"
              className="text-sm font-medium text-platinum hover:text-champagne transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-platinum hover:text-champagne transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 text-platinum hover:text-champagne transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:block text-sm font-medium">
                    {session.user?.name || session.user?.email?.split('@')[0] || 'Profile'}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-platinum/60 hover:text-champagne transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 text-platinum hover:text-champagne transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={openCart}
              className="relative p-2 text-platinum hover:text-champagne transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-champagne text-obsidian text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 text-platinum">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}