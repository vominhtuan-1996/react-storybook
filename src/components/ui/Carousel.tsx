import { useEffect, useRef, useState } from 'react';
import type { ReactNode, SVGProps } from 'react';

interface CarouselProps {
  slides: ReactNode[];
  autoPlay?: boolean;
  intervalMs?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export const Carousel = ({
  slides,
  autoPlay = true,
  intervalMs = 4000,
  loop = true,
  showDots = true,
  showArrows = true,
  className = '',
}: CarouselProps) => {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const isPlaying = autoPlay && !hovered && !manuallyPaused && !reducedMotion && count > 1;

  const goTo = (next: number) => {
    if (loop) {
      setIndex(((next % count) + count) % count);
    } else {
      setIndex(Math.max(0, Math.min(count - 1, next)));
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (loop ? (i + 1) % count : Math.min(count - 1, i + 1)));
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, intervalMs, count, loop]);

  if (count === 0) return null;

  const atStart = index === 0;
  const atEnd = index === count - 1;

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Carousel"
        className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40"
      >
        <p className="sr-only" aria-live="polite">
          Slide {index + 1} of {count}
        </p>

        <div
          className="flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: reducedMotion ? undefined : 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0" aria-hidden={i !== index}>
              {slide}
            </div>
          ))}
        </div>

        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={!loop && atStart}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-950/80 text-slate-200 backdrop-blur transition-opacity duration-150 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={!loop && atEnd}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-950/80 text-slate-200 backdrop-blur transition-opacity duration-150 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}

        {autoPlay && count > 1 && (
          <button
            type="button"
            onClick={() => setManuallyPaused((p) => !p)}
            aria-label={manuallyPaused ? 'Play carousel' : 'Pause carousel'}
            aria-pressed={manuallyPaused}
            className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950/80 text-slate-200 backdrop-blur transition-colors duration-150 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {manuallyPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}
      </div>

      {showDots && count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="-m-2 flex h-8 w-8 cursor-pointer items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  i === index ? 'h-2 w-5 bg-emerald-400' : 'h-2 w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
