import { useEffect, useRef } from 'react';
import type { ReactNode, SVGProps } from 'react';

export type ListViewStatus = 'loading' | 'error' | 'success';

interface ListViewProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  status: ListViewStatus;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  loadMoreError?: string;
  onLoadMore?: () => void;
  onRetryLoadMore?: () => void;
  className?: string;
}

const RefreshIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 12a9 9 0 0115.4-6.4L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 01-15.4 6.4L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

const AlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

const InboxIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M3 12h4l2 3h6l2-3h4" />
    <path d="M5 12L3 19a2 2 0 002 2h14a2 2 0 002-2l-2-7" />
    <path d="M5 12l2-7h10l2 7" />
  </svg>
);

const Spinner = ({ className = '' }: { className?: string }) => (
  <svg
    className={`h-4 w-4 animate-spin motion-reduce:animate-none ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const SkeletonRow = () => (
  <div className="flex animate-pulse items-center gap-3 border-b border-slate-800/60 px-4 py-4">
    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-800" />
    <div className="min-w-0 flex-1">
      <div className="h-3.5 w-1/3 rounded bg-slate-800" />
      <div className="mt-2 h-3 w-2/3 rounded bg-slate-800/70" />
    </div>
  </div>
);

export function ListView<T>({
  items,
  renderItem,
  keyExtractor,
  status,
  error,
  onRetry,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'New items will show up here once available.',
  isRefreshing = false,
  onRefresh,
  hasMore = false,
  isLoadingMore = false,
  loadMoreError,
  onLoadMore,
  onRetryLoadMore,
  className = '',
}: ListViewProps<T>) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || !onLoadMore || loadMoreError || status !== 'success') return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore();
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore, loadMoreError, status, items.length]);

  return (
    <div className={`w-full ${className}`}>
      {onRefresh && (
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
          <span className="text-xs font-medium text-slate-500" aria-live="polite">
            {isRefreshing ? 'Refreshing…' : `${items.length} item${items.length === 1 ? '' : 's'}`}
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh list"
            className="-m-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <RefreshIcon
              className={isRefreshing ? 'animate-spin motion-reduce:animate-none' : ''}
            />
          </button>
        </div>
      )}

      {status === 'loading' && (
        <div role="status" aria-label="Loading items">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
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
      )}

      {status === 'success' && items.length === 0 && (
        <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
            <InboxIcon />
          </span>
          <p className="text-sm font-medium text-slate-200">{emptyTitle}</p>
          <p className="max-w-xs text-sm text-slate-500">{emptyDescription}</p>
        </div>
      )}

      {status === 'success' && items.length > 0 && (
        <ul role="list" className={isRefreshing ? 'opacity-60 transition-opacity duration-150' : 'transition-opacity duration-150'}>
          {items.map((item, index) => (
            <li key={keyExtractor(item, index)} className="border-b border-slate-800/60 last:border-b-0">
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      )}

      {status === 'success' && items.length > 0 && hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-5">
          {loadMoreError ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-xs text-red-400">{loadMoreError}</p>
              {onRetryLoadMore && (
                <button
                  type="button"
                  onClick={onRetryLoadMore}
                  className="cursor-pointer text-xs font-semibold text-emerald-400 transition-colors duration-150 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  Retry
                </button>
              )}
            </div>
          ) : isLoadingMore ? (
            <span className="flex items-center gap-2 text-xs text-slate-500">
              <Spinner />
              Loading more…
            </span>
          ) : (
            <button
              type="button"
              onClick={onLoadMore}
              className="cursor-pointer text-xs font-semibold text-emerald-400 transition-colors duration-150 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Load more
            </button>
          )}
        </div>
      )}

      {status === 'success' && items.length > 0 && !hasMore && (
        <p className="py-5 text-center text-xs text-slate-600">
          You've reached the end.
        </p>
      )}
    </div>
  );
}
