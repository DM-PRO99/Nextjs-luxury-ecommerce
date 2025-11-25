'use client';

import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LANGS = [
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGS.find(lang => lang.code === i18n.language) || LANGS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-platinum/20 px-4 py-2 text-sm text-platinum/80 hover:bg-obsidian/50 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.label}</span>
        <span className="sm:hidden">{currentLang.short}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-obsidian border border-platinum/10 shadow-lg z-50">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm ${
                i18n.language === lang.code
                  ? 'bg-champagne/20 text-champagne'
                  : 'text-platinum/80 hover:bg-obsidian/50'
              } transition-colors first:rounded-t-lg last:rounded-b-lg`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

