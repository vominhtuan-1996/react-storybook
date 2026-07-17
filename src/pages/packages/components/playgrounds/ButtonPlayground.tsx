import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const variants = ['primary', 'secondary', 'ghost'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export const ButtonPlayground = () => {
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary');
  const [size, setSize] = useState<(typeof sizes)[number]>('md');
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState('Get started');

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          isLoading={isLoading}
        >
          {label || 'Button'}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <label className="flex flex-col gap-1">
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

        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Size</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as typeof size)}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="col-span-2 flex flex-col gap-1">
          <span className="text-slate-500">Label</span>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={24}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />
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

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={isLoading}
            onChange={(e) => setIsLoading(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Loading
        </label>
      </div>
    </div>
  );
};
