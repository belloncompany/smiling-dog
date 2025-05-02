import { create } from 'zustand';
import { MENU_ITEMS, MenuItem } from '@/types/navigation';

interface SearchResult {
  id: string;
  label: string;
  href: string;
  category: string;
  parentLabel?: string;
}

interface SearchStore {
  query: string;
  results: SearchResult[];
  isOpen: boolean;
  setQuery: (query: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  search: () => void;
}

const flattenMenuItems = (items: MenuItem[], parentLabel?: string): SearchResult[] => {
  return items.reduce<SearchResult[]>((acc, item) => {
    const result = {
      id: item.id,
      label: item.label,
      href: item.href,
      category: parentLabel || item.label,
      ...(parentLabel && { parentLabel })
    };

    if (item.items) {
      return [...acc, result, ...flattenMenuItems(item.items, item.label)];
    }

    return [...acc, result];
  }, []);
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  results: [],
  isOpen: false,
  setQuery: (query: string) => {
    set({ query });
    if (query.length > 0) {
      get().search();
    } else {
      set({ results: [] });
    }
  },
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  search: () => {
    const { query } = get();
    const allItems = flattenMenuItems(MENU_ITEMS);
    
    const results = allItems.filter(item => {
      const searchString = `${item.label} ${item.category} ${item.parentLabel || ''}`.toLowerCase();
      return searchString.includes(query.toLowerCase());
    });

    set({ results, isOpen: true });
  }
})); 