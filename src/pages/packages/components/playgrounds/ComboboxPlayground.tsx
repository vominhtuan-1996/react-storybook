import { useState } from 'react';
import { Combobox } from '@/components/ui/Combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid', disabled: true },
];

export const ComboboxPlayground = () => {
  const [value, setValue] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [noOptions, setNoOptions] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[180px] items-start rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Combobox
          label="Framework"
          options={noOptions ? [] : options}
          value={value}
          onChange={setValue}
          disabled={disabled}
          isLoading={isLoading}
          errorText={showError ? 'Selection required.' : undefined}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
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

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={showError}
            onChange={(e) => setShowError(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Error
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={noOptions}
            onChange={(e) => setNoOptions(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          No options
        </label>
      </div>
    </div>
  );
};
