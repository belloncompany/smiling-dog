import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import { DetailPanel } from '../components/ui/DetailPanel';
import { KpiCard } from '../components/ui/KpiCard';
import { ChangeHistory } from '../components/ui/ChangeHistory';
import {
  GiftIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';

interface Benefit {
  id: string;
  name: string;
  type: 'Health' | 'Insurance' | 'Bonus' | 'Equipment' | 'Training' | 'Other';
  description: string;
  eligibility: 'All' | 'Senior' | 'Contract' | 'Full-time';
  cost: number;
  enrolledCount: number;
  status: 'Active' | 'Inactive' | 'Pending';
  startDate: Date;
  endDate?: Date;
}

interface BenefitChange {
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
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'eligibility',
    header: 'Eligibility',
  },
  {
    accessorKey: 'enrolledCount',
    header: 'Enrolled',
    cell: ({ row }: { row: { original: Benefit } }) => (
      <span>{row.original.enrolledCount} users</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { original: Benefit } }) => {
      const statusColors = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-gray-100 text-gray-800',
        Pending: 'bg-yellow-100 text-yellow-800',
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
    cell: ({ row }: { row: { original: Benefit } }) => (
      <button
        onClick={() => handleViewDetails(row.original)}
        className="text-blue-600 hover:text-blue-800"
      >
        View Details
      </button>
    ),
  },
];

const mockData: Benefit[] = [
  {
    id: '1',
    name: 'Health Insurance Premium',
    type: 'Health',
    description: 'Comprehensive health insurance coverage for employees and dependents',
    eligibility: 'Full-time',
    cost: 500,
    enrolledCount: 45,
    status: 'Active',
    startDate: new Date('2024-01-01'),
  },
  // Add more mock data as needed
];

const mockChanges: BenefitChange[] = [
  {
    id: '1',
    date: new Date(),
    user: 'HR Team',
    action: 'Updated',
    details: 'Added dental coverage to health insurance plan',
  },
  // Add more mock changes as needed
];

export default function BenefitsPage() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  const handleViewDetails = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setDetailPanelOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Benefits"
        description="Manage employee benefits and programs"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Benefits', href: '/benefits' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Active Benefits"
          value="8"
          icon={<GiftIcon className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
        />
        <KpiCard
          title="Enrolled Users"
          value="156"
          icon={<UserGroupIcon className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          title="Monthly Cost"
          value="$24,500"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ value: 5, isPositive: false }}
        />
        <KpiCard
          title="Utilization Rate"
          value="85%"
          icon={<ChartBarIcon className="h-6 w-6" />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => {/* Handle create new benefit */}}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Benefit
        </button>
      </div>

      <DataTable
        columns={columns}
        data={mockData}
        filterPlaceholder="Search benefits..."
      />

      <DetailPanel
        title={selectedBenefit?.name || 'Benefit Details'}
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
      >
        {selectedBenefit && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Benefit Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="text-sm text-gray-900">{selectedBenefit.type}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Eligibility</dt>
                  <dd className="text-sm text-gray-900">{selectedBenefit.eligibility}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Cost per Person</dt>
                  <dd className="text-sm text-gray-900">
                    {formatCurrency(selectedBenefit.cost)}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Total Monthly Cost</dt>
                  <dd className="text-sm text-gray-900">
                    {formatCurrency(selectedBenefit.cost * selectedBenefit.enrolledCount)}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Enrolled Users</dt>
                  <dd className="text-sm text-gray-900">{selectedBenefit.enrolledCount}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">{selectedBenefit.status}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="text-sm text-gray-900">
                    {selectedBenefit.startDate.toLocaleDateString()}
                  </dd>
                </div>
                {selectedBenefit.endDate && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">End Date</dt>
                    <dd className="text-sm text-gray-900">
                      {selectedBenefit.endDate.toLocaleDateString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-sm text-gray-600">{selectedBenefit.description}</p>
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