import { useState } from 'react';
import { Checkbox } from '@/components/ui/Checkbox';

export const CheckboxPlayground = () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const [required, setRequired] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Checkbox
          label="Accept terms"
          description={!showError ? 'Required to continue.' : undefined}
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          required={required}
          error={showError ? 'You must accept the terms to continue.' : undefined}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (indeterminate) setIndeterminate(false);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={indeterminate}
            onChange={(e) => setIndeterminate(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Indeterminate
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
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Required
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
      </div>
    </div>
  );
};
