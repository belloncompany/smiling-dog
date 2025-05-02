"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { 
  Calendar,
  DollarSign,
  FileText,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Download,
  Send,
  Briefcase,
  Scale,
  Shield
} from 'lucide-react';

interface ContractDetailProps {
  params: {
    id: string;
  };
}

export default function ConsultantContractDetailPage({ params }: ContractDetailProps) {
  const contract = {
    id: params.id,
    consultantName: 'Dr. Juan Pérez',
    specialization: 'Desarrollo Full Stack',
    clientName: 'Empresa ABC',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rateType: 'monthly',
    rate: 8000,
    availability: 'full-time',
    status: 'active',
    description: 'Servicios de desarrollo full stack y liderazgo técnico para el proyecto de transformación digital',
    paymentTerms: 'Pagos mensuales contra factura',
    workSchedule: 'Lunes a Viernes, 9:00 - 18:00 (GMT-3)',
    legalClauses: {
      nonCompete: {
        active: true,
        duration: '12 meses',
        scope: 'Tecnologías y clientes específicos',
      },
      gardenLeave: {
        active: false,
        duration: '3 meses',
        compensation: '100% del salario',
      },
      confidentiality: true,
      intellectualProperty: true,
    },
    benefits: {
      vacationDays: 21,
      sickLeave: '15 días pagos',
      equipmentAllowance: 2000,
      trainingBudget: 1500,
    },
    deliverables: [
      { id: 1, title: 'Arquitectura del Sistema', date: '2024-02-15', status: 'completed' },
      { id: 2, title: 'Backend API v1', date: '2024-04-30', status: 'pending' },
      { id: 3, title: 'Frontend Dashboard', date: '2024-06-30', status: 'pending' },
      { id: 4, title: 'Documentación Técnica', date: '2024-12-15', status: 'pending' },
    ],
  };

  const breadcrumbs = [
    { label: 'Contratos', href: '/contracts' },
    { label: 'Contratos Consultores', href: '/contracts/consultants' },
    { label: contract.id, href: `/contracts/consultants/${contract.id}` },
  ];

  const actions = (
    <>
      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
        <Download className="h-4 w-4" />
        Descargar PDF
      </button>
      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
        <Send className="h-4 w-4" />
        Enviar por Email
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
        <Edit className="h-4 w-4" />
        Editar
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Contrato ${contract.id}`}
        description={`${contract.consultantName} - ${contract.specialization}`}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Información General</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="font-medium">{contract.clientName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Período</p>
                <p className="font-medium">
                  {new Date(contract.startDate).toLocaleDateString('es-AR')} - 
                  {new Date(contract.endDate).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Tarifa ({contract.rateType})</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(contract.rate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Horario de Trabajo</p>
                <p className="font-medium">{contract.workSchedule}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cláusulas Legales */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Cláusulas Legales</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Scale className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">No Competencia</p>
                {contract.legalClauses.nonCompete.active ? (
                  <div>
                    <p className="font-medium text-amber-600">Activa</p>
                    <p className="text-sm text-gray-500">
                      Duración: {contract.legalClauses.nonCompete.duration}
                    </p>
                    <p className="text-sm text-gray-500">
                      Alcance: {contract.legalClauses.nonCompete.scope}
                    </p>
                  </div>
                ) : (
                  <p className="font-medium">No aplica</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Garden Leave</p>
                {contract.legalClauses.gardenLeave.active ? (
                  <div>
                    <p className="font-medium text-amber-600">Activa</p>
                    <p className="text-sm text-gray-500">
                      Duración: {contract.legalClauses.gardenLeave.duration}
                    </p>
                    <p className="text-sm text-gray-500">
                      Compensación: {contract.legalClauses.gardenLeave.compensation}
                    </p>
                  </div>
                ) : (
                  <p className="font-medium">No aplica</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Beneficios</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Vacaciones</p>
                <p className="font-medium">{contract.benefits.vacationDays} días</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Licencia por Enfermedad</p>
                <p className="font-medium">{contract.benefits.sickLeave}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Equipamiento</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(contract.benefits.equipmentAllowance)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Presupuesto Formación</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(contract.benefits.trainingBudget)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Entregables */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Entregables del Proyecto</h2>
        <div className="space-y-4">
          {contract.deliverables.map(deliverable => (
            <div key={deliverable.id} className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{deliverable.title}</p>
                  {deliverable.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : deliverable.status === 'pending' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(deliverable.date).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Descripción del Contrato */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Descripción del Contrato</h2>
        <p className="text-gray-600">{contract.description}</p>
      </div>
    </div>
  );
} 