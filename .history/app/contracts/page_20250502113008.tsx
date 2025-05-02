import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import { DetailPanel } from '../components/ui/DetailPanel';
import { KpiCard } from '../components/ui/KpiCard';
import { ChangeHistory } from '../components/ui/ChangeHistory';
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

interface Contract {
  id: string;
  title: string;
  clientName: string;
  consultantName: string;
  startDate: Date;
  endDate: Date;
  value: number;
  status: 'Draft' | 'Active' | 'Completed' | 'Terminated';
}

interface ContractChange {
  id: string;
  date: Date;
  user: string;
  action: string;
  details: string;
}

const columns = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'clientName',
    header: 'Client',
  },
  {
    accessorKey: 'consultantName',
    header: 'Consultant',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }: { row: { original: Contract } }) => (
      <span>${row.original.value.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { original: Contract } }) => {
      const statusColors = {
        Draft: 'bg-gray-100 text-gray-800',
        Active: 'bg-green-100 text-green-800',
        Completed: 'bg-blue-100 text-blue-800',
        Terminated: 'bg-red-100 text-red-800',
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            statusColors[row.original.status]
          }`}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: { original: Contract } }) => (
      <button
        onClick={() => handleViewDetails(row.original)}
        className="text-blue-600 hover:text-blue-800"
      >
        View Details
      </button>
    ),
  },
];

const mockData: Contract[] = [
  {
    id: '1',
    title: 'Website Development Project',
    clientName: 'Acme Corp',
    consultantName: 'John Smith',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30'),
    value: 50000,
    status: 'Active',
  },
  // Add more mock data as needed
];

const mockChanges: ContractChange[] = [
  {
    id: '1',
    date: new Date(),
    user: 'Admin',
    action: 'Created',
    details: 'Contract was created and sent for review',
  },
  // Add more mock changes as needed
];

export default function ContractsPage() {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  const handleViewDetails = (contract: Contract) => {
    setSelectedContract(contract);
    setDetailPanelOpen(true);
  };

  const getContractDuration = (start: Date, end: Date) => {
    const months = (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() - start.getMonth();
    return `${months} months`;
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Contracts"
        description="Manage and monitor all contracts"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Contracts', href: '/contracts' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Active Contracts"
          value="42"
          icon={<DocumentTextIcon className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <KpiCard
          title="Total Value"
          value="$1.2M"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ value: 15, isPositive: true }}
        />
        <KpiCard
          title="Avg Duration"
          value="6 months"
          icon={<ClockIcon className="h-6 w-6" />}
          trend={{ value: 0, isPositive: true }}
        />
        <KpiCard
          title="Completion Rate"
          value="95%"
          icon={<CheckCircleIcon className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => {/* Handle create new contract */}}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Contract
        </button>
      </div>

      <DataTable
        columns={columns}
        data={mockData}
        filterPlaceholder="Search contracts..."
      />

      <DetailPanel
        title={selectedContract?.title || 'Contract Details'}
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
      >
        {selectedContract && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Contract Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Client</dt>
                  <dd className="text-sm text-gray-900">{selectedContract.clientName}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Consultant</dt>
                  <dd className="text-sm text-gray-900">{selectedContract.consultantName}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="text-sm text-gray-900">
                    {selectedContract.startDate.toLocaleDateString()}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">End Date</dt>
                  <dd className="text-sm text-gray-900">
                    {selectedContract.endDate.toLocaleDateString()}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="text-sm text-gray-900">
                    {getContractDuration(selectedContract.startDate, selectedContract.endDate)}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Value</dt>
                  <dd className="text-sm text-gray-900">
                    ${selectedContract.value.toLocaleString()}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">{selectedContract.status}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Change History</h3>
              <div className="mt-2">
                <ChangeHistory changes={mockChanges} />
              </div>
            </div>
          </div>
        )}
      </DetailPanel>
    </div>
  );
} 