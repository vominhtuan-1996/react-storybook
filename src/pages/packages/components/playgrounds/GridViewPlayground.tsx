import { useState } from 'react';
import { GridView } from '@/components/ui/GridView';
import type { GridViewStatus } from '@/components/ui/GridView';

interface Pkg {
  id: string;
  name: string;
}

const items: Pkg[] = Array.from({ length: 8 }, (_, i) => ({
  id: `${i}`,
  name: `component-${i}`,
}));

export const GridViewPlayground = () => {
  const [status, setStatus] = useState<GridViewStatus>('success');
  const [columns, setColumns] = useState<2 | 3 | 4>(3);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="min-h-[140px]">
        <GridView<Pkg>
          items={items}
          status={status}
          error="Network request failed."
          onRetry={() => setStatus('success')}
          columns={columns}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-800 text-xs text-white">
              {item.name}
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Columns</span>
          <select
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value) as 2 | 3 | 4)}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </label>

        <div className="flex flex-wrap gap-1.5">
          {(['success', 'loading', 'error'] as GridViewStatus[]).map((s) => (
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
    </div>
  );
};
