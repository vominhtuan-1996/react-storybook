import { useState } from 'react';
import { Carousel } from '@/components/ui/Carousel';

const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-amber-600'];

export const CarouselPlayground = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [showDots, setShowDots] = useState(true);
  const [showArrows, setShowArrows] = useState(true);

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className="w-72">
          <Carousel
            key={`${autoPlay}-${loop}-${showDots}-${showArrows}`}
            autoPlay={autoPlay}
            intervalMs={2000}
            loop={loop}
            showDots={showDots}
            showArrows={showArrows}
            slides={colors.map((c, i) => (
              <div key={i} className={`flex h-36 items-center justify-center ${c}`}>
                <span className="text-lg font-bold text-white">Slide {i + 1}</span>
              </div>
            ))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={(e) => setAutoPlay(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Autoplay
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Loop
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={showDots}
            onChange={(e) => setShowDots(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Show dots
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={showArrows}
            onChange={(e) => setShowArrows(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Show arrows
        </label>
      </div>
    </div>
  );
};
