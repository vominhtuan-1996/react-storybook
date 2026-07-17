import { useState } from 'react';
import { Chip } from '@/components/ui/Chip';

const variants = ['filled', 'outlined'] as const;

export const ChipPlayground = () => {
  const [variant, setVariant] = useState<(typeof variants)[number]>('filled');
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [removable, setRemovable] = useState(true);
  const [removed, setRemoved] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        {removed ? (
          <button
            type="button"
            onClick={() => setRemoved(false)}
            className="text-xs text-emerald-400 underline"
          >
            Restore chip
          </button>
        ) : (
          <Chip
            variant={variant}
            selected={selected}
            disabled={disabled}
            onClick={() => setSelected((s) => !s)}
            onRemove={removable ? () => setRemoved(true) : undefined}
          >
            React
          </Chip>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <label className="col-span-2 flex flex-col gap-1">
          <span className="text-slate-500">Variant</span>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as typeof variant)}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => setSelected(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Selected
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disabled
        </label>

        <label className="col-span-2 flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={removable}
            onChange={(e) => setRemovable(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Removable
        </label>
      </div>
    </div>
  );
};
