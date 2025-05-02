"use client";

import { PageTemplate } from '@/components/shared/PageTemplate';

export default function Page() {
  return (
    <PageTemplate
      title="Integraciones"
      description="Gestión de integraciones con sistemas externos"
      isUnderConstruction={false}
    >
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Contenido Básico</h2>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-lg border border-blue-600">
              Acción Principal
            </button>
          </div>
          
          <p className="text-gray-500">
            Esta es una página básica para la sección de integraciones. 
            Aquí podrás gestionar y visualizar toda la información relacionada.
          </p>
          
          <div className="mt-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Placeholder para contenido futuro */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700">Elemento 1</h3>
                <p className="mt-1 text-sm text-gray-500">Descripción del elemento</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700">Elemento 2</h3>
                <p className="mt-1 text-sm text-gray-500">Descripción del elemento</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700">Elemento 3</h3>
                <p className="mt-1 text-sm text-gray-500">Descripción del elemento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
