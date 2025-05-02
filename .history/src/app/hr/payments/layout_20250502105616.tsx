"use client";

import { ReactNode } from 'react';

interface HRPaymentsLayoutProps {
  children: ReactNode;
}

export default function HRPaymentsLayout({ children }: HRPaymentsLayoutProps) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
} 