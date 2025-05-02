"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (value: any) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ columns, data, onRowClick }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key: keyof T) => {
    setSortConfig(current => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key: keyof T) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="h-4 w-4" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map(column => (
              <th
                key={String(column.accessorKey)}
                className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort(column.accessorKey)}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {getSortIcon(column.accessorKey)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`bg-white border-b hover:bg-gray-50 ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(column => (
                <td
                  key={String(column.accessorKey)}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {column.cell
                    ? column.cell(row[column.accessorKey])
                    : row[column.accessorKey] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 