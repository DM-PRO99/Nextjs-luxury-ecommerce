'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-obsidian/90 border-b border-platinum/10">
      <div className="luxury-container">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link 
            href="/store" 
            className="flex items-center gap-2 text-platinum group"
            aria-label="Home"
          >
            <span className="text-2xl font-serif tracking-[0.35em] group-hover:text-champagne transition-colors">
              CHRONOS
            </span>
            <span className="hidden sm:inline text-xs uppercase text-platinum/60 group-hover:text-champagne/70 transition-colors">
              luxury timepieces
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            <div className="hidden md:block">
              <Link href="/dashboard/products/new">
                <Button 
                  variant="outline" 
                  className="border-platinum/20 text-platinum/80 hover:bg-champagne/10 hover:text-champagne hover:border-champagne/30 transition-colors"
                >
                  Nuevo producto
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}





