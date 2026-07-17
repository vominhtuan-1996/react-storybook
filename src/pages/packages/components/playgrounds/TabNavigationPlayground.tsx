import { useState } from 'react';
import { TabNavigation } from '@/components/ui/TabNavigation';
import type { TabItem } from '@/components/ui/TabNavigation';

const baseTabs: TabItem[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active', badge: 3 },
  { value: 'archived', label: 'Archived' },
];

export const TabNavigationPlayground = () => {
  const [value, setValue] = useState('all');
  const [showBadge, setShowBadge] = useState(true);
  const [disableArchived, setDisableArchived] = useState(false);

  const tabs = baseTabs.map((t) => ({
    ...t,
    badge: t.value === 'active' && showBadge ? 3 : undefined,
    disabled: t.value === 'archived' ? disableArchived : false,
  }));

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className="w-72">
          <TabNavigation tabs={tabs} value={value} onChange={setValue} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <p className="text-slate-500">Active: {value}</p>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={showBadge}
            onChange={(e) => setShowBadge(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Show badge on "Active"
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disableArchived}
            onChange={(e) => setDisableArchived(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disable "Archived" tab
        </label>
      </div>
    </div>
  );
};
