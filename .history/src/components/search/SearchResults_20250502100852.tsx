"use client";

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/search';
import { Search, ArrowRight } from 'lucide-react';

export function SearchResults() {
  const { results, isOpen, query, setIsOpen } = useSearchStore();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : -1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleResultClick(results[selectedIndex].href);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isOpen, results, selectedIndex, setIsOpen]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  if (!isOpen || query.length === 0) return null;

  const handleResultClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[80vh] overflow-y-auto z-50"
    >
      {results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No se encontraron resultados para "{query}"
        </div>
      ) : (
        <div className="py-2">
          {results.map((result, index) => (
            <button
              key={result.id}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between group ${
                index === selectedIndex ? 'bg-gray-50' : ''
              }`}
              onClick={() => handleResultClick(result.href)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{result.label}</span>
                </div>
                {result.parentLabel && (
                  <p className="text-sm text-gray-500 ml-6">
                    en {result.parentLabel}
                  </p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 