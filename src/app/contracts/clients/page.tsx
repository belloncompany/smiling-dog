"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { PlusCircle, FileText, Download, Filter } from 'lucide-react';

interface ClientContract {
  id: string;
  clientName: string;
  contractType: string;
  startDate: string;
  endDate: string;
  value: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
}

const mockData: ClientContract[] = [
  {
    id: 'CON-001',
    clientName: 'Empresa ABC',
    contractType: 'Consultoría IT',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: 50000,
    status: 'active',
  },
  {
    id: 'CON-002',
    clientName: 'Corporación XYZ',
    contractType: 'Desarrollo Software',
    startDate: '2024-02-15',
    endDate: '2024-08-15',
    value: 75000,
    status: 'pending',
  },
  // Agrega más datos de ejemplo según necesites
];

const columns = [
  {
    header: 'ID',
    accessorKey: 'id' as keyof ClientContract,
  },
  {
    header: 'Cliente',
    accessorKey: 'clientName' as keyof ClientContract,
  },
  {
    header: 'Tipo',
    accessorKey: 'contractType' as keyof ClientContract,
  },
  {
    header: 'Inicio',
    accessorKey: 'startDate' as keyof ClientContract,
    cell: (value: string) => new Date(value).toLocaleDateString('es-AR'),
  },
  {
    header: 'Fin',
    accessorKey: 'endDate' as keyof ClientContract,
    cell: (value: string) => new Date(value).toLocaleDateString('es-AR'),
  },
  {
    header: 'Valor',
    accessorKey: 'value' as keyof ClientContract,
    cell: (value: number) => 
      new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
  },
  {
    header: 'Estado',
    accessorKey: 'status' as keyof ClientContract,
    cell: (value: ClientContract['status']) => {
      const statusStyles = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-blue-100 text-blue-800',
        cancelled: 'bg-red-100 text-red-800',
      };

      const statusLabels = {
        active: 'Activo',
        pending: 'Pendiente',
        completed: 'Completado',
        cancelled: 'Cancelado',
      };

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[value]}`}>
          {statusLabels[value]}
        </span>
      );
    },
  },
];

export default function ClientContractsPage() {
  const breadcrumbs = [
    { label: 'Contratos', href: '/contracts' },
    { label: 'Contratos Clientes', href: '/contracts/clients' },
  ];

  const actions = (
    <>
      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Filtrar
      </button>
      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
        <Download className="h-4 w-4" />
        Exportar
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Nuevo Contrato
      </button>
    </>
  );

  const handleRowClick = (contract: ClientContract) => {
    console.log('Ver detalles del contrato:', contract);
    // Aquí implementarías la navegación al detalle del contrato
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contratos Clientes"
        description="Gestiona y monitorea todos los contratos con clientes"
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <DataTable
            columns={columns}
            data={mockData}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
} 