import { FC } from 'react';
import { format } from 'date-fns';

interface Change {
  id: string;
  date: Date;
  user: string;
  action: string;
  details: string;
}

interface ChangeHistoryProps {
  changes: Change[];
}

export const ChangeHistory: FC<ChangeHistoryProps> = ({ changes }) => {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {changes.map((change, idx) => (
          <li key={change.id}>
            <div className="relative pb-8">
              {idx !== changes.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                    <span className="text-white text-sm">
                      {change.user.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {change.action}{' '}
                      <span className="font-medium text-gray-900">
                        {change.details}
                      </span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {format(change.date, 'PPp')}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 