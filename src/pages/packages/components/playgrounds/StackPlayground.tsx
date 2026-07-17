import { useState } from 'react';
import { Stack } from '@/components/ui/Stack';

const item = (label: string) => (
  <div key={label} className="rounded-md bg-slate-800 px-3 py-2 text-sm text-white">
    {label}
  </div>
);

export const StackPlayground = () => {
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const [spacing, setSpacing] = useState<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [divider, setDivider] = useState(true);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Stack direction={direction} spacing={spacing} divider={divider} className="w-72">
          {item('Item A')}
          {item('Item B')}
          {item('Item C')}
        </Stack>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <label className="flex items-center gap-2 text-slate-400">
          Direction
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'row' | 'column')}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200"
          >
            <option value="row">row</option>
            <option value="column">column</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          Spacing
          <select
            value={spacing}
            onChange={(e) =>
              setSpacing(e.target.value as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl')
            }
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200"
          >
            <option value="none">none</option>
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={divider}
            onChange={(e) => setDivider(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Divider
        </label>
      </div>
    </div>
  );
};
