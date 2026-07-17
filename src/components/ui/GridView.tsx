import type { ReactNode, SVGProps } from 'react';

export type GridViewStatus = 'loading' | 'error' | 'success';

interface GridViewProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  status: GridViewStatus;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnsClass: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

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

const GridIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const SkeletonTile = () => (
  <div className="aspect-square animate-pulse rounded-lg bg-slate-800" />
);

export function GridView<T>({
  items,
  renderItem,
  keyExtractor,
  status,
  error,
  onRetry,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'New items will show up here once available.',
  columns = 3,
  className = '',
}: GridViewProps<T>) {
  if (status === 'loading') {
    return (
      <div
        role="status"
        aria-label="Loading grid"
        className={`grid gap-3 ${columnsClass[columns]} ${className}`}
      >
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <SkeletonTile key={i} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className={`flex flex-col items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-6 py-16 text-center ${className}`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <AlertIcon />
        </span>
        <p className="text-sm font-medium text-slate-200">Couldn't load items</p>
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
    );
  }

  if (items.length === 0) {
    return (
      <div
        className={`flex flex-col items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 px-6 py-16 text-center ${className}`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
          <GridIcon />
        </span>
        <p className="text-sm font-medium text-slate-200">{emptyTitle}</p>
        <p className="max-w-xs text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div role="list" className={`grid gap-3 ${columnsClass[columns]} ${className}`}>
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)} role="listitem">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
