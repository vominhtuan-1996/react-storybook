import { useState } from 'react';
import { ScrollView } from '@/components/ui/ScrollView';

const items = Array.from({ length: 14 }, (_, i) => `component-${i}`);

export const ScrollViewPlayground = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(true);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <ScrollView height={160} showScrollToTop={showScrollToTop}>
        {items.map((name) => (
          <div key={name} className="border-b border-slate-800/60 px-4 py-3 text-sm text-white">
            {name}
          </div>
        ))}
      </ScrollView>

      <label className="flex items-center gap-2 text-xs text-slate-400">
        <input
          type="checkbox"
          checked={showScrollToTop}
          onChange={(e) => setShowScrollToTop(e.target.checked)}
          className="h-4 w-4 accent-emerald-500"
        />
        Show scroll-to-top button
      </label>

      <p className="text-xs text-slate-500">Scroll the list to see fade shadows + the button appear.</p>
    </div>
  );
};
