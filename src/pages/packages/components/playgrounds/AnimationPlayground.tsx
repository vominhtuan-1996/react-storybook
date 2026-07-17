import { useState } from 'react';
import { Animation } from '@/components/ui/Animation';
import type { AnimationEasingPreset, AnimationVariant } from '@/components/ui/Animation';

const variants: AnimationVariant[] = ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'bounce'];
const easings: AnimationEasingPreset[] = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'back', 'anticipate'];

export const AnimationPlayground = () => {
  const [show, setShow] = useState(true);
  const [variant, setVariant] = useState<AnimationVariant>('slide-up');
  const [easing, setEasing] = useState<AnimationEasingPreset>('back');
  const [duration, setDuration] = useState(250);
  const [useCustomCubic, setUseCustomCubic] = useState(false);
  const customCubic: [number, number, number, number] = [0.68, -0.55, 0.27, 1.55];

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Animation show={show} variant={variant} duration={duration} easing={useCustomCubic ? customCubic : easing}>
          <div className="flex h-20 w-40 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
            Box
          </div>
        </Animation>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="h-9 cursor-pointer rounded-md bg-emerald-500/15 px-3 text-xs font-medium text-emerald-300 transition-colors duration-150 hover:bg-emerald-500/25"
        >
          Toggle show ({show ? 'visible' : 'hidden'})
        </button>

        <label className="flex items-center gap-2 text-slate-400">
          Variant
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as AnimationVariant)}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200"
          >
            {variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          Easing
          <select
            value={easing}
            disabled={useCustomCubic}
            onChange={(e) => setEasing(e.target.value as AnimationEasingPreset)}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200 disabled:opacity-50"
          >
            {easings.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={useCustomCubic}
            onChange={(e) => setUseCustomCubic(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Custom cubic-bezier(0.68, -0.55, 0.27, 1.55)
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          Duration: {duration}ms
          <input
            type="range"
            min={100}
            max={600}
            step={10}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="flex-1 accent-emerald-500"
          />
        </label>
      </div>
    </div>
  );
};
