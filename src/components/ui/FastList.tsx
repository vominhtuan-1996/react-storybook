import { useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export type FastListStatus = 'loading' | 'error' | 'success';

interface FastListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  status: FastListStatus;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  overscan?: number;
  className?: string;
}

const SkeletonRow = ({ height }: { height: number }) => (
  <div
    style={{ height }}
    className="flex animate-pulse items-center gap-3 border-b border-slate-800/60 px-4"
  >
    <div className="h-8 w-8 shrink-0 rounded-full bg-slate-800" />
    <div className="min-w-0 flex-1">
      <div className="h-3 w-1/3 rounded bg-slate-800" />
      <div className="mt-2 h-2.5 w-2/3 rounded bg-slate-800/70" />
    </div>
  </div>
);

export function FastList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  keyExtractor,
  status,
  error,
  onRetry,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'New items will show up here once available.',
  overscan = 4,
  className = '',
}: FastListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    const visibleCount = Math.ceil(height / itemHeight);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(items.length, start + visibleCount + overscan * 2);
    return { startIndex: start, endIndex: end, offsetY: start * itemHeight };
  }, [scrollTop, height, itemHeight, overscan, items.length]);

  const visibleItems = items.slice(startIndex, endIndex);

  if (status === 'loading') {
    return (
      <div
        style={{ height }}
        className={`overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40 ${className}`}
      >
        {Array.from({ length: Math.ceil(height / itemHeight) }).map((_, i) => (
          <SkeletonRow key={i} height={itemHeight} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        style={{ height }}
        className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-6 text-center ${className}`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>
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

  if (status === 'success' && items.length === 0) {
    return (
      <div
        style={{ height }}
        className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 px-6 text-center ${className}`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12h4l2 3h6l2-3h4" />
            <path d="M5 12L3 19a2 2 0 002 2h14a2 2 0 002-2l-2-7" />
            <path d="M5 12l2-7h10l2 7" />
          </svg>
        </span>
        <p className="text-sm font-medium text-slate-200">{emptyTitle}</p>
        <p className="max-w-xs text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="list"
      aria-rowcount={items.length}
      style={{ height, overflowY: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      className={`rounded-lg border border-slate-800 bg-slate-900/40 ${className}`}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, i) => {
            const index = startIndex + i;
            return (
              <div
                key={keyExtractor(item, index)}
                role="listitem"
                aria-rowindex={index + 1}
                style={{ height: itemHeight }}
                className="border-b border-slate-800/60 last:border-b-0"
              >
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
