import { useState } from 'react';
import { PageView } from '@/components/ui/PageView';
import type { PageTransition } from '@/components/ui/PageView';

const transitions: PageTransition[] = ['slide', 'fade', 'scale'];
const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-amber-600'];

export const PageViewPlayground = () => {
  const [transition, setTransition] = useState<PageTransition>('slide');
  const [index, setIndex] = useState(0);

  const pages = colors.map((c, i) => (
    <div key={i} className={`flex h-28 items-center justify-center ${c}`}>
      <span className="text-sm font-bold text-white">Page {i + 1}</span>
    </div>
  ));

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="min-h-[140px]">
        <PageView
          pages={pages}
          transition={transition}
          activeIndex={index}
          onChange={setIndex}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Transition</span>
          <select
            value={transition}
            onChange={(e) => setTransition(e.target.value as PageTransition)}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {transitions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <p className="text-slate-500">
          Drag the slide, or use arrows/dots. Active: {index + 1}/{colors.length}
        </p>
      </div>
    </div>
  );
};
