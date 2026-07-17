import { useState } from 'react';
import { TableView } from '@/components/ui/TableView';
import type { SortDirection, TableViewStatus } from '@/components/ui/TableView';

interface Pkg {
  id: string;
  name: string;
  downloads: number;
}

const rows: Pkg[] = Array.from({ length: 6 }, (_, i) => ({
  id: `${i}`,
  name: `component-${i}`,
  downloads: (i + 1) * 37,
}));

export const TableViewPlayground = () => {
  const [status, setStatus] = useState<TableViewStatus>('success');
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRow, setSelectedRow] = useState<string | undefined>();

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;
    const dir = sortDirection === 'asc' ? 1 : -1;
    if (sortKey === 'downloads') return (a.downloads - b.downloads) * dir;
    return a.name.localeCompare(b.name) * dir;
  });

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="min-h-[140px]">
        <TableView<Pkg>
          status={status}
          error="Network request failed."
          onRetry={() => setStatus('success')}
          rows={sortedRows}
          rowKey={(row) => row.id}
          selectedRowKey={selectedRow}
          onRowClick={(row) => setSelectedRow(row.id)}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSortChange={(key, dir) => {
            setSortKey(key);
            setSortDirection(dir);
          }}
          columns={[
            { key: 'name', header: 'Name', sortable: true, render: (r) => r.name },
            { key: 'downloads', header: 'Downloads', sortable: true, render: (r) => r.downloads },
          ]}
        />
      </div>

      <p className="text-xs text-slate-500">
        Sort: {sortKey ?? 'none'} {sortDirection ?? ''} &middot; Selected: {selectedRow ?? 'none'}
      </p>

      <div className="flex flex-wrap gap-1.5 text-xs">
        {(['success', 'loading', 'error'] as TableViewStatus[]).map((s) => (
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
