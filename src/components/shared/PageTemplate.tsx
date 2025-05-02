"use client";

import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface PageTemplateProps {
  title: string;
  description: string;
  children?: ReactNode;
  isUnderConstruction?: boolean;
}

export function PageTemplate({
  title,
  description,
  children,
  isUnderConstruction = true
}: PageTemplateProps) {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>

      {isUnderConstruction ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Página en construcción</h3>
            <p className="mt-1 text-sm text-gray-500">
              Esta sección está actualmente en desarrollo. Pronto estará disponible.
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
} 