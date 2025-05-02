import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import { DetailPanel } from '../components/ui/DetailPanel';
import { KpiCard } from '../components/ui/KpiCard';
import { ChangeHistory } from '../components/ui/ChangeHistory';
import {
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  ScaleIcon,
} from '@heroicons/react/24/solid';

interface Dispute {
  id: string;
  title: string;
  clientName: string;
  contractId: string;
  dateOpened: Date;
  dateClosed?: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Under Review' | 'Resolved' | 'Escalated';
  type: 'Payment' | 'Quality' | 'Timeline' | 'Scope' | 'Other';
  description: string;
}

interface DisputeChange {
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
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }: { row: { original: Dispute } }) => {
      const priorityColors = {
        Low: 'bg-blue-100 text-blue-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800',
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            priorityColors[row.original.priority]
          }`}
        >
          {row.original.priority}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { original: Dispute } }) => {
      const statusColors = {
        Open: 'bg-gray-100 text-gray-800',
        'Under Review': 'bg-yellow-100 text-yellow-800',
        Resolved: 'bg-green-100 text-green-800',
        Escalated: 'bg-red-100 text-red-800',
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
    cell: ({ row }: { row: { original: Dispute } }) => (
      <button
        onClick={() => handleViewDetails(row.original)}
        className="text-blue-600 hover:text-blue-800"
      >
        View Details
      </button>
    ),
  },
];

const mockData: Dispute[] = [
  {
    id: '1',
    title: 'Payment Delay Issue',
    clientName: 'Acme Corp',
    contractId: 'CTR-2024-001',
    dateOpened: new Date('2024-03-01'),
    priority: 'High',
    status: 'Open',
    type: 'Payment',
    description: 'Client has not processed the milestone payment as per contract terms.',
  },
  // Add more mock data as needed
];

const mockChanges: DisputeChange[] = [
  {
    id: '1',
    date: new Date(),
    user: 'Support Team',
    action: 'Opened',
    details: 'Dispute was registered in the system',
  },
  // Add more mock changes as needed
];

export default function DisputesPage() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setDetailPanelOpen(true);
  };

  const getDisputeDuration = (start: Date, end?: Date) => {
    const endDate = end || new Date();
    const days = Math.ceil(
      (endDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${days} days`;
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Disputes"
        description="Track and manage client disputes"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Disputes', href: '/disputes' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Open Disputes"
          value="12"
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          trend={{ value: -2, isPositive: true }}
        />
        <KpiCard
          title="Avg Resolution Time"
          value="5 days"
          icon={<ClockIcon className="h-6 w-6" />}
          trend={{ value: 1, isPositive: false }}
        />
        <KpiCard
          title="Resolution Rate"
          value="92%"
          icon={<CheckCircleIcon className="h-6 w-6" />}
          trend={{ value: 3, isPositive: true }}
        />
        <KpiCard
          title="Client Satisfaction"
          value="4.2/5"
          icon={<ScaleIcon className="h-6 w-6" />}
          trend={{ value: 0.2, isPositive: true }}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => {/* Handle create new dispute */}}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Register New Dispute
        </button>
      </div>

      <DataTable
        columns={columns}
        data={mockData}
        filterPlaceholder="Search disputes..."
      />

      <DetailPanel
        title={selectedDispute?.title || 'Dispute Details'}
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
      >
        {selectedDispute && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Dispute Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Client</dt>
                  <dd className="text-sm text-gray-900">{selectedDispute.clientName}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Contract ID</dt>
                  <dd className="text-sm text-gray-900">{selectedDispute.contractId}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="text-sm text-gray-900">{selectedDispute.type}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Priority</dt>
                  <dd className="text-sm text-gray-900">{selectedDispute.priority}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">{selectedDispute.status}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Date Opened</dt>
                  <dd className="text-sm text-gray-900">
                    {selectedDispute.dateOpened.toLocaleDateString()}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="text-sm text-gray-900">
                    {getDisputeDuration(selectedDispute.dateOpened, selectedDispute.dateClosed)}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-sm text-gray-600">{selectedDispute.description}</p>
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