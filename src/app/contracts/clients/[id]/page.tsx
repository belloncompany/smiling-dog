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
  Send
} from 'lucide-react';

interface ContractDetailProps {
  params: {
    id: string;
  };
}

export default function ContractDetailPage({ params }: ContractDetailProps) {
  // En un caso real, aquí harías una llamada a la API para obtener los detalles del contrato
  const contract = {
    id: params.id,
    clientName: 'Empresa ABC',
    contractType: 'Consultoría IT',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: 50000,
    status: 'active',
    description: 'Servicios de consultoría en tecnología de la información y transformación digital',
    paymentTerms: 'Pagos mensuales',
    consultants: [
      { id: 1, name: 'Juan Pérez', role: 'Senior Developer' },
      { id: 2, name: 'María García', role: 'Project Manager' },
    ],
    milestones: [
      { id: 1, title: 'Inicio del proyecto', date: '2024-01-15', status: 'completed' },
      { id: 2, title: 'Primera entrega', date: '2024-03-31', status: 'pending' },
      { id: 3, title: 'Revisión intermedia', date: '2024-06-30', status: 'pending' },
      { id: 4, title: 'Entrega final', date: '2024-12-15', status: 'pending' },
    ],
  };

  const breadcrumbs = [
    { label: 'Contratos', href: '/contracts' },
    { label: 'Contratos Clientes', href: '/contracts/clients' },
    { label: contract.id, href: `/contracts/clients/${contract.id}` },
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
        description={`${contract.clientName} - ${contract.contractType}`}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Información General</h2>
          <div className="space-y-4">
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
                <p className="text-sm text-gray-500">Valor Total</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(contract.value)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Términos de Pago</p>
                <p className="font-medium">{contract.paymentTerms}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Consultores Asignados */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Consultores Asignados</h2>
          <div className="space-y-4">
            {contract.consultants.map(consultant => (
              <div key={consultant.id} className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{consultant.name}</p>
                  <p className="text-sm text-gray-500">{consultant.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hitos del Proyecto */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Hitos del Proyecto</h2>
          <div className="space-y-4">
            {contract.milestones.map(milestone => (
              <div key={milestone.id} className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{milestone.title}</p>
                    {milestone.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : milestone.status === 'pending' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(milestone.date).toLocaleDateString('es-AR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
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