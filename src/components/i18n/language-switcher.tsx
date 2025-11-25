'use client';

import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LANGS = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-platinum/20 px-3 py-1 text-xs text-platinum/70">
      <Globe className="h-3.5 w-3.5" />
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-2 py-0.5 rounded-full transition-all ${
            i18n.language === lang.code
              ? "bg-champagne text-obsidian"
              : "text-platinum/70 hover:text-platinum"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

