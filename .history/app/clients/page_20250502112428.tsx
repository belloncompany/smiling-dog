import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import { DetailPanel } from '../components/ui/DetailPanel';
import { KpiCard } from '../components/ui/KpiCard';
import { ChangeHistory } from '../components/ui/ChangeHistory';
import { UsersIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/solid';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.original.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <button
        onClick={() => handleViewDetails(row.original)}
        className="text-blue-600 hover:text-blue-800"
      >
        View Details
      </button>
    ),
  },
];

const mockData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
    status: 'Active',
  },
  // Add more mock data as needed
];

const mockChanges = [
  {
    id: '1',
    date: new Date(),
    user: 'John Smith',
    action: 'Updated',
    details: 'Client status changed to Active',
  },
  // Add more mock changes as needed
];

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setDetailPanelOpen(true);
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Clients"
        description="Manage your client relationships"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Clients', href: '/clients' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard
          title="Total Clients"
          value="156"
          icon={<UsersIcon className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          title="Revenue"
          value="$45,231"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <KpiCard
          title="Satisfaction"
          value="4.8"
          icon={<StarIcon className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => {/* Handle create new client */}}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Client
        </button>
      </div>

      <DataTable
        columns={columns}
        data={mockData}
        filterPlaceholder="Search clients..."
      />

      <DetailPanel
        title={selectedClient?.name || 'Client Details'}
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
      >
        {selectedClient && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{selectedClient.email}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="text-sm text-gray-900">{selectedClient.company}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">{selectedClient.status}</dd>
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