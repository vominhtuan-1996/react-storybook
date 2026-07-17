import {
  useEffect,
  useRef,
  useState,
} from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';

type PageTransition = 'slide' | 'fade' | 'scale';

interface PageViewProps {
  pages: ReactNode[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  transition?: PageTransition;
  showDots?: boolean;
  showArrows?: boolean;
  disabled?: boolean;
  className?: string;
}

const SWIPE_VELOCITY_THRESHOLD = 0.35;
const SWIPE_DISTANCE_THRESHOLD = 0.3;
const RUBBER_BAND_DIVISOR = 3;

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

export const PageView = ({
  pages,
  activeIndex: controlledIndex,
  onChange,
  transition = 'slide',
  showDots = true,
  showArrows = true,
  disabled = false,
  className = '',
}: PageViewProps) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const index = controlledIndex ?? internalIndex;
  const count = pages.length;

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartTime = useRef(0);
  const widthRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  const goTo = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(count - 1, nextIndex));
    if (clamped === index) return;
    onChange?.(clamped);
    if (controlledIndex === undefined) setInternalIndex(clamped);
  };

  const settle = () => {
    setDragOffset(0);
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || count <= 1 || transition !== 'slide') return;
    widthRef.current = trackRef.current?.offsetWidth || 1;
    dragStartX.current = e.clientX;
    dragStartTime.current = performance.now();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    let delta = e.clientX - dragStartX.current;

    const atStart = index === 0 && delta > 0;
    const atEnd = index === count - 1 && delta < 0;
    if (atStart || atEnd) delta /= RUBBER_BAND_DIVISOR;

    setDragOffset(delta);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const width = widthRef.current || 1;
    const elapsed = performance.now() - dragStartTime.current;
    const velocity = Math.abs(dragOffset) / Math.max(elapsed, 1);
    const distanceRatio = Math.abs(dragOffset) / width;

    const shouldAdvance =
      velocity > SWIPE_VELOCITY_THRESHOLD || distanceRatio > SWIPE_DISTANCE_THRESHOLD;

    if (shouldAdvance && dragOffset < 0 && index < count - 1) {
      goTo(index + 1);
    } else if (shouldAdvance && dragOffset > 0 && index > 0) {
      goTo(index - 1);
    }
    settle();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft') goTo(index - 1);
    };
    const node = trackRef.current;
    node?.addEventListener('keydown', handler);
    return () => node?.removeEventListener('keydown', handler);
  }, [index, disabled, count]);

  const transitionStyle = reducedMotion
    ? undefined
    : isDragging
      ? undefined
      : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease-out';

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        tabIndex={0}
        className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <p className="sr-only" aria-live="polite">
          Page {index + 1} of {count}
        </p>

        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ touchAction: transition === 'slide' ? 'pan-y' : undefined }}
        >
          {transition === 'slide' ? (
            <div
              className="flex"
              style={{
                transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
                transition: transitionStyle,
                cursor: isDragging ? 'grabbing' : count > 1 ? 'grab' : undefined,
              }}
            >
              {pages.map((page, i) => (
                <div
                  key={i}
                  className="w-full shrink-0"
                  aria-hidden={i !== index}
                >
                  {page}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {pages.map((page, i) => {
                const isActive = i === index;
                return (
                  <div
                    key={i}
                    aria-hidden={!isActive}
                    className={isActive ? 'relative' : 'absolute inset-0'}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform:
                        transition === 'scale'
                          ? isActive
                            ? 'scale(1)'
                            : 'scale(0.94)'
                          : undefined,
                      transition: reducedMotion
                        ? undefined
                        : 'opacity 280ms ease-out, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {page}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={disabled || index === 0}
              aria-label="Previous page"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-950/80 text-slate-200 backdrop-blur transition-opacity duration-150 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={disabled || index === count - 1}
              aria-label="Next page"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-950/80 text-slate-200 backdrop-blur transition-opacity duration-150 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}
      </div>

      {showDots && count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2" role="tablist" aria-label="Pages">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to page ${i + 1}`}
              onClick={() => goTo(i)}
              disabled={disabled}
              className="-m-2 flex h-8 w-8 cursor-pointer items-center justify-center disabled:cursor-not-allowed"
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  i === index
                    ? 'h-2 w-5 bg-emerald-400'
                    : 'h-2 w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export type { PageTransition, PageViewProps };
