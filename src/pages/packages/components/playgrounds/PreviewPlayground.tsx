import { useState } from 'react';
import { Preview } from '@/components/ui/Preview';

const svgDataUri = (bg: string, label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450"><rect width="600" height="450" fill="${bg}"/><text x="300" y="235" font-size="36" fill="white" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`,
  )}`;

type Scenario = 'loaded' | 'error' | 'empty';

export const PreviewPlayground = () => {
  const [scenario, setScenario] = useState<Scenario>('loaded');
  const [zoomable, setZoomable] = useState(true);

  const src =
    scenario === 'loaded'
      ? svgDataUri('%234F46E5', 'Photo')
      : scenario === 'error'
        ? 'data:image/does-not-exist'
        : undefined;

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className="w-64">
          <Preview key={`${scenario}-${zoomable}`} src={src} alt="Preview sample" zoomable={zoomable} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <div className="flex gap-2">
          {(['loaded', 'error', 'empty'] as Scenario[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScenario(s)}
              className={`h-8 cursor-pointer rounded-md border px-3 text-xs font-medium transition-colors duration-150 ${
                scenario === s
                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                  : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={zoomable}
            onChange={(e) => setZoomable(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Zoomable
        </label>
      </div>
    </div>
  );
};
