"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { PlusCircle, Download, Filter, AlertCircle } from 'lucide-react';

interface ConsultantContract {
  id: string;
  consultantName: string;
  specialization: string;
  clientName: string;
  startDate: string;
  endDate: string;
  rateType: 'hourly' | 'monthly' | 'project';
  rate: number;
  availability: 'full-time' | 'part-time' | 'project-based';
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  gardenLeave: boolean;
  nonCompete: boolean;
}

const mockData: ConsultantContract[] = [
  {
    id: 'CONS-001',
    consultantName: 'Dr. Juan Pérez',
    specialization: 'Desarrollo Full Stack',
    clientName: 'Empresa ABC',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rateType: 'monthly',
    rate: 8000,
    availability: 'full-time',
    status: 'active',
    gardenLeave: false,
    nonCompete: true,
  },
  {
    id: 'CONS-002',
    consultantName: 'Ing. María García',
    specialization: 'DevOps & Cloud',
    clientName: 'Corporación XYZ',
    startDate: '2024-02-15',
    endDate: '2024-08-15',
    rateType: 'hourly',
    rate: 85,
    availability: 'part-time',
    status: 'pending',
    gardenLeave: false,
    nonCompete: true,
  },
];

const columns = [
  {
    header: 'ID',
    accessorKey: 'id' as keyof ConsultantContract,
  },
  {
    header: 'Consultor',
    accessorKey: 'consultantName' as keyof ConsultantContract,
  },
  {
    header: 'Especialización',
    accessorKey: 'specialization' as keyof ConsultantContract,
  },
  {
    header: 'Cliente',
    accessorKey: 'clientName' as keyof ConsultantContract,
  },
  {
    header: 'Inicio',
    accessorKey: 'startDate' as keyof ConsultantContract,
    cell: (value: string) => new Date(value).toLocaleDateString('es-AR'),
  },
  {
    header: 'Fin',
    accessorKey: 'endDate' as keyof ConsultantContract,
    cell: (value: string) => new Date(value).toLocaleDateString('es-AR'),
  },
  {
    header: 'Tarifa',
    accessorKey: 'rate' as keyof ConsultantContract,
    cell: (value: number, row: ConsultantContract) => {
      const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'USD',
      });
      
      const rateLabels = {
        hourly: '/hora',
        monthly: '/mes',
        project: '/proyecto',
      };
      
      return `${formatter.format(value)}${rateLabels[row.rateType]}`;
    },
  },
  {
    header: 'Disponibilidad',
    accessorKey: 'availability' as keyof ConsultantContract,
    cell: (value: ConsultantContract['availability']) => {
      const availabilityLabels = {
        'full-time': 'Tiempo Completo',
        'part-time': 'Tiempo Parcial',
        'project-based': 'Por Proyecto',
      };
      
      return availabilityLabels[value];
    },
  },
  {
    header: 'Estado',
    accessorKey: 'status' as keyof ConsultantContract,
    cell: (value: ConsultantContract['status']) => {
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
  {
    header: 'Cláusulas',
    accessorKey: 'nonCompete' as keyof ConsultantContract,
    cell: (value: boolean, row: ConsultantContract) => {
      const clauses = [];
      if (row.nonCompete) clauses.push('No Competencia');
      if (row.gardenLeave) clauses.push('Garden Leave');
      
      if (clauses.length === 0) return '-';
      
      return (
        <div className="flex items-center gap-1">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <span className="text-xs">{clauses.join(', ')}</span>
        </div>
      );
    },
  },
];

export default function ConsultantContractsPage() {
  const breadcrumbs = [
    { label: 'Contratos', href: '/contracts' },
    { label: 'Contratos Consultores', href: '/contracts/consultants' },
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contratos Consultores"
        description="Gestiona los contratos y términos con consultores"
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <DataTable
            columns={columns}
            data={mockData}
            onRowClick={(contract) => {
              console.log('Ver detalles del contrato:', contract);
              // Implementar navegación al detalle
            }}
          />
        </div>
      </div>
    </div>
  );
} 