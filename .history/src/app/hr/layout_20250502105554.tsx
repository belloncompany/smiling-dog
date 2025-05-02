"use client";

import { ReactNode } from 'react';

interface HRLayoutProps {
  children: ReactNode;
}

export default function HRLayout({ children }: HRLayoutProps) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
} 