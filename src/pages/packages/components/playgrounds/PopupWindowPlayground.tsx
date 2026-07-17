import { useRef, useState } from 'react';
import { PopupWindow } from '@/components/ui/PopupWindow';
import type { PopupPlacement } from '@/components/ui/PopupWindow';

const placements: PopupPlacement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];

export const PopupWindowPlayground = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopupPlacement>('bottom-start');
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <button
          ref={anchorRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          disabled={disabled}
          className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-slate-800 px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Open menu
        </button>

        <PopupWindow
          open={open}
          onClose={() => setOpen(false)}
          anchorRef={anchorRef}
          placement={placement}
          disabled={disabled}
        >
          {['Edit', 'Duplicate', 'Delete'].map((item) => (
            <button
              key={item}
              type="button"
              className="flex h-9 w-full cursor-pointer items-center rounded-md px-3 text-left text-sm text-slate-200 hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              {item}
            </button>
          ))}
        </PopupWindow>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Placement</span>
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value as PopupPlacement)}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {placements.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disabled trigger
        </label>
      </div>
    </div>
  );
};
