import { useEffect, useRef, useState } from 'react';
import { FastList } from '@/components/ui/FastList';
import type { FastListStatus } from '@/components/ui/FastList';

interface Row {
  id: string;
  name: string;
}

const items: Row[] = Array.from({ length: 10000 }, (_, i) => ({
  id: `${i}`,
  name: `component-${i}`,
}));

export const FastListPlayground = () => {
  const [status, setStatus] = useState<FastListStatus>('success');
  const [renderedCount, setRenderedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setRenderedCount(el.querySelectorAll('[role="listitem"]').length);
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [status]);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="min-h-[140px]">
        <FastList<Row>
          items={items}
          itemHeight={40}
          height={140}
          status={status}
          error="Network request failed."
          onRetry={() => setStatus('success')}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <div className="flex h-full items-center px-3 text-xs text-slate-200">
              {item.name}
            </div>
          )}
        />
      </div>

      <p className="text-xs text-slate-500">
        {items.length.toLocaleString()} items total &middot; {renderedCount} DOM rows rendered
      </p>

      <div className="flex flex-wrap gap-1.5 text-xs">
        {(['success', 'loading', 'error'] as FastListStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`h-8 rounded-md border px-3 font-medium transition-colors duration-150 ${
              status === s
                ? 'border-emerald-500 text-emerald-400'
                : 'border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
