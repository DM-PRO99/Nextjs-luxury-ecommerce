'use client';

import Link from "next/link";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-obsidian/80 border-b border-platinum/10">
      <div className="luxury-container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/store" className="flex items-center gap-2 text-platinum">
          <span className="text-2xl font-serif tracking-[0.35em]">CHRONOS</span>
          <span className="text-xs uppercase text-platinum/60 hidden sm:inline">
            luxury timepieces
          </span>
        </Link>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <LanguageSwitcher />
          <Link
            href="/dashboard/products/new"
            className="hidden sm:inline-flex rounded-full border border-platinum/20 px-3 py-1 text-xs tracking-wide uppercase text-platinum/70 hover:text-champagne transition-colors"
          >
            Nuevo producto
          </Link>
        </div>
      </div>
    </header>
  );
}

