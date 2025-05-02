"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuItem, MENU_ITEMS } from '@/types/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = pathname?.startsWith(item.href);
    
    return (
      <div key={item.id}>
        <div
          className={cn(
            'flex items-center px-2 py-1.5 text-sm rounded-r-full cursor-pointer hover:bg-gray-100',
            isActive && 'bg-blue-100 hover:bg-blue-100 font-medium'
          )}
          onClick={() => item.items && toggleItem(item.id)}
        >
          {item.items ? (
            isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />
          ) : (
            <div className="w-5" />
          )}
          <Link href={item.href} className="flex-1">
            {item.label}
          </Link>
        </div>
        
        {item.items && isExpanded && (
          <div className="ml-4">
            {item.items.map(subItem => (
              <Link
                key={subItem.id}
                href={subItem.href}
                className={cn(
                  'block px-2 py-1.5 text-sm rounded-r-full hover:bg-gray-100',
                  pathname === subItem.href && 'bg-blue-100 hover:bg-blue-100 font-medium'
                )}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!mounted) {
    return (
      <div className="w-64 h-screen overflow-y-auto border-r bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Panel Admin</h1>
          </div>
          <nav className="opacity-50">
            {MENU_ITEMS.map(item => (
              <div key={item.id} className="px-2 py-1.5 text-sm">
                {item.label}
              </div>
            ))}
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-screen overflow-y-auto border-r bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Panel Admin</h1>
        </div>
        <nav>
          {MENU_ITEMS.map(renderMenuItem)}
        </nav>
      </div>
    </div>
  );
} 