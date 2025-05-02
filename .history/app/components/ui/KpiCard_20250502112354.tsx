import { FC, ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const KpiCard: FC<KpiCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      {trend && (
        <div className="mt-4">
          <div
            className={`inline-flex items-center text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}; 