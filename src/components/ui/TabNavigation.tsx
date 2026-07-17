import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface TabItem {
  value: string;
  label: string;
  badge?: number;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

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

export const TabNavigation = ({ tabs, value, onChange, className = '' }: TabNavigationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const activeIndex = tabs.findIndex((t) => t.value === value);

  const measure = () => {
    const node = tabRefs.current[value];
    const container = containerRef.current;
    if (!node || !container) return;
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    setIndicator({
      left: nodeRect.left - containerRect.left + container.scrollLeft,
      width: nodeRect.width,
    });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, tabs.length]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    tabRefs.current[value]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [value]);

  const focusIndex = (nextIndex: number, step: 1 | -1) => {
    let i = nextIndex;
    for (let attempts = 0; attempts < tabs.length; attempts++) {
      const wrapped = (i + tabs.length) % tabs.length;
      const candidate = tabs[wrapped];
      if (!candidate.disabled) {
        tabRefs.current[candidate.value]?.focus();
        onChange(candidate.value);
        return;
      }
      i = wrapped + step;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusIndex(activeIndex + 1, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusIndex(activeIndex - 1, -1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusIndex(0, 1);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusIndex(tabs.length - 1, -1);
    }
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={`relative flex gap-1 overflow-x-auto border-b border-slate-800 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[tab.value] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !tab.disabled && onChange(tab.value)}
            className={`relative flex h-11 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              tab.disabled
                ? 'cursor-not-allowed text-slate-600'
                : isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
            {tab.badge != null && (
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}

      {indicator && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 h-0.5 rounded-full bg-emerald-400"
          style={{
            left: indicator.left,
            width: indicator.width,
            transition: reducedMotion
              ? undefined
              : 'left 220ms cubic-bezier(0.22, 1, 0.36, 1), width 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      )}
    </div>
  );
};
