import { useState } from 'react';
import { RadioGroup } from '@/components/ui/RadioGroup';

const baseOptions = [
  { value: 'free', label: 'Free', description: 'Basic features.' },
  { value: 'pro', label: 'Pro', description: 'Everything, plus support.' },
  { value: 'enterprise', label: 'Enterprise' },
];

export const RadioGroupPlayground = () => {
  const [value, setValue] = useState<string | null>('free');
  const [disableLast, setDisableLast] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);

  const options = baseOptions.map((o) =>
    o.value === 'enterprise' ? { ...o, disabled: disableLast } : o,
  );

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <RadioGroup
          label="Plan"
          options={options}
          value={value}
          onChange={setValue}
          disabled={disabled}
          errorText={showError ? 'Please select a plan.' : undefined}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <p className="col-span-2 text-slate-500">Selected: {value ?? 'none'}</p>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disableLast}
            onChange={(e) => setDisableLast(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disable "Enterprise"
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disable whole group
        </label>

        <label className="col-span-2 flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={showError}
            onChange={(e) => setShowError(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Error
        </label>
      </div>
    </div>
  );
};
