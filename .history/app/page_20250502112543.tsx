import Link from 'next/link';
import { PageHeader } from './components/ui/PageHeader';
import { KpiCard } from './components/ui/KpiCard';
import {
  UserGroupIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';

const modules = [
  {
    title: 'Clients',
    href: '/clients',
    icon: UserGroupIcon,
    description: 'Manage client relationships and information',
  },
  {
    title: 'Consultants',
    href: '/consultants',
    icon: BriefcaseIcon,
    description: 'Oversee consultant profiles and assignments',
  },
  {
    title: 'Contracts',
    href: '/contracts',
    icon: DocumentTextIcon,
    description: 'Handle contract creation and management',
  },
  {
    title: 'Payments',
    href: '/payments',
    icon: CurrencyDollarIcon,
    description: 'Track payments and financial transactions',
  },
  {
    title: 'Disputes',
    href: '/disputes',
    icon: ExclamationTriangleIcon,
    description: 'Manage and resolve client disputes',
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon,
    description: 'View business performance metrics',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to your admin dashboard"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard
          title="Total Revenue"
          value="$128,432"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          title="Active Clients"
          value="156"
          icon={<UserGroupIcon className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <KpiCard
          title="Active Contracts"
          value="42"
          icon={<DocumentTextIcon className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.href}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <module.icon className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {module.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {module.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 