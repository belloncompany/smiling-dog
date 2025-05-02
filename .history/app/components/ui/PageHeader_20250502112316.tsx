import { FC } from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

export const PageHeader: FC<PageHeaderProps> = ({ title, description, breadcrumbs = [] }) => {
  return (
    <div className="mb-8">
      {breadcrumbs.length > 0 && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm text-gray-700 hover:text-blue-600">
                <HomeIcon className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  <Link
                    href={crumb.href}
                    className="ml-1 text-sm text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    {crumb.label}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
}; 