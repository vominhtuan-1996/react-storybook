import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface SegmentOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
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

export const SegmentedControl = ({
  options,
  value,
  onChange,
  disabled = false,
  fullWidth = false,
  className = '',
}: SegmentedControlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [pressedValue, setPressedValue] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const activeIndex = options.findIndex((o) => o.value === value);

  const measure = () => {
    const node = segmentRefs.current[value];
    const container = containerRef.current;
    if (!node || !container) return;
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    setIndicator({
      left: nodeRect.left - containerRect.left,
      width: nodeRect.width,
    });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options.length]);

  useEffect(() => {
    const handleResize = () => measure();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const focusIndex = (nextIndex: number, step: 1 | -1) => {
    let i = nextIndex;
    for (let attempts = 0; attempts < options.length; attempts++) {
      const wrapped = (i + options.length) % options.length;
      const candidate = options[wrapped];
      if (!candidate.disabled) {
        segmentRefs.current[candidate.value]?.focus();
        onChange(candidate.value);
        return;
      }
      i = wrapped + step;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
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
      focusIndex(options.length - 1, -1);
    }
  };

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center gap-0.5 rounded-lg border border-slate-800 bg-slate-900/60 p-1 ${
        fullWidth ? 'flex w-full' : ''
      } ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {indicator && (
        <span
          aria-hidden="true"
          className="absolute inset-y-1 rounded-md bg-emerald-500/90 shadow-sm shadow-emerald-500/20"
          style={{
            left: indicator.left,
            width: indicator.width,
            transition: reducedMotion
              ? undefined
              : 'left 220ms cubic-bezier(0.22, 1, 0.36, 1), width 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      )}

      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;
        const isPressed = pressedValue === option.value;

        return (
          <button
            key={option.value}
            ref={(el) => {
              segmentRefs.current[option.value] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={isDisabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !isDisabled && onChange(option.value)}
            onPointerDown={() => !isDisabled && setPressedValue(option.value)}
            onPointerUp={() => setPressedValue(null)}
            onPointerLeave={() => setPressedValue(null)}
            className={`relative z-10 flex h-8 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              isActive
                ? 'text-slate-950'
                : isDisabled
                  ? 'cursor-not-allowed text-slate-600'
                  : 'cursor-pointer text-slate-300 hover:bg-slate-800/60 hover:text-white'
            } ${isPressed && !isDisabled ? 'scale-95' : 'scale-100'}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
