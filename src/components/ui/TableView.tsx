import { useState } from 'react';
import type { ReactNode, SVGProps } from 'react';

export type TableViewStatus = 'loading' | 'error' | 'success';
export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableViewProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  status: TableViewStatus;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  selectedRowKey?: string;
  onRowClick?: (row: T) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSortChange?: (key: string, direction: SortDirection) => void;
  className?: string;
}

const AlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

const TableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M9 10v10" />
  </svg>
);

const SortIcon = ({ direction }: { direction: SortDirection }) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`shrink-0 transition-transform duration-150 ${
      direction === 'desc' ? 'rotate-180' : ''
    } ${direction ? 'text-emerald-400' : 'text-slate-600'}`}
  >
    <path d="M12 5v14" />
    <path d="M6 11l6-6 6 6" />
  </svg>
);

function nextDirection(current: SortDirection): SortDirection {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
}

export function TableView<T>({
  columns,
  rows,
  rowKey,
  status,
  error,
  onRetry,
  emptyTitle = 'No data yet',
  emptyDescription = 'Rows will show up here once available.',
  selectedRowKey,
  onRowClick,
  sortKey,
  sortDirection = null,
  onSortChange,
  className = '',
}: TableViewProps<T>) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable || !onSortChange) return;
    const isActive = sortKey === col.key;
    onSortChange(col.key, isActive ? nextDirection(sortDirection) : 'asc');
  };

  return (
    <div className={`overflow-x-auto rounded-lg border border-slate-800 ${className}`}>
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/60">
            {columns.map((col) => {
              const isActive = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    isActive
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : sortDirection === 'desc'
                          ? 'descending'
                          : 'none'
                      : 'none'
                  }
                  style={{ width: col.width }}
                  className="px-4 py-3 text-left font-medium text-slate-400"
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col)}
                      className="-m-2 flex h-9 cursor-pointer items-center gap-1.5 rounded-md p-2 text-left transition-colors duration-150 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      {col.header}
                      <SortIcon direction={isActive ? sortDirection : null} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {status === 'loading' &&
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-slate-800/60 last:border-b-0">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-3.5 w-3/4 animate-pulse rounded bg-slate-800" />
                  </td>
                ))}
              </tr>
            ))}

          {status === 'error' && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-16">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <AlertIcon />
                  </span>
                  <p className="text-sm font-medium text-slate-200">Couldn't load data</p>
                  <p className="max-w-xs text-sm text-slate-500">
                    {error || 'Something went wrong. Check your connection and try again.'}
                  </p>
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="mt-1 inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-slate-700 px-4 text-sm font-semibold text-slate-200 transition-colors duration-150 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}

          {status === 'success' && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-16">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                    <TableIcon />
                  </span>
                  <p className="text-sm font-medium text-slate-200">{emptyTitle}</p>
                  <p className="max-w-xs text-sm text-slate-500">{emptyDescription}</p>
                </div>
              </td>
            </tr>
          )}

          {status === 'success' &&
            rows.map((row, index) => {
              const key = rowKey(row, index);
              const isSelected = selectedRowKey === key;
              const isHovered = hoveredKey === key;
              return (
                <tr
                  key={key}
                  onClick={() => onRowClick?.(row)}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  aria-selected={onRowClick ? isSelected : undefined}
                  className={`border-b border-slate-800/60 transition-colors duration-100 last:border-b-0 ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${
                    isSelected
                      ? 'bg-emerald-500/10'
                      : isHovered && onRowClick
                        ? 'bg-slate-800/60'
                        : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-slate-200">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
