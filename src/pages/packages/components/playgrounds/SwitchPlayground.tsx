import { useState } from 'react';
import { Switch } from '@/components/ui/Switch';

export const SwitchPlayground = () => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Switch
          label="Notifications"
          description={!showError ? 'Get notified about new packages.' : undefined}
          checked={checked}
          disabled={disabled}
          isLoading={isLoading}
          error={showError ? 'Could not save preference.' : undefined}
          onChange={(e) => setChecked(e.target.checked)}
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
