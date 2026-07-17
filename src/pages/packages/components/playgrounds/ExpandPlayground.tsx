import { useState } from 'react';
import { Expand } from '@/components/ui/Expand';

export const ExpandPlayground = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [longContent, setLongContent] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className="w-72">
          <Expand title="Package details" open={open} onToggle={setOpen} disabled={disabled}>
            {longContent
              ? 'This panel now contains a much longer block of text to demonstrate that the height animation measures and adapts to dynamic content size instead of using a fixed value.'
              : 'Short content line.'}
          </Expand>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <p className="text-slate-500">State: {open ? 'expanded' : 'collapsed'}</p>

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
            checked={longContent}
            onChange={(e) => setLongContent(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Long content
        </label>
      </div>
    </div>
  );
};
