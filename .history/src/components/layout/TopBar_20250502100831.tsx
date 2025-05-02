"use client";

import { Search, Bell, Settings, User } from 'lucide-react';
import { useSearchStore } from '@/store/search';
import { SearchResults } from '@/components/search/SearchResults';

export function TopBar() {
  const { query, setQuery, setIsOpen } = useSearchStore();

  const handleSearchFocus = () => {
    if (query.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-4">
      <div className="flex-1 max-w-2xl relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleSearchFocus}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <SearchResults />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
} 