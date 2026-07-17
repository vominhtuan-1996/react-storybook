import { useState } from 'react';
import { SegmentedControl } from '@/components/ui/SegmentedControl';

const baseOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

export const SegmentedControlPlayground = () => {
  const [value, setValue] = useState('all');
  const [disableMiddle, setDisableMiddle] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);

  const options = baseOptions.map((o) =>
    o.value === 'active' ? { ...o, disabled: disableMiddle } : o,
  );

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className={fullWidth ? 'w-full' : ''}>
          <SegmentedControl
            options={options}
            value={value}
            onChange={setValue}
            disabled={disabled}
            fullWidth={fullWidth}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <p className="text-slate-500">Selected: {value}</p>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disableMiddle}
            onChange={(e) => setDisableMiddle(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disable "Active" segment
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disable whole control
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={fullWidth}
            onChange={(e) => setFullWidth(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Full width
        </label>
      </div>
    </div>
  );
};
