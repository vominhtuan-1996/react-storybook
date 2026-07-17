import { useEffect, useRef, useState } from 'react';
import type { ReactNode, SVGProps } from 'react';

interface ScrollViewProps {
  children: ReactNode;
  height?: number;
  showScrollToTop?: boolean;
  scrollToTopThreshold?: number;
  className?: string;
}

const ArrowUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

export const ScrollView = ({
  children,
  height = 320,
  showScrollToTop = true,
  scrollToTopThreshold = 200,
  className = '',
}: ScrollViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const measure = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const overflowing = scrollHeight > clientHeight + 1;
    setIsOverflowing(overflowing);
    setAtTop(scrollTop <= 1);
    setAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    setShowButton(showScrollToTop && scrollTop > scrollToTopThreshold);
  };

  useEffect(() => {
    measure();
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const scrollToTop = () => {
    const el = containerRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const showTopShadow = isOverflowing && !atTop;
  const showBottomShadow = isOverflowing && !atBottom;

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-slate-950 to-transparent transition-opacity duration-150 ${
          showTopShadow ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-slate-950 to-transparent transition-opacity duration-150 ${
          showBottomShadow ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={containerRef}
        onScroll={measure}
        style={{ height }}
        className="overflow-y-auto rounded-lg border border-slate-800 bg-slate-900/40"
      >
        {children}
      </div>

      {showButton && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="absolute bottom-3 right-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 text-slate-200 shadow-lg shadow-black/40 transition-all duration-150 ease-out hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 animate-dialog-panel-in motion-reduce:animate-none"
        >
          <ArrowUpIcon />
        </button>
      )}
    </div>
  );
};
