"use client";

import { ReactNode } from 'react';
import { Sidebar } from '@/components/shared/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
} 