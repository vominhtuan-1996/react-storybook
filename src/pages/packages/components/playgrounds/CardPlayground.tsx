import { useState } from 'react';
import { Card } from '@/components/ui/Card';

const variants = ['elevated', 'outlined', 'flat'] as const;

export const CardPlayground = () => {
  const [variant, setVariant] = useState<(typeof variants)[number]>('elevated');
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pressCount, setPressCount] = useState(0);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className="w-full max-w-[220px]">
          <Card
            variant={variant}
            selected={selected}
            disabled={disabled}
            loading={loading}
            title="Package published"
            subtitle="component-button 1.2.0"
            onClick={() => setPressCount((n) => n + 1)}
          >
            <p className="text-xs text-slate-500">Pressed {pressCount}x</p>
          </Card>
        </div>
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
            checked={loading}
            onChange={(e) => setLoading(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Loading (skeleton)
        </label>
      </div>
    </div>
  );
};
