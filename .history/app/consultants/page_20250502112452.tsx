import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import { DetailPanel } from '../components/ui/DetailPanel';
import { KpiCard } from '../components/ui/KpiCard';
import { ChangeHistory } from '../components/ui/ChangeHistory';
import { UserGroupIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/solid';

interface Consultant {
  id: string;
  name: string;
  email: string;
  specialty: string;
  availability: string;
  rating: number;
}

interface ConsultantChange {
  id: string;
  date: Date;
  user: string;
  action: string;
  details: string;
}

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'specialty',
    header: 'Specialty',
  },
  {
    accessorKey: 'availability',
    header: 'Availability',
    cell: ({ row }: { row: { original: Consultant } }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.original.availability === 'Available'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.original.availability}
      </span>
    ),
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }: { row: { original: Consultant } }) => (
      <div className="flex items-center">
        <span className="text-yellow-400">★</span>
        <span className="ml-1">{row.original.rating.toFixed(1)}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: { original: Consultant } }) => (
      <button
        onClick={() => handleViewDetails(row.original)}
        className="text-blue-600 hover:text-blue-800"
      >
        View Details
      </button>
    ),
  },
];

const mockData: Consultant[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    specialty: 'Project Management',
    availability: 'Available',
    rating: 4.8,
  },
  // Add more mock data as needed
];

const mockChanges: ConsultantChange[] = [
  {
    id: '1',
    date: new Date(),
    user: 'Admin',
    action: 'Updated',
    details: 'Consultant availability changed to Available',
  },
  // Add more mock changes as needed
];

export default function ConsultantsPage() {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  const handleViewDetails = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setDetailPanelOpen(true);
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Consultants"
        description="Manage your consultant pool"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Consultants', href: '/consultants' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard
          title="Active Consultants"
          value="42"
          icon={<UserGroupIcon className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <KpiCard
          title="Average Hours/Week"
          value="32"
          icon={<ClockIcon className="h-6 w-6" />}
          trend={{ value: 3, isPositive: true }}
        />
        <KpiCard
          title="Average Rating"
          value="4.6"
          icon={<ChartBarIcon className="h-6 w-6" />}
          trend={{ value: 0.2, isPositive: true }}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => {/* Handle create new consultant */}}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Consultant
        </button>
      </div>

      <DataTable
        columns={columns}
        data={mockData}
        filterPlaceholder="Search consultants..."
      />

      <DetailPanel
        title={selectedConsultant?.name || 'Consultant Details'}
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
      >
        {selectedConsultant && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{selectedConsultant.email}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Specialty</dt>
                  <dd className="text-sm text-gray-900">{selectedConsultant.specialty}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Availability</dt>
                  <dd className="text-sm text-gray-900">{selectedConsultant.availability}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Rating</dt>
                  <dd className="text-sm text-gray-900">{selectedConsultant.rating}</dd>
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