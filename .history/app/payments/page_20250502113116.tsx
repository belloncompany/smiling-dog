import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import { DetailPanel } from '../components/ui/DetailPanel';
import { KpiCard } from '../components/ui/KpiCard';
import { ChangeHistory } from '../components/ui/ChangeHistory';
import {
  CurrencyDollarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
} from '@heroicons/react/24/solid';

interface Payment {
  id: string;
  contractId: string;
  clientName: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
  type: 'Milestone' | 'Monthly' | 'Final' | 'Deposit';
  method?: 'Bank Transfer' | 'Credit Card' | 'PayPal';
}

interface PaymentChange {
  id: string;
  date: Date;
  user: string;
  action: string;
  details: string;
}

const columns = [
  {
    accessorKey: 'clientName',
    header: 'Client',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }: { row: { original: Payment } }) => (
      <span>${row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }: { row: { original: Payment } }) => (
      <span>{row.original.dueDate.toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { original: Payment } }) => {
      const statusColors = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Paid: 'bg-green-100 text-green-800',
        Overdue: 'bg-red-100 text-red-800',
        Cancelled: 'bg-gray-100 text-gray-800',
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
    cell: ({ row }: { row: { original: Payment } }) => (
      <button
        onClick={() => handleViewDetails(row.original)}
        className="text-blue-600 hover:text-blue-800"
      >
        View Details
      </button>
    ),
  },
];

const mockData: Payment[] = [
  {
    id: '1',
    contractId: 'CTR-2024-001',
    clientName: 'Acme Corp',
    amount: 25000,
    dueDate: new Date('2024-03-15'),
    type: 'Milestone',
    status: 'Pending',
  },
  // Add more mock data as needed
];

const mockChanges: PaymentChange[] = [
  {
    id: '1',
    date: new Date(),
    user: 'Finance Team',
    action: 'Created',
    details: 'Payment schedule created for milestone 1',
  },
  // Add more mock changes as needed
];

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setDetailPanelOpen(true);
  };

  const getDaysDifference = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Payments"
        description="Track and manage all payment transactions"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Payments', href: '/payments' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Total Outstanding"
          value="$245,000"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ value: 15, isPositive: false }}
        />
        <KpiCard
          title="Overdue Payments"
          value="3"
          icon={<ClockIcon className="h-6 w-6" />}
          trend={{ value: 1, isPositive: false }}
        />
        <KpiCard
          title="Collection Rate"
          value="95%"
          icon={<ArrowTrendingUpIcon className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
        />
        <KpiCard
          title="Avg Payment Time"
          value="12 days"
          icon={<BanknotesIcon className="h-6 w-6" />}
          trend={{ value: -1, isPositive: true }}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => {/* Handle create new payment */}}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Payment
        </button>
      </div>

      <DataTable
        columns={columns}
        data={mockData}
        filterPlaceholder="Search payments..."
      />

      <DetailPanel
        title={`Payment Details - ${selectedPayment?.clientName}`}
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
      >
        {selectedPayment && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Contract ID</dt>
                  <dd className="text-sm text-gray-900">{selectedPayment.contractId}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Client</dt>
                  <dd className="text-sm text-gray-900">{selectedPayment.clientName}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="text-sm text-gray-900">
                    ${selectedPayment.amount.toLocaleString()}
                  </dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="text-sm text-gray-900">{selectedPayment.type}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                  <dd className="text-sm text-gray-900">
                    {selectedPayment.dueDate.toLocaleDateString()}
                    {selectedPayment.status === 'Pending' && (
                      <span className="ml-2 text-xs text-gray-500">
                        ({getDaysDifference(selectedPayment.dueDate)} days remaining)
                      </span>
                    )}
                  </dd>
                </div>
                {selectedPayment.paidDate && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Paid Date</dt>
                    <dd className="text-sm text-gray-900">
                      {selectedPayment.paidDate.toLocaleDateString()}
                    </dd>
                  </div>
                )}
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">{selectedPayment.status}</dd>
                </div>
                {selectedPayment.method && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                    <dd className="text-sm text-gray-900">{selectedPayment.method}</dd>
                  </div>
                )}
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