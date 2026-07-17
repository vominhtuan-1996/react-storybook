import { useCallback, useState } from 'react';
import { ListView } from '@/components/ui/ListView';
import type { ListViewStatus } from '@/components/ui/ListView';

interface Row {
  id: string;
  name: string;
}

function makeRows(start: number, count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${start + i}`,
    name: `component-${start + i}`,
  }));
}

type Scenario = 'success' | 'empty' | 'error';

export const ListViewPlayground = () => {
  const [scenario, setScenario] = useState<Scenario>('success');
  const [status, setStatus] = useState<ListViewStatus>('success');
  const [items, setItems] = useState<Row[]>(makeRows(0, 4));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const applyScenario = useCallback((next: Scenario) => {
    setScenario(next);
    setLoadMoreError(undefined);
    if (next === 'success') {
      setStatus('success');
      setItems(makeRows(0, 4));
      setPage(1);
    } else if (next === 'empty') {
      setStatus('success');
      setItems([]);
      setPage(1);
    } else {
      setStatus('error');
      setItems([]);
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setItems(makeRows(0, 4));
      setPage(1);
      setIsRefreshing(false);
    }, 600);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setLoadMoreError(undefined);
    setTimeout(() => {
      if (page === 1) {
        setLoadMoreError('Failed to load more items.');
        setIsLoadingMore(false);
        return;
      }
      setItems((prev) => [...prev, ...makeRows(prev.length, 4)]);
      setPage((p) => p + 1);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="h-[220px] overflow-y-auto rounded-lg border border-slate-800 bg-slate-900/60">
        <ListView<Row>
          items={items}
          status={status}
          error="Network request failed."
          onRetry={() => applyScenario('success')}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          hasMore={page < 3}
          isLoadingMore={isLoadingMore}
          loadMoreError={loadMoreError}
          onLoadMore={handleLoadMore}
          onRetryLoadMore={handleLoadMore}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <div className="px-3 py-2.5">
              <p className="text-xs font-medium text-white">{item.name}</p>
            </div>
          )}
        />
      </div>

      <div className="flex flex-wrap gap-1.5 text-xs">
        {(['success', 'empty', 'error'] as Scenario[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => applyScenario(s)}
            className={`h-8 rounded-md border px-3 font-medium transition-colors duration-150 ${
              scenario === s
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
